import { Comment } from '@components/Comment';
import { CommentEditing } from '@components/CommentEditing';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateComment } from '@validators/comment';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { IdeaStepContext } from 'contexts/IdeaStep';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiCheck, FiSend } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import {
  RiAttachmentLine,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
} from 'react-icons/ri';
import { Mention } from 'react-mentions';
import { useTheme } from 'styled-components';
import {
  AttachButton,
  ButtonAction,
  CommentActionsContainer,
  CommentContainer,
  CommentCounter,
  CommentPlusActions,
  CommentSectionPlusCounter,
  FormStep2,
  ListComments,
  NameArchive,
  StyledMentionsInput,
  TitleComment,
  TitleCommentEmpty,
  WapperActions,
  WapperComment,
  WapperContentComments,
  WapperStep2,
} from './styles';

interface Step1Props {
  stepSelected: any;
  id: any;
  ideaId?: string;
  preview?: string;
  steps: any;
  isCurrentState: boolean;
}

export const Step2: React.FC<Step1Props> = ({
  stepSelected,
  id,
  ideaId,
  preview,
  steps,
  isCurrentState,
}): JSX.Element => {
  const { colors } = useTheme();

  const {
    ideaComments,
    createIdeaComment,
    deleteIdeaComment,
    updateIdeaComment,
    getIdeasComments,
    getPossibleMentionUsers,
    notificateMentionedUsers,
  } = useContext(IdeaCommentContext);

  const [file, setFile] = useState({
    name: '',
    fileData: '',
  });
  const [isEditing, setIsEditing] = useState('');
  const [commentMessageUpdated, setCommentMessageUpdated] = useState('');
  const [ideaFilteredComments, setIdeaFilteredComments] = useState([]);
  const [possibleUsersMention, setPossibleUsersMention] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupValidateComment),
  });
  const { allLinkedIdeas, listAllLinkedIdeas } = useContext(
    ApprovalFunnelContext
  );
  const { ideaSteps, listIdeaSteps } = useContext(IdeaStepContext);
  const [ideasIds, setIdeasIds] = useState<string[]>([]);
  const [allIdeaSteps, setAllIdeaSteps] = useState([]);
  const [relatededStepsIds, setRelatedStepsIds] = useState([]);

  const canComment =
    isCurrentState ||
    (steps.filter(s => s.completed).length === steps.length &&
      stepSelected?.sequence === steps.length &&
      stepSelected?.completed) ||
    preview === 'ANALYZE' ||
    preview === 'SCREENING';

  const getFilteredComments = (ideaComments): any[] => {
    if (stepSelected !== undefined) {
      return ideaComments.filter(comment => {
        const filtered = relatededStepsIds.find(relatedStepItem =>
          relatedStepItem.includes(stepSelected.id)
        );
        return filtered?.includes(comment.stepId);
      });
    }
    return ideaComments.filter(
      comment => comment.stepId === undefined || comment.stepId === null
    );
  };

  useEffect(() => {
    setIdeaFilteredComments(getFilteredComments(ideaComments));
  }, [ideaComments, stepSelected, relatededStepsIds]);

  const hiddenFileInput = useRef(null);

  const handleClick = useCallback(() => {
    hiddenFileInput.current.click();
  }, []);
  const handleChange = useCallback(event => {
    setFile({
      name: event.target?.files[0]?.name,
      fileData: event.target?.files[0],
    });
  }, []);

  const handleSubmitForm = useCallback(
    async form => {
      const formData = new FormData();
      const regex = /\(\w+-\w+-\w+-\w+-\w+\)/g;

      formData.append('stage', null);
      if (stepSelected?.id) {
        formData.append('stepId', stepSelected.id);
      }
      formData.append('ideaId', String(id));
      formData.append('message', form.message.replace(regex, ''));
      formData.append('file', file.fileData);
      formData.append('type', 'DEVELOPMENT');

      await createIdeaComment(formData);

      const mentionedUsers = form.message.match(regex) || [];
      const mentionedUsersTreated = mentionedUsers.map(mention =>
        mention.replace(/\(|\)/g, '')
      );

      await notificateMentionedUsers(mentionedUsersTreated, String(id));

      setValue('message', '');
      setFile({ name: '', fileData: '' });
    },
    [createIdeaComment, setValue, file, id]
  );

  const handleDeleteComment = useCallback(
    async commentId => {
      await deleteIdeaComment(commentId);
      async function fetchComments(): Promise<void> {
        await getIdeasComments(ideasIds, {
          type: ['DEVELOPMENT'],
        });
      }

      if (ideaId) {
        fetchComments();
      }
    },
    [deleteIdeaComment, getIdeasComments, ideaId, ideasIds]
  );

  const handleUpdateComment = useCallback(
    async (commentId, message) => {
      await updateIdeaComment(commentId, message);
      async function fetchComments(): Promise<void> {
        await getIdeasComments(ideasIds, {
          type: ['DEVELOPMENT'],
        });
      }
      setIsEditing('');
      if (ideaId) {
        fetchComments();
      }
    },
    [updateIdeaComment, getIdeasComments, ideaId]
  );

  const handleEditComment = useCallback(
    async comment => {
      setIsEditing(comment.id);
      setCommentMessageUpdated(comment.message);
    },
    [setIsEditing, setCommentMessageUpdated]
  );

  const commentToParentComponent = (message: string): void => {
    setCommentMessageUpdated(message);
  };

  useEffect(() => {
    async function fetchComments(): Promise<void> {
      await getIdeasComments(ideasIds, {
        type: ['DEVELOPMENT'],
      });
      await listIdeaSteps(ideaId);
      const possibleUsers = await getPossibleMentionUsers(ideaId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setPossibleUsersMention(possibleUsers.data);
    }

    if (ideaId && ideasIds.length > 0) {
      fetchComments();
    }
  }, [getIdeasComments, ideaId, ideasIds]);

  const getRelatedSteps = (stepName: string): string[] => {
    const relatedIds = [];
    allIdeaSteps.forEach(ideaStepItem => {
      ideaStepItem
        .filter(step => step.title === stepName)
        .forEach(step => relatedIds.push(step.id));
    });
    return relatedIds;
  };

  useEffect(() => {
    const relatedSteps = [];
    if (allIdeaSteps.length > 0) {
      ideaSteps.forEach(step => {
        relatedSteps.push(getRelatedSteps(step.title));
      });
    }
    setRelatedStepsIds(relatedSteps);
  }, [allIdeaSteps, ideaSteps]);

  useEffect(() => {
    async function getAllSteps(): Promise<void> {
      const allSteps = [];
      await Promise.all(
        ideasIds.map(async ideaId => {
          allSteps.push(await listIdeaSteps(ideaId, true));
        })
      );
      setAllIdeaSteps(allSteps);
    }
    getAllSteps();
  }, [ideasIds]);

  useEffect(() => {
    if (ideaId && allLinkedIdeas) {
      const newIdeaIds = [];
      allLinkedIdeas.forEach(linkedIdea => newIdeaIds.push(linkedIdea));
      setIdeasIds(newIdeaIds.length === 0 ? [ideaId] : newIdeaIds);
    }
  }, [allLinkedIdeas, ideaId]);

  useEffect(() => {
    async function loadAllLinkedIdeas(ideaId: string): Promise<void> {
      await listAllLinkedIdeas(ideaId);
    }
    loadAllLinkedIdeas(ideaId);
  }, [ideaId, listAllLinkedIdeas]);

  return (
    <WapperStep2>
      {canComment && (
        <FormStep2 onSubmit={handleSubmit(handleSubmitForm)}>
          <WapperComment className="comment">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <StyledMentionsInput
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  allowSpaceInQuery
                  placeholder="Comentário"
                  error={errors.message}
                >
                  <Mention trigger="@" data={possibleUsersMention} />
                </StyledMentionsInput>
              )}
            />
            <WapperActions>
              <AttachButton onClick={handleClick}>
                <RiAttachmentLine size={20} color={colors.font} />
              </AttachButton>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <ButtonAction>
                <FiSend size={20} color={colors.font} />
              </ButtonAction>
            </WapperActions>
          </WapperComment>
          {file?.name?.length > 0 && (
            <NameArchive>
              <RiCheckLine size={24} color={colors.greenLimao} />
              {file.name}
              <RiCloseLine
                size={24}
                color={colors.font}
                onClick={() => setFile({ name: '', fileData: '' })}
              />
            </NameArchive>
          )}
        </FormStep2>
      )}

      <WapperContentComments>
        {ideaFilteredComments.length > 0 && (
          <CommentSectionPlusCounter>
            <TitleComment>Comentários</TitleComment>
            <CommentCounter>{ideaFilteredComments.length}</CommentCounter>
          </CommentSectionPlusCounter>
        )}

        {ideaFilteredComments.length === 0 && (
          <TitleCommentEmpty>Sem comentários</TitleCommentEmpty>
        )}

        <ListComments>
          {ideaFilteredComments?.map(item => {
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
                {isTheSameUser && (
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
                )}
              </CommentPlusActions>
            );
          })}
        </ListComments>
      </WapperContentComments>
    </WapperStep2>
  );
};
