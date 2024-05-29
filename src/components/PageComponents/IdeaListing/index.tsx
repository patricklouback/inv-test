/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Container } from '@components/Container';
import { Pagination } from '@components/Pagination';
import { DefaultSection } from '@components/SectionDefault';
import { TourIdeaApproved } from '@components/TourApp/TourIdea/TourIdeaApproved';
import { TourIdeaInExternalReview } from '@components/TourApp/TourIdea/TourIdeaInExternalReview';
import { TourIdeaInReview } from '@components/TourApp/TourIdea/TourIdeaInReview';
import { TourIdeaWaiting } from '@components/TourApp/TourIdea/TourIdeaWaiting';
import { AuthContext } from 'contexts/AuthContext';
import { IdeaContext } from 'contexts/Idea';
import { IdeaChangeContext } from 'contexts/IdeaChanges';
import { ListenSizeContext } from 'contexts/ListenSize';
import { Idea } from 'interfaces/idea';
import { TourId, TourStatus } from 'interfaces/tour';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { getStatus } from 'utils/getStatus';
import { Header } from './Header';
import { ItemIdea } from './ItemIdea';
import { C, ListIdeas } from './styles';

type FiltersOptions = 'CAMPAIGN' | 'PERFIL' | 'STEP';

export const IdeaListingPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();

  const { getIdeasUser, getFilterCampaign, paginate } = useContext(IdeaContext);
  const { getAllIdeaChangesForUser, ideaChangesForUser } =
    useContext(IdeaChangeContext);
  const { size } = useContext(ListenSizeContext);
  const { user } = useContext(AuthContext);
  const unviewedApprovedIdea =
    user?.tours[TourId.IDEAS_APPROVED] === TourStatus.UNVIEWED;

  const unviewedTourIdeaWaiting =
    user?.tours[TourId.IDEAS_WAITING] === TourStatus.UNVIEWED;

  const unviewedTourIdeaReview =
    user?.tours[TourId.IDEAS_REVIEW] === TourStatus.UNVIEWED;

  const unviewedTourExternalReview =
    user?.tours[TourId.IDEAS_EXTERNAL_REVIEW] === TourStatus.UNVIEWED;

  const [page, setPage] = useState(1);
  const [ideas, setIdeas] = useState<Idea[]>(null);
  const [statusIdeas, setStatusIdeas] = useState<string[]>([]);

  const [activeFilter, setActiveFilter] = useState<FiltersOptions>();
  const [selectedCampaignIds, setSelectedCampaignIds] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedKanbanStepsIds, setSelectedKanbanStepsIds] = useState([]);
  const [selectedIdeaUpdateStatusIds, setSelectedIdeaUpdateStatusIds] =
    useState<string[]>([]);
  const [ideaChangesForUserState, setIdeaChangesForUserState] = useState([]);
  const [ideasThatHasUpdateIds, setideasThatHasUpdateIds] = useState([]);

  const { back } = useRouter();

  const handleOpenFilter = useCallback(
    (selectedFilter: FiltersOptions) => {
      if (selectedFilter === activeFilter) {
        setActiveFilter(undefined);
      } else {
        setActiveFilter(selectedFilter);
      }
    },
    [activeFilter]
  );

  const handleSelectCampaign = useCallback(
    (CampaignId: string) => {
      const existsCampaign = selectedCampaignIds.findIndex(
        e => e === CampaignId
      );
      if (existsCampaign !== -1) {
        setSelectedCampaignIds(state => {
          return state.filter((aux, i) => existsCampaign !== i);
        });
      } else {
        setSelectedCampaignIds(state => [...state, CampaignId]);
      }
    },
    [selectedCampaignIds]
  );

  const handleSelectKanbanStep = useCallback(
    (KanbanStepId: string) => {
      const kanbanStepIndex = selectedKanbanStepsIds.findIndex(
        e => e === KanbanStepId
      );
      if (kanbanStepIndex !== -1) {
        setSelectedKanbanStepsIds(state => {
          return state.filter((aux, i) => kanbanStepIndex !== i);
        });
      } else {
        setSelectedKanbanStepsIds(state => [...state, KanbanStepId]);
      }
    },
    [selectedKanbanStepsIds]
  );

  const handleSelectType = useCallback(
    (type: string) => {
      let newSelectedTypes = [...selectedTypes];
      if (newSelectedTypes.includes(type)) {
        newSelectedTypes = newSelectedTypes.filter(
          selectedIdeaType => selectedIdeaType !== type
        );
      } else {
        newSelectedTypes.push(type);
      }
      setSelectedTypes(newSelectedTypes);
    },
    [selectedTypes]
  );

  const handleChangePage = useCallback(
    async newPage => {
      setPage(newPage);
      const data = await getIdeasUser({
        limit: paginate.limit,
        offset: paginate.pages,
        page: newPage,
      });
      setIdeas(data);
    },
    [getIdeasUser, paginate]
  );

  const handleSelectIdeasUpdateStatus = useCallback(
    (id: string) => {
      const ideaIndex = selectedIdeaUpdateStatusIds.findIndex(
        ideaId => ideaId === id
      );

      if (ideaIndex !== -1) {
        setSelectedIdeaUpdateStatusIds(state =>
          state.filter((idea, index) => index !== ideaIndex)
        );
      } else {
        setSelectedIdeaUpdateStatusIds(state => [...state, id]);
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
      ideaChangesForUser,
      setideasThatHasUpdateIds,
      setSelectedIdeaUpdateStatusIds,
    ]
  );

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

  useEffect(() => {
    getFilterCampaign();
  }, [getFilterCampaign]);

  useEffect(() => {
    (async () => {
      const data = await getIdeasUser({
        campaignIds:
          selectedCampaignIds.length > 0
            ? JSON.stringify(selectedCampaignIds)
            : '',
        type: selectedTypes.length > 0 ? JSON.stringify(selectedTypes) : '',
        kanbanSteps:
          selectedKanbanStepsIds.length > 0
            ? JSON.stringify(selectedKanbanStepsIds)
            : '',
        hasUpdate:
          ideasThatHasUpdateIds.length > 0
            ? JSON.stringify(ideasThatHasUpdateIds)
            : '',
      });
      setIdeas(data);
      setIdeaChangesForUserState(await getAllIdeaChangesForUser());
    })();
  }, [
    getIdeasUser,
    selectedCampaignIds,
    selectedKanbanStepsIds,
    selectedTypes,
    selectedIdeaUpdateStatusIds,
    ideasThatHasUpdateIds,
    getAllIdeaChangesForUser,
  ]);

  useEffect(() => {
    if (ideas) {
      const result = [];

      ideas.forEach(item => {
        result.push(getStatus(item));
      });

      setStatusIdeas(result);
    }
  }, [ideas]);

  return (
    <Container>
      {statusIdeas.includes('WAITING') && unviewedTourIdeaWaiting && (
        <TourIdeaWaiting />
      )}
      {statusIdeas.includes('APPROVED') &&
        unviewedApprovedIdea &&
        !unviewedTourIdeaWaiting && <TourIdeaApproved />}
      {statusIdeas.includes('IN_REVIEW') &&
        unviewedTourIdeaReview &&
        !unviewedTourIdeaWaiting && <TourIdeaInReview />}
      {statusIdeas.includes('EXTERNAL_REVIEW') &&
        unviewedTourExternalReview &&
        !unviewedTourIdeaWaiting && <TourIdeaInExternalReview />}
      <C>
        <DefaultSection
          type="normal"
          header={{
            box_icon: <FiUser color={colors.font} size={20} />,
            title: 'Iniciativas enviadas',
          }}
          back={() => back()}
        >
          <>
            <Header
              selectedCampaignIds={selectedCampaignIds}
              selectedKanbanStepsIds={selectedKanbanStepsIds}
              selectedTypes={selectedTypes}
              selectedIdeaUpdateStatusIds={selectedIdeaUpdateStatusIds}
              handleSelectCampaign={handleSelectCampaign}
              handleSelectKanbanStep={handleSelectKanbanStep}
              handleSelectType={handleSelectType}
              activeFilter={activeFilter}
              handleOpenFilter={handleOpenFilter}
              handleSelectIdeasUpdateStatus={handleSelectIdeasUpdateStatus}
            />

            <ListIdeas>
              {ideas?.length > 0 &&
                ideas.map(item => (
                  <ItemIdea
                    key={item.id}
                    item={item}
                    size={size}
                    ideaHasChanges={hasChangeForUser(item.id)}
                  />
                ))}
            </ListIdeas>
          </>
        </DefaultSection>
        <Pagination
          onPageChange={handleChangePage}
          currentPage={page}
          lastPage={paginate?.pages}
        />
      </C>
    </Container>
  );
};
