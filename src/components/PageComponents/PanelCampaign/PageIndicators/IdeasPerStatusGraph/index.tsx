/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { step_idea } from '@components/PageComponents/IdeaRepository/data/filters';
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IdeaContext } from 'contexts/Idea';
import { GlobalIndicatorsProps } from 'interfaces/indicators';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { ImCheckmark } from 'react-icons/im';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiFilter2Line } from 'react-icons/ri';
import {
  Arrow,
  Balloon,
  ButtonContainer,
  ButtonFilter,
  GraphContainer,
  GraphFilterBar,
  HiddenCheckbox,
  StyledCheckboxContainer,
  TitleFilterBar,
  ToggleFilters,
  VisibleCheckbox,
  WapperTitleFilter,
} from './styles';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function IdeasPerStatusGraph({
  campaignIds,
}: GlobalIndicatorsProps): JSX.Element {
  const [ideaSteps, setIdeaSteps] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { getKanbanSteps, kanbanSteps } = useContext(ApprovalFunnelContext);
  const { ideasPerStatus, getIdeasPerStatus } = useContext(IdeaContext);

  const handleOpenFilter = useCallback(() => {
    setIsFilterOpen(state => !state);
  }, []);

  const handleSelectStep = useCallback(
    (step: string) => {
      const existsStep = ideaSteps.findIndex(e => e === step);

      if (existsStep !== -1) {
        setIdeaSteps(state => {
          return state.filter((aux, i) => existsStep !== i);
        });
      } else {
        setIdeaSteps(state => [...state, step]);
      }
    },
    [ideaSteps]
  );

  useEffect(() => {
    getIdeasPerStatus({
      ideaSteps: ideaSteps.length > 0 ? JSON.stringify(ideaSteps) : '',
      campaignIds: campaignIds ? JSON.stringify(campaignIds) : '[]',
    });
    (async (): Promise<void> => {
      await getKanbanSteps();
    })();
  }, [ideaSteps, campaignIds, getIdeasPerStatus, getKanbanSteps]);

  const options: ChartOptions<any> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 15,
          },
        },
      },
      datalabels: {
        display: true,
        anchor: 'center',
        align: 'center',
        color: 'white',
        font: {
          size: 15,
          weight: 700,
        },
      },
    },
  };

  const total: number =
    Number(ideasPerStatus.onGoing) +
    Number(ideasPerStatus.techReview) +
    Number(ideasPerStatus.refused);

  const onGoing = Number(ideasPerStatus.onGoing);
  const techReview = Number(ideasPerStatus.techReview);
  const refused = Number(ideasPerStatus.refused);

  const data: ChartOptions<any> = useMemo(() => {
    const savedata = {
      labels: [
        `Em andamento: ${((onGoing / total) * 100).toFixed(1)}%`,
        `Análise Técnica: ${((techReview / total) * 100).toFixed(1)}%`,
        `Recusadas: ${((refused / total) * 100).toFixed(1)}%`,
      ],
      datasets: [
        {
          label: '# de Iniciativas',
          data: [onGoing, techReview, refused],
          backgroundColor: [
            '#315594',
            '#F99335',
            '#EF6262',
            'rgba(75, 192, 192)',
          ],
          borderRadius: 7,
          barThickness: 32,
        },
      ],
    };
    return savedata;
  }, [onGoing, techReview, refused, total]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <h3>Iniciativas por Status</h3>
        </TitleFilterBar>
        {kanbanSteps.length > 0 && (
                    <ButtonContainer>
                        <ButtonFilter onClick={handleOpenFilter}>
                            <RiFilter2Line size={24} />
                            <Arrow selected={isFilterOpen}>
                                <IoMdArrowDropdown size={22} />
                            </Arrow>
                        </ButtonFilter>
                        {isFilterOpen && (
                            <Balloon>
                                <ToggleFilters>
                                    <WapperTitleFilter>
                                        <strong>Etapa</strong>
                                    </WapperTitleFilter>
                                    {step_idea.map((step, index) => (
                                        <StyledCheckboxContainer
                                            key={step.id}
                                            onClick={() => handleSelectStep(step.name)}
                                        >
                                            <HiddenCheckbox
                                                checked={ideaSteps.some(e => e === step.name)}
                                                onChange={() => handleSelectStep(step.name)}
                                            />
                                            <VisibleCheckbox
                                                checked={ideaSteps.some(e => e === step.name)}
                                            >
                                                <ImCheckmark size={12} />
                                            </VisibleCheckbox>
                                            <span>{kanbanSteps[index].title}</span>
                                        </StyledCheckboxContainer>
                                    ))}
                                </ToggleFilters>
                            </Balloon>
                        )}
                    </ButtonContainer>
                )}
      </GraphFilterBar>
      <Pie data={data} options={options} />
    </GraphContainer>
  );
}
