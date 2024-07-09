import { useContext, useEffect, useState } from 'react';
import { UserContext, UserEvaluationCriteriasData } from 'contexts/User';

import { EvaluationStepStatus } from '@components/PageComponents/ApprovalFunnel/InteractionPanelTabs/Components/EvaluationStepStatus';
import { FilteredEvaluationCriteria } from '@components/PageComponents/ManagementPlatform/EvaluationCriteriaConfig/EvaluationCriteria/FilteredEvaluationCriteria';
import { useRouter } from 'next/router';
import ArrowInclinedSVG from '../../../../assets/inventta/ArrowInclined.svg';
import SearchSVG from '../../../../assets/inventta/SearchIcon.svg';
import {
  AccessLink,
  Container,
  Drop,
  FilterButton,
  FilterButtonsWrapper,
  FilterOrderOption,
  FilterSearch,
  FiltersWrapper,
  InputFilterSearch,
  PageTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  TableWrapper,
} from './styles';

const mapStepName = {
  SCREENING: { name: 'Triagem', order: 1 },
  ANALYZE: { name: 'Em análise', order: 2 },
  IMPLEMENTED: { name: 'Em implementação', order: 4 },
};

export const UserEvaluationCriterias: React.FC = (): JSX.Element => {
  const { getUsersEvaluationCriterias } = useContext(UserContext);
  const [evaluationCriterias, setEvaluationCriterias] = useState<
    UserEvaluationCriteriasData[]
  >([]);
  const [filterContent, setFilterContent] = useState(null);
  const [allEvaluationCriterias, setAllEvaluationCriterias] = useState<
    UserEvaluationCriteriasData[]
  >([]);
  const [showFilterOrder, setShowFilterOrder] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    async function loadEvaluationCriterias(): Promise<void> {
      const fetchedCriterias = await getUsersEvaluationCriterias();
      const uniqueCriterias = fetchedCriterias.reduce((acc, current) => {
        const key = `${current.sequence}-${current.criteriaStep}`;
        if (
          !acc.some(item => `${item.sequence}-${item.criteriaStep}` === key)
        ) {
          acc.push(current);
        }
        return acc;
      }, []);
      const response = uniqueCriterias.sort((a, b) => {
        return a.sequence - b.sequence;
      });
      setEvaluationCriterias(response);
      setAllEvaluationCriterias(response);
    }
    loadEvaluationCriterias();
  }, [getUsersEvaluationCriterias]);

  const daysPassedSince = (item: UserEvaluationCriteriasData): string => {
    if (item.status === 'directApproved' || item.status === 'rated') return '-';
    const date = item.createdAt;
    const now = new Date();
    const dateMilliseconds = new Date(date).getTime();
    const nowMilliseconds = now.getTime();
    const differenceMilliseconds = nowMilliseconds - dateMilliseconds;
    const daysPassed = Math.floor(
      differenceMilliseconds / (1000 * 60 * 60 * 24)
    );

    const dayOrDays = daysPassed === 1 ? 'dia' : 'dias';

    return `${daysPassed} ${dayOrDays}`;
  };

  const handleChangeFilterContent = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFilterContent(event.target.value);
  };

  useEffect(() => {
    if (filterContent) {
      const filteredEvaluationCriterias = allEvaluationCriterias.filter(
        item =>
          item.title.toLowerCase().includes(filterContent.toLowerCase()) ||
          item.id.toString().includes(filterContent.toLowerCase())
      );
      setEvaluationCriterias(filteredEvaluationCriterias);
    }
  }, [filterContent]);

  const handleFilterOrder = (filterOrder: boolean): void => {
    if (filterOrder) {
      const orderedEvaluationCriterias = evaluationCriterias.sort((a, b) => {
        return b.id - a.id;
      });
      setEvaluationCriterias(orderedEvaluationCriterias);
    } else {
      const orderedEvaluationCriterias = evaluationCriterias.sort((a, b) => {
        return a.id - b.id;
      });
      setEvaluationCriterias(orderedEvaluationCriterias);
    }
  };

  return (
    <Container>
      <PageTitle>Minhas Avaliações</PageTitle>
      <FiltersWrapper>
        <FilterSearch>
          <SearchSVG />
          <InputFilterSearch
            placeholder="Pesquisar por nome"
            value={filterContent}
            onChange={handleChangeFilterContent}
          />
        </FilterSearch>
        <FilterButtonsWrapper>
          <FilterButton onClick={() => setShowFilterOrder(!showFilterOrder)}>
            Ordenar
            <Drop open={showFilterOrder}>
              <FilterOrderOption onClick={() => handleFilterOrder(true)}>
                Mais recentes
              </FilterOrderOption>
              <FilterOrderOption onClick={() => handleFilterOrder(false)}>
                Mais antigas
              </FilterOrderOption>
            </Drop>
          </FilterButton>
          <FilteredEvaluationCriteria
            border="1px solid #b5b5b5"
            setFiltered={setEvaluationCriterias}
            evaluationCriterias={allEvaluationCriterias}
            marginTop={0}
          />
          <FilteredEvaluationCriteria
            title="Status"
            status
            border="1px solid #b5b5b5"
            setFiltered={setEvaluationCriterias}
            evaluationCriterias={allEvaluationCriterias}
            marginTop={0}
          />
        </FilterButtonsWrapper>
      </FiltersWrapper>
      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              <TableHeader isFirst>ID da iniciativa</TableHeader>
              <TableHeader>Título da iniciativa</TableHeader>
              <TableHeader>Tempo pendente</TableHeader>
              <TableHeader>Etapa</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader isLast>Ações</TableHeader>
              {/* Adicione mais colunas aqui, se necessário */}
            </TableRow>
          </thead>
        </Table>
        <TableContainer>
          <Table>
            <TableBody>
              {evaluationCriterias.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.sequence.toString().padStart(4, '0')}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{daysPassedSince(item)}</TableCell>
                  <TableCell>{mapStepName[item.criteriaStep].name}</TableCell>
                  <TableCell>
                    <EvaluationStepStatus
                      isDirectApproval={item.status === 'directApproved'}
                      isPending={item.status === 'pending'}
                      message={
                        // eslint-disable-next-line no-nested-ternary
                        item.status === 'directApproved'
                          ? 'Aprovação direta'
                          : item.status === 'pending'
                          ? 'Pendente'
                          : 'Concluída'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <AccessLink
                      onClick={() => {
                        push({
                          pathname: '/approval-funnel',
                          search: `?ideaId=${item.ideaId}&kanbanStep=${item.criteriaStep}`,
                        });
                      }}
                    >
                      <ArrowInclinedSVG />
                      <div>Acessar</div>
                    </AccessLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </Container>
  );
};
