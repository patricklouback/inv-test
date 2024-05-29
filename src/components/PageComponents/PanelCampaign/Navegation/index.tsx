import ButtonLink from '@components/Link';
import { CampaignContext } from 'contexts/Campaign';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import {
  Active,
  Container,
  WapperButton,
  WapperDownloadAndNewCampButtons,
} from './styles';

interface NavigationParams {}

export const Navegation: React.FC<NavigationParams> = (): JSX.Element => {
  const { colors } = useTheme();
  const { resetCampaign } = useContext(CampaignContext);

  const { asPath } = useRouter();

  return (
    <Container>
      <WapperDownloadAndNewCampButtons>
        <WapperButton className="button-new-campaign">
          {asPath.split('/')[2] === 'new-campaign' && <Active />}
          <ButtonLink
            onClick={resetCampaign}
            value="Novo Direcional"
            link="/campaign/new-campaign"
            center={false}
            max={250}
            background={colors.primary}
            color={colors.background}
            Icon={<RiTrophyLine color={colors.background} size={20} />}
          />
        </WapperButton>
      </WapperDownloadAndNewCampButtons>
    </Container>
  );
};
