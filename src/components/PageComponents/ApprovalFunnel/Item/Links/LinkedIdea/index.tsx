/* eslint-disable react/no-array-index-key */
import { getSequenceNumber } from 'utils/sequenceNumber';
import { UserCard } from '@components/CardUser';
import {
  Gap,
  LinkedIdeaCard,
  ContentParticipants,
  ListParticipants,
  ItemParticipants,
} from './styles';
import { IdeaAppId, Title } from '../../styles';

interface LinkedIdeaProps {
  linkIsOpen: boolean;
  linkedIdea: any;
  hasBorder?: boolean;
  showCreator: boolean;
  openLinked?: any;
  kanbanStep?: any;
}

export const LinkedIdea = ({
  linkIsOpen,
  linkedIdea,
  hasBorder = false,
  showCreator,
  openLinked,
  kanbanStep,
}: LinkedIdeaProps): JSX.Element => {
  return (
    <>
      <LinkedIdeaCard
        isOpen={linkIsOpen}
        hasBorder={hasBorder}
        onClick={() => openLinked()}
      >
        <IdeaAppId>{`#${getSequenceNumber(linkedIdea.sequence)}`}</IdeaAppId>
        <Title>
          {linkedIdea.title.slice(0, 40)}
          {linkedIdea.title.length > 40 ? '...' : ''}
        </Title>
        {showCreator && (
          <ContentParticipants>
            <ListParticipants>
              {linkedIdea.ideaUsers?.map((user, i) => (
                <ItemParticipants key={i}>
                  <UserCard name={user?.user?.name} />
                </ItemParticipants>
              ))}
            </ListParticipants>
          </ContentParticipants>
        )}
      </LinkedIdeaCard>
      <Gap isOpen={linkIsOpen} hasBorder={hasBorder} />
    </>
  );
};
