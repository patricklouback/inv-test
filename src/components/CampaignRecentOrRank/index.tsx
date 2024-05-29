import { useRouter } from 'next/router';
import { useCallback } from 'react';
import {
  ContainerCampaingRank,
  ContentCampaingRank,
  ContentCampaingRankDown,
  ContentCampaingRankDownPosition,
  ContentCampaingRankDownQnt,
  ContentCampaingRankIdeias,
  ContentCampaingRankImage,
  ContentCampaingRankText,
  Box,
} from './styles';

interface ArticleCampaingsTopParams {
  image?: string;
  sequence?: number;
  title?: string;
  id?: string;
  position: number;
  ideasQuantity?: number;
  type?: 'rank' | 'recent';
}

export const ArticlesCampaingsRankorRecentComponent: React.FC<
  ArticleCampaingsTopParams
> = ({ title, sequence, image, position, ideasQuantity, id }): JSX.Element => {
  const { push } = useRouter();
  const handleNewIdea = useCallback(() => {
    push(
      `/campaign/detailed-campaign/?campaignId=${id}`,
      '/campanha/detalhes',
      {
        shallow: true,
      }
    );
  }, [push, id]);
  return (
    <ContainerCampaingRank onClick={handleNewIdea}>
      <ContentCampaingRank>
        <ContentCampaingRankImage img={image} />
        <ContentCampaingRankText>
          <span>#{sequence}</span>
          <h2>{title}</h2>
        </ContentCampaingRankText>
      </ContentCampaingRank>
      <ContentCampaingRankDown>
        <Box>
          <ContentCampaingRankDownPosition>
            {position}
          </ContentCampaingRankDownPosition>
          <ContentCampaingRankDownQnt>
            {ideasQuantity}
          </ContentCampaingRankDownQnt>
        </Box>
        <ContentCampaingRankIdeias>Ideais criadas</ContentCampaingRankIdeias>
      </ContentCampaingRankDown>
    </ContainerCampaingRank>
  );
};
