import { RiTrophyLine } from 'react-icons/ri';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useTheme } from 'styled-components';

import { ArticlesCampaingsComponent } from '@components/CampaignDefault';
import { DefaultSection } from '@components/SectionDefault';
import { AuthContext } from 'contexts/AuthContext';
import { CampaignContext } from 'contexts/Campaign';
import { TourId, TourStatus } from 'interfaces/tour';
import { useContext, useEffect, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import {
  Container,
  CustomArrowLeft,
  CustomArrowRight,
  ListCampaing,
  WapperEmpity,
} from './styles';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1100 },
    items: 2,
    partialVisibilityGutter: 90,
  },
  desktop: {
    breakpoint: { max: 1100, min: 730 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 730, min: 520 },
    items: 1,
    partialVisibilityGutter: 180,
  },
  mobile: {
    breakpoint: { max: 520, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};

export default function CampaingComponent(): JSX.Element {
  const { colors } = useTheme();
  const { token, user } = useContext(AuthContext);
  const unviewedHomeTour = user?.tours[TourId.HOME] === TourStatus.UNVIEWED;
  const { loadCampaignsUserArea, campaigns, loading } =
    useContext(CampaignContext);
  const [campaignsNotFinished, setCampaingsNotFinished] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 510) {
        setIsMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadCampaignsUserArea();
    }
  }, [loadCampaignsUserArea, token]);


  useEffect(() => {
    setCampaingsNotFinished(
      campaigns.filter(
        campaing => new Date(campaing.endDate).getTime() > Date.now()
      )
    );
  }, [campaigns]);

  return (
    <Container>
      <DefaultSection
        header={{
          title: 'Direcionais de inovação recentes',
          box_icon: <RiTrophyLine color={colors.font} size={20} />,
        }}
        type="normal"
      >
        <ListCampaing>
          {!loading && campaignsNotFinished.length === 0 ? (
            <WapperEmpity>
              <p>Não há direcionais de inovação disponíveis no momento.</p>
            </WapperEmpity>
          ) : (
            <Carousel
              draggable
              renderDotsOutside={false}
              showDots
              responsive={responsive}
              partialVisible
              autoPlaySpeed={6000}
              swipeable={isMobile}
              autoPlay={!isMobile && !unviewedHomeTour}
              // centerMode={isMobile}
              infinite
              customTransition="all 1s"
              itemClass="custom-react-carousel-item"
              containerClass="custom-container--class"
              dotListClass="custom-dot--active"
              removeArrowOnDeviceType={['tablet', 'mobile']}
              customLeftArrow={
                <CustomArrowLeft>
                  <HiOutlineChevronLeft size={40} />
                </CustomArrowLeft>
              }
              customRightArrow={
                <CustomArrowRight>
                  <HiOutlineChevronRight size={40} />
                </CustomArrowRight>
              }
            >
              {loading
                ? [1, 2, 3].map(i => (
                    <Skeleton
                      key={i}
                      className="campaigns-sekeleton"
                      containerClassName="container-campaigns-skeleton"
                      count={1}
                    />
                  ))
                : campaignsNotFinished.map((campaign, index) => (
                    <ArticlesCampaingsComponent
                      key={campaign.id}
                      campaignData={campaign}
                      index={index}
                    />
                  ))}
            </Carousel>
          )}
        </ListCampaing>
      </DefaultSection>
    </Container>
  );
}
