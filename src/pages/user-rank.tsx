import { UserRankPage } from '@components/PageComponents/UserRankPage';
import { ProviderAdm } from 'contexts/Adm';
import { AreaProvider } from 'contexts/AreaContext';
import { DepartamentProvider } from 'contexts/DepartamentContext';
import { ProviderRankUsers } from 'contexts/RankUser';

export default function UserRank(): JSX.Element {
  return (
    <AreaProvider>
      <DepartamentProvider>
        <ProviderAdm>
          <ProviderRankUsers>
            <UserRankPage />
          </ProviderRankUsers>
        </ProviderAdm>
      </DepartamentProvider>
    </AreaProvider>
  );
}
