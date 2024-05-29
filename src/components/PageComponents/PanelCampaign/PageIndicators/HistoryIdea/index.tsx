import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import {
  RiFileEditLine,
  RiFilter2Line,
  RiLightbulbFlashLine,
} from 'react-icons/ri';
import { GlobalIndicatorsProps } from 'interfaces/indicators';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { CampaignContext } from 'contexts/Campaign';
import { IdeasHistory } from 'interfaces/campaign';
import { IoMdArrowDropdown } from 'react-icons/io';
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
  Title,
  Tooltip,
  Legend
);

export function HistoryIdea({ campaignIds }: GlobalIndicatorsProps): JSX.Element {
  const { getHistoricIdeas } = useContext(CampaignContext);
  const [ideaHistoric, setIdeaHistoric] = useState<IdeasHistory[]>([]);

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
      const data = await getHistoricIdeas({
        initialDate: initialDate ? JSON.stringify(initialDate) : '',
        finalDate: finalDate ? JSON.stringify(finalDate) : '',
        campaignIds: campaignIds ? JSON.stringify(campaignIds) : '[]',
      });
      setIdeaHistoric(data);
    }
    fechData();
  }, [finalDate, getHistoricIdeas, initialDate, campaignIds]);

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
          size: 13,
          weight: 700,
        },
      },

      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacke',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
      },
      y: {
        stacked: true,
        display: false,
      },
    },
  };

  const data: ChartOptions<any> = useMemo(() => {
    const savedata = {
      labels: ideaHistoric.map(label => label.date),
      datasets: [
        {
          label: 'Total',
          data: ideaHistoric.map(iH => {
            return JSON.stringify(iH.totalIdeas) !== '0' ? iH.totalIdeas : '';
          }),
          backgroundColor: '#8B095F',
          borderRadius: 8,
          borderSkipped: 'bottom',
        },
      ],
    };
    return savedata;
  }, [ideaHistoric]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <IconContainer>
            <RiLightbulbFlashLine size={24} color="2D3748" />
          </IconContainer>
          <h3>Histórico de Iniciativas</h3>
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
