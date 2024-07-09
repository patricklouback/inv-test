/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useContext, useEffect, useState } from 'react';
import { Container } from '@components/Container';
import { DefaultSection } from '@components/SectionDefault';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { MdFilterListAlt } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { Pagination } from '@components/Pagination';
import { AreaContext } from 'contexts/AreaContext';
import { DepartamentContext } from 'contexts/DepartamentContext';
import { ListenSizeContext } from 'contexts/ListenSize';
import { RankUsersContext } from 'contexts/RankUser';
import { ImCheckmark } from 'react-icons/im';
import {
  C,
  Header,
  InputSearch,
  ButtonAction,
  ButtonsActions,
  WapperInput,
  TableInfo,
  ItemHeader,
  ItemValue,
  Cntt,
  ImgUser,
  TableUsers,
  ItemRow,
  TableContainer,
  Filter,
  Balloon,
  WapperTitleFilter,
  StyledCheckboxContainer,
  HiddenCheckbox,
  VisibleCheckbox,
  ToggleFilters2,
} from './styles';

type FilterOptionOpen = 'DEPARTAMENT' | 'AREA' | undefined;

export const UserRankPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();

  // const [isModalInacticeUserOpen, setIsModalInactiveUserOpen] = useState(false);
  // const [userUpdate, setUserUpdate] = useState({});
  // const { getUsers, users, paginate } = useContext(AdmContext);

  const { getUsersRanked, usersRanked, paginate } =
    useContext(RankUsersContext);

  const [page, setPage] = useState(1);
  const [areaIds, setAreaIds] = useState([]);
  const [departamentIds, setDepartamentIds] = useState([]);
  // const [idUserSelected, setIdUserSelected] = useState<string>();
  // const [typeModal, setTypeModal] = useState<string>();

  const [isOpenFilter, setIsOpenFilter] = useState<FilterOptionOpen>();

  const [search, setSearch] = useState('');

  const { areas, getAreas } = useContext(AreaContext);
  const { departaments, getDepartaments } = useContext(DepartamentContext);
  const { size } = useContext(ListenSizeContext);

  const handleChangePage = useCallback(
    async newPage => {
      setPage(newPage);
      await getUsersRanked({
        limit: 50,
        offset: paginate.pages,
        page: newPage,
        areaIds: areaIds.length > 0 ? JSON.stringify(areaIds) : undefined,
        departamentIds:
          departamentIds.length > 0
            ? JSON.stringify(departamentIds)
            : undefined,
        search,
      });
    },
    [areaIds, departamentIds, getUsersRanked, paginate, search]
  );

  const handleSelectArea = useCallback(
    (areaId: string) => {
      const existsArea = areaIds.findIndex(e => e === areaId);

      if (existsArea !== -1) {
        setAreaIds(state => {
          return state.filter((element, index) => index !== existsArea);
        });
      } else {
        setAreaIds(state => [...state, areaId]);
      }
    },
    [areaIds]
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

  const handleSelectDepartament = useCallback(
    (departamentId: string) => {
      const existsDepartament = departamentIds.findIndex(
        e => e === departamentId
      );

      if (existsDepartament !== -1) {
        setDepartamentIds(state => {
          return state.filter((element, index) => index !== existsDepartament);
        });
      } else {
        setDepartamentIds(state => [...state, departamentId]);
      }
    },
    [departamentIds]
  );

  // const handleShowModal = useCallback((type?: string, id?: string) => {
  //   setIdUserSelected(id);
  //   setTypeModal(type);
  //   setIsModalInactiveUserOpen(true);
  // }, []);

  useEffect(() => {
    getAreas();
    getDepartaments();
  }, [getAreas, getDepartaments]);

  useEffect(() => {
    getAreas();
    getDepartaments();
  }, [getAreas, getDepartaments]);

  useEffect(() => {
    getUsersRanked({
      limit: 50,
      areaIds: areaIds.length > 0 ? JSON.stringify(areaIds) : undefined,
      departamentIds:
        departamentIds.length > 0 ? JSON.stringify(departamentIds) : undefined,
      search,
    });
    setPage(1);
  }, [areaIds, departamentIds, getUsersRanked, search]);

  return (
    <>
      <Container>
        <C>
          <DefaultSection
            header={{
              title: 'Ranking de Usuários',
              box_icon: <FiUser color={colors.font} size={20} />,
            }}
            type="normal"
          >
            <>
              <Header size={size}>
                <WapperInput>
                  <div id="icon">
                    <FiUser color={colors.grey} size={22} />
                  </div>
                  <InputSearch
                    placeholder="Buscar..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </WapperInput>
                <ButtonsActions size={size}>
                  <Filter size={size}>
                    <ButtonAction
                      size={size}
                      $backgr={colors.font}
                      onClick={() => handleOpenFilter('AREA')}
                    >
                      <MdFilterListAlt />
                      <AiFillCaretDown size={12} />
                      <span>Areas/Unidades</span>
                    </ButtonAction>
                    {isOpenFilter === 'AREA' && (
                      <Balloon>
                        <ToggleFilters2>
                          <WapperTitleFilter>
                            <strong>Áreas de Negócio</strong>
                          </WapperTitleFilter>
                          {areas?.map(area => (
                            <StyledCheckboxContainer
                              key={area.id}
                              onClick={() => handleSelectArea(area.id)}
                            >
                              <HiddenCheckbox
                                checked={areaIds.some(e => e === area.id)}
                                onChange={() => handleSelectArea(area.id)}
                              />
                              <VisibleCheckbox
                                checked={areaIds.some(e => e === area.id)}
                              >
                                <ImCheckmark size={12} />
                              </VisibleCheckbox>
                              <span>{area.name}</span>
                            </StyledCheckboxContainer>
                          ))}
                        </ToggleFilters2>
                      </Balloon>
                    )}
                  </Filter>
                  <Filter size={size}>
                    <ButtonAction
                      size={size}
                      $backgr={colors.font}
                      onClick={() => handleOpenFilter('DEPARTAMENT')}
                    >
                      <MdFilterListAlt />
                      <AiFillCaretDown size={12} />
                      <span>Departamento</span>
                    </ButtonAction>
                    {isOpenFilter === 'DEPARTAMENT' && (
                      <Balloon>
                        <ToggleFilters2>
                          <WapperTitleFilter>
                            <strong>Departamentos</strong>
                          </WapperTitleFilter>
                          {departaments?.map(departament => (
                            <StyledCheckboxContainer
                              key={departament.id}
                              onClick={() =>
                                handleSelectDepartament(departament.id)
                              }
                            >
                              <HiddenCheckbox
                                checked={departamentIds.some(
                                  e => e === departament.id
                                )}
                                onChange={() =>
                                  handleSelectDepartament(departament.id)
                                }
                              />
                              <VisibleCheckbox
                                checked={departamentIds.some(
                                  e => e === departament.id
                                )}
                              >
                                <ImCheckmark size={12} />
                              </VisibleCheckbox>
                              <span>{departament.name}</span>
                            </StyledCheckboxContainer>
                          ))}
                        </ToggleFilters2>
                      </Balloon>
                    )}
                  </Filter>
                </ButtonsActions>
              </Header>

              <TableContainer size={size}>
                <Cntt>
                  <TableInfo>
                    <tr>
                      <ItemHeader>Posição</ItemHeader>
                      <ItemHeader />
                      <ItemHeader>Nome</ItemHeader>
                      <ItemHeader>Pontuação</ItemHeader>
                      <ItemHeader style={{ width: 280 }}>E-mail</ItemHeader>
                      <ItemHeader>Area/Unidade</ItemHeader>
                      <ItemHeader style={{ width: 110, textAlign: 'center' }}>
                        Departamento
                      </ItemHeader>
                    </tr>
                  </TableInfo>
                  <TableUsers>
                    {usersRanked?.map(item => (
                      <ItemRow key={item.id}>
                        <ItemValue>{`${item.rank}º`}</ItemValue>
                        <ItemValue>
                          <ImgUser
                            src={item.image ?? 'https://via.placeholder.com/40'}
                          />
                        </ItemValue>
                        <ItemValue>{item.name}</ItemValue>
                        <ItemValue>{item.points}</ItemValue>
                        <ItemValue>{item.email}</ItemValue>
                        <ItemValue>{item?.area}</ItemValue>
                        <ItemValue style={{ textAlign: 'center' }}>
                          {item?.departament}
                        </ItemValue>
                      </ItemRow>
                    ))}
                  </TableUsers>
                  {/* isModalInacticeUserOpen && (
                      <InactiveUsers
                        type={typeModal}
                        id={idUserSelected}
                        setIsModalInactiveUserOpen={setIsModalInactiveUserOpen}
                      />
                    ) */}
                </Cntt>
              </TableContainer>
            </>
          </DefaultSection>
          <Pagination
            onPageChange={handleChangePage}
            currentPage={page}
            lastPage={paginate?.pages}
          />
        </C>
      </Container>
    </>
  );
};
