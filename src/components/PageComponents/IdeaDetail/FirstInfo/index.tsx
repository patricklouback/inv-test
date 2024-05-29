import React from 'react';
import { UserCard } from '@components/CardUser';

import { Idea } from 'interfaces/idea';
import {
  IdeaAppId,
  ItemBoxParticip,
  LIstBBoxParticip,
  TitleTextFirst,
  ValueBoxParticip,
  ValueTextFirst,
  WapperBoxParticip,
  WapperCampaign,
  WapperFirstInfoIdea,
  WapperTextFirst,
} from './styles';

interface FirstInfoProps {
  idea: Idea;
}

export const FirstInfo: React.FC<FirstInfoProps> = ({ idea }): JSX.Element => {
  const getSequenceNumber = React.useCallback((sequence: number): string => {
    if (sequence >= 100000) {
      return sequence.toString();
    }
    const paddedSequence = sequence.toString().padStart(6, '0');
    return paddedSequence;
  },[])

  return (
    <WapperFirstInfoIdea>
      <WapperTextFirst>
        <ValueTextFirst>
          <WapperCampaign>
            <strong>#{idea?.campaign?.sequence}</strong>
            {idea?.campaign?.title}
          </WapperCampaign>
          <IdeaAppId>#{getSequenceNumber(idea?.sequence)}</IdeaAppId>
        </ValueTextFirst>

        <TitleTextFirst>{idea?.title}</TitleTextFirst>
      </WapperTextFirst>
      <WapperBoxParticip>
        <ValueBoxParticip>Participantes da Iniciativa</ValueBoxParticip>
        <LIstBBoxParticip>
          {idea?.ideaUsers.map(item => (
            <ItemBoxParticip key={item.id}>
              <UserCard name={item.user.name} image={item.user.image} />
            </ItemBoxParticip>
          ))}
        </LIstBBoxParticip>
      </WapperBoxParticip>
    </WapperFirstInfoIdea>
  );
};
