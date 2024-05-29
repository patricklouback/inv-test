/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ViewFilter } from '@components/ViewFilter';
import { CampaignContext } from 'contexts/Campaign';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Item } from './Item';
import { Container, ViewItem } from './styles';

export const ViewCampaign: React.FC = (): JSX.Element => {
  const { loadAllCampaigns, campaigns, loading } = useContext(CampaignContext);

  useEffect(() => {
    loadAllCampaigns();
  }, [loadAllCampaigns]);

  return (
    <Container>
      <ViewFilter qnt={campaigns.length}>
        {loading && <p>Carregando</p>}
        {campaigns?.map(item => (
          <Link href={`/campaign/${item.id}`} key={item.id}>
            <ViewItem>
              <Item item={item} />
            </ViewItem>
          </Link>
        ))}
      </ViewFilter>
    </Container>
  );
};
