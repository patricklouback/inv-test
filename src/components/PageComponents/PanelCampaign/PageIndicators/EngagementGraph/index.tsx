import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  LineController,
  Tooltip,
  ChartOptions,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AiOutlineLike } from 'react-icons/ai';

import { RiFilter2Line } from 'react-icons/ri';
import { AreaContext } from 'contexts/AreaContext';
import { AreaPoints, EngagementAreaPoints } from 'interfaces/areas';
import { IoMdArrowDropdown } from 'react-icons/io';
import {
  Arrow,
  ArrowInDate,
  ArrowInDate2,
  Balloon,
  ButtonContainer,
  ButtonFilter,
  EngagementSubtitle,
  EngagementSubtitleBar,
  GraphContainer,
  GraphFilterBar,
  IconContainer,
  Item,
  TitleFilterBar,
  ToggleFilters,
  WapperTitleFilter,
} from './styles';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  ChartDataLabels,
  Legend,
  Tooltip
);

export const options: ChartOptions<any> = {
  responsive: true,

  // scales: {
  //   x: {
  //     grid: {
  //       display: false,
  //     },
  //   },
  //   y: {
  //     grid: {
  //       display: false,
  //       drawBorder: false,
  //     },
  //     ticks: {
  //       display: false,
  //     },
  //   },
  // },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
      anchor: 'end',
      align: 'start',
      color: '#000',
    },
  },
};

export function EngagementGraph(): JSX.Element {
  const { getEngagementAreaPoints } = useContext(AreaContext);

  const [engagementAreaPoints, setEngagementAreaPoints] = useState<
    EngagementAreaPoints[]
  >([]);
  const [areaPoints, setAreaPoints] = useState<AreaPoints[]>([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [initialDate, setInitialDate] = useState<Date>();
  const [isInitialDateOpen, setIsInitialDateOpen] = useState(false);
  const [finalDate, setFinalDate] = useState<Date>();
  const [isFinalDateOpen, setIsFinalDateOpen] = useState(false);

  const handleOpenFilter = useCallback(() => {
    setIsFilterOpen(state => !state);
  }, []);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const data = await getEngagementAreaPoints({
        initialDate: initialDate ? JSON.stringify(initialDate) : '',
        finalDate: finalDate ? JSON.stringify(finalDate) : '',
      });
      setEngagementAreaPoints(data);
    }

    loadData();
  }, [finalDate, getEngagementAreaPoints, initialDate]);

  const data = useMemo(() => {
    const datasets = [];

    engagementAreaPoints.forEach(engagementAreaPoint => {
      if (engagementAreaPoint.areas.length !== 0) {
        engagementAreaPoint.areas.forEach(areaPoint => {
          setAreaPoints(state => {
            if (state.some(stateArea => stateArea.id === areaPoint.id)) {
              return state;
            }
            state.push(areaPoint);
            return state;
          });

          const existAreaIndex = datasets.findIndex(
            prop => prop.id === areaPoint.id
          );

          if (existAreaIndex !== -1) {
            const dataValue = areaPoint.points !== 0 ? areaPoint.points : '';
            datasets[existAreaIndex].data.push(String(dataValue));
          } else {
            const dataValue = areaPoint.points !== 0 ? areaPoint.points : '';

            datasets.push({
              id: areaPoint.id,
              type: 'bar',
              label: areaPoint.label,
              backgroundColor: areaPoint.color,
              data: [dataValue],
              borderRadius: 7,
            });
          }
        });
      } else {
        areaPoints.forEach(areaPoint => {
          const existAreaIndex = datasets.findIndex(
            prop => prop.id === areaPoint.id
          );

          if (existAreaIndex !== -1) {
            datasets[existAreaIndex].data.push(String(''));
          } else {
            datasets.push({
              id: areaPoint.id,
              type: 'bar',
              label: areaPoint.label,
              backgroundColor: areaPoint.color,
              data: [''],
              borderRadius: 7,
            });
          }
        });
      }

      /* const lineGraph = datasets.findIndex(dataset => dataset.type === 'line');
      if (lineGraph !== -1) {
        datasets[lineGraph].data.push(
          engagementAreaPoint.totalPoints !== 0
            ? engagementAreaPoint.totalPoints
            : ''
        );
      } else {
        datasets.push({
          type: 'line' as const,
          label: 'pts',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: false,
          data:
            engagementAreaPoint.totalPoints !== 0
              ? [engagementAreaPoint.totalPoints]
              : [''],
          lineWidth: 200,
          pointRadius: 5,
          borderRadius: 7,
        });
      } */
    });

    return {
      labels: engagementAreaPoints.map(element => element.month),
      datasets,
    };
  }, [areaPoints, engagementAreaPoints]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <IconContainer>
            <AiOutlineLike size={24} color="2D3748" />
          </IconContainer>
          <h3>Engajamento das Áreas/Unidades</h3>
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
      <Chart type="bar" data={data} options={options} />
      <EngagementSubtitleBar>
        {areaPoints.map(areaPoint => (
          <EngagementSubtitle color={areaPoint.color}>
            <h2>{areaPoint.label}</h2>
          </EngagementSubtitle>
        ))}
      </EngagementSubtitleBar>
    </GraphContainer>
  );
}
