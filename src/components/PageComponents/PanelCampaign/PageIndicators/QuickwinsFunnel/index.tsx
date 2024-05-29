import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-chartjs-2';

import { CampaignContext } from 'contexts/Campaign';
import { QuickwinsFunnel } from 'interfaces/campaign';
import { HiOutlineLightningBolt } from 'react-icons/hi';
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

export function QuickwinFunnel(): JSX.Element {
  const { getQuickwinsFunnel } = useContext(CampaignContext);
  const [dataQuickwinsFunnel, setDataPQuickwinsFunnel] =
    useState<QuickwinsFunnel>();

  useEffect(() => {
    async function fechData(): Promise<void> {
      const data = await getQuickwinsFunnel();
      // setDataPQuickwinsFunnel(data);
      // Mocking values
      setDataPQuickwinsFunnel({
        implementationPlan: {
          label: 'Plano de implementação',
          value: '2',
        },
        implementation: {
          label: 'Implementação',
          value: '1',
        },
        results: {
          label: 'Resultado',
          value: '1',
        },
      });
    }

    fechData();
  }, [getQuickwinsFunnel]);

  const data: ChartOptions<any> = useMemo(() => {
    const savedata = {
      labels: [''],
      datasets: [
        {
          label: 'Quick Win',
          data: [''],
          backgroundColor: ['#FEC14B', '#3C3C3C'],
          borderRadius: 8,
        },
      ],
    };
    if (dataQuickwinsFunnel) {
      const keys = Object.keys(dataQuickwinsFunnel);
      savedata.labels = keys.map(key => dataQuickwinsFunnel[key].label);
      savedata.datasets[0].data = keys.map(key =>
        JSON.stringify(dataQuickwinsFunnel[key].value) !== '0'
          ? dataQuickwinsFunnel[key].value
          : ''
      );
    }
    return savedata;
  }, [dataQuickwinsFunnel]);

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
        color: '#000',
      },
    },
  };
  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <IconContainer>
            <HiOutlineLightningBolt size={24} color="#FFBC08" />
          </IconContainer>

          <h3>Estágio de Quick Wins selecionados</h3>
        </TitleFilterBar>
      </GraphFilterBar>
      <Chart type="bar" data={data} options={options} />
    </GraphContainer>
  );
}
