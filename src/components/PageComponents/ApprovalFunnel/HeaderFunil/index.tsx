import { BiLeftArrowAlt } from 'react-icons/bi';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { BannerComponent } from '@components/Banner';
import { IoMdClose } from 'react-icons/io';
import { useTheme } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { BannersContext } from 'contexts/Banners';
import { User } from 'interfaces/user';
import {
  BackButton,
  SectionHeader,
  Leftside,
  LeftsideIcon,
  LeftsideTitle,
  BannerContentWrapper,
  BannerWrapperContainer,
  SectionBanner,
  BannerSubtitle,
  BannerTitle,
  GoToLink,
  Separator,
} from './styles';
import { ActionButtonWrapper, CloseButtonWrapper } from '../styles';


export function HeaderFunil({user}: {user: User}) {
  const { back, push } = useRouter();
  const { colors } = useTheme();
  const { bannersList } = useContext(BannersContext);

  // states
  const [isBannerActive, setIsBannerActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function actionButton(url: string): void {
    window.open(url, '_blank');
  }

  useEffect(() => {
    if (user?.isAdmin || user?.isManager) {
      setIsBannerActive(true);
    }
  }, [user]);


  return (
    <>
      <BackButton onClick={() => back()}>
        <BiLeftArrowAlt size={20} />
        <span>Voltar</span>
      </BackButton>
      <SectionHeader>
        <Leftside>
          <LeftsideIcon>
            <RiLightbulbFlashLine size={26} />
          </LeftsideIcon>
          <LeftsideTitle>Funil de Aprovação</LeftsideTitle>
        </Leftside>
      </SectionHeader>
      <SectionBanner $isOpen={isBannerActive}>
        {bannersList && bannersList.length > 0 && (
          <BannerComponent banner={bannersList[0]}>
            <BannerWrapperContainer>
              <BannerContentWrapper>
                <BannerTitle>{bannersList[0].title}</BannerTitle>
                <BannerSubtitle>{bannersList[0].subtitle}</BannerSubtitle>
              </BannerContentWrapper>
              <Separator />
              <GoToLink onClick={() => push('/knowledge-trail')}>
                Ver vídeos
              </GoToLink>
              <ActionButtonWrapper
                onClick={() => actionButton('/Cardapio_de_mentorias.pdf')}
              >
                Conhecer Mentorias
              </ActionButtonWrapper>
              <CloseButtonWrapper onClick={() => setIsBannerActive(false)}>
                <IoMdClose
                  size={25}
                  color={isHovered ? colors.background : colors.font}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              </CloseButtonWrapper>
            </BannerWrapperContainer>
          </BannerComponent>
        )}
      </SectionBanner>
    </>
  );
}
