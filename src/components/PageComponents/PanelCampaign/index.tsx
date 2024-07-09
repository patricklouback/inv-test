import { DefaultSection } from '@components/SectionDefault';
import { TourCampaignStep1 } from '@components/TourApp/TourCampaign/Step1';
import { AuthContext } from 'contexts/AuthContext';
import { TourId, TourStatus } from 'interfaces/tour';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { ItemTrailComponent } from '@components/TrailPage';
import { CampaignProvider } from 'contexts/Campaign';
import { Container } from '@components/Container';
import { CampaignUsersProvider } from 'contexts/CampaignUsers';
import { BannersContext } from 'contexts/Banners';
import { BannerComponent } from '@components/Banner';
import { ProcessActivityProvider } from 'contexts/ProcessActivity';
import { EvaluationCriteriaCampaignProvider } from 'contexts/EvaluationCriteriaCampaign';
import { EvaluationCriteriaConfigurationProvider } from 'contexts/EvaluationCriteriaConfiguration';
import { HistoryItensProvider } from 'contexts/History';
import { slug } from 'utils/constants';
import { ViewCampaign } from './ViewCampaign';
import { NewCampaign } from './PageCreate';
import { Navegation } from './Navegation';
import {
  ActionButtonWrapper,
  BannerContentWrapper,
  BannerSubtitle,
  BannerTitle,
  BannerWrapperContainer,
  Container as C,
  CloseButtonWrapper,
  ContainerRender,
  ContentPage,
  NoCampaignSelect,
  SectionBanner,
  Separator,
} from './styles';

interface RenderPagesParams {
  manageCampaign?: boolean;
  campaignId?: string;
}

export function PanelCampaign({
  manageCampaign,
  campaignId,
}: RenderPagesParams): JSX.Element {
  const { colors } = useTheme();
  const { back } = useRouter();

  const { getBannersForPage, bannersList } = useContext(BannersContext);
  const { user } = useContext(AuthContext);
  const unviewedCampaignStep1 =
    user?.tours[TourId.CAMPAIGN_STEP_ONE] === TourStatus.UNVIEWED;

  const [isBannerActive, setIsBannerActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isTrial = slug === 'trial';

  function closeBanner(): void {
    setIsBannerActive(false);
  }

  const actionButton = useCallback((isTrial: boolean): Window => {
    if (isTrial) {
      return window.open('https://www.labinventta.com.br/price.php', '_blank');
    }
    return window.open('/Cardapio_de_mentorias.pdf', '_blank');
  }, []);

  useEffect(() => {
    (async (): Promise<void> => {
      await getBannersForPage('CAMPAIGN_MANAGEMENT', isTrial);
    })();
  }, [getBannersForPage, isTrial]);

  return (
    <Container>
      {unviewedCampaignStep1 && <TourCampaignStep1 />}
      <C>
        <DefaultSection
          type="normal"
          header={{
            children: (
              <ItemTrailComponent
                data={[
                  'Painel de Gestão',
                  manageCampaign
                    ? `${campaignId ? 'Editar Direcional' : 'Novo Direcional'} `
                    : null,
                ]}
              />
            ),
            box_icon: <RiTrophyLine color={colors.font} size={20} />,
          }}
          back={() => back()}
        >
          <>
            <SectionBanner $isOpen={isBannerActive}>
              {bannersList && bannersList.length > 0 && (
                <BannerComponent banner={bannersList[0]}>
                  <BannerWrapperContainer>
                    <BannerContentWrapper>
                      <BannerTitle>{bannersList[0].title}</BannerTitle>
                      <BannerSubtitle>{bannersList[0].subtitle}</BannerSubtitle>
                    </BannerContentWrapper>
                    <Separator />
                    <ActionButtonWrapper
                      onClick={() => {
                        actionButton(isTrial);
                      }}
                    >
                      {isTrial ? 'Conhecer Planos' : 'Conhecer mentorias'}
                    </ActionButtonWrapper>
                    <CloseButtonWrapper onClick={() => closeBanner()}>
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
            <ContentPage>
              <ViewCampaign />
              <ProcessActivityProvider>
                <CampaignProvider>
                  <CampaignUsersProvider>
                    <EvaluationCriteriaCampaignProvider>
                      <EvaluationCriteriaConfigurationProvider>
                        <HistoryItensProvider>
                          <ContainerRender>
                            <Navegation />
                            {manageCampaign ? (
                              <NewCampaign campaignId={campaignId} />
                            ) : (
                              <NoCampaignSelect>
                                <img
                                  src="/images/campaign/indicators/campaign-ilustration.svg"
                                  alt=""
                                />
                                <h3 className="title">
                                  Gerencie os Direcionais de Inovação
                                </h3>
                                <p className="subtitle">
                                  Escolha um direcional ao lado ou clique acima
                                  para criar um novo
                                </p>
                              </NoCampaignSelect>
                            )}
                          </ContainerRender>
                        </HistoryItensProvider>
                      </EvaluationCriteriaConfigurationProvider>
                    </EvaluationCriteriaCampaignProvider>
                  </CampaignUsersProvider>
                </CampaignProvider>
              </ProcessActivityProvider>
            </ContentPage>
          </>
        </DefaultSection>
      </C>
    </Container>
  );
}
