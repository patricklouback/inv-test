/* eslint-disable no-restricted-syntax */
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { AccessDataContext } from 'contexts/AccessData';
import { UserContext } from 'contexts/User';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import {
    GraphAndTitleContainer,
    GraphContainer,
    GraphFilterBar,
    TitleFilterBar,
    InfoContainer,
    AverageTime,
    AverageTimeWrapper,
} from './styles';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

interface IAccessTimeByMonth {
    date: string;
    accessTotalSeconds: number;
    accessTotalHours: number;
}

export function ActivityTimeGraph(): JSX.Element {
    const { accessTimeByMonth } = useContext(AccessDataContext);
    const { countMembers } = useContext(UserContext);
    const [totalMembers, setTotalsMembers] = useState(0);
    const [accessTimeByMonthState, setAccessTimeByMonth] = useState<IAccessTimeByMonth[]>([
        {
            date: '00/0000',
            accessTotalSeconds: 0,
            accessTotalHours: 0,
        }
    ])

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const accessTimeByMonthData = await accessTimeByMonth();
            setAccessTimeByMonth(accessTimeByMonthData);

            const { totalUsers } = await countMembers();

            setTotalsMembers(totalUsers);
        }
        fetchData();
    }, [accessTimeByMonth, countMembers])

    const options: ChartOptions<any> = {
        plugins: {
            legend: {
                display: false,
            },

            datalabels: {
                display: false,
            },

            title: {
                display: false,
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
                display: true,
            },
        },
    };

    const data: ChartOptions<any> = useMemo(() => {
        const savedata = {
            labels: accessTimeByMonthState.map(aT => aT.date),
            datasets: [
                {
                    label: 'Horas',
                    data: accessTimeByMonthState.map(aT => aT.accessTotalHours.toFixed(0)),
                    backgroundColor: 'black',
                    borderColor: 'black'
                },
            ],
        };
        return savedata;
    }, [accessTimeByMonthState]);

    function roundToNearestHalf(value: number): number {
        const integerValue = Math.floor(value);
        const decimalValue = value - integerValue;

        if (decimalValue < 0.3) {
            return integerValue;
        }

        if (decimalValue < 0.5 || decimalValue <= 0.7) {
            return integerValue + 0.5;
        }
        
        if (decimalValue > 0.7) {
            return integerValue + 1;
        }

        return integerValue;
        
    }

    const averageTime = (): number => {
        let result;
        
        for (const aT of accessTimeByMonthState) {
            result =+ aT.accessTotalHours;
        }

        result /= totalMembers;

        const roundedResult = roundToNearestHalf(result);

        return roundedResult;
    }

    return (
        <GraphAndTitleContainer>
            <GraphFilterBar>
                <TitleFilterBar>
                    <h3>Tempo de atividade dos colaboradores</h3>
                </TitleFilterBar>
            </GraphFilterBar>
            <GraphContainer>
                <InfoContainer>
                    <AverageTimeWrapper>
                        Média: 
                        <AverageTime>
                            {averageTime()}
                        </AverageTime> 
                        horas / usuário
                    </AverageTimeWrapper>
                </InfoContainer>
                <Line data={data} options={options} />
            </GraphContainer>
        </GraphAndTitleContainer>
    )
}