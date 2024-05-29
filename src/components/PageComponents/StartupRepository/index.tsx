/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ApresentationCompany } from '@components/Apresentation';
import { Container as ContainerPage } from '@components/Container';
import { StartupDetail } from '@components/Modals/StartupDetail';
import { PageTitle } from '@components/PageTitle';
import { Pagination } from '@components/Pagination';
import { StartupsContext } from 'contexts/Startups';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { ImCheckmark } from 'react-icons/im';
import { IoIosRocket } from 'react-icons/io';
import { MdFilterListAlt } from 'react-icons/md';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import {
  StartupInvestmentRounds,
  StartupLastInvestment,
  StartupMarket,
} from 'interfaces/startups';
import { ItemRowComponent } from './ItemRowComponent';
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
  | 'LAST_INVESTMENTS'
  | 'MARKET'
  | 'INVESTMENT_ROUNDS'
  | 'ACTION'
  | undefined;

export type ActionOption = 'SAVED' | 'UNSAVED';

interface IActionOption {
  id: string;
  name: string;
  value: ActionOption;
}

export const StartupRepositoryPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { back } = useRouter();

  const [page, setPage] = useState(1);
  const [selectLastInvestments, setSelectLastInvestments] = useState([]);
  const [selectMarket, setSelectMarket] = useState([]);
  const [selectInvestmentRounds, setSelectInvestmentRounds] = useState([]);
  const [selectAction, setSelectAction] = useState<ActionOption[]>([]);

  const [isOpenFilter, setIsOpenFilter] = useState<FilterOptionOpen>();

  const [search, setSearch] = useState('');

  const {
    startup,
    startupsList,
    paginate,
    getStartups,
    viewStartup,
    favoriteStartupToUser,
    unfavoriteStartupToUser,
  } = useContext(StartupsContext);

  const [openDetailStartupModal, setOpenDetailStartupModal] = useState(false);

  const actions: IActionOption[] = [
    {
      id: '0',
      name: 'Favoritas',
      value: 'SAVED',
    },
    {
      id: '1',
      name: 'Não Favoritas',
      value: 'UNSAVED',
    },
  ];

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

  const handleselectLastInvestments = useCallback(
    (moment: string) => {
      const existsMoment = selectLastInvestments.findIndex(e => e === moment);

      if (existsMoment !== -1) {
        setSelectLastInvestments(state => {
          return state.filter((aux, i) => existsMoment !== i);
        });
      } else {
        setSelectLastInvestments(state => [...state, moment]);
      }
    },
    [selectLastInvestments]
  );

  const handleSelectMarket = useCallback(
    (marketId: string) => {
      const existsMarket = selectMarket.findIndex(e => e === marketId);
      if (existsMarket !== -1) {
        setSelectMarket(state => {
          return state.filter((aux, i) => existsMarket !== i);
        });
      } else {
        setSelectMarket(state => [...state, marketId]);
      }
    },
    [selectMarket]
  );

  const handleselectInvestmentRounds = useCallback(
    (investmentRounds: string) => {
      const existsInvestmentRounds = selectInvestmentRounds.findIndex(
        e => e === investmentRounds
      );

      if (existsInvestmentRounds !== -1) {
        setSelectInvestmentRounds(state => {
          return state.filter((aux, i) => existsInvestmentRounds !== i);
        });
      } else {
        setSelectInvestmentRounds(state => [...state, investmentRounds]);
      }
    },
    [selectInvestmentRounds]
  );

  const handleSaveStartup = useCallback(
    async (startupId: string) => {
      await favoriteStartupToUser(startupId);
    },
    [favoriteStartupToUser]
  );

  const handleUnsaveStartup = useCallback(
    async (startupId: string) => {
      await unfavoriteStartupToUser(startupId);
    },
    [unfavoriteStartupToUser]
  );

  const handleSelectAction = useCallback(
    (action: ActionOption) => {
      const existsAction = selectAction.findIndex(e => e === action);

      if (existsAction !== -1) {
        setSelectAction(state => {
          return state.filter((aux, i) => existsAction !== i);
        });
      } else {
        setSelectAction(state => [...state, action]);
      }
    },
    [selectAction]
  );

  const handleOpenStartup = useCallback(
    async (startupId: string) => {
      await viewStartup(startupId);
      setOpenDetailStartupModal(true);
    },
    [viewStartup]
  );

  const handleCloseModal = useCallback(() => {
    setOpenDetailStartupModal(false);
  }, []);

  const handleChangePage = useCallback(
    async newPage => {
      setPage(newPage);
      await getStartups({
        limit: paginate.limit,
        offset: paginate.pages,
        page: newPage,
        investmentRounds:
          selectInvestmentRounds.length > 0
            ? JSON.stringify(selectInvestmentRounds)
            : '',
        marketFields:
          selectMarket.length > 0 ? JSON.stringify(selectMarket) : '',
        lastInvestment:
          selectLastInvestments.length > 0
            ? JSON.stringify(selectLastInvestments)
            : '',
        saved: selectAction.length > 0 ? JSON.stringify(selectAction) : [],
        search: search !== '' ? search : undefined,
      });
    },
    [
      paginate,
      selectInvestmentRounds,
      search,
      selectMarket,
      selectLastInvestments,
      selectAction,
      getStartups,
    ]
  );

  useEffect(() => {
    getStartups({
      investmentRounds:
        selectInvestmentRounds.length > 0
          ? JSON.stringify(selectInvestmentRounds)
          : '',
      marketFields: selectMarket.length > 0 ? JSON.stringify(selectMarket) : '',
      lastInvestment:
        selectLastInvestments.length > 0
          ? JSON.stringify(selectLastInvestments)
          : '',
      saved: selectAction.length > 0 ? JSON.stringify(selectAction) : [],
      search: search !== '' ? search : undefined,
    });
  }, [
    getStartups,
    selectInvestmentRounds,
    search,
    selectMarket,
    selectLastInvestments,
    selectAction,
  ]);

  return (
    <ContainerPage>
      <Container>
        <Content>
          <BackButton onClick={() => back()}>
            <BiLeftArrowAlt size={20} />
            <span>Voltar</span>
          </BackButton>
          <PageTitle title="Banco de Startups (Beta)" icon={IoIosRocket} />
          <>
            {startup?.id && openDetailStartupModal && (
              <StartupDetail startup={startup} closeModal={handleCloseModal} />
            )}
            <Header>
              <DownloadAndSearchContainer>
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
                    onClick={() => handleOpenFilter('LAST_INVESTMENTS')}
                  >
                    <MdFilterListAlt />
                    <AiFillCaretDown size={12} />
                    <span>Último Investimento</span>
                  </ButtonAction>
                  {isOpenFilter === 'LAST_INVESTMENTS' && (
                    <Balloon>
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Último Investimento</strong>
                        </WapperTitleFilter>
                        {StartupLastInvestment?.map(lastInvestment => (
                          <StyledCheckboxContainer
                            key={lastInvestment}
                            onClick={() =>
                              handleselectLastInvestments(lastInvestment)
                            }
                          >
                            <HiddenCheckbox
                              checked={selectLastInvestments.some(
                                e => e === lastInvestment
                              )}
                              onChange={() =>
                                handleselectLastInvestments(lastInvestment)
                              }
                            />
                            <VisibleCheckbox
                              checked={selectLastInvestments.some(
                                e => e === lastInvestment
                              )}
                            >
                              <ImCheckmark size={12} />
                            </VisibleCheckbox>
                            <span>{lastInvestment}</span>
                          </StyledCheckboxContainer>
                        ))}
                      </ToggleFilters>
                    </Balloon>
                  )}
                </Filter>
                <Filter>
                  <ButtonAction
                    backgr={colors.font}
                    onClick={() => handleOpenFilter('MARKET')}
                  >
                    <MdFilterListAlt />
                    <AiFillCaretDown size={12} />
                    <span>Segmento</span>
                  </ButtonAction>
                  {isOpenFilter === 'MARKET' && (
                    <Balloon>
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Segmento</strong>
                        </WapperTitleFilter>
                        {StartupMarket.map(market => (
                          <StyledCheckboxContainer
                            key={market}
                            onClick={() => handleSelectMarket(market)}
                          >
                            <HiddenCheckbox
                              checked={selectMarket.some(e => e === market)}
                              onChange={() => handleSelectMarket(market)}
                            />
                            <VisibleCheckbox
                              checked={selectMarket.some(e => e === market)}
                            >
                              <ImCheckmark size={12} />
                            </VisibleCheckbox>
                            <span>{market}</span>
                          </StyledCheckboxContainer>
                        ))}
                      </ToggleFilters>
                    </Balloon>
                  )}
                </Filter>
                <Filter>
                  <ButtonAction
                    backgr={colors.font}
                    onClick={() => handleOpenFilter('INVESTMENT_ROUNDS')}
                  >
                    <MdFilterListAlt />
                    <AiFillCaretDown size={12} />
                    <span>Rodadas de investimento</span>
                  </ButtonAction>
                  {isOpenFilter === 'INVESTMENT_ROUNDS' && (
                    <Balloon>
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Rodadas de investimento</strong>
                        </WapperTitleFilter>
                        {StartupInvestmentRounds.map(ir => (
                          <StyledCheckboxContainer
                            key={ir}
                            onClick={() => handleselectInvestmentRounds(ir)}
                          >
                            <HiddenCheckbox
                              checked={selectInvestmentRounds.some(
                                e => e === ir
                              )}
                              onChange={() => handleselectInvestmentRounds(ir)}
                            />
                            <VisibleCheckbox
                              checked={selectInvestmentRounds.some(
                                e => e === ir
                              )}
                            >
                              <ImCheckmark size={12} />
                            </VisibleCheckbox>
                            <span>{ir}</span>
                          </StyledCheckboxContainer>
                        ))}
                      </ToggleFilters>
                    </Balloon>
                  )}
                </Filter>
                <Filter>
                  <ButtonAction
                    backgr={colors.font}
                    onClick={() => handleOpenFilter('ACTION')}
                  >
                    <MdFilterListAlt />
                    <AiFillCaretDown size={12} />
                    <span>Ação</span>
                  </ButtonAction>
                  {isOpenFilter === 'ACTION' && (
                    <Balloon>
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Ação</strong>
                        </WapperTitleFilter>
                        {actions.map(action => (
                          <StyledCheckboxContainer
                            key={action.id}
                            onClick={() => handleSelectAction(action.value)}
                          >
                            <HiddenCheckbox
                              checked={selectAction.some(
                                e => e === action.value
                              )}
                              onChange={() => handleSelectAction(action.value)}
                            />
                            <VisibleCheckbox
                              checked={selectAction.some(
                                e => e === action.value
                              )}
                            >
                              <ImCheckmark size={12} />
                            </VisibleCheckbox>
                            <span>{action.name}</span>
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
                    <ItemHeader className="startupName">
                      Nome da Startup
                    </ItemHeader>
                    <ItemHeader className="moment">
                      Último Investimento
                    </ItemHeader>
                    <ItemHeader className="foundationYear">Fundação</ItemHeader>
                    <ItemHeader className="market">Segmento</ItemHeader>
                    <ItemHeader className="targetAudience">
                      Rodadas de Investimento
                    </ItemHeader>
                    <ItemHeader className="location">Localização</ItemHeader>
                    <ItemHeader className="actions">Ações</ItemHeader>
                  </tr>
                </TableInfo>
                <TableUsers>
                  {startupsList?.map(item => (
                    <ItemRowComponent
                      item={item}
                      handleOpenStartup={handleOpenStartup}
                      handleSaveStartup={handleSaveStartup}
                      handleUnsaveStartup={handleUnsaveStartup}
                    />
                  ))}
                </TableUsers>
              </Cntt>
            </TableContainer>
            <TableBottom>
              <TotalIdeas>
                Total de Startups: {paginate?.total.toLocaleString('pt-BR')}
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
