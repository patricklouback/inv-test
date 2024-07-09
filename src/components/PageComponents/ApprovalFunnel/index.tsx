/* eslint-disable no-restricted-syntax */

import { Container } from '@components/Container';
import { useRef } from 'react';
import { TourFunnelStepOne } from '@components/TourApp/TourFunnel/Step1';
import { TourFunnelStepTwo } from '@components/TourApp/TourFunnel/Step2';
import { TourFunnelStepThree } from '@components/TourApp/TourFunnel/Step3';
import { ViewFilter } from '@components/ViewFilter';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { AuthContext } from 'contexts/AuthContext';
import { CampaignContext } from 'contexts/Campaign';
import { IdeaContext } from 'contexts/Idea';
import { IdeaChangeContext } from 'contexts/IdeaChanges';
import { IdeaCommentProvider } from 'contexts/IdeaComments';
import { IdeaTagContext } from 'contexts/IdeaTags';
import { Idea, IdeaKanbamStep } from 'interfaces/idea';
import { TourId, TourStatus } from 'interfaces/tour';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { withSSRAuth } from 'utils/withSSRAuth';
import { Item } from './Item';
import { PreviewFunnel } from './Preview';
import { InteractionPanelTabs } from './InteractionPanelTabs/Index';
import {
  C,
  ItemFunnel,
  ListFunnel,
  Sections,
  SkeletonContainer,
} from './styles';
import { HeaderFunil } from './HeaderFunil';
import { SearchHeaderFunil } from './Search';

