import { CampaingImage, CampaingText, Container } from './styles';

interface ArticleCampaingsParams {
  imagem?: string;
  hashtag?: string;
  title: string;
}

export const CampaingView: React.FC<ArticleCampaingsParams> = ({
  title,
  hashtag,
  imagem,
}): JSX.Element => {
  return (
    <Container>
      <CampaingImage $img={imagem} />
      <div className="fade-line" />
      <CampaingText>
        <div>
          <span>{hashtag}</span>
          <h2>{title}</h2>
        </div>
      </CampaingText>
    </Container>
  );
};
