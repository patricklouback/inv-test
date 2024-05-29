/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useEffect, useMemo } from "react";
import { ProcessActivityContext } from "contexts/ProcessActivity";
import { IdeasPerGateComponent } from "./IdeasPerGateComponent";
import { GroupedProcessActivities } from './styles';

interface IdeasPerGateGraphsProps {
    campaignId: string;
}

export function IdeasPerGateGraphs({ campaignId }: IdeasPerGateGraphsProps): JSX.Element {
    const { processActivitiesCampaign, getProcessActivities } = useContext(ProcessActivityContext)

    useEffect(() => {
        (async () => {
            await getProcessActivities(campaignId);
        })()
    }, [getProcessActivities, campaignId])

    const groupedProcessActivities = useMemo(() => {
        const result = [];
        const chunkSize = 2;

        for (let i = 0; i < processActivitiesCampaign.length; i += chunkSize) {
            result.push(processActivitiesCampaign.slice(i, i + chunkSize));
        }
        return result;
    }, [processActivitiesCampaign]);

    return (
        <div style={{ width: '100%'}}>
            {groupedProcessActivities.map((row, index) => (
                <GroupedProcessActivities >
                    {row.map((element) => (
                        <IdeasPerGateComponent key={element.id} processActivity={element}/>
                    ))}
                </GroupedProcessActivities>
            ))}
        </div>
    )
}
