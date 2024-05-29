/* eslint-disable no-restricted-syntax */
import { BannerComponent } from '@components/Banner';
import { Container } from '@components/Container';
import {
  useRef,
} from 'react';
import { Dropdown } from '@components/Dropdown';
import { DropdownHasUpdate } from '@components/DropdownHasUpdate';
import { DropdownTagFilter } from '@components/DropdownTagFilter';
import { DropdownType } from '@components/DropdownType';
import { TourFunnelStepOne } from '@components/TourApp/TourFunnel/Step1';
import { TourFunnelStepTwo } from '@components/TourApp/TourFunnel/Step2';
import { TourFunnelStepThree } from '@components/TourApp/TourFunnel/Step3';
import { ViewFilter } from '@components/ViewFilter';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { AuthContext } from 'contexts/AuthContext';
import { BannersContext } from 'contexts/Banners';
import { CampaignContext } from 'contexts/Campaign';
import { IdeaContext } from 'contexts/Idea';
import { IdeaChangeContext } from 'contexts/IdeaChanges';
import { IdeaCommentProvider } from 'contexts/IdeaComments';
import { IdeaTagContext } from 'contexts/IdeaTags';
import { ProcessActivityContext } from 'contexts/ProcessActivity';
import { Idea, IdeaKanbamStep } from 'interfaces/idea';
import { TourId, TourStatus } from 'interfaces/tour';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { Item } from './Item';
import { PreviewFunnel } from './Preview';
import { InteractionPanelTabs } from './InteractionPanelTabs/Index';
import {
  ActionButtonWrapper,
  BackButton,
  BannerContentWrapper,
  BannerSubtitle,
  BannerTitle,
  BannerWrapperContainer,
  C,
  CloseButtonWrapper,
  GoToLink,
  InputSearch,
  ItemFunnel,
  Leftside,
  LeftsideIcon,
  LeftsideTitle,
  ListFunnel,
  Rightside,
  SectionBanner,
  SectionHeader,
  SectionSubHeader,
  Sections,
  Separator,
  SkeletonContainer,
  WapperInput,
} from './styles';

