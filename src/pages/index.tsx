import HomePage from '@components/PageComponents/Home';
import { Container } from '@components/Container';
import { CampaignProvider } from 'contexts/Campaign';
import { ProviderUser } from 'contexts/User';
import { ConfigProvider } from 'contexts/ConfigContext';
import { BannersProvider } from 'contexts/Banners';
import { withSSRAuth } from 'utils/withSSRAuth';

export default function Home(): JSX.Element {
  return (
    <CampaignProvider>
      <Container>
        <ProviderUser>
          <ConfigProvider>
            <BannersProvider>
              <HomePage />
            </BannersProvider>
          </ConfigProvider>
        </ProviderUser>
      </Container>
    </CampaignProvider>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
