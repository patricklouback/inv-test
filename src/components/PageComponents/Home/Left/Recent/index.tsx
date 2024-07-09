import ButtonLink from '@components/Link';
import { DefaultSection } from '@components/SectionDefault';
import { Campaign } from 'interfaces/campaign';
import { CampaignContext } from 'contexts/Campaign';
import { useCallback, useContext, useEffect, useState } from 'react';
import { RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { AuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import {
  Container,
  ListRecentCampaign,
  RecentCampaignCard,
  CampaignCardImg,
  ContentCampaingRankText,
  CardButton,
} from './styles';

export const CampaingRecent: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { token } = useContext(AuthContext);
  const { recentCampaigns: getRecentCampaigns } = useContext(CampaignContext);

  const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([]);
  const { push } = useRouter();

  const handleNewIdea = useCallback(
    id => {
      push(
        `/campaign/detailed-campaign/?campaignId=${id}`,
        '/campanha/detalhes',
        {
          shallow: true,
        }
      );
    },
    [push]
  );
  useEffect(() => {
    async function loadData(): Promise<void> {
      const data = await getRecentCampaigns();

      setRecentCampaigns(data);
    }

    if (token) {
      loadData();
    }
  }, [getRecentCampaigns, token]);

  return (
    <Container>
      <DefaultSection
        type="normal"
        header={{
          title: 'Direcionais mais recentes',
          box_icon: <RiTrophyLine color={colors.font} size={20} />,
          small_header: true,
        }}
      >
        <>
          <ListRecentCampaign>
            {recentCampaigns.map(campaign => {
              return (
                <RecentCampaignCard
                  key={campaign.id}
                  onClick={() => handleNewIdea(campaign.id)}
                >
                  <CampaignCardImg
                    $img={
                      campaign.image
                        ? campaign.image
                        : 'https://via.placeholder.com/390x250'
                    }
                  />
                  <CardButton type="button">
                    <ContentCampaingRankText>
                      <span>#{campaign.sequence}</span>
                      <h2>{campaign.title}</h2>
                      {/* <p>{campaign.summary.substring(0, 100)}</p> */}
                    </ContentCampaingRankText>
                  </CardButton>
                </RecentCampaignCard>
              );
            })}
          </ListRecentCampaign>
          <ButtonLink
            max={260}
            center
            hover={colors.fontLight}
            link="/campaign/all-campaign"
            value="Ver todos"
            background={colors.font}
            color={colors.background}
            Icon={<RiTrophyLine color={colors.background} size={20} />}
          />
        </>
      </DefaultSection>
    </Container>
  );
};
