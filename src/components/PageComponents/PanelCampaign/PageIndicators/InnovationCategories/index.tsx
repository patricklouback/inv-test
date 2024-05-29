/* eslint-disable @typescript-eslint/no-explicit-any */
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
import DatePicker from 'react-datepicker';
import { Bar } from 'react-chartjs-2';
import { RiFilter2Line, RiLightbulbFlashLine } from 'react-icons/ri';

import { InnovationCategory } from 'interfaces/campaign';
import { CampaignContext } from 'contexts/Campaign';
import pt from 'date-fns/locale/pt-BR';
import { Area } from 'interfaces/areas';
import { IoMdArrowDropdown } from 'react-icons/io';
import {
  InnovationSubtitleBar,
  InnovationSubtitle,
  GraphContainer,
  GraphFilterBar,
  TitleFilterBar,
  ButtonContainer,
  ButtonFilter,
  Arrow,
  IconContainer,
  Balloon,
  ToggleFilters,
  WapperTitleFilter,
  Item,
  ArrowInDate,
  ArrowInDate2,
} from './styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataSetProps {
  label: string;
  data: string[];
  backgroundColor: string;
  areaId: string;
  borderRadius?: number;
  borderSkipped?: string;
}

export const options = {
  plugins: {
    legend: {
      display: false,
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
      grid: { display: false, drawBorder: false },
    },
    y: {
      stacked: true,
      display: false,
    },
  },
};

export function InnovationCategories(): JSX.Element {
  const { getInnovationCategories } = useContext(CampaignContext);
  const [categoriesInnovation, setCategoriesInnovation] = useState<
    InnovationCategory[]
  >([]);
  const [areas, setAreas] = useState<Area[]>([]);

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
      const data = await getInnovationCategories({
        initialDate: initialDate ? JSON.stringify(initialDate) : '',
        finalDate: finalDate ? JSON.stringify(finalDate) : '',
      });
      setCategoriesInnovation(data);
    }
    fechData();
  }, [finalDate, getInnovationCategories, initialDate]);

  const data: ChartOptions<any> = useMemo(() => {
    const dataSet: DataSetProps[] = [];

    categoriesInnovation.forEach(category => {
      category.ideasNumbersByAreaList.forEach(ideaData => {
        const itemIndex = dataSet.findIndex(
          prop => prop.areaId === ideaData.area.id
        );

        setAreas(state => {
          if (state.some(area => area.id === ideaData.area.id)) {
            return state;
          }
          state.push(ideaData.area);
          return state;
        });

        if (itemIndex !== -1) {
          dataSet[itemIndex].data.push(
            JSON.stringify(ideaData.numberOfIdeas) !== '0'
              ? ideaData.numberOfIdeas
              : ''
          );
        } else {
          dataSet.push({
            areaId: ideaData.area.id,
            backgroundColor: ideaData.area.color,
            label: ideaData.area.name,
            data: [
              JSON.stringify(ideaData.numberOfIdeas) !== '0'
                ? ideaData.numberOfIdeas
                : '',
            ],
            borderRadius: 8,
            borderSkipped: 'bottom',
          });
        }
      });
    });

    const savedata = {
      labels: categoriesInnovation.map(label => label.formattedDate),
      datasets: dataSet,
    };

    return savedata;
  }, [categoriesInnovation]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <IconContainer>
            <RiLightbulbFlashLine size={24} color="2D3748" />
          </IconContainer>
          <h3>Categorias de Inovações</h3>
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
      <Bar options={options} data={data} />
      <InnovationSubtitleBar>
        {areas.map(area => (
          <InnovationSubtitle color={area.color}>
            <h2>{area.name}</h2>
          </InnovationSubtitle>
        ))}
      </InnovationSubtitleBar>
    </GraphContainer>
  );
}
