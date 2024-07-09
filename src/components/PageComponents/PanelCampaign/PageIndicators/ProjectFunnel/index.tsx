import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { RiFileEditLine } from 'react-icons/ri';
import { CampaignContext } from 'contexts/Campaign';
import { ProjectsFunnel } from 'interfaces/campaign';
import {
  GraphContainer,
  GraphFilterBar,
  IconContainer,
  TitleFilterBar,
} from './styles';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ChartDataLabels,
  Legend,
  Tooltip
);

export function ProjectFunnel(): JSX.Element {
  const { getProjectsFunnel } = useContext(CampaignContext);
  const [dataProjectsFunnel, setDataProjectsFunnel] =
    useState<ProjectsFunnel>();

  useEffect(() => {
    async function fechData(): Promise<void> {
      const data = await getProjectsFunnel();
      // setDataProjectsFunnel(data);
      // Mocking values
      setDataProjectsFunnel({
        workPlan: {
          label: 'Plano de trabalho',
          value: '1',
        },
        ideaAcceleration: {
          label: 'Aceleração da iniciativa',
          value: '2',
        },
        previewAnalysis: {
          label: 'Análise prévia resultados',
          value: '2',
        },
        conclusionResults: {
          label: 'Conclusão e resultados',
          value: '1',
        },
      });
    }
    fechData();
  }, [getProjectsFunnel]);

  const data: ChartOptions<any> = useMemo(() => {
    const savedata = {
      labels: [''],
      datasets: [
        {
          label: 'Projetos',
          data: [''],
          backgroundColor: ['#DF0075', '#3C3C3C'],
          borderRadius: 8,
        },
      ],
    };
    if (dataProjectsFunnel) {
      const keys = Object.keys(dataProjectsFunnel);
      savedata.labels = keys.map(key => dataProjectsFunnel[key].label);
      savedata.datasets[0].data = keys.map(key =>
        JSON.stringify(dataProjectsFunnel[key].value) !== '0'
          ? dataProjectsFunnel[key].value
          : ''
      );
    }
    return savedata;
  }, [dataProjectsFunnel]);

  const options: ChartOptions<any> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'start',
        color: '#FFF',
      },
    },
  };
  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <IconContainer>
            <RiFileEditLine size={24} color="#F51B1B" />
          </IconContainer>

          <h3>Estágio dos Projetos selecionados</h3>
        </TitleFilterBar>
      </GraphFilterBar>
      <Chart type="bar" data={data} options={options} />
    </GraphContainer>
  );
}
