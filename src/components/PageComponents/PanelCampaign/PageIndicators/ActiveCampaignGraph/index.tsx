import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import DatePicker from 'react-datepicker';
import { RiFilter2Line, RiTrophyLine } from 'react-icons/ri';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { CampaingActiveHistory } from 'interfaces/campaign';
import { CampaignContext } from 'contexts/Campaign';
import { IoMdArrowDropdown } from 'react-icons/io';
import pt from 'date-fns/locale/pt-BR';
import {
  Arrow,
  ArrowInDate,
  ArrowInDate2,
  Balloon,
  ButtonContainer,
  ButtonFilter,
  GraphContainer,
  GraphFilterBar,
  IconContainer,
  Item,
  TitleFilterBar,
  ToggleFilters,
  WapperTitleFilter,
} from './styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Tooltip
);

export function ActiveCampaignGraph(): JSX.Element {
  const { getActiveHistoric } = useContext(CampaignContext);
  const [dataActiveHistoric, setDataActiveHistoric] = useState<
    CampaingActiveHistory[]
  >([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [initialDate, setInitialDate] = useState<Date>();
  const [isInitialDateOpen, setIsInitialDateOpen] = useState(false);
  const [finalDate, setFinalDate] = useState<Date>();
  const [isFinalDateOpen, setIsFinalDateOpen] = useState(false);

  const handleOpenFilter = useCallback(() => {
    setIsFilterOpen(state => !state);
  }, []);

  useEffect(() => {
    async function fechData(): Promise<void> {
      const data = await getActiveHistoric({
        initialDate: initialDate ? JSON.stringify(initialDate) : '',
        finalDate: finalDate ? JSON.stringify(finalDate) : '',
      });
      setDataActiveHistoric(data);
    }
    fechData();
  }, [finalDate, getActiveHistoric, initialDate]);

  const options: ChartOptions<any> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
          beginAtZero: true,
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
        anchor: 'center',
        align: 'center',
        color: 'black',
        font: {
            size: 13,
            weight: 600,
        },
      },
    },
  };

  const data: ChartOptions<any> = useMemo(() => {
    const savedata = {
      labels: dataActiveHistoric.map(label => label.date),
      datasets: [
        {
          data: dataActiveHistoric.map(data => {
            return JSON.stringify(data.activeCampaignsNumber) !== '0'
              ? data.activeCampaignsNumber
              : '';
          }),
          backgroundColor: '#67D1C4',
          borderRadius: 7,
          barThickness: 32,
        },
      ],
    };
    return savedata;
  }, [dataActiveHistoric]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <IconContainer>
            <RiTrophyLine size={24} color="2D3748" />
          </IconContainer>
          <h3>Histórico de Direcionais Ativos</h3>
        </TitleFilterBar>
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
                  <strong>Período de Tempo</strong>
                </WapperTitleFilter>
                <Item>
                  <DatePicker
                    className="datePicker"
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={initialDate}
                    placeholderText="Início"
                    onChange={setInitialDate}
                    onCalendarOpen={() => setIsInitialDateOpen(true)}
                    onCalendarClose={() => setIsInitialDateOpen(false)}
                  />
                  <ArrowInDate selected={isInitialDateOpen}>
                    <IoMdArrowDropdown size={25} />
                  </ArrowInDate>
                </Item>
                <Item>
                  <DatePicker
                    className="datePicker"
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={finalDate}
                    placeholderText="Fim"
                    onChange={setFinalDate}
                    onCalendarOpen={() => setIsFinalDateOpen(true)}
                    onCalendarClose={() => setIsFinalDateOpen(false)}
                  />
                  <ArrowInDate2 selected={isFinalDateOpen}>
                    <IoMdArrowDropdown size={25} />
                  </ArrowInDate2>
                </Item>
              </ToggleFilters>
            </Balloon>
          )}
        </ButtonContainer>
      </GraphFilterBar>
      <Bar data={data} options={options} />
    </GraphContainer>
  );
}
