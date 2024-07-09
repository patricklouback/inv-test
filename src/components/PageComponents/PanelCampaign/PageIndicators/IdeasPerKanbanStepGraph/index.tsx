import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { IdeaContext } from 'contexts/Idea';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { GlobalIndicatorsProps } from 'interfaces/indicators';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import {
  GraphAndTitleContainer,
  GraphContainer,
  GraphFilterBar,
  TitleFilterBar,
} from './styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export function IdeasPerKanbanStepGraph({
  campaignIds,
}: GlobalIndicatorsProps): JSX.Element {
  const { getKanbanSteps, kanbanSteps } = useContext(ApprovalFunnelContext);
  const { countIdeasPerKanbanStep } = useContext(IdeaContext);
  const [ideasPerKanbanStep, setideasPerKanbanStep] = useState({
    screening: 0,
    analyze: 0,
    select: 0,
    implemented: 0,
  });

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const ideasPerKanbanStepData = await countIdeasPerKanbanStep({
        campaignIds: campaignIds ? JSON.stringify(campaignIds) : '[]',
      });
      setideasPerKanbanStep(ideasPerKanbanStepData);
      await getKanbanSteps();
    }
    fetchData();
  }, [countIdeasPerKanbanStep, getKanbanSteps, campaignIds]);

  const options: ChartOptions<any> = {
    plugins: {
      legend: {
        display: false,
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

      title: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: { display: true },
        ticks: {
          font: {
            size: 15,
          },
        },
      },
      y: {
        stacked: true,
        display: false,
      },
    },
  };

  const data: ChartOptions<any> = useMemo(() => {
    const savedata = {
      labels: kanbanSteps.map(step => step.title),
      datasets: [
        {
          label: 'Iniciativass',
          data: [
            ideasPerKanbanStep.screening,
            ideasPerKanbanStep.analyze,
            ideasPerKanbanStep.select,
            ideasPerKanbanStep.implemented,
          ],
          backgroundColor: ['#B694FF', '#9D28F0', '#5402B5', '#3A0577'],
          borderRadius: 8,
          borderSkipped: 'bottom',
        },
      ],
    };
    return savedata;
  }, [ideasPerKanbanStep, kanbanSteps]);

  return (
    <GraphAndTitleContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <h3>Quantidade de iniciativas por etapa do funil</h3>
        </TitleFilterBar>
      </GraphFilterBar>
      <GraphContainer>
        <Bar data={data} options={options} />
      </GraphContainer>
    </GraphAndTitleContainer>
  );
}
