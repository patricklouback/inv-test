import { ItemIdeaSent } from '@components/IdeaSent';
import { IdeaDetail } from '@components/Modals/IdeaDetail';
import { IdeaContext } from 'contexts/Idea';
import { useCallback, useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, ListCampaing, Item } from './styles';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 94,
  },
  tablet: {
    breakpoint: { max: 1024, min: 664 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 664, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};

export const Ideas: React.FC = (): JSX.Element => {
  const { getLast6Ideas, last6ideas, idea, viewIdea } = useContext(IdeaContext);

  const [openDetailIdeaModal, setOpenDetailIdeaModal] = useState(false);

  const handleOpenIdea = useCallback(
    async (ideaId: string) => {
      await viewIdea(ideaId);
      setOpenDetailIdeaModal(true);
    },
    [viewIdea]
  );

  const handleCloseModal = useCallback(() => {
    setOpenDetailIdeaModal(false);
  }, []);

  useEffect(() => {
    getLast6Ideas();
  }, [getLast6Ideas]);

  return (
    <Container>
      {idea?.id && openDetailIdeaModal && (
        <IdeaDetail idea={idea} closeModal={handleCloseModal} />
      )}
      {last6ideas.length > 0 && (
        <>
          <h2>Últimas iniciativas enviadas</h2>

          <ListCampaing>
            <Carousel
              renderDotsOutside={false}
              showDots
              responsive={responsive}
              partialVisible
              autoPlaySpeed={6000}
              autoPlay
              infinite
              customTransition="all 1s"
              dotListClass="custom-dot--active"
              arrows={false}
              itemClass="gap-between-items"
            >
              {last6ideas.map(idea => (
                <Item key={idea.id}>
                  <ItemIdeaSent
                    onClick={() => handleOpenIdea(idea.id)}
                    idea={idea}
                  />
                </Item>
              ))}
            </Carousel>
          </ListCampaing>
        </>
      )}
    </Container>
  );
};
