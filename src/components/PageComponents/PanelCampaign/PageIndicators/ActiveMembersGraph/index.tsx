import { UserContext } from 'contexts/User';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  DoughnutContainer,
  ExplanationTooltip,
  ExplanationTooltipText,
  GraphContainer,
  GraphFilterBar,
  TitleFilterBar,
  Value,
} from './styles';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function ActiveMembersGraph(): JSX.Element {
  const { countMembers } = useContext(UserContext);
  const [activeMembers, setActiveMembers] = useState(0);
  const [totalMembers, setTotalsMembers] = useState(0);

  useEffect(() => {
    async function fechData(): Promise<void> {
      const { activeUsers, totalUsers } = await countMembers();
      setActiveMembers(activeUsers);

      setTotalsMembers(totalUsers);
    }
    fechData();
  }, [countMembers]);

  const options: ChartOptions<any> = {
    responsive: true,
    cutout: '75%',
    legend: {
      labels: {
        fontSize: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  const data: ChartOptions<any> = useMemo(() => {
    const savedata = {
      labels: [`Membros ativos`, `Membros inativos`],
      datasets: [
        {
          label: '% de Membros Ativos',
          data: [
            ((activeMembers / totalMembers) * 100).toFixed(1),
            (((totalMembers - activeMembers) / totalMembers) * 100).toFixed(1),
          ],
          backgroundColor: ['#5192FF', '#E7E7E7'],
        },
      ],
    };
    return savedata;
  }, [activeMembers, totalMembers]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <h3>Percentual de membros ativos</h3>
          <ExplanationTooltip>
            <AiOutlineQuestionCircle color="black" />
            <ExplanationTooltipText>
              Usuários que acessaram a plataforma ao menos 1 vez no trimestre.
              <br />
              <br />
              <strong>Possível ação:</strong> reforçar comunicação global
            </ExplanationTooltipText>
          </ExplanationTooltip>
        </TitleFilterBar>
      </GraphFilterBar>
      <DoughnutContainer>
        <Doughnut data={data} options={options} />
        <Value>{((activeMembers / totalMembers) * 100).toFixed(1)} %</Value>
      </DoughnutContainer>
    </GraphContainer>
  );
}
