/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { HiOutlineSquaresPlus } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { RiFilePaperLine } from 'react-icons/ri';
import { TbPencilCog } from 'react-icons/tb';
import { useTheme } from 'styled-components';

import { ApresentationCompany } from '@components/Apresentation';
import { BannerComponent } from '@components/Banner';
import { Container } from '@components/Container';
import { InfoWarning } from '@components/InfoWarning';
import { DefaultSection } from '@components/SectionDefault';

import { TourManagementPlatform } from '@components/TourApp/TourManagementPlatform';
import { AreaProvider } from 'contexts/AreaContext';
import { AuthContext } from 'contexts/AuthContext';
import { BannersContext } from 'contexts/Banners';
import { CampaignProvider } from 'contexts/Campaign';
import { ConfigContext } from 'contexts/ConfigContext';
import { DepartamentProvider } from 'contexts/DepartamentContext';
import { ProcessActivityProvider } from 'contexts/ProcessActivity';
import { FeatureActiveProvider } from 'contexts/FeatureActive';
import { EvaluationCriteriaConfigurationProvider } from 'contexts/EvaluationCriteriaConfiguration';
import { TourId, TourStatus } from 'interfaces/tour';

import { slug, styleSlug } from 'utils/constants';
import { SectionAreasAndDepts } from './AreasAndDepts';
import { SectionCustomizeInterface } from './CustomizeInterface';
import { SectionFormCampaign } from './FormCampaign';
import { SectionFormIdea } from './FormIdea';
import { SectionProcessActivity } from './ProcessActivity';
import { SectionScoreSetting } from './ScoreSetting';
import { SectionKanbanSteps } from './FormKanbanSteps';
import { EvaluationCriteriaConfig } from './EvaluationCriteriaConfig';
import { SectionKind } from './SectionKind';
import { SectionTermsOfUse } from './TermsOfUse';
import {
  ActionButtonWrapper,
  BannerSubtitle,
  BannerTitle,
  BottomActionButtonWrapper,
  BottomAllContent,
  BottomBannerContentWrapper,
  C,
  CloseButtonWrapper,
  ListAndContentContainer,
  SectionBanner,
  SectionContent,
  SectionItem,
  SectionsList,
  TopAllContent,
  TopBannerContentWrapper,
} from './styles';

export type TSection = 'general' | 'templates';

