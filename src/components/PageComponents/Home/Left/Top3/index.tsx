/* eslint-disable no-underscore-dangle */
import ButtonLink from '@components/Link';
import { DefaultSection } from '@components/SectionDefault';
import { RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CampaignContext } from 'contexts/Campaign';
import { TopCampaigns } from 'interfaces/campaign';
import { useRouter } from 'next/router';
import { AuthContext } from 'contexts/AuthContext';
import {
  ListCampaing,
  Container,
  ContainerList,
  ContainerCampaingRank,
  ContentCampaingRank,
  ContentCampaingRankImage,
  ContentCampaingRankText,
  ContentCampaingRankDown,
  Box,
  ContentCampaingRankDownPosition,
  ContentCampaingRankDownQnt,
  ContentCampaingRankIdeias,
  ContainerEmpity,
} from './styles';

export const CampaingRank: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { token } = useContext(AuthContext);
  const { topMomentCampaigns, loading } = useContext(CampaignContext);
  const [topCampaigns, setTopCampaigns] = useState<TopCampaigns[]>([]);

  useEffect(() => {
    async function loadCampaigns(): Promise<void> {
      const campaigns = await topMomentCampaigns();
      setTopCampaigns(campaigns);
    }

    if (token) {
      loadCampaigns();
    }
  }, [topMomentCampaigns, token]);

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

  return (
    <Container>
      <DefaultSection
        type="normal"
        header={{
          title: 'Top 3 Direcionais de Inovação',
          box_icon: <RiTrophyLine color={colors.font} size={20} />,
        }}
      >
        <ContainerList>
          {loading && <p>Carregando</p>}

          {!loading &&
            (topCampaigns.length === 0 && topCampaigns ? (
              <ContainerEmpity>
                <p>NÃO HÁ DIRECIONAIS</p>
              </ContainerEmpity>
            ) : (
              <>
                <ListCampaing align={topCampaigns.length === 2}>
                  {topCampaigns.map((item, index) => (
                    <ContainerCampaingRank
                      onClick={() => handleNewIdea(item.id)}
                      key={item.id}
                    >
                      <ContentCampaingRank className="hover">
                        <ContentCampaingRankImage img={item.image} />
                        <ContentCampaingRankText>
                          <span>Direcional #{item.sequence}</span>
                          <h2>{item.title}</h2>
                          {/* <p>{item.summary.substring(0, 100)}</p> */}
                        </ContentCampaingRankText>
                      </ContentCampaingRank>
                      <ContentCampaingRankDown
                        className="hover"
                        onClick={() => push}
                      >
                        <Box>
                          <ContentCampaingRankDownPosition>
                            {index + 1}º
                          </ContentCampaingRankDownPosition>
                          <ContentCampaingRankDownQnt>
                            {item?._count.ideas || 0}
                          </ContentCampaingRankDownQnt>
                        </Box>
                        <ContentCampaingRankIdeias>
                          Iniciativas
                        </ContentCampaingRankIdeias>
                      </ContentCampaingRankDown>
                    </ContainerCampaingRank>
                  ))}
                </ListCampaing>

                <ButtonLink
                  max={260}
                  center
                  marginTop={24}
                  hover={colors.fontLight}
                  link="/campaign/all-campaign"
                  value="Ver todos"
                  background={colors.font}
                  color={colors.background}
                  Icon={<RiTrophyLine color={colors.background} size={20} />}
                />
              </>
            ))}
        </ContainerList>
      </DefaultSection>
    </Container>
  );
};
