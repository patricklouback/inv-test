// import { Container } from '@components/Container';
import { PageTitle } from '@components/PageTitle';
import { CampaignContext } from 'contexts/Campaign';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Container as ContainerPage } from '@components/Container';
import { ProviderUser } from 'contexts/User';
import { BackToTop } from '@components/BackToTop';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { BackButton, Container, ContentPage } from './styles';

export const DetailedCampaignPage: React.FC = (): JSX.Element => {
  const { query, back } = useRouter();
  const { getCampaign, campaign } = useContext(CampaignContext);
  const { campaignId } = query;

  useEffect(() => {
    async function loadData(): Promise<void> {
      await getCampaign(String(campaignId));
    }
    if (campaignId) {
      loadData();
    }
  }, [campaignId, getCampaign]);

  return (
    <ContainerPage>
      <Container>
        <BackButton onClick={() => back()}>
          <BiLeftArrowAlt size={20} />
          <span>Voltar</span>
        </BackButton>
        <PageTitle title="Direcional de Inovação" />
        {campaign?.id && (
          <ContentPage>
            <Header />
            <Main />
            <ProviderUser>
              <Footer campaignId={campaign.id} />
            </ProviderUser>
            <BackToTop />
          </ContentPage>
        )}
      </Container>
    </ContainerPage>
  );
};
