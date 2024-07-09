import { Container as ContainerPage } from '@components/Container';
import { StartupDetail } from '@components/Modals/StartupDetail';
import { PageTitle } from '@components/PageTitle';
import { Pagination } from '@components/Pagination';
import { StartupsContext } from 'contexts/Startups';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { IoIosRocket } from 'react-icons/io';
import { CreateStartupModal } from '@components/Modals/CreateStartup';
import { UploadModal } from '@components/Modals/CreateStartup/Upload';
import { useDebounce } from 'hooks/useDebounce';
import { ItemRowComponent } from './ItemRowComponent';
import {
  BackButton,
  Cntt,
  Container,
  Content,
  ItemHeader,
  TableBottom,
  TableContainer,
  TableInfo,
  TableUsers,
  TotalIdeas,
} from './styles';
import { HeaderStartups } from './header';

export type ActionOption = 'SAVED' | 'UNSAVED';

export const StartupRepositoryPage = () => {
  const { back } = useRouter();
  const [page, setPage] = useState(1);
  const [selectLastInvestments, setSelectLastInvestments] = useState([]);
  const [selectMarket, setSelectMarket] = useState([]);
  const [selectInvestmentRounds, setSelectInvestmentRounds] = useState([]);
  const [selectAction, setSelectAction] = useState<ActionOption[]>([]);
  const [search, setSearch] = useState('');
  const [modalStartup, setModalStartup] = useState<
    'none' | 'create' | 'upload'
  >('none');
  const {
    startup,
    setStartup,
    startupsList,
    paginate,
    getStartups,
    viewStartup,
    favoriteStartupToUser,
    cleanStartupStep,
    unfavoriteStartupToUser,
  } = useContext(StartupsContext);

  const [openDetailStartupModal, setOpenDetailStartupModal] = useState(false);

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
              <StartupDetail
                startup={startup}
                closeModal={handleCloseModal}
              />
            )}
            <HeaderStartups setOpenModalStartup={setModalStartup} />
            {modalStartup === 'create' && (
              <CreateStartupModal
                onClose={() => {
                  setModalStartup('none');
                  cleanStartupStep();
                }}
              />
            )}
            {modalStartup === 'upload' && (
              <UploadModal
                onClose={() => {
                  setModalStartup('none');
                  cleanStartupStep();
                }}
              />
            )}
            <TableContainer>
              <Cntt>
                <TableInfo>
                  <tr>
                    <ItemHeader className="startupName">
                      Nome da Startup
                    </ItemHeader>
                    <ItemHeader className="serie">Série</ItemHeader>
                    <ItemHeader className="fundacao">Fundação</ItemHeader>
                    <ItemHeader className="segmento">Segmento</ItemHeader>
                    <ItemHeader className="status">
                      Status da comunicação
                    </ItemHeader>
                    <ItemHeader className="localizacao">Localização</ItemHeader>
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