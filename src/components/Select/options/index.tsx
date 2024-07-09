/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import { UserCard } from '@components/CardUser';
import { CampaignContext } from 'contexts/Campaign';
import React, { useCallback, useContext } from 'react';
import { Container, List, Item } from './styles';

interface DataSelectOptions {
  id: string;
  name: string;
  image?: string;
  area?: string;
  areaColor?: string;
}

interface OptionProps {
  dataSelect: DataSelectOptions[];
  onClickOption?: (params?: {
    value?: string;
    campaignId?: string;
    areaId?: string;
  }) => void;
  cleanInput?: any;
}

export const Options: React.FC<OptionProps> = ({
  dataSelect,
  onClickOption,
  cleanInput,
}): JSX.Element => {
  const { campaign } = useContext(CampaignContext);

  const handleSelectItem = useCallback(
    id => {
      cleanInput();
      onClickOption({
        value: id,
        campaignId: campaign?.id,
        areaId: id,
      });
    },
    [campaign?.id, cleanInput, onClickOption]
  );

  return (
    <Container>
      <List>
        {dataSelect?.map((e, i): JSX.Element | null => {
          return (
            <Item onClick={() => handleSelectItem(e.id)} key={i}>
              <UserCard
                isSearch
                name={e.name}
                image={!!e.image && e.image}
                area={e.area}
                areaColor={e.areaColor}
              />
            </Item>
          );
        })}
      </List>
    </Container>
  );
};