export const ManagementPlatformPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();

  const { user } = useContext(AuthContext);
  const unviewedTourManagementPlatform =
    user?.tours[TourId.MANAGEMENT_PLATFORM] === TourStatus.UNVIEWED;

  const { getGlobalConfigs } = useContext(ConfigContext);

  const { getBannersForPage, bannersList } = useContext(BannersContext);

  const [isBannerActive, setIsBannerActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [section, setSection] = useState<TSection>('general');
  const [reRenderComponent, setReRenderComponent] = useState<boolean>(false);

  const isTrial = slug === 'trial';

  function closeBanner(): void {
    setIsBannerActive(false);
  }

  function actionButton(url: string): void {
    window.open(url, '_blank');
  }

  function handleSetSection(section: TSection): void {
    setSection(section);
  }

  const handleImportProcessActivities = useCallback(() => {
    setReRenderComponent(true);
  }, []);

  useEffect(() => {
    if (reRenderComponent) {
      setReRenderComponent(false);
    }
  }, [reRenderComponent]);

  useEffect(() => {
    (async () => {
      await getGlobalConfigs();

      await getBannersForPage('APP_CONFIG', isTrial);
    })();
  }, [getGlobalConfigs, getBannersForPage, isTrial]);

  return (
    <Container>
      <C>
        <ApresentationCompany />
        <DefaultSection
          type="normal"
          header={{
            title: 'Gestão de Plataforma',
            box_icon: <RiFilePaperLine color={colors.font} size={20} />,
          }}
          to_back="/"
        >
          <>
            {isTrial ? (
              <SectionBanner $isOpen={isBannerActive}>
                {bannersList && bannersList.length > 0 && (
                  <BannerComponent banner={bannersList[0]}>
                    <TopAllContent>
                      <TopBannerContentWrapper>
                        <BannerTitle>{bannersList[0].title}</BannerTitle>
                        <BannerSubtitle>
                          {bannersList[0].subtitle}
                        </BannerSubtitle>
                        <ActionButtonWrapper
                          onClick={() =>
                            actionButton(
                              'https://outlook.office365.com/owa/calendar/ParaconheceroLabi@inventta.net/bookings/'
                            )
                          }
                        >
                          Agende demonstração guiada
                        </ActionButtonWrapper>
                      </TopBannerContentWrapper>
                      <CloseButtonWrapper onClick={() => closeBanner()}>
                        <IoMdClose
                          size={25}
                          color={
                            isHovered
                              ? colors.primaryLight[styleSlug]
                              : colors.font
                          }
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        />
                      </CloseButtonWrapper>
                    </TopAllContent>
                  </BannerComponent>
                )}
              </SectionBanner>
            ) : null}

            <ListAndContentContainer>
              <SectionsList>
                <SectionItem
                  onClick={() => handleSetSection('general')}
                  sectionActive={section === 'general'}
                >
                  <TbPencilCog size={22} />
                  Geral
                </SectionItem>
                <SectionItem
                  onClick={() => handleSetSection('templates')}
                  sectionActive={section === 'templates'}
                >
                  <HiOutlineSquaresPlus size={22} />
                  Template
                </SectionItem>
              </SectionsList>
              <SectionContent>
                <ProcessActivityProvider>
                  <CampaignProvider>
                    <AreaProvider>
                      <DepartamentProvider>
                        {section === 'general' ? (
                          <SectionKind
                            kind="general"
                            section={section}
                            title="Geral"
                            subtitle="Ajuste os espaços na interface conforme as suas preferências e crie um ambiente alinhado com as necessidades da sua organização."
                          >
                            <SectionCustomizeInterface />
                            <SectionAreasAndDepts />
                            <SectionTermsOfUse />
                            <SectionKanbanSteps />
                            <SectionScoreSetting />
                          </SectionKind>
                        ) : (
                          <SectionKind
                            kind="templates"
                            section={section}
                            title="Templates"
                            subtitle="Crie modelos para otimizar seu fluxo de trabalho e garantir a consistência. Você pode importá-los nos direcionais de inovação. "
                          >
                            {unviewedTourManagementPlatform && (
                              <TourManagementPlatform />
                            )}
                            <InfoWarning
                              type="WARNING"
                              text="Cada alteração realizada requer uma nova importação do template correspondente."
                            />
                            <SectionFormCampaign />
                            <SectionFormIdea />
                            <FeatureActiveProvider>
                              <EvaluationCriteriaConfigurationProvider>
                                <EvaluationCriteriaConfig />
                              </EvaluationCriteriaConfigurationProvider>
                            </FeatureActiveProvider>
                            <SectionProcessActivity
                              reRenderComponent={reRenderComponent}
                              setReRenderComponent={
                                handleImportProcessActivities
                              }
                            />
                          </SectionKind>
                        )}
                      </DepartamentProvider>
                    </AreaProvider>
                  </CampaignProvider>
                </ProcessActivityProvider>
                {!isTrial && (
                  <SectionBanner $isOpen={isBannerActive}>
                    {bannersList && bannersList.length > 0 && (
                      <BannerComponent banner={bannersList[0]}>
                        <BottomAllContent>
                          <HiOutlinePencilAlt size={50} />
                          <BottomBannerContentWrapper>
                            <BannerTitle>{bannersList[0].title}</BannerTitle>
                            <BannerSubtitle>
                              {bannersList[0].subtitle}
                            </BannerSubtitle>
                          </BottomBannerContentWrapper>
                          <BottomActionButtonWrapper
                            onClick={() =>
                              actionButton(
                                'https://forms.office.com/Pages/ResponsePage.aspx?id=ZLgr40a_YUuO6r-9FpWtpCLHYHWMYSFLhg9PonWK1aBURVU3MUk3QjVNTE1UTVQySFpWV1A4NURJWiQlQCN0PWcu'
                              )
                            }
                          >
                            Fazer Solicitação
                          </BottomActionButtonWrapper>
                        </BottomAllContent>
                      </BannerComponent>
                    )}
                  </SectionBanner>
                )}
              </SectionContent>
            </ListAndContentContainer>
          </>
        </DefaultSection>
      </C>
    </Container>
  );
};
