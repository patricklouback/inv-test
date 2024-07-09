/* eslint-disable no-restricted-syntax */
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { IdeaContext } from 'contexts/Idea';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RiFilter2Line } from 'react-icons/ri';
import { ImCheckmark } from 'react-icons/im';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { GlobalIndicatorsProps } from 'interfaces/indicators';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IoMdArrowDropdown } from 'react-icons/io';
import { step_idea } from '@components/PageComponents/IdeaRepository/data/filters';
import {
  Arrow,
  Balloon,
  ButtonContainer,
  ButtonFilter,
  GraphContainer,
  GraphFilterBar,
  TitleFilterBar,
  ToggleFilters,
  WapperTitleFilter,
  StyledCheckboxContainer,
  HiddenCheckbox,
  VisibleCheckbox,
} from './styles';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function IdeasPerRouteGraph({
  campaignIds,
}: GlobalIndicatorsProps): JSX.Element {
  const [ideaSteps, setIdeaSteps] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { getKanbanSteps, kanbanSteps } = useContext(ApprovalFunnelContext);
  const { ideasPerRoute, getIdeasPerRoute } = useContext(IdeaContext);

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
    getIdeasPerRoute({
      ideaSteps: ideaSteps.length > 0 ? JSON.stringify(ideaSteps) : '',
      campaignIds: campaignIds ? JSON.stringify(campaignIds) : '[]',
    });
    (async (): Promise<void> => {
      await getKanbanSteps();
    })();
  }, [ideaSteps, campaignIds, getIdeasPerRoute, getKanbanSteps]);

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

  let total = 0;

  for (const ipr of ideasPerRoute) {
    total += Number(ipr.ideasAmount);
  }

  const data: ChartOptions<any> = useMemo(() => {
    const savedata = {
      labels: ideasPerRoute.map(
        ipr =>
          `${ipr.routeName}: ${
            total !== 0
              ? ((Number(ipr.ideasAmount) / total) * 100).toFixed(1)
              : 0
          }%`
      ),
      datasets: [
        {
          label: '# de Iniciativas',
          data: ideasPerRoute.map(ipr => ipr.ideasAmount),
          backgroundColor: ideasPerRoute.map(ipr => ipr.color),
          borderRadius: 7,
          barThickness: 32,
        },
      ],
    };
    return savedata;
  }, [ideasPerRoute, total]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <h3>Iniciativas por Rotas</h3>
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
