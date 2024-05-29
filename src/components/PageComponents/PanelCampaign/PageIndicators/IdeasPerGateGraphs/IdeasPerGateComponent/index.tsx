import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
// import { GlobalIndicatorsProps } from 'interfaces/indicators';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ProcessActivityContext } from 'contexts/ProcessActivity';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CampaignStep, ProcessActivity } from 'interfaces/campaign';
import { useTheme } from 'styled-components';
import {
    GraphContainer,
    GraphFilterBar,
    TitleFilterBar,
    RouteGraphContainer 
} from './styles';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface IdeasPerGateComponentProps {
    processActivity: ProcessActivity;
}


export function IdeasPerGateComponent({ processActivity }: IdeasPerGateComponentProps): JSX.Element {
    const { colors } = useTheme();
    const { getTotalIdeasByProcess } = useContext(ProcessActivityContext);
    const [totalIdeasByProcess, setTotalIdeasByProcess] = useState<{
        title: string;
        ideasCount: string;
    }[]>([{
        title: '',
        ideasCount: '0'
    }]);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const data = await getTotalIdeasByProcess(processActivity.id);
            setTotalIdeasByProcess(data);
        }
        fetchData();
    }, [getTotalIdeasByProcess, processActivity])

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
            labels: totalIdeasByProcess.map(label => label.title),
            datasets: [
                {
                    label: '# de Iniciativas',
                    data: totalIdeasByProcess.map(tIBP => tIBP.ideasCount),
                    backgroundColor: '#8B095F',
                    borderRadius: 7,
                    barThickness: 32,
                },
            ],
        };
        return savedata;
    }, [totalIdeasByProcess]);

    return (
        <GraphContainer>
            <GraphFilterBar>
                <TitleFilterBar>
                    <h3>{`Ideias na rota ${processActivity.name}`}</h3>
                </TitleFilterBar>
            </GraphFilterBar>
            <RouteGraphContainer>
                <Bar data={data} options={options} />
            </RouteGraphContainer>
        </GraphContainer>
    )
}