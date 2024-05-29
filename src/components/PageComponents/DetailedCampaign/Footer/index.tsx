import React, { useCallback, useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { ItemIdeaSent } from '@components/IdeaSent';
import 'react-multi-carousel/lib/styles.css';
import { IdeaContext } from 'contexts/Idea';
import { IdeaViewMore } from '@components/Modals/IdeaViewMoreModal';
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
    partialVisibilityGutter: 30,
  },
};

interface FooterProps {
  campaignId: string;
}

export function Footer({ campaignId }: FooterProps): JSX.Element {
  const { viewIdea, ideas, idea, getIdeasByCampaignId } =
    useContext(IdeaContext);

  const [isOpenIdeaViewMoreModal, setIsOpenIdeaViewMoreModal] = useState(false);

  const handleOpenIdeaViewMoreModal = useCallback(
    async (ideaId: string) => {
      await viewIdea(ideaId);
      setIsOpenIdeaViewMoreModal(true);
    },
    [viewIdea]
  );

  const handleCloseIdeaViewMoreModal = useCallback(() => {
    setIsOpenIdeaViewMoreModal(false);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if(window.innerWidth < 510) {
        setIsMobile(true)
      }
    }

  }, [])

  useEffect(() => {
    async function getData(): Promise<void> {
      await getIdeasByCampaignId(campaignId);
    }

    if (campaignId) {
      getData();
    }
  }, [campaignId, getIdeasByCampaignId]);

  return (
    <Container>
      {idea?.id && (
        <IdeaViewMore
          isOpen={isOpenIdeaViewMoreModal}
          ideaId={idea.id}
          onRequestClose={handleCloseIdeaViewMoreModal}
        />
      )}
      {ideas.length > 0 && (
        <>
          <h2>Últimas iniciativas enviadas</h2>

          <ListCampaing>
            <Carousel
              renderDotsOutside={false}
              showDots={!isMobile}
              responsive={responsive}
              partialVisible
              autoPlaySpeed={6000}
              autoPlay={!isMobile}
              infinite
              customTransition="all 1s"
              dotListClass="custom-dot--active"
              arrows={false}
              itemClass="gap-between-items"
            >
              {ideas.map(idea => (
                <Item key={idea.id}>
                  <ItemIdeaSent
                    onClick={() => handleOpenIdeaViewMoreModal(idea.id)}
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
}
