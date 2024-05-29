import { BannerComponent } from '@components/Banner';
import { HomeBanner } from '@components/Modals/HomeBannerModal';
import { AuthContext } from 'contexts/AuthContext';
import { BannersContext } from 'contexts/Banners';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  ActionButtonWrapper,
  BannCont,
  BannerSubtitle,
  BannerTitle,
  Container,
  CustomArrowLeft,
  CustomArrowRight,
  ListBanner,
  Title,
  TopAllContent,
  TopBannerContentWrapper,
} from './styles';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1100 },
    items: 1,
    partialVisibilityGutter: 90,
  },
  desktop: {
    breakpoint: { max: 1100, min: 730 },
    items: 1,
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

export const HomePageBanners: React.FC = (): JSX.Element => {
  const { getBannersForPage, bannersList, loading } =
    useContext(BannersContext);

  const { user } = useContext(AuthContext);

  const route = useRouter();

  const isCommonUser = !user?.isAdmin && !user?.isManager;

  const [isMobile, setIsMobile] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isTrial = process.env.NEXT_PUBLIC_CLIENT === 'trial';

  const actionButton = useCallback((index: number) => {
    switch (index) {
      case 0:
        if (isCommonUser) {
          route.push('/knowledge-trail');
        } else {
          setIsModalOpen(true);
        }
        break;
      case 1:
        window.open('/Cardapio_de_mentorias.pdf', '_blank');
        break;
      default:
        return null;
    }
  }, []);

  const buttonText = (index: number, isTrial: boolean): string => {
    if (isTrial) {
      switch (index) {
        case 0:
          return 'Conheça nossa solução';
        case 1:
          return 'Visualizar mentorias';
        default:
          return null;
      }
    }

    switch (index) {
      case 0:
        return isCommonUser ? 'Ver Trilha' : 'Conheça opções';
      case 1:
        return 'Conheça as opções';
      default:
        return null;
    }
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      await getBannersForPage('HOME_PAGE', isTrial);
    };
    loadData();
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 510) {
        setIsMobile(true);
      }
    }
  }, [getBannersForPage, isTrial]);

  return (
    <Container>
      {isModalOpen && (
        <HomeBanner isTrial={isTrial} onRequestClose={handleCloseModal} />
      )}
      <Title>Descubra como podemos te ajudar!</Title>
      <ListBanner>
        <Carousel
          draggable
          renderDotsOutside={false}
          showDots
          responsive={responsive}
          autoPlaySpeed={6000}
          swipeable={isMobile}
          autoPlay={!isMobile}
          centerMode={false}
          infinite
          customTransition="all 1s"
          itemClass="custom-react-carousel-item"
          containerClass="custom-container--class"
          dotListClass="custom-dot--active"
          removeArrowOnDeviceType={[
            'tablet',
            'mobile',
            'desktop',
            'superLargeDesktop',
          ]}
          customLeftArrow={
            <CustomArrowLeft>
              <HiOutlineChevronLeft size={30} />
            </CustomArrowLeft>
          }
          customRightArrow={
            <CustomArrowRight>
              <HiOutlineChevronRight size={30} />
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
            : bannersList.map((banner, index) => (
                <BannCont>
                  <BannerComponent key={banner.id} banner={banner}>
                    <TopAllContent index={index}>
                      <TopBannerContentWrapper index={index}>
                        <BannerTitle>
                          {isCommonUser
                            ? bannersList[index].titleCommonUser
                            : bannersList[index].title}
                        </BannerTitle>
                        <BannerSubtitle index={index} isTrial={isTrial}>
                          {isCommonUser
                            ? bannersList[index].subtitleCommonUser
                            : bannersList[index].subtitle}
                        </BannerSubtitle>
                        {index === 1 && isCommonUser ? undefined : (
                          <ActionButtonWrapper
                            onClick={() => actionButton(index)}
                            index={index}
                          >
                            {buttonText(index, isTrial)}
                          </ActionButtonWrapper>
                        )}
                      </TopBannerContentWrapper>
                    </TopAllContent>
                  </BannerComponent>
                </BannCont>
              ))}
        </Carousel>
      </ListBanner>
    </Container>
  );
};
