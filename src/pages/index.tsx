import HomePage from '@components/PageComponents/Home';
import { Container } from '@components/Container';
import { CampaignProvider } from 'contexts/Campaign';
import { ProviderUser } from 'contexts/User';
import { ConfigProvider } from 'contexts/ConfigContext';
import { BannersProvider } from 'contexts/Banners';
import { withSSRAuth } from 'utils/withSSRAuth';
import { QueryContext } from 'contexts/QueryClient';

export default function Home() {
  return (
    <QueryContext>
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
    </QueryContext>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
