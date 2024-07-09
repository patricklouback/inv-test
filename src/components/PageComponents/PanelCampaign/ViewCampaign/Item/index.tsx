import { Campaign } from '@default-types';
import React from 'react';
import { useTheme } from 'styled-components';
import { styleSlug } from 'utils/constants';
import {
  Container,
  Top,
  Status,
  BallStatus,
  Title,
  ListTag,
  ItemTag,
} from './styles';

interface ItemProps {
  item: Campaign;
}

export const Item: React.FC<ItemProps> = ({ item }): JSX.Element => {
  const { status, title, sequence, campaignAreas } = item;
  const { colors } = useTheme();
  const backgroundStatus =
    (status === 'PUBLISHED' && colors.terceary[styleSlug]) ||
    (status === 'WAITING' && colors.blue) ||
    (status === 'INACTIVE' && colors.grey);

  const textStatus =
    (status === 'PUBLISHED' && 'Ativa') ||
    (status === 'WAITING' && 'Rascunho') ||
    (status === 'INACTIVE' && 'Inativa');

  return (
    <Container status={backgroundStatus}>
      <div>
        <Status>
          <span>{textStatus}</span>
          <BallStatus status={backgroundStatus} />
        </Status>

        <Top>
          <Title>
            #{sequence?.toString().padStart(2, '0')} <span>{title}</span>
          </Title>
        </Top>
        {/* <p style={{ paddingTop: 10 }}>{description}</p> */}
      </div>
      <ListTag>
        {campaignAreas.map(area => (
          <ItemTag $background={area.color}>{area.name}</ItemTag>
        ))}
      </ListTag>
    </Container>
  );
};
