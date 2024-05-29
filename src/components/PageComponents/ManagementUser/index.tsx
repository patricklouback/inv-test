/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ApresentationCompany } from '@components/Apresentation';
import { Container } from '@components/Container';
import { Pagination } from '@components/Pagination';
import { DefaultSection } from '@components/SectionDefault';
import { AdmContext } from 'contexts/Adm';
import { AreaContext } from 'contexts/AreaContext';
import { DepartamentContext } from 'contexts/DepartamentContext';
import { ListenSizeContext } from 'contexts/ListenSize';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FiEdit2, FiUser } from 'react-icons/fi';
import {
  IoIosCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from 'react-icons/io';
import { MdFilterListAlt } from 'react-icons/md';
import { useTheme } from 'styled-components';
import DownloadSvg from '../../../assets/inventta/downloadIcon.svg';
import { AddUser } from './AddUser';
import { InactiveUsers } from './InactiveUsers';
import { UpdateUsers } from './UpdateUsers';
import { UploadUsers } from './UploadUsers';
import {
  ButtonAction,
  ButtonsActions,
  C,
  Checkbox,
  CheckboxContainer,
  Cntt,
  Exit,
  Filter,
  Header,
  ImgUser,
  InputSearch,
  ItemHeader,
  ItemRow,
  ItemValue,
  TableContainer,
  TableInfo,
  TableUsers,
  ToggleFilters,
  TotalUsers,
  WapperInput,
  WapperTitleFilter,
  ButtonDownload,
  ButtonDownloadText,
} from './styles';

type FilterOptionOpen = 'DEPARTAMENT' | 'AREA' | undefined;

export const ManagementUserPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { back } = useRouter();

  const [page, setPage] = useState(1);
  const [areaIds, setAreaIds] = useState([]);
  const [departamentIds, setDepartamentIds] = useState([]);
  const [idUserSelected, setIdUserSelected] = useState<string>();
  const [typeModal, setTypeModal] = useState<string>();
  const [isOpenFilter, setIsOpenFilter] = useState<FilterOptionOpen>();
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);
  const [isModalInacticeUserOpen, setIsModalInactiveUserOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [userUpdate, setUserUpdate] = useState({});

  const { getUsers, users, paginate, downloadReport } = useContext(AdmContext);
  const { areas, getAreas } = useContext(AreaContext);
  const { departaments, getDepartaments } = useContext(DepartamentContext);
  const { size } = useContext(ListenSizeContext);

  const handleChangePage = useCallback(
    async newPage => {
      setPage(newPage);
      await getUsers({
        limit: paginate.limit,
        offset: paginate.pages,
        page: newPage,
      });
    },
    [paginate, getUsers]
  );

  const handleSelectArea = useCallback(
    (areaId: string) => {
      const existsArea = areaIds.findIndex(e => e === areaId);

      if (existsArea !== -1) {
        setAreaIds(state => {
          state.splice(existsArea, 1);
          return [...state];
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
          state.splice(existsDepartament, 1);
          return [...state];
        });
      } else {
        setDepartamentIds(state => [...state, departamentId]);
      }
    },
    [departamentIds]
  );

  const handleShowModal = useCallback((type?: string, id?: string) => {
    setIdUserSelected(id);
    setTypeModal(type);
    setIsModalInactiveUserOpen(true);
  }, []);

  const handleShowModalUpdate = useCallback(
    item => {
      setUserUpdate(item);
      setIsModalUpdateOpen(true);
    },
    [setUserUpdate]
  );

  useEffect(() => {
    getAreas();
    getDepartaments();
    getUsers();
  }, [getAreas, getDepartaments, getUsers]);

  useEffect(() => {
    getUsers({
      areaIds: areaIds.length > 0 ? JSON.stringify(areaIds) : undefined,
      departamentIds:
        departamentIds.length > 0 ? JSON.stringify(departamentIds) : undefined,
      search,
    });
  }, [areaIds, departamentIds, search, getUsers]);

  return (
    <>
      {isModalAddUserOpen && (
        <Exit onClick={() => setIsModalAddUserOpen(false)} />
      )}

      {isModalUpdateOpen && (
        <Exit onClick={() => setIsModalUpdateOpen(false)} />
      )}

      {isModalRegisterOpen && (
        <Exit onClick={() => setIsModalRegisterOpen(false)} />
      )}

      {isModalRegisterOpen && (
        <UploadUsers 
          setIsModalRegisterOpen={setIsModalRegisterOpen} 
          setModalAddUserOpen={setIsModalAddUserOpen}
        />
      )}

      {isModalUpdateOpen && (
        <UpdateUsers
          departaments={departaments}
          areas={areas}
          setIsModalUpdateOpen={setIsModalUpdateOpen}
          user={userUpdate}
        />
      )}

      {isModalAddUserOpen && (
        <AddUser
          departaments={departaments}
          areas={areas}
          setIsModalAddUserOpen={setIsModalAddUserOpen}
        />
      )}

      <Container>
        <C>
          <DefaultSection
            header={{
              title: 'Gestão Usuários',
              box_icon: <FiUser color={colors.font} size={20} />,
            }}
            type="normal"
            back={() => back()}
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
                      backgr={colors.font}
                      onClick={() => handleOpenFilter('AREA')}
                    >
                      <MdFilterListAlt />
                      <AiFillCaretDown size={12} />
                      <span>Áreas/Unidades</span>
                    </ButtonAction>
                    {isOpenFilter === 'AREA' && (
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Áreas de Negócio</strong>
                        </WapperTitleFilter>
                        {areas.length > 0
                          ? areas.map(area => (
                              <CheckboxContainer>
                                <Checkbox
                                  checked={areaIds.some(e => e === area.id)}
                                  onChange={() => handleSelectArea(area.id)}
                                />
                                {area.name}
                              </CheckboxContainer>
                            ))
                          : '-- Vazio --'}
                      </ToggleFilters>
                    )}
                  </Filter>
                  <Filter size={size}>
                    <ButtonAction
                      size={size}
                      backgr={colors.font}
                      onClick={() => handleOpenFilter('DEPARTAMENT')}
                    >
                      <MdFilterListAlt />
                      <AiFillCaretDown size={12} />
                      <span>Departamento</span>
                    </ButtonAction>
                    {isOpenFilter === 'DEPARTAMENT' && (
                      <ToggleFilters>
                        <WapperTitleFilter>
                          <strong>Departamentos</strong>
                        </WapperTitleFilter>
                        {departaments.length > 0
                          ? departaments.map(departament => (
                              <CheckboxContainer>
                                <Checkbox
                                  checked={departamentIds.some(
                                    e => e === departament.id
                                  )}
                                  onChange={() =>
                                    handleSelectDepartament(departament.id)
                                  }
                                />
                                {departament.name}
                              </CheckboxContainer>
                            ))
                          : '-- Vazio --'}
                      </ToggleFilters>
                    )}
                  </Filter>
                  <ButtonDownload
                    // onClick={downloadReport}
                    className="download-material"
                    disabled
                    title='Em desenvolvimento'
                  >
                    <DownloadSvg />
                    <ButtonDownloadText>
                    <span>Histórico de acessos</span>
                    </ButtonDownloadText>
                  </ButtonDownload>
                  <ButtonAction
                    size={size}
                    backgr={colors.primary}
                    onClick={() => setIsModalRegisterOpen(true)}
                  >
                    <span>Adicionar Usuários</span>
                  </ButtonAction>
                </ButtonsActions>
              </Header>

              <DefaultSection
                header={{
                  title: 'Usuários',
                  box_icon: <FiUser color={colors.font} size={20} />,
                }}
                type="full"
              >
                <TableContainer>
                  <Cntt>
                    <TableInfo>
                      <tr>
                        <ItemHeader>Nome</ItemHeader>
                        <ItemHeader>Email</ItemHeader>
                        <ItemHeader>Área/Unidade</ItemHeader>
                        <ItemHeader>Departamento</ItemHeader>
                        <ItemHeader>Ações</ItemHeader>
                      </tr>
                    </TableInfo>
                    <TableUsers>
                      {users?.map(item => (
                        <ItemRow key={item.id}>
                          <ItemValue>
                            <div>
                              {item.image && (
                                <ImgUser
                                  src={
                                    item.image ??
                                    'https://via.placeholder.com/40'
                                  }
                                />
                              )}
                              {!item.image && (
                                <BiUser
                                  style={{
                                    border: '1px solid #CFD1DC',
                                    borderRadius: '8px',
                                  }}
                                  size={36}
                                />
                              )}
                              {item.name}
                            </div>
                          </ItemValue>
                          <ItemValue>{item.email}</ItemValue>
                          <ItemValue>{item?.area?.name}</ItemValue>
                          <ItemValue>{item?.departament?.name}</ItemValue>
                          <ItemValue>
                            <FiEdit2
                              size={22}
                              onClick={() => handleShowModalUpdate(item)}
                            />

                            {item.status === 'INACTIVE' ? (
                              <IoIosCheckmarkCircleOutline
                                size={22}
                                color={colors.greenLive}
                                onClick={() =>
                                  handleShowModal('updateForInactive', item.id)
                                }
                              />
                            ) : (
                              <IoMdCloseCircleOutline
                                size={22}
                                color={colors.red}
                                onClick={() =>
                                  handleShowModal('updateForActive', item.id)
                                }
                              />
                            )}
                          </ItemValue>
                        </ItemRow>
                      ))}
                    </TableUsers>
                    {isModalInacticeUserOpen && (
                      <InactiveUsers
                        type={typeModal}
                        id={idUserSelected}
                        setIsModalInactiveUserOpen={setIsModalInactiveUserOpen}
                      />
                    )}
                  </Cntt>
                </TableContainer>
              </DefaultSection>
              <TotalUsers>Total de usuários: {paginate?.total}</TotalUsers>
            </>
          </DefaultSection>
        </C>
        <Pagination
          onPageChange={handleChangePage}
          currentPage={page}
          lastPage={paginate?.pages}
        />
      </Container>
    </>
  );
};
