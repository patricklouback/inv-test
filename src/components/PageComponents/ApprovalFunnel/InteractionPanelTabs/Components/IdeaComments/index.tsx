/* eslint-disable no-nested-ternary */
import { Comment } from '@components/Comment';
import { CommentEditing } from '@components/CommentEditing';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateComment } from '@validators/comment';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { IdeaStepContext } from 'contexts/IdeaStep';
import { Idea, IdeaStep } from 'interfaces/idea';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import { FiCheck, FiSend } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import {
  RiAttachmentLine,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
} from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { Mention } from 'react-mentions';
import { useTheme } from 'styled-components';
import {
  AttachButton,
  ButtonAction,
  CommentActionsContainer,
  CommentContainer,
  CommentCounter,
  CommentInputContainer,
  CommentPlusActions,
  CommentSectionPlusCounter,
  CommentSent,
  ErrorMessage,
  ErrorText,
  NameArchive,
  SectionComments,
  StyledMentionsInput,
  WapperActionsComment,
} from './styles';

interface IdeaStepSelected extends IdeaStep {
  editable?: boolean;
}

export const IdeaComments: React.FC<{
  idea: Idea;
  ideaStepSelected: IdeaStepSelected;
  showComments: boolean;
  ideaFilteredComments: any[];
  ideasIds: string[];
  type: string[];
}> = ({
  idea,
  ideaStepSelected,
  showComments,
  ideaFilteredComments,
  ideasIds,
  type,
}): JSX.Element => {
  const { colors } = useTheme();
  const {
    notificateMentionedUsers,
    getPossibleMentionUsers,
    createIdeaComment,
    deleteIdeaComment,
    updateIdeaComment,
    getIdeasComments,
    loading,
  } = useContext(IdeaCommentContext);
  const { listIdeaSteps } = useContext(IdeaStepContext);
  const [file, setFile] = useState({
    name: '',
    fileData: '',
  });
  const [possibleUsersMention, setPossibleUsersMention] = useState([]);
  const [isEditing, setIsEditing] = useState('');
  const [commentMessageUpdated, setCommentMessageUpdated] = useState('');
  const hiddenFileInput = useRef(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupValidateComment) });

  const getType = (): string => {
    return type.includes('EVALUATION_CRITERIA')
      ? 'EVALUATION_CRITERIA'
      : 'DEVELOPMENT';
  };

  const handleSubmitForm = async (form): Promise<void> => {
    const formData = new FormData();
    const regex = /\(\w+-\w+-\w+-\w+-\w+\)/g;

    formData.append('stage', null);
    if (ideaStepSelected?.id) {
      formData.append('stepId', ideaStepSelected.id);
    }
    formData.append('ideaId', idea.id);
    formData.append('message', form.message.replace(regex, ''));
    formData.append('file', file.fileData);
    formData.append('type', getType());
    await createIdeaComment(formData);

    const mentionedUsers = form.message.match(regex) || [];
    const mentionedUsersTreated = mentionedUsers.map(mention =>
      mention.replace(/\(|\)/g, '')
    );

    await notificateMentionedUsers(mentionedUsersTreated, idea.id);

    setValue('message', '');
    setFile({ name: '', fileData: '' });
  };

  const handleChange = useCallback(event => {
    setFile({
      name: event.target?.files[0]?.name,
      fileData: event.target?.files[0],
    });
  }, []);

  const handleClick = useCallback(() => {
    hiddenFileInput.current.click();
  }, []);

  useEffect(() => {
    async function loadComments(): Promise<void> {
      await getIdeasComments(ideasIds, {
        type,
      });
      const possibleUsers: any = await getPossibleMentionUsers(idea.id);
      setPossibleUsersMention(possibleUsers.data);
    }

    if (idea?.id) {
      loadComments();
    }
  }, [getPossibleMentionUsers, idea?.id, idea?.kanbanStep]);

  const handleEditComment = useCallback(
    async comment => {
      setIsEditing(comment.id);
      setCommentMessageUpdated(comment.message);
    },
    [setIsEditing, setCommentMessageUpdated]
  );

  const handleUpdateComment = useCallback(
    async (commentId, message) => {
      await updateIdeaComment(commentId, message);
      async function loadComments(): Promise<void> {
        await getIdeasComments(ideasIds, {
          type,
        });
        if (idea.kanbanStep === 'SELECT') {
          await listIdeaSteps(idea.id);
        }
      }
      setIsEditing('');
      if (idea?.id) {
        loadComments();
      }
    },
    [
      updateIdeaComment,
      getIdeasComments,
      listIdeaSteps,
      idea?.id,
      idea?.kanbanStep,
    ]
  );

  const handleDeleteComment = useCallback(
    async commentId => {
      await deleteIdeaComment(commentId);
      async function loadComments(): Promise<void> {
        await getIdeasComments(ideasIds, {
          type,
        });
        if (idea.kanbanStep === 'SELECT') {
          await listIdeaSteps(idea.id);
        }
      }
      if (idea?.id) {
        loadComments();
      }
    },
    [
      deleteIdeaComment,
      getIdeasComments,
      listIdeaSteps,
      idea?.id,
      idea?.kanbanStep,
    ]
  );
  const commentToParentComponent = (message: string): void => {
    setCommentMessageUpdated(message);
  };

  return (
    <SectionComments>
      {showComments && (
        <CommentInputContainer onSubmit={handleSubmit(handleSubmitForm)}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <textarea 
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                placeholder="Digite sua mensagem"
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  color: colors.font,
                  resize: 'none',
                  outline: 'none',
                }}
              />
              // Chat com mensao, arrumar que esta quebrando o layout o placeholder
              // <StyledMentionsInput
              //   value={field.value}
              //   onChange={e => field.onChange(e.target.value)}
              //   allowSpaceInQuery
              //   placeholder="Digite sua mensagem"
              // >
              //   <Mention trigger="@" data={possibleUsersMention} />
              // </StyledMentionsInput>
            )}
          />
          <WapperActionsComment>
            <ButtonAction type="submit">
              <FiSend size={20} color={colors.font} />
            </ButtonAction>
            <AttachButton>
              <RiAttachmentLine
                size={20}
                color={colors.font}
                onClick={handleClick}
                style={{ margin: '12px 0' }}
              />
            </AttachButton>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </WapperActionsComment>
        </CommentInputContainer>
      )}

      {errors && Object.entries(errors).length !== 0 && (
        <ErrorText>
          {Object.entries(errors).map(
            item =>
              item[0] === 'message' && (
                <ErrorMessage>
                  <BiErrorCircle color={colors.notification.error} size={22} />

                  {item[1].message}
                </ErrorMessage>
              )
          )}
        </ErrorText>
      )}
      {file.name && (
        <NameArchive>
          <RiCheckLine size={24} color={colors.greenLimao} />
          <span>{file.name}</span>
          <RiCloseLine
            size={24}
            color={colors.font}
            onClick={() => setFile({ name: '', fileData: '' })}
          />
        </NameArchive>
      )}
      <CommentSent>
        {ideaFilteredComments.length > 0 && (
          <CommentSectionPlusCounter>
            <span>Comentários</span>
            <CommentCounter>{ideaFilteredComments.length}</CommentCounter>
          </CommentSectionPlusCounter>
        )}
        {loading ? (
          <Skeleton className="comment-skeleton" count={1} />
        ) : ideaFilteredComments.length === 0 ? (
          <p>Sem comentários</p>
        ) : (
          ideaFilteredComments.map(item => {
            const isTheSameUser =
              item.user.email === localStorage.getItem('emailLogin') ||
              item.user.registration === localStorage.getItem('emailLogin');
            return (
              <CommentPlusActions>
                <CommentContainer>
                  {isEditing !== item.id ? (
                    <Comment
                      processDevelop
                      key={item.id}
                      className="alternative-comments"
                      comment={item}
                    />
                  ) : (
                    <CommentEditing
                      processDevelop
                      key={item.id}
                      className="alternative-comments"
                      comment={item}
                      commentToParentComponent={commentToParentComponent}
                    />
                  )}
                </CommentContainer>
                {isTheSameUser ||
                  (true && (
                    <CommentActionsContainer>
                      {isEditing !== item.id ? (
                        <MdOutlineModeEdit
                          size={22}
                          onClick={() => handleEditComment(item)}
                        />
                      ) : (
                        <FiCheck
                          size={22}
                          onClick={() =>
                            handleUpdateComment(item.id, commentMessageUpdated)
                          }
                        />
                      )}
                      <RiDeleteBinLine
                        size={22}
                        onClick={() => handleDeleteComment(item.id)}
                      />
                    </CommentActionsContainer>
                  ))}
              </CommentPlusActions>
            );
          })
        )}
      </CommentSent>
    </SectionComments>
  );
};
