import { CampaignContext } from 'contexts/Campaign';
import { IdeaContext } from 'contexts/Idea';
import React, { useCallback, useContext, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { RiFilter2Line } from 'react-icons/ri';
import {
  ContainerInput,
  ItemContainer,
  BoxIcons,
  Options,
  List,
  Item,
  ItemBox,
  Exit,
} from './styles';

interface FilterProps {
  screen: string;
}

export const FilterComponent = ({ screen }: FilterProps) => {
  const [open, setOpen] = useState(false);
  const { getIdeas, getIdeasForUserArea } = useContext(IdeaContext);
  const { loadCampaignsUserArea } = useContext(CampaignContext);

  const onReloadData = useCallback(
    (order): void => {
      if (screen === 'ideas') {
        getIdeasForUserArea({
          orderColumn: 'createdAt',
          orderOrientation: order,
          status: 'PUBLISHED',
        });
      }
      if (screen === 'campaigns') {
        loadCampaignsUserArea({
          orderColumn: 'createdAt',
          orderOrientation: order,
        });
      }
      setOpen(false);
    },
    [getIdeas, screen, loadCampaignsUserArea]
  );
  const onReloadByLikes = useCallback((): void => {
    getIdeasForUserArea({
      orderColumn: 'likes',
      orderOrientation: 'desc',
      status: 'PUBLISHED',
    });
  }, [getIdeas]);

  return (
    <>
      <ItemContainer>
        <ContainerInput onClick={() => setOpen(true)}>
          <input type="text" name="" value="Ordenar por" disabled />
          <BoxIcons>
            <AiFillCaretDown size={13} />
            <RiFilter2Line size={27} />
          </BoxIcons>
        </ContainerInput>
        {open && (
          <>
            <Options>
              <List>
                <Item onClick={() => onReloadData('desc')}>Mais Recentes</Item>
                <Item onClick={() => onReloadData('asc')}>Mais Antigas</Item>
                {screen === 'ideas' && (
                  <Item onClick={() => onReloadByLikes()}>Mais Curtidas</Item>
                )}
              </List>
            </Options>
            <ItemBox />
          </>
        )}
      </ItemContainer>
      {open && <Exit onClick={() => setOpen(false)} />}
    </>
  );
};
