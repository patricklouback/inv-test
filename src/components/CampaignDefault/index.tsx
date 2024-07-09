import { Campaign } from '@default-types';
import { AuthContext } from 'contexts/AuthContext';
import { ListenSizeContext } from 'contexts/ListenSize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import { FiPlus } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import {
  ButtonLink,
  CampaingImage,
  CampaingText,
  Container,
  Line,
  Tag,
} from './styles';

interface ArticleCampaingsParams {
  campaignData: Campaign;
  index: number;
}

export const ArticlesCampaingsComponent: React.FC<ArticleCampaingsParams> = ({
  campaignData,
  index,
}): JSX.Element => {
  const { push } = useRouter();
  const { size } = useContext(ListenSizeContext);
  const { user } = useContext(AuthContext);

  const handleNewIdea = useCallback(() => {
    push(`/idea/manage/${campaignData.id}`);
  }, [push, campaignData.id]);

  const isCampaingFromSameUserArea =
    campaignData?.campaignAreas?.filter(
      campaingArea => campaingArea.id === user.areaId
    ).length > 0;

  const isCampaingForAllAreas = campaignData?.campaignAreas?.length === 0;

  const isCampaingPublished = campaignData?.status === 'PUBLISHED';

  const isFinished = new Date(campaignData.endDate).getTime() < Date.now();

  const showCreateIdeaButton =
    isCampaingPublished &&
    (isCampaingFromSameUserArea || isCampaingForAllAreas || user.isAdmin);

  return (
    <div style={{ height: '100%' }}>
      <Container description={!!campaignData?.description}>
        <Link
          href={`/campaign/detailed-campaign/?campaignId=${campaignData?.id}`}
        >
          <CampaingImage $img={campaignData?.image} imgFilter={isFinished} />
        </Link>
        {showCreateIdeaButton && !isFinished && (
          <ButtonLink onClick={handleNewIdea} className={`carrossel-${index}`}>
            <FiPlus size={18} />
            <span>Criar iniciativa</span>
          </ButtonLink>
        )}
        <Link
          href={`/campaign/detailed-campaign/?campaignId=${campaignData?.id}`}
        >
          <div>
            <Line />
            <CampaingText size={size} description={!!campaignData?.summary}>
              <div>
                <span>Direcional #{campaignData?.sequence}</span>
                {isFinished && <Tag>Não aceita novas iniciativas</Tag>}
                <h2>{campaignData?.title}</h2>
              </div>
              <ReactMarkdown className='markdown'>
                {!!campaignData?.summary && campaignData?.summary}
              </ReactMarkdown>
            </CampaingText>
          </div>
        </Link>
      </Container>
    </div>
  );
};
