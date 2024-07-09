import React, { useContext } from 'react';
import { UserCard } from '@components/CardUser';

import { Idea } from 'interfaces/idea';
import { AuthContext } from 'contexts/AuthContext';
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
  const { user } = useContext(AuthContext);
  const getSequenceNumber = React.useCallback((sequence: number): string => {
    if (sequence >= 100000) {
      return sequence.toString();
    }
    const paddedSequence = sequence.toString().padStart(6, '0');
    return paddedSequence;
  }, []);

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
        <ValueBoxParticip>Criador da Iniciativa</ValueBoxParticip>
        <LIstBBoxParticip>
          {idea?.ideaUsers
            .filter(users => users.type === 'OWNER')
            .map(item => (
              <ItemBoxParticip key={item.id}>
                <UserCard
                  owner
                  status={item.status}
                  name={item?.user?.name}
                  area={item?.user?.area.name ?? null}
                  areaColor={item?.user?.area.color ?? null}
                />
              </ItemBoxParticip>
            ))}
        </LIstBBoxParticip>
        <ValueBoxParticip>Participantes da Iniciativa</ValueBoxParticip>
        <LIstBBoxParticip>
          {idea?.ideaUsers
            .filter(users => users.type === 'COLLABORATOR')
            .map(item => {
              const isTheSameUser = item?.user?.id === user?.id;
              return (
                <ItemBoxParticip key={item.id}>
                  <UserCard
                    ideaId={idea.id}
                    userId={item.user.id}
                    isTheSameUser={isTheSameUser}
                    status={item.status}
                    name={item?.user?.name}
                    area={item?.user?.area.name ?? null}
                    areaColor={item?.user?.area.color ?? null}
                  />
                </ItemBoxParticip>
              );
            })}
        </LIstBBoxParticip>
      </WapperBoxParticip>
    </WapperFirstInfoIdea>
  );
};
