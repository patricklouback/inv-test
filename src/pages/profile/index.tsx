import { ProfilePage } from '@components/PageComponents/Profile';
import { AreaProvider } from 'contexts/AreaContext';
import { DepartamentProvider } from 'contexts/DepartamentContext';
import { ProviderUser } from 'contexts/User';
import { BannersProvider } from 'contexts/Banners';

export default function Profile() {
  return (
    <ProviderUser>
      <AreaProvider>
        <DepartamentProvider>
          <BannersProvider>
            <ProfilePage />
          </BannersProvider>
        </DepartamentProvider>
      </AreaProvider>
    </ProviderUser>
  );
}