export const ApprovalFunnelPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { back, push } = useRouter();
  const { user } = useContext(AuthContext);
  const unviewedStep1 =
    user?.tours[TourId.FUNNEL_STEP_ONE] === TourStatus.UNVIEWED;

  const unviewedStep2 =
    user?.tours[TourId.FUNNEL_STEP_TWO] === TourStatus.UNVIEWED;

  const unviewedStep3 =
    user?.tours[TourId.FUNNEL_STEP_THREE] === TourStatus.UNVIEWED;

  const { getIdeaTags, filteredIdeaTags, updateFilteredTags, allIdeaTags } =
    useContext(IdeaTagContext);
  const {
    getKanbanIdeas,
    updateKanbanIdeaStatus,
    getKanbanSteps,
    kanbanIdeas,
    kanbanSteps,
    loading,
  } = useContext(ApprovalFunnelContext);
  const { idea, viewIdea } = useContext(IdeaContext);
  const { campaignsInfo, getCampaignsInfo } = useContext(CampaignContext);
  const { getAllIdeaChangesForUser, updateIdeaChange, ideaChangesForUser } =
    useContext(IdeaChangeContext);
  const { getAllProcessActivitiesName } = useContext(ProcessActivityContext);
  const { getBannersForPage, bannersList } = useContext(BannersContext);

  const [selectedCampaignsIds, setSelectedCampaignIds] = useState<string[]>([]);
  const [selectedIdeaTypes, setSelectedIdeaTypes] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [preview, setPreview] = useState<IdeaKanbamStep>();

  const [itemDrag, setItemDrag] = useState<Idea>();
  const [selectedIdeaUpdateStatusIds, setSelectedIdeaUpdateStatusIds] =
    useState<string[]>([]);
  const [ideaChangesForUserState, setIdeaChangesForUserState] = useState([]);
  const [ideasThatHasUpdateIds, setideasThatHasUpdateIds] = useState([]);
  const [kanbanIdeasFiltered, setKanbanIdeasFiltered] = useState<any>({});
  const [processActivitiesName, setProcessActivitiesName] = useState([]);
  const [wasScrolled, setWasScrolled] = useState(false);
  const [isBannerActive, setIsBannerActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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

  useEffect(() => {
    setIdeaId(new URLSearchParams(window?.location?.search).get('ideaId'));
    setKanbanStep(
      new URLSearchParams(window?.location?.search).get('kanbanStep')
    );
  }, []);

  const [updateStepStatus, setUpdateStepStatus] = useState(false);

  const isTrial = process.env.NEXT_PUBLIC_CLIENT === 'trial';

  function actionButton(url: string): void {
    window.open(url, '_blank');
  }

  function closeBanner(): void {
    setIsBannerActive(false);
  }

  const handleSelectCampaign = useCallback(
    (id: string) => {
      const campaignIndex = selectedCampaignsIds.findIndex(
        campaignId => campaignId === id
      );

      if (campaignIndex !== -1) {
        setSelectedCampaignIds(state =>
          state.filter((campaign, index) => index !== campaignIndex)
        );
      } else {
        setSelectedCampaignIds(state => [...state, id]);
      }
    },
    [selectedCampaignsIds]
  );

  useEffect(() => {
    (async (): Promise<void> => {
      setProcessActivitiesName(await getAllProcessActivitiesName());
      await getKanbanSteps();

      await getBannersForPage('APPROVAL_FUNNEL', isTrial);
    })();
  }, [getAllProcessActivitiesName, getKanbanSteps, getBannersForPage, isTrial]);

  useEffect(() => {
    (async (): Promise<void> => {
      await getIdeaTags(filteredIdeaTags);
    })();
  }, [getIdeaTags, idea?.id]);

  const handleSelectIdeaType = useCallback(
    (type: string) => {
      let newSelectedIdeaTypes = [...selectedIdeaTypes];
      if (newSelectedIdeaTypes.includes(type)) {
        newSelectedIdeaTypes = newSelectedIdeaTypes.filter(
          selectedIdeaType => selectedIdeaType !== type
        );
      } else {
        newSelectedIdeaTypes.push(type);
      }
      setSelectedIdeaTypes(newSelectedIdeaTypes);
    },
    [selectedIdeaTypes]
  );

  const handleSelectTag = useCallback(
    (toggleTag: any) => {
      const usedTags = [...filteredIdeaTags];
      usedTags.find(tag => tag.id === toggleTag.id).checked = !usedTags.find(
        tag => tag.id === toggleTag.id
      ).checked;
      updateFilteredTags(usedTags);
    },
    [filteredIdeaTags, updateFilteredTags]
  );

  const handleSelectIdeasUpdateStatus = useCallback(
    (id: number) => {
      const ideaIndex = selectedIdeaUpdateStatusIds.findIndex(
        ideaId => ideaId === id.toString()
      );

      if (ideaIndex !== -1) {
        setSelectedIdeaUpdateStatusIds(state =>
          state.filter((idea, index) => index !== ideaIndex)
        );
      } else {
        setSelectedIdeaUpdateStatusIds(state => [...state, id.toString()]);
      }

      const arr = [];
      if (ideasThatHasUpdateIds.length === 0) {
        for (const ideaThatHasUpdate of ideaChangesForUser) {
          arr.push(ideaThatHasUpdate.ideaId);
        }
        setideasThatHasUpdateIds(arr);
      } else {
        setideasThatHasUpdateIds([]);
      }
    },
    [
      selectedIdeaUpdateStatusIds,
      ideasThatHasUpdateIds,
      setideasThatHasUpdateIds,
      setSelectedIdeaUpdateStatusIds,
      ideaChangesForUser,
    ]
  );

  const isAllStepCriteriaEvaluated = (): boolean => {
    return (
      itemDrag?.evaluationCriteriasData.filter(
        evaluationCriteria =>
          evaluationCriteria.evaluationCriteriasCampaignMetadata
            .criteriaStep === itemDrag.kanbanStep &&
          evaluationCriteria.criteriaRate === 0
      ).length > 0
    );
  };

  const isValidDropTransition = (toStep: string): string => {
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
  };

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
    [itemDrag, updateKanbanIdeaStatus]
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

  const handleUpdateKanbanIdeas = useCallback(async () => {
    await getKanbanIdeas(selectedCampaignsIds);
  }, [getKanbanIdeas, selectedCampaignsIds]);

  const hasChangeForUser = useCallback(
    (ideaId: string) => {
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
    },
    [ideaChangesForUserState]
  );

  const ideasUpdateStatusOptions = [
    {
      title: 'Com atualizações',
      id: 1,
    },
  ];

  const handleSetPreview = useCallback(() => {
    setSearch('a');

    setTimeout(() => setSearch(''), 50);

    setPreview(undefined);
  }, []);

  useEffect(() => {
    (async (): Promise<void> => {
      await getKanbanIdeas({
        params1: selectedCampaignsIds,
        params2: ideasThatHasUpdateIds,
        params3: selectedIdeaTypes,
        params4: search,
      });
      setIdeaChangesForUserState(await getAllIdeaChangesForUser());
    })();
  }, [
    getKanbanIdeas,
    getAllIdeaChangesForUser,
    selectedCampaignsIds,
    selectedIdeaUpdateStatusIds,
    ideasThatHasUpdateIds,
    selectedIdeaTypes,
    search,
  ]);

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

  const scrollToEvaluationCriteria = (): void => {
    if (interactionPanelRef.current) {
      setScrollToEvaluationCriteriaControl(true);
      interactionPanelRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToEvaluationCriteria = (): void => {
    setTimeout(() => scrollToEvaluationCriteria(), 500);
  };

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
      });
      handleScrollToEvaluationCriteria();
    }
  }, [ideaId, kanbanStep]);

  const execOpenModal = (file: string) => {
    setModal(true);
    setPreview(file);
  };

  return (
    <Container>
      <C>
        <BackButton onClick={() => back()}>
          <BiLeftArrowAlt size={20} />
          <span>Voltar</span>
        </BackButton>
        <SectionHeader>
          <Leftside>
            <LeftsideIcon>
              <RiLightbulbFlashLine size={26} />
            </LeftsideIcon>
            <LeftsideTitle>Funil de Aprovação</LeftsideTitle>
          </Leftside>
        </SectionHeader>
        <SectionBanner isOpen={isBannerActive}>
          {bannersList && bannersList.length > 0 && (
            <BannerComponent banner={bannersList[0]}>
              <BannerWrapperContainer>
                <BannerContentWrapper>
                  <BannerTitle>{bannersList[0].title}</BannerTitle>
                  <BannerSubtitle>{bannersList[0].subtitle}</BannerSubtitle>
                </BannerContentWrapper>
                <Separator />
                <GoToLink onClick={() => push('/knowledge-trail')}>
                  Ver vídeos
                </GoToLink>
                <ActionButtonWrapper
                  onClick={() => actionButton('/Cardapio_de_mentorias.pdf')}
                >
                  Conhecer Mentorias
                </ActionButtonWrapper>
                <CloseButtonWrapper onClick={() => closeBanner()}>
                  <IoMdClose
                    size={25}
                    color={isHovered ? colors.background : colors.font}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                </CloseButtonWrapper>
              </BannerWrapperContainer>
            </BannerComponent>
          )}
        </SectionBanner>
        <SectionSubHeader>
          <Leftside>
            <WapperInput>
              <div id="icon">
                <AiOutlineSearch color={colors.font} size={20} />
              </div>
              <InputSearch
                placeholder="Buscar por título, ID ou palavra-chave"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </WapperInput>
          </Leftside>
          <Rightside>
            <DropdownTagFilter
              itemsList={filteredIdeaTags}
              handleSelect={handleSelectTag}
            />
            <DropdownType
              itemsList={processActivitiesName}
              handleSelect={handleSelectIdeaType}
              selectedItems={selectedIdeaTypes}
            />
            <DropdownHasUpdate
              itemsList={ideasUpdateStatusOptions}
              handleSelect={handleSelectIdeasUpdateStatus}
              selectedItems={selectedIdeaUpdateStatusIds}
            />
            <Dropdown
              itemsList={campaignsInfo}
              handleSelect={handleSelectCampaign}
              selectedItems={selectedCampaignsIds}
            />
          </Rightside>
        </SectionSubHeader>
        {kanbanSteps.length > 0 && (
          <ListFunnel isOpened={!!preview}>
            {loading ? (
              <SkeletonContainer>
                {[1,2,3,4].map(i => (
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
