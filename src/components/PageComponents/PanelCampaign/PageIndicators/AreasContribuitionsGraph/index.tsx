import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { AreaContext } from 'contexts/AreaContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { GlobalIndicatorsProps } from 'interfaces/indicators';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
    ExplanationTooltip,
    ExplanationTooltipText,
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

export function AreasContribuitionsGraph({ campaignIds }: GlobalIndicatorsProps): JSX.Element {
    const { getAreasContribution } = useContext(AreaContext);
    const [areasContribution, setAreasContribution] = useState([]);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const areasContrib = await getAreasContribution({
                campaignIds: campaignIds ? JSON.stringify(campaignIds) : '[]',
            });
            setAreasContribution(areasContrib);
        }
        fetchData();
    }, [getAreasContribution, campaignIds])

    const absoluteFormatterTouching = (value: number): number => {
        if (value > 0) {
            return value;
        } 
        return null;
    }

    const areasThatContributed = areasContribution.filter(area => area.totalContribution > 0);

    const options: ChartOptions<any> = {
        indexAxis: 'y' as const,
        plugins: {
            legend: {
                display: false,
            },

            datalabels: {
                display: true,
                anchor: 'center',
                align: 'end',
                color: 'black',
                font: {
                    size: 13,
                    weight: 700,
                },
                formatter: absoluteFormatterTouching,
            },

            title: {
                display: false,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                display: false,
            },
            y: {
                stacked: true,
                grid: { display: false },
                ticks: {
                    font: {
                        size: 14,
                    }
                }
            },
        },
    };

    const data: ChartOptions<any> = useMemo(() => {
        const savedata = {
            labels: areasThatContributed.map(area => area.name),
            datasets: [
                {
                    label: 'Total',
                    data: areasThatContributed.map(area => area.totalContribution),
                    backgroundColor: '#67D1C4',
                    borderRadius: 8,
                    borderSkipped: 'left',
                },
            ],
        };
        return savedata;
    }, [areasThatContributed]);

    return (
        <GraphAndTitleContainer>
            <GraphFilterBar>
                <TitleFilterBar>
                    <h3>Contribuição das áreas</h3>
                    <ExplanationTooltip>
                        <AiOutlineQuestionCircle color='black'/>
                        <ExplanationTooltipText>
                            Iniciativas submetidas de acordo com áreas cadastradas.
                            <br/><br/>
                            <strong>Possível ação:</strong> reforçar comunicação específica
                        </ExplanationTooltipText>
                    </ExplanationTooltip>
                </TitleFilterBar>
            </GraphFilterBar>
            <GraphContainer>
                <Bar data={data} options={options} height={250}/>
            </GraphContainer>
        </GraphAndTitleContainer>
    )
}