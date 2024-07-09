/* eslint-disable react/no-array-index-key */
import ButtonLink from '@components/Link';
import { IdeaContext } from 'contexts/Idea';
import { Idea } from 'interfaces/idea';
import { useContext, useMemo, useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { RiAddFill, RiSendPlaneLine } from 'react-icons/ri';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useTheme } from 'styled-components';
import { IdeaCommentModal } from './IdeaCommentModal';
import { ModalSendIdea } from './ModalSendIdea';
import {
  Box,
  BoxAction,
  BoxPosition,
  CampaingStatusActived,
  CampaingStatusFinished,
  CampaingTitle,
  Container,
  Footer,
  Header,
  ItemImageUser,
  LikeBox,
  ListImagesUsers,
  Position,
  Text,
  Title,
  ValuesUsers,
  IdeaFinished,
} from './styles';

interface ItemIdeaSentParams {
  idea: Idea;
  onClick?: () => void;
  isAlternative?: boolean;
  showTags?: boolean;
}

export const ItemIdeaSent: React.FC<ItemIdeaSentParams> = ({
  idea,
  onClick,
  isAlternative = false,
  showTags = false,
}): JSX.Element => {
  const { colors } = useTheme();
  const { likeIdea } = useContext(IdeaContext);
  const MAX_TITLE_LENGTH = 51;
  const MAX_TITLE_WIDTH = 430;

  const [modalSendIdeaOpen, setModalSendIdeaOpen] = useState(false);
  const [modalIdeaCommentIsOpen, setModalIdeaCommentIsOpen] = useState(false);

  const users = useMemo(() => {
    return idea.ideaUsers.map(ideaUser => ideaUser.user);
  }, [idea]);

  function getTextWidth(text, font = '400 16px Montserrat'): number {
    // re-use canvas object for better performance
    const canvas: HTMLCanvasElement =
      getTextWidth.canvas || document.createElement('canvas');
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      return metrics.width;
    }
    return 0;
  }

  getTextWidth.canvas = document.createElement('canvas');

  const getTitleWith3Dots = (): string => {
    for (let textLength = MAX_TITLE_LENGTH; textLength > 0; textLength -= 1) {
      if (
        getTextWidth(idea?.campaign?.title?.slice(0, textLength)) <
        MAX_TITLE_WIDTH
      ) {
        return idea?.campaign?.title?.slice(0, textLength);
      }
    }
  };

  const isFinished = new Date(idea?.campaign?.endDate).getTime() < Date.now();
  const ideaCampaingTitle =
    getTextWidth(idea?.campaign?.title) > MAX_TITLE_WIDTH
      ? `${getTitleWith3Dots()}...`
      : idea?.campaign?.title;

  return (
    <Container isAlternative={isAlternative}
    >
      <ModalSendIdea
        idea={idea}
        isOpen={modalSendIdeaOpen}
        setIsOpen={setModalSendIdeaOpen}
      />
      <IdeaCommentModal
        isOpen={modalIdeaCommentIsOpen}
        idea={idea}
        onClose={() => setModalIdeaCommentIsOpen(false)}
      />
      <Header>
        <Title>
          {idea.title.length > 55
            ? `${idea.title.substring(0, 55)}...`
            : idea.title}
        </Title>
        {idea.sequence && (
          <BoxPosition>
            <Position>#{idea.sequence}</Position>
          </BoxPosition>
        )}
      </Header>
      <Text>
        <ReactMarkdown>{idea.description}</ReactMarkdown>
      </Text>
      {showTags && (
        <div>
          <CampaingTitle>{ideaCampaingTitle}</CampaingTitle>
          {isFinished  ? (
            <CampaingStatusFinished>
              Não aceita novas iniciativas
            </CampaingStatusFinished>
          ) : (
            <CampaingStatusActived>Aceitando iniciativas</CampaingStatusActived>
          )}
        </div>
      )}

      {idea?.status === 'INACTIVE' && (
       <IdeaFinished>
        {idea?.status === 'INACTIVE' ? 'Finalizada' : ''}
      </IdeaFinished>
      )}
      <Box>
        <ListImagesUsers>
          {users.map((item, i) => (
            <ItemImageUser
              key={i}
              images_users={item?.image || '/images/user.png'}
            />
          ))}
        </ListImagesUsers>
        <ValuesUsers>
          {users.map(user => user?.name.split(' ')[0]).join(', ')}
        </ValuesUsers>
      </Box>
      <Footer>
        <ButtonLink
          onClick={onClick}
          max={180}
          hover={colors.fontLight}
          value="Ver mais"
          background={colors.font}
          color={colors.background}
          disabled={idea.status === 'INACTIVE'}
          Icon={<RiAddFill color={colors.background} size={20} />
        }
        />

        {idea?.status !== 'INACTIVE' && (
        <BoxAction>
          <LikeBox>
            {idea?.ideaLikes?.length !== 0 ? (
              <AiFillLike
                onClick={() => {
                  likeIdea(idea);
                }}
                size={28}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <AiOutlineLike
                onClick={() => {
                  likeIdea(idea);
                }}
                size={28}
                style={{ cursor: 'pointer' }}
              />
            )}
            {idea?.likes}
          </LikeBox>
          <AiOutlineComment
            size={28}
            style={{ cursor: 'pointer' }}
            onClick={() => setModalIdeaCommentIsOpen(true)}
          />
          <RiSendPlaneLine
            onClick={() => setModalSendIdeaOpen(true)}
            size={28}
            style={{ cursor: 'pointer' }}
          />
        </BoxAction>
        )}
      </Footer>
    </Container>
  );
};
