import { useState, useContext, useCallback, useEffect } from 'react';
import { InfoCard } from '@components/InfoCard';
import { Dropdown } from '@components/Dropdown';
import { CampaignContext } from 'contexts/Campaign';
import { ActiveMembersGraph } from '../ActiveMembersGraph';
import { AreasContribuitionsGraph } from '../AreasContribuitionsGraph';
import { ActivityTimeGraph } from '../ActivityTimeGraph';
import { EngagementRank } from '../EngagementRank';
import {
    CampaignFilter,
    EngagementInfoCardsContainer,
    CampaignInfoCard,
    Graphs,
    RowTwo,
    RowTwoLeft,
    RowTwoMid,
    RowThree,
    RowThreeLeft,
    RowThreeRight,
} from './styles';

interface EngageIndicatorsProps {
    totalLikes: number;
    totalComments: number;
    onChangeSelectedCampaigns: (value: string[]) => void;
}

export const EngageIndicators = ({
    totalLikes,
    totalComments,
    onChangeSelectedCampaigns,
}: EngageIndicatorsProps): JSX.Element => {
    const { campaignsInfo, getCampaignsInfo } = useContext(CampaignContext);

    const [selectedCampaignsIds, setSelectedCampaignIds] = useState<string[]>([]);

    const handleSelectCampaign = useCallback(
        (id: string) => {
            const campaignIndex = selectedCampaignsIds.findIndex(
                campaignId => campaignId === id
            );

            if (campaignIndex !== -1) {
                setSelectedCampaignIds(state =>
                    state.filter((campaign, index) => index !== campaignIndex)
                );
                onChangeSelectedCampaigns(selectedCampaignsIds);
            } else {
                setSelectedCampaignIds(state => [...state, id]);
                onChangeSelectedCampaigns(selectedCampaignsIds);
            }
        },
        [onChangeSelectedCampaigns, selectedCampaignsIds]
    );

    useEffect(() => {
        (async (): Promise<void> => {
            await getCampaignsInfo();
        })();
        onChangeSelectedCampaigns(selectedCampaignsIds);
    }, [getCampaignsInfo, selectedCampaignsIds]);
    return (
        <Graphs>
            <CampaignFilter>
                <Dropdown
                    itemsList={campaignsInfo}
                    handleSelect={handleSelectCampaign}
                    selectedItems={selectedCampaignsIds}
                />
            </CampaignFilter>
            <RowTwo>
                <RowTwoLeft>
                    <EngagementRank campaignIds={selectedCampaignsIds} />
                </RowTwoLeft>
                <RowTwoMid>
                    <ActiveMembersGraph />
                </RowTwoMid>
                <EngagementInfoCardsContainer>
                    <CampaignInfoCard>
                        <InfoCard
                            title='Total de curtidas'
                            data={totalLikes}
                        />
                    </CampaignInfoCard>
                    <CampaignInfoCard>
                        <InfoCard
                            title='Total de comentários'
                            data={totalComments}
                        />
                    </CampaignInfoCard>
                </EngagementInfoCardsContainer>
            </RowTwo>
            <RowThree>
                <RowThreeLeft>
                    <ActivityTimeGraph />
                </RowThreeLeft>
                <RowThreeRight>
                    <AreasContribuitionsGraph campaignIds={selectedCampaignsIds} />
                </RowThreeRight>
            </RowThree>
        </Graphs>
    )
}