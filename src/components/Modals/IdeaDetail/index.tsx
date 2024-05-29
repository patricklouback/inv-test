/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable default-case */
import { Comment } from '@components/Comment';
import { CommentEditing } from '@components/CommentEditing';
import { Modal } from '@components/Modals/Modal';
import { IdeaCommentContext, IdeaCommentProvider } from 'contexts/IdeaComments';
import { Idea } from 'interfaces/idea';
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
import Skeleton from 'react-loading-skeleton';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Mention } from 'react-mentions';
import { useTheme } from 'styled-components';
import { FilesDetails } from '@components/PageComponents/IdeaDetail/ModalPreview';
import {
  Article,
  CommentActionsContainer,
  CommentContainer,
  CommentCounter,
  CommentInputContainer,
  CommentPlusActions,
  CommentSectionPlusCounter,
  CommentSent,
  Content,
  FadeLine,
  NameArchive,
  SectionComments,
  SectionInfo,
  StyledMentionsInput,
  TitleIdea,
} from './styles';
import { ButtonFiles } from '../IdeaViewMoreModal/styles';

interface IdeaDetailProps {
  idea: Idea;
  // TODO: Change this idea to ideaId and refactor them to search idea when open modal
  closeModal: () => void;
}

export function IdeaDetailModal({
  idea,
  closeModal,
}: IdeaDetailProps): JSX.Element {
  const { colors } = useTheme();
  const [file, setFile] = useState({
    name: '',
    fileData: '',
  });
  const [isEditing, setIsEditing] = useState('');
  const [commentMessageUpdated, setCommentMessageUpdated] = useState('');
  const [possibleUsersMention, setPossibleUsersMention] = useState([]);
  const [modalPreviewFile, setModalPreviewFile] = useState<boolean>(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const {
    loading,
    ideaComments,
    getIdeaComments,
    createIdeaComment,
    deleteIdeaComment,
    updateIdeaComment,
    getPossibleMentionUsers,
    notificateMentionedUsers,
  } = useContext(IdeaCommentContext);

  const { control, handleSubmit, setValue } = useForm();
  const hiddenFileInput = useRef(null);
  const handleSubmitForm = useCallback(
    async form => {
      const formData = new FormData();
      const regex = /\(\w+-\w+-\w+-\w+-\w+\)/g;

      formData.append('ideaId', idea.id);
      formData.append('message', form.message.replace(regex, ''));
      formData.append('file', file.fileData);
      formData.append('type', 'DEVELOPMENT');

      await createIdeaComment(formData);

      const mentionedUsers = form.message.match(regex) || [];
      const mentionedUsersTreated = mentionedUsers.map(mention =>
        mention.replace(/\(|\)/g, '')
      );

      await notificateMentionedUsers(mentionedUsersTreated, idea.id);

      setValue('message', '');
      setFile({ name: '', fileData: '' });
    },
    [createIdeaComment, setValue, idea, file]
  );

  const handleClick = useCallback(() => {
    hiddenFileInput.current.click();
  }, []);

  const handleChange = useCallback(event => {
    setFile({
      name: event.target?.files[0]?.name,
      fileData: event.target?.files[0],
    });
  }, []);

  const handleDeleteComment = useCallback(
    async commentId => {
      await deleteIdeaComment(commentId);

      async function loadComments(): Promise<void> {
        await getIdeaComments(idea.id, {
          type: ['DEVELOPMENT', 'EVALUATION'],
        });
      }

      if (idea?.id) {
        loadComments();
      }
    },
    [deleteIdeaComment, getIdeaComments, idea?.id]
  );

  const handleUpdateComment = useCallback(
    async (commentId, message) => {
      await updateIdeaComment(commentId, message);
      async function loadComments(): Promise<void> {
        await getIdeaComments(idea.id, {
          type: ['DEVELOPMENT', 'EVALUATION'],
        });
      }
      setIsEditing('');
      if (idea?.id) {
        loadComments();
      }
    },
    [updateIdeaComment, getIdeaComments, setIsEditing, idea.id]
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
    async function loadComments(): Promise<void> {
      await getIdeaComments(idea.id, {
        type: ['DEVELOPMENT', 'EVALUATION'],
      });
      const possibleUsers: any = await getPossibleMentionUsers(idea.id);
      setPossibleUsersMention(possibleUsers.data);
    }

    if (idea?.id) {
      loadComments();
    }
  }, [getIdeaComments, idea?.id]);

  const execOpenModal = (file: string) => {
    setModalPreviewFile(true);
    setPreviewFile(file);
  };

  return (
    <Modal handle={closeModal} height="100px">
      <TitleIdea>
        <h1>{idea.title}</h1>
      </TitleIdea>
      <FadeLine />
      <Content>
        <SectionInfo>
          <Article>
            <h2>Descrição da iniciativa</h2>
            <ReactMarkdown>{idea.description}</ReactMarkdown>
          </Article>
            {idea.ideaFiles.length > 0 && (
              <Article>
              <h2>Arquivos</h2>
              <div 
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
                >
              {idea?.ideaFiles.map((ideaFile, i) => (
                <ButtonFiles key={i} onClick={() => execOpenModal(ideaFile)}>
                  <a target="_blank" rel="noreferrer">
                    Arquivo {i + 1}
                  </a>
                </ButtonFiles>
              ))}
              </div>
            </Article>
            )}
          {modalPreviewFile && (
            <FilesDetails file={previewFile} close={setModalPreviewFile} />
          )}
          {(() =>
            idea.ideaFields.map(ideaField => {
              switch (ideaField.type) {
                case 'TEXT':
                case 'TEXTAREA':
                  return (
                    <Article key={String(ideaField.id)}>
                      <h2>{ideaField.title}</h2>
                      <ReactMarkdown>
                        {ideaField.ideaFieldValues[0].value}
                      </ReactMarkdown>
                    </Article>
                  );
                default:
                  break;
              }
              return;
            }))()}
        </SectionInfo>
        <SectionComments>
          {idea.status !== 'INACTIVE' && (
            <CommentInputContainer
              encType="multipart/form-data"
              onSubmit={handleSubmit(handleSubmitForm)}
            >
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <StyledMentionsInput
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    allowSpaceInQuery
                    placeholder="Digite sua mensagem"
                  >
                    <Mention trigger="@" data={possibleUsersMention} />
                  </StyledMentionsInput>
                )}
              />
              <div>
                <button type="submit">
                  <FiSend size={20} color={colors.font} />
                </button>
                <RiAttachmentLine
                  size={20}
                  color={colors.font}
                  onClick={handleClick}
                  style={{ margin: '12px 0' }}
                />
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
              </div>
            </CommentInputContainer>
          )}
          {file.name && (
            <NameArchive>
              <RiCheckLine size={24} color={colors.greenLimao} />
              {file.name}
              <RiCloseLine
                size={24}
                color={colors.font}
                style={{ marginLeft: '12px' }}
                onClick={() => setFile({ name: '', fileData: '' })}
              />
            </NameArchive>
          )}

          <CommentSent>
            <CommentSectionPlusCounter>
              <span>Comentários</span>
              <CommentCounter>{ideaComments.length}</CommentCounter>
            </CommentSectionPlusCounter>
            {loading ? (
              <Skeleton className="comment-skeleton" count={1} />
            ) : ideaComments.length === 0 ? (
              <p>Sem comentários</p>
            ) : (
              ideaComments.map(item => {
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
                              handleUpdateComment(
                                item.id,
                                commentMessageUpdated
                              )
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
              })
            )}
          </CommentSent>
        </SectionComments>
      </Content>
    </Modal>
  );
}

export function IdeaDetail({ ...props }: IdeaDetailProps): JSX.Element {
  return (
    <IdeaCommentProvider>
      <IdeaDetailModal {...props} />
    </IdeaCommentProvider>
  );
}