export const ApprovalFunnelPage = ({ ideasTags, filters }) => {
  const { user } = useContext(AuthContext);
  const unviewedStep1 =
    user?.tours[TourId?.FUNNEL_STEP_ONE] === TourStatus.UNVIEWED;

  const unviewedStep2 =
    user?.tours[TourId?.FUNNEL_STEP_TWO] === TourStatus.UNVIEWED;

  const unviewedStep3 =
    user?.tours[TourId?.FUNNEL_STEP_THREE] === TourStatus.UNVIEWED;

  const { filteredIdeaTags, allIdeaTags, handleTagsItem } =
    useContext(IdeaTagContext);
  const {
    getKanbanIdeas,
    updateKanbanIdeaStatus,
    kanbanIdeas,
    kanbanSteps,
    loading,
  } = useContext(ApprovalFunnelContext);
  const { idea, viewIdea } = useContext(IdeaContext);
  const { getCampaignsInfo } = useContext(CampaignContext);
  const { updateIdeaChange } = useContext(IdeaChangeContext);
  const [search, setSearch] = useState<string>('');
  const [preview, setPreview] = useState<IdeaKanbamStep>();

  const [itemDrag, setItemDrag] = useState<Idea>();
  const [ideaChangesForUserState, setIdeaChangesForUserState] = useState([]);
  const [kanbanIdeasFiltered, setKanbanIdeasFiltered] = useState<any>({});
  const [wasScrolled, setWasScrolled] = useState(false);
  const [ideaId, setIdeaId] = useState(null);
  const [kanbanStep, setKanbanStep] = useState(null);
  const interactionPanelRef = useRef(null);
  const [
    scrollToEvaluationCriteriaControl,
    setScrollToEvaluationCriteriaControl,
  ] = useState(false);

  const handleSelectItem = useCallback((item): void => {
    setItemDrag(item);
  }, []);

  const [updateStepStatus, setUpdateStepStatus] = useState(false);
  const [selectedCampaignsIds, setSelectedCampaignIds] = useState<string[]>([]);

  useEffect(() => {
    setIdeaId(new URLSearchParams(window?.location?.search).get('ideaId'));
    setKanbanStep(
      new URLSearchParams(window?.location?.search).get('kanbanStep')
    );
  }, []);

  useEffect(() => {
    handleTagsItem(ideasTags, filteredIdeaTags);
  }, [ideasTags]);

  const isAllStepCriteriaEvaluated = useCallback((): boolean => {
    return (
      itemDrag?.evaluationCriteriasData.filter(
        evaluationCriteria =>
          evaluationCriteria.evaluationCriteriasCampaignMetadata
            .criteriaStep === itemDrag.kanbanStep &&
          evaluationCriteria.criteriaRate === 0
      ).length > 0
    );
  }, [itemDrag]);

  const isValidDropTransition = useCallback(
    (toStep: string): string => {
      if (
        (!itemDrag?.processActivity && preview === 'SELECT') ||
        (!itemDrag?.processActivity && preview === 'IMPLEMENTED')
      ) {
        return 'É necessário que a iniciativa tenha uma rota definida';
      }
      if (
        itemDrag.campaign.usingCriteria &&
        isAllStepCriteriaEvaluated() &&
        itemDrag?.kanbanStep !== toStep
      ) {
        return 'É necessário que a iniciativa tenha os critérios avaliados';
      }
      return '';
    },
    [itemDrag, preview, isAllStepCriteriaEvaluated]
  );

  const onDrop = useCallback(
    (toStep: IdeaKanbamStep, sequence: number): void => {
      const toastErrorMessage = isValidDropTransition(toStep);
      const isValidTransition = toastErrorMessage === '';
      if (isValidTransition) {
        updateKanbanIdeaStatus(itemDrag, toStep, sequence);
        if (toStep === 'SELECT') {
          if (hotjar.initialized()) {
            hotjar.event('select_idea');
          } else {
            console.error('hotjar não inicializado corretamente');
          }
        }
      } else {
        toast.error(toastErrorMessage);
      }
    },
    [isValidDropTransition, itemDrag, updateKanbanIdeaStatus]
  );

  const openPreview = useCallback(
    async (kanbanStep: IdeaKanbamStep, selectedIdea: Idea) => {
      await viewIdea(selectedIdea.id);
      setPreview(kanbanStep);

      await updateIdeaChange(selectedIdea.id);
    },
    [setPreview, viewIdea, updateIdeaChange]
  );

  // Construtor do filtro
  useEffect(() => {
    const steps = ['IMPLEMENTED', 'SELECT', 'ANALYZE', 'SCREENING'];
    const ideasFiltered = {};
    if (filteredIdeaTags.filter(tag => tag.checked).length === 0) {
      setKanbanIdeasFiltered(kanbanIdeas);
    } else {
      steps.forEach(step => {
        if (kanbanIdeas[step]?.length > 0 && filteredIdeaTags.length > 0) {
          const resultado = kanbanIdeas[step]?.filter(idea =>
            idea.ideaTags
              .filter(ideaTag => {
                return allIdeaTags.find(
                  ideaTagItem => ideaTagItem.id === ideaTag.id
                )?.checked;
              })
              .some(tag =>
                filteredIdeaTags
                  .filter(filteredTag => filteredTag.checked)
                  .some(filteredTag => filteredTag.id === tag.tagId)
              )
          );
          ideasFiltered[step] = resultado;
        }
      });
      setKanbanIdeasFiltered(ideasFiltered);
    }
  }, [filteredIdeaTags, kanbanIdeas, allIdeaTags]);

  const handleUpdateKanbanIdeas = async () => {
    await getKanbanIdeas(selectedCampaignsIds);
  };

  const hasChangeForUser = (ideaId: string) => {
    const resultOfVerify = [];

    for (const ideaChangeForUser of ideaChangesForUserState) {
      if (
        ideaChangeForUser.ideaId === ideaId &&
        ideaChangeForUser.originUserId !== ideaChangeForUser.targetUserId
      ) {
        resultOfVerify.push(ideaChangeForUser);
      }
    }

    if (resultOfVerify.length !== 0) {
      return true;
    }

    return false;
  };

  const handleSetPreview = () => {
    setSearch('a');
    setTimeout(() => setSearch(''), 50);
    setPreview(undefined);
  };

  useEffect(() => {
    (async (): Promise<void> => {
      await getCampaignsInfo();
    })();
  }, [getCampaignsInfo]);

  const userIsThisStepEvaluator = (): boolean => {
    return idea.evaluationCriteriasData
      .filter(
        evaluationCriteria =>
          evaluationCriteria.evaluationCriteriasCampaignMetadata
            .criteriaStep === idea.kanbanStep
      )
      .some(
        evaluationCriteria => evaluationCriteria.userEvaluator.id === user.id
      );
  };

  const isValidUser = (): boolean => {
    return user.isAdmin || user.isManager || userIsThisStepEvaluator();
  };

  const shouldUseEvaluationCriterias = (): boolean => {
    return idea.campaign.usingCriteria && isValidUser();
  };

  const scrollToEvaluationCriteria = useCallback((): void => {
    if (interactionPanelRef.current) {
      setScrollToEvaluationCriteriaControl(true);
      interactionPanelRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [interactionPanelRef, setScrollToEvaluationCriteriaControl]);

  const handleScrollToEvaluationCriteria = useCallback((): void => {
    setTimeout(() => scrollToEvaluationCriteria(), 500);
  }, [scrollToEvaluationCriteria]);

  useEffect(() => {
    if (ideaId != null && kanbanStep != null) {
      openPreview(kanbanStep, {
        id: ideaId,
        title: '',
        description: '',
        campaignId: '',
        type: 'PROJECT',
        sequence: 0,
        ideaFields: [],
        ideaUsers: [],
        ideaFiles: [],
        ideaSteps: [],
        status: '',
        processActivity: undefined,
        evaluationCriteriasData: [],
        evaluatorsUsers: [],
        directApprovals: [],
        directApprovalsUsers: [],
        secondaryLinks: [],
      });
      handleScrollToEvaluationCriteria();
    }
  }, [handleScrollToEvaluationCriteria, ideaId, kanbanStep, openPreview]);

  return (
    <Container>
      <C>
        <HeaderFunil user={user} />
        <SearchHeaderFunil
          search={search}
          setSearch={setSearch}
          filters={filters}
        />
        {kanbanSteps.length > 0 && (
          <ListFunnel isOpened={!!preview}>
            {loading ? (
              <SkeletonContainer>
                {[1, 2, 3, 4].map(i => (
                  <Skeleton
                    key={i}
                    className="card-skeleton"
                    containerClassName="card-skeleton-container"
                    count={1}
                  />
                ))}
              </SkeletonContainer>
            ) : (
              <>
                {(!preview || preview === 'SCREENING') && (
                  <ItemFunnel className="funnel-step-0">
                    <ViewFilter
                      qnt={kanbanIdeasFiltered?.SCREENING?.length}
                      type="funnel"
                      title={kanbanSteps[0].title}
                      onDrop={() => onDrop('SCREENING', 1)}
                      toggleWasScrolled={() => setWasScrolled(!wasScrolled)}
                    >
                      {kanbanIdeasFiltered?.SCREENING?.length > 0 && (
                        <>
                          {unviewedStep1 && <TourFunnelStepOne />}
                          {kanbanIdeasFiltered.SCREENING.map(item => (
                            <Item
                              key={item.id}
                              onClick={() => openPreview('SCREENING', item)}
                              onDragStart={() => handleSelectItem(item)}
                              idea={item}
                              ideaHasChanges={hasChangeForUser(item.id)}
                              wasScrolled={wasScrolled}
                              allIdeaTags={allIdeaTags}
                            />
                          ))}
                        </>
                      )}
                    </ViewFilter>
                  </ItemFunnel>
                )}
                {(!preview || preview === 'ANALYZE') && (
                  <ItemFunnel className="funnel-step-1">
                    <ViewFilter
                      qnt={kanbanIdeasFiltered?.ANALYZE?.length}
                      type="funnel"
                      title={kanbanSteps[1].title}
                      onDrop={() => onDrop('ANALYZE', 2)}
                      toggleWasScrolled={() => setWasScrolled(!wasScrolled)}
                    >
                      {kanbanIdeasFiltered?.ANALYZE?.length > 0 && (
                        <>
                          {!unviewedStep1 && unviewedStep2 && (
                            <TourFunnelStepTwo />
                          )}
                          {kanbanIdeasFiltered.ANALYZE.map(item => (
                            <Item
                              key={item.id}
                              onClick={() => openPreview('ANALYZE', item)}
                              onDragStart={() => handleSelectItem(item)}
                              idea={item}
                              ideaHasChanges={hasChangeForUser(item.id)}
                              wasScrolled={wasScrolled}
                              allIdeaTags={allIdeaTags}
                              className="TTTT2"
                            />
                          ))}
                        </>
                      )}
                    </ViewFilter>
                  </ItemFunnel>
                )}
                {(!preview || preview === 'SELECT') && (
                  <ItemFunnel className="funnel-step-2">
                    <ViewFilter
                      qnt={kanbanIdeasFiltered?.SELECT?.length}
                      type="funnel"
                      title={kanbanSteps[2].title}
                      onDrop={() => onDrop('SELECT', 3)}
                      toggleWasScrolled={() => setWasScrolled(!wasScrolled)}
                    >
                      {kanbanIdeasFiltered?.SELECT?.length > 0 && (
                        <>
                          {!unviewedStep1 &&
                            !unviewedStep2 &&
                            unviewedStep3 && <TourFunnelStepThree />}

                          {kanbanIdeasFiltered.SELECT.map(item => (
                            <Item
                              key={item.id}
                              onClick={() => openPreview('SELECT', item)}
                              openLinked={openPreview}
                              kanbanStep="SELECT"
                              onDragStart={() => handleSelectItem(item)}
                              idea={item}
                              updateStepStatus={updateStepStatus}
                              ideaHasChanges={hasChangeForUser(item.id)}
                              wasScrolled={wasScrolled}
                              allIdeaTags={allIdeaTags}
                              className="TTTT3"
                            />
                          ))}
                        </>
                      )}
                    </ViewFilter>
                  </ItemFunnel>
                )}
                {(!preview || preview === 'IMPLEMENTED') && (
                  <ItemFunnel>
                    <ViewFilter
                      qnt={kanbanIdeasFiltered?.IMPLEMENTED?.length}
                      type="funnel"
                      title={kanbanSteps[3].title}
                      onDrop={() => onDrop('IMPLEMENTED', 4)}
                      toggleWasScrolled={() => setWasScrolled(!wasScrolled)}
                    >
                      {kanbanIdeasFiltered?.IMPLEMENTED?.length > 0 &&
                        kanbanIdeasFiltered.IMPLEMENTED.map(item => (
                          <Item
                            key={item.id}
                            onClick={() => openPreview('IMPLEMENTED', item)}
                            onDragStart={() => handleSelectItem(item)}
                            idea={item}
                            ideaHasChanges={hasChangeForUser(item.id)}
                            allIdeaTags={allIdeaTags}
                            wasScrolled={wasScrolled}
                            className="TTTT4"
                          />
                        ))}
                    </ViewFilter>
                  </ItemFunnel>
                )}
                {preview && (
                  <Sections>
                    <IdeaCommentProvider>
                      <PreviewFunnel
                        shouldShowEvaluationCriteria={shouldUseEvaluationCriterias()}
                        kanbanStep={preview}
                        idea={idea}
                        setPreview={handleSetPreview}
                        updateKanbanIdeas={handleUpdateKanbanIdeas}
                        scrollToEvaluationCriteria={scrollToEvaluationCriteria}
                      />
                    </IdeaCommentProvider>
                    <div ref={interactionPanelRef}>
                      <InteractionPanelTabs
                        scrolledToEvaluationCriterias={
                          scrollToEvaluationCriteriaControl
                        }
                        setScrolledToEvaluationCriterias={
                          setScrollToEvaluationCriteriaControl
                        }
                        shouldShowEvaluationCriteria={shouldUseEvaluationCriterias()}
                        idea={idea}
                        setUpdateSteps={() =>
                          setUpdateStepStatus(!updateStepStatus)
                        }
                      />
                    </div>
                  </Sections>
                )}
              </>
            )}
          </ListFunnel>
        )}
      </C>
    </Container>
  );
};
