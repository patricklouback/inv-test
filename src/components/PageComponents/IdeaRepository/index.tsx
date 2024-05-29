/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ApresentationCompany } from '@components/Apresentation';
import { Container as ContainerPage } from '@components/Container';
import { ModalSendIdea } from '@components/IdeaSent/ModalSendIdea';
import ButtonLink from '@components/Link';
import { IdeaDetail } from '@components/Modals/IdeaDetail';
import { PageTitle } from '@components/PageTitle';
import { Pagination } from '@components/Pagination';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { AreaContext } from 'contexts/AreaContext';
import { IdeaContext } from 'contexts/Idea';
import { ProcessActivityContext } from 'contexts/ProcessActivity';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { ImCheckmark } from 'react-icons/im';
import { MdFilterListAlt } from 'react-icons/md';
import { RiFileExcel2Line, RiLightbulbFlashLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { ExcelDataReportContext } from '../../../contexts/ExcelDataReport';
import { ItemRowComponent } from './ItemRowComponent';
import { status_idea, step_idea } from './data/filters';
import {
  BackButton,
  Balloon,
  ButtonAction,
  ButtonsActions,
  Cntt,
  Container,
  Content,
  DownloadAndSearchContainer,
  Filter,
  Header,
  HiddenCheckbox,
  InputSearch,
  ItemHeader,
  StyledCheckboxContainer,
  TableBottom,
  TableContainer,
  TableInfo,
  TableUsers,
  ToggleFilters,
  TotalIdeas,
  VisibleCheckbox,
  WapperInput,
  WapperTitleFilter,
} from './styles';

type FilterOptionOpen =
  | 'DEPARTAMENT'
  | 'AREA'
  | 'CAMPAIGN'
  | 'TYPES'
  | 'STEP'
  | 'STATUS'
  | undefined;

export type StatusOption =
  | 'PAUSED'
  | 'EXTERNAL_REVIEW'
  | 'IN_REVIEW'
  | 'IN_PROGRESS'
  | 'INACTIVE'
  | 'DRAFT';

export const IdeaRepositoryPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { back } = useRouter();

  const [page, setPage] = useState(1);
  const [selectAreaIds, setSelectAreaIds] = useState([]);
  const [selectCampaignIds, setSelectCampaignIds] = useState([]);
  const [selectStepIds, setSelectStepIds] = useState([]);
  const [selectStatus, setSelectStatus] = useState<StatusOption[]>([]);

  const [isOpenFilter, setIsOpenFilter] = useState<FilterOptionOpen>();

  const [search, setSearch] = useState('');

  const { areas, getAreas } = useContext(AreaContext);
  const {
    ideas,
    getFilterCampaign,
    getIdeas,
    getIdeasForIdeasRepository,
    paginate,
    idea,
    viewIdea,
    campaign_filter,
  } = useContext(IdeaContext);
  const { downloadXlsx } = useContext(ExcelDataReportContext);
  const { getKanbanSteps, kanbanSteps } = useContext(ApprovalFunnelContext);

  const [openDetailIdeaModal, setOpenDetailIdeaModal] = useState(false);
  const [isModalSendIdeaOpen, setIsModalSendIdeaOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { getAllProcessActivitiesName } = useContext(ProcessActivityContext);
  const [processActivitiesName, setProcessActivitiesName] = useState([]);

  useEffect(() => {
    (async (): Promise<void> => {
      setProcessActivitiesName(await getAllProcessActivitiesName());
      await getKanbanSteps();
    })();
  }, [getAllProcessActivitiesName, getKanbanSteps]);

  const handleClick = useCallback(() => {
    downloadXlsx();
  }, [downloadXlsx]);

  const handleSelectArea = useCallback(
    (areaId: string) => {
      const existsArea = selectAreaIds.findIndex(e => e === areaId);

      if (existsArea !== -1) {
        setSelectAreaIds(state => {
          return state.filter((aux, i) => existsArea !== i);
        });
      } else {
        setSelectAreaIds(state => [...state, areaId]);
      }
    },
    [selectAreaIds]
  );

  const handleOpenSendModalIdea = useCallback(
    async (ideaId: string) => {
      await viewIdea(ideaId);
      setIsModalSendIdeaOpen(true);
    },
    [viewIdea]
  );

  const handleSelectCampaign = useCallback(
    (CampaignId: string) => {
      const existsCampaign = selectCampaignIds.findIndex(e => e === CampaignId);
      if (existsCampaign !== -1) {
        setSelectCampaignIds(state => {
          return state.filter((aux, i) => existsCampaign !== i);
        });
      } else {
        setSelectCampaignIds(state => [...state, CampaignId]);
      }
    },
    [selectCampaignIds]
  );

  const handleOpenFilter = useCallback(
    (selectedFilter: FilterOptionOpen) => {
      if (selectedFilter === isOpenFilter) {
        setIsOpenFilter(undefined);
      } else {
        setIsOpenFilter(selectedFilter);
      }
    },
    [isOpenFilter]
  );

  const handleSelectStatus = useCallback(
    (status: StatusOption) => {
      const existsStatus = selectStatus.findIndex(e => e === status);

      if (existsStatus !== -1) {
        setSelectStatus(s => s.filter(aux => status !== aux));
      } else {
        setSelectStatus(state => [...state, status]);
      }
    },
    [selectStatus]
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

  const handleSelectStep = useCallback(
    (step: string) => {
      const existsStep = selectStepIds.findIndex(e => e === step);

      if (existsStep !== -1) {
        setSelectStepIds(state => {
          return state.filter((aux, i) => existsStep !== i);
        });
      } else {
        setSelectStepIds(state => [...state, step]);
      }
    },
    [selectStepIds]
  );

  const handleOpenIdea = useCallback(
    async (ideaId: string) => {
      await viewIdea(ideaId);
      setOpenDetailIdeaModal(true);
    },
    [viewIdea]
  );

  const handleCloseModal = useCallback(() => {
    setOpenDetailIdeaModal(false);
  }, []);

  const handleChangePage = useCallback(
    async newPage => {
      setPage(newPage);
      await getIdeasForIdeasRepository({
        limit: paginate.limit,
        offset: paginate.pages,
        page: newPage,
        campaignIds:
          selectCampaignIds.length > 0 ? JSON.stringify(selectCampaignIds) : '',
        areaIds: selectAreaIds.length > 0 ? JSON.stringify(selectAreaIds) : '',
        type: selectedTypes.length > 0 ? JSON.stringify(selectedTypes) : '',
        kanbanStep:
          selectStepIds.length > 0 ? JSON.stringify(selectStepIds) : '',
        kanbanStatus:
          selectStatus.length > 0 ? JSON.stringify(selectStatus) : [],
        search: search !== '' ? search : undefined,
      });
    },
    [
      paginate,
      getIdeasForIdeasRepository,
      selectAreaIds,
      search,
      selectCampaignIds,
      selectedTypes,
      selectStepIds,
      selectStatus,
    ]
  );

  useEffect(() => {
    getIdeasForIdeasRepository({
      campaignIds:
        selectCampaignIds.length > 0 ? JSON.stringify(selectCampaignIds) : '',
      areaIds: selectAreaIds.length > 0 ? JSON.stringify(selectAreaIds) : '',
      type: selectedTypes.length > 0 ? JSON.stringify(selectedTypes) : '',
      kanbanStep: selectStepIds.length > 0 ? JSON.stringify(selectStepIds) : '',
      kanbanStatus: selectStatus.length > 0 ? JSON.stringify(selectStatus) : [],
      search: search !== '' ? search : undefined,
    });
  }, [
    getIdeasForIdeasRepository,
    selectAreaIds,
    search,
    selectCampaignIds,
    selectedTypes,
    selectStepIds,
    selectStatus,
  ]);

  useEffect(() => {
    getAreas();
    getFilterCampaign();
  }, [getAreas, getFilterCampaign, getIdeas]);

  return (
    <ContainerPage>
      <Container>
        <Content>
          <BackButton onClick={() => back()}>
            <BiLeftArrowAlt size={20} />
            <span>Voltar</span>
          </BackButton>
          <PageTitle title="Banco de iniciativas" icon={RiLightbulbFlashLine} />
          <>
            {idea?.id && openDetailIdeaModal && (
              <IdeaDetail idea={idea} closeModal={handleCloseModal} />
            )}
            {isModalSendIdeaOpen && (
              <ModalSendIdea
                idea={idea}
                isOpen={isModalSendIdeaOpen}
                setIsOpen={setIsModalSendIdeaOpen}
              />
            )}
            <Header>
              <DownloadAndSearchContainer>
                <ButtonLink
                  Icon={<RiFileExcel2Line size={22} />}
                  type="button"
                  onClick={handleClick}
                  value="Download"
                  background={colors.primary}
                  color={colors.background}
                  max={300}
                  center={false}
                />
                <WapperInput>
                  <div id="icon">
                    <RiLightbulbFlashLine color={colors.font} size={20} />
                  </div>
                  <InputSearch
                    placeholder="Buscar..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </WapperInput>
              </DownloadAndSearchContainer>
              <ButtonsActions>
                <Filter>
                  <ButtonAction
                    backgr={colors.font}
                    onClick={() => handleOpenFilter('CAMPAIGN')}
                  >
                    <MdFilterListAlt />
                    <AiFillCaretDown size={12} />
                    <span>Direcional</span>
                  </ButtonAction>
                  {isOpenFilter === 'CAMPAIGN' && (
                    <Balloon>
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Direcional</strong>
                        </WapperTitleFilter>
                        {campaign_filter?.map(campaign => (
                          <StyledCheckboxContainer
                            key={campaign.id}
                            onClick={() => handleSelectCampaign(campaign.id)}
                          >
                            <HiddenCheckbox
                              checked={selectCampaignIds.some(
                                e => e === campaign.id
                              )}
                              onChange={() => handleSelectCampaign(campaign.id)}
                            />
                            <VisibleCheckbox
                              checked={selectCampaignIds.some(
                                e => e === campaign.id
                              )}
                            >
                              <ImCheckmark size={12} />
                            </VisibleCheckbox>
                            <span>{campaign.title}</span>
                          </StyledCheckboxContainer>
                        ))}
                      </ToggleFilters>
                    </Balloon>
                  )}
                </Filter>
                <Filter>
                  <ButtonAction
                    backgr={colors.font}
                    onClick={() => handleOpenFilter('AREA')}
                  >
                    <MdFilterListAlt />
                    <AiFillCaretDown size={12} />
                    <span>Áreas/Unidades</span>
                  </ButtonAction>
                  {isOpenFilter === 'AREA' && (
                    <Balloon>
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Áreas do Negócio</strong>
                        </WapperTitleFilter>
                        {areas.map(area => (
                          <StyledCheckboxContainer
                            key={area.id}
                            onClick={() => handleSelectArea(area.id)}
                          >
                            <HiddenCheckbox
                              checked={selectAreaIds.some(e => e === area.id)}
                              onChange={() => handleSelectArea(area.id)}
                            />
                            <VisibleCheckbox
                              checked={selectAreaIds.some(e => e === area.id)}
                            >
                              <ImCheckmark size={12} />
                            </VisibleCheckbox>
                            <span>{area.name}</span>
                          </StyledCheckboxContainer>
                        ))}
                      </ToggleFilters>
                    </Balloon>
                  )}
                </Filter>
                <Filter>
                  <ButtonAction
                    backgr={colors.font}
                    onClick={() => handleOpenFilter('TYPES')}
                  >
                    <MdFilterListAlt />
                    <AiFillCaretDown size={12} />
                    <span>Rota da Iniciativa</span>
                  </ButtonAction>
                  {isOpenFilter === 'TYPES' && (
                    <Balloon>
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Rota da Iniciativa</strong>
                        </WapperTitleFilter>
                        {processActivitiesName?.map(type => (
                          <StyledCheckboxContainer
                            key={type}
                            onClick={() => handleSelectType(type)}
                          >
                            <HiddenCheckbox
                              checked={selectedTypes.some(e => e === type)}
                              onChange={() => handleSelectType(type)}
                            />
                            <VisibleCheckbox
                              checked={selectedTypes.some(e => e === type)}
                            >
                              <ImCheckmark size={12} />
                            </VisibleCheckbox>
                            <span>{type}</span>
                          </StyledCheckboxContainer>
                        ))}
                      </ToggleFilters>
                    </Balloon>
                  )}
                </Filter>
                {kanbanSteps.length > 0 && (
                  <Filter>
                    <ButtonAction
                      backgr={colors.font}
                      onClick={() => handleOpenFilter('STEP')}
                    >
                      <MdFilterListAlt />
                      <AiFillCaretDown size={12} />
                      <span>Etapa</span>
                    </ButtonAction>
                    {isOpenFilter === 'STEP' && (
                      <Balloon>
                        <ToggleFilters>
                          <WapperTitleFilter>
                            <strong>Etapa do funil</strong>
                          </WapperTitleFilter>
                          {step_idea.map((step, index) => (
                            <StyledCheckboxContainer
                              key={step.id}
                              onClick={() => handleSelectStep(step.name)}
                            >
                              <HiddenCheckbox
                                checked={selectStepIds.some(
                                  e => e === step.name
                                )}
                                onChange={() => handleSelectStep(step.name)}
                              />
                              <VisibleCheckbox
                                checked={selectStepIds.some(
                                  e => e === step.name
                                )}
                              >
                                <ImCheckmark size={12} />
                              </VisibleCheckbox>
                              <span>{kanbanSteps[index].title}</span>
                            </StyledCheckboxContainer>
                          ))}
                        </ToggleFilters>
                      </Balloon>
                    )}
                  </Filter>
                )}
                <Filter>
                  <ButtonAction
                    backgr={colors.font}
                    onClick={() => handleOpenFilter('STATUS')}
                  >
                    <MdFilterListAlt />
                    <AiFillCaretDown size={12} />
                    <span>Status</span>
                  </ButtonAction>
                  {isOpenFilter === 'STATUS' && (
                    <Balloon>
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Status</strong>
                        </WapperTitleFilter>
                        {status_idea.map(status => (
                          <StyledCheckboxContainer
                            key={status.value}
                            onClick={() => handleSelectStatus(status.value)}
                          >
                            <HiddenCheckbox
                              checked={selectStatus.some(
                                e => e === status.value
                              )}
                              onChange={() => handleSelectStatus(status.value)}
                            />
                            <VisibleCheckbox
                              checked={selectStatus.some(
                                e => e === status.value
                              )}
                            >
                              <ImCheckmark size={12} />
                            </VisibleCheckbox>
                            <span>{status.name}</span>
                          </StyledCheckboxContainer>
                        ))}
                      </ToggleFilters>
                    </Balloon>
                  )}
                </Filter>
              </ButtonsActions>
            </Header>

            <TableContainer>
              <Cntt>
                <TableInfo>
                  <tr>
                    <ItemHeader className="ideaAppId">ID</ItemHeader>
                    <ItemHeader className="type" />
                    <ItemHeader className="title">
                      Titulo da Iniciativa
                    </ItemHeader>
                    <ItemHeader>Direcional</ItemHeader>
                    <ItemHeader className="creationDate">Envio</ItemHeader>
                    <ItemHeader>Etapa do Funil</ItemHeader>
                    <ItemHeader>Status</ItemHeader>
                    <ItemHeader className="actions">Ações</ItemHeader>
                  </tr>
                </TableInfo>
                <TableUsers>
                  {ideas?.map(item => (
                    <ItemRowComponent
                      item={item}
                      handleOpenIdea={handleOpenIdea}
                      handleOpenSendModalIdea={handleOpenSendModalIdea}
                    />
                  ))}
                </TableUsers>
              </Cntt>
            </TableContainer>
            <TableBottom>
              <TotalIdeas>
                Total de iniciativas principais: {paginate?.total}
              </TotalIdeas>
              <Pagination
                onPageChange={handleChangePage}
                currentPage={page}
                lastPage={paginate?.pages}
              />
            </TableBottom>
          </>
        </Content>
      </Container>
    </ContainerPage>
  );
};
