import { UserContext } from 'contexts/User';
import { useContext, useEffect, useState } from 'react';
import { HomePageBanners } from './HomePageBanners';
import { InfoPublic } from './InfoPublic';
import { InfoUsers } from './InfoUsers';
import { CampaingRecent } from './Recent';
import { Container } from './styles';

export const ContentLeft: React.FC = (): JSX.Element => {
  const { listTopUsers } = useContext(UserContext);

  const [userRank, setUserRank] = useState([]);

  useEffect(() => {
    async function loadTopUsers(): Promise<void> {
      const data = await listTopUsers();
      setUserRank(data);
    }

    loadTopUsers();
  }, [listTopUsers]);
  return (
    <Container>
      <HomePageBanners />
      {/* <CampaingRank /> */}
      <CampaingRecent />
      <InfoPublic />
      <InfoUsers data={userRank} />
    </Container>
  );
};
