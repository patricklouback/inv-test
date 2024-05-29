/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable default-case */

import { Comment } from '@components/Comment';
import { CommentEditing } from '@components/CommentEditing';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateComment } from '@validators/comment';
import { IdeaContext } from 'contexts/Idea';
import { IdeaCommentContext, IdeaCommentProvider } from 'contexts/IdeaComments';
import { IdeaField } from 'interfaces/idea';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck, FiSend } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import {
  RiAttachmentLine,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
} from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import Modal from 'react-modal';
import { useTheme } from 'styled-components';
import { FilesDetails } from '@components/PageComponents/IdeaDetail/ModalPreview';
import {
  AttachedFilesSection,
  ButtonFiles,
  Buttons,
  CampaingStatusActived,
  CampaingStatusFinished,
  CampaingTitle,
  CampaingTitleTooltip,
  CommentActionsContainer,
  CommentContainer,
  CommentCounter,
  CommentPlusActions,
  CommentSectionPlusCounter,
  CommentsSection,
  Description,
  FadeLine,
  InputButton,
  Line,
  Message,
  MessageForm,
  SendButton,
  Subtitle,
  Title,
} from './styles';

interface IdeaViewMoreModalProps {
  isOpen: boolean;
  ideaId: string;
  onRequestClose: () => void;
}

const complexityTypes = {
  easy: 'Quick Win',
  medium: 'Intermediária',
  high: 'Alta',
};

export function IdeaViewMoreModal({
  isOpen,
  ideaId,
  onRequestClose,
}: IdeaViewMoreModalProps): JSX.Element {
  const MAX_TITLE_LENGTH = 105;
  const MAX_TITLE_WIDTH = 859;
  const { colors } = useTheme();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupValidateComment),
  });
  const hiddenFileInput = useRef(null);

  const [potential, setPotential] = useState('');
  const [complexity, setComplexity] = useState('');

  const [attachedFile, setAttachedFile] = useState({
    name: '',
    fileData: '',
  });

  const [isEditing, setIsEditing] = useState('');
  const [commentMessageUpdated, setCommentMessageUpdated] = useState('');

  const { viewIdea, idea } = useContext(IdeaContext);
  const {
    loading,
    ideaComments,
    getIdeaComments,
    createIdeaComment,
    deleteIdeaComment,
    updateIdeaComment,
  } = useContext(IdeaCommentContext);

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [modalPreviewFile, setModalPreviewFile] = useState<boolean>(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const getIdeaPotencial = useCallback(() => {
    const { ideaFields } = idea;
    const index = ideaFields.findIndex(
      element => element.title === 'Potencial da Iniciativa'
    );
    if (index !== -1) {
      const { ideaFieldValues } = ideaFields[index];
      const [valuesInfo] = ideaFieldValues;
      const { value } = valuesInfo;
      setPotential(value);
    }
  }, [idea]);

  const getIdeaComplexity = useCallback(() => {
    const { ideaFields } = idea;
    const index = ideaFields.findIndex(
      element => element.title === 'Complexidade da Iniciativa'
    );
    if (index !== -1) {
      const { ideaFieldValues } = ideaFields[index];
      const [valuesInfo] = ideaFieldValues;
      const { value } = valuesInfo;
      setComplexity(value);
    }
  }, [idea]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      await viewIdea(ideaId);
      await getIdeaComments(ideaId);
    }
    if (ideaId) {
      fetchData();
    }
  }, [getIdeaComments, ideaId, viewIdea]);

  useEffect(() => {
    if (idea) {
      getIdeaPotencial();
      getIdeaComplexity();
      getIdeaComments(idea.id);
    }
  }, [getIdeaComments, getIdeaComplexity, getIdeaPotencial, idea]);

  const handleSubmitForm = useCallback(
    async form => {
      const formData = new FormData();

      formData.append('ideaId', idea.id);
      formData.append('message', form.message);
      formData.append('file', attachedFile.fileData);

      await createIdeaComment(formData);

      setValue('message', '');
      setAttachedFile({ name: '', fileData: '' });
    },
    [idea, attachedFile.fileData, createIdeaComment, setValue]
  );

  const handleClick = useCallback(() => {
    hiddenFileInput.current.click();
  }, []);

  const handleRemoveAttachedFile = useCallback(event => {
    setAttachedFile({
      name: event.target?.files[0]?.name,
      fileData: event.target?.files[0],
    });
  }, []);

  const handleDeleteComment = useCallback(
    async commentId => {
      await deleteIdeaComment(commentId);

      async function fetchData(): Promise<void> {
        await viewIdea(ideaId);
        await getIdeaComments(ideaId);
      }
      if (ideaId) {
        fetchData();
      }
    },
    [deleteIdeaComment, getIdeaComments, ideaId, viewIdea]
  );

  const handleUpdateComment = useCallback(
    async (commentId, message) => {
      await updateIdeaComment(commentId, message);
      async function fetchData(): Promise<void> {
        await viewIdea(ideaId);
        await getIdeaComments(ideaId);
      }
      setIsEditing('');
      if (ideaId) {
        fetchData();
      }
    },
    [updateIdeaComment, getIdeaComments, setIsEditing, viewIdea, ideaId]
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

  const getFieldValue = (field: IdeaField): string => {
    let options = JSON.parse(field.options);

    if (!Array.isArray(options)) {
      options = [];
    }
    if (options.length === 0) {
      return field.ideaFieldValues[0].value;
    }
    return Array.isArray(options)
      ? options?.find(
          option => option.value === field?.ideaFieldValues[0]?.value
        )?.name
      : null;
  };

  const handleMouseEnter = (event): void => {
    setTooltipPosition({
      top: event.clientY - modalPosition.top,
      left: event.clientX - modalPosition.left,
    });
  };

  const updateModalPosition = (element): void => {
    if (element.top !== modalPosition.top)
      setModalPosition({ top: element.top, left: element.left });
  };

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

  const execOpenModal = (file: string) => {
    setModalPreviewFile(true);
    setPreviewFile(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="view-more-modal-content"
      ariaHideApp={false}
      onRequestClose={onRequestClose}
    >
      <div
        ref={el => {
          if (el) updateModalPosition(el.getBoundingClientRect());
        }}
      >
        <Title>{idea?.title || 'Titulo da iniciativa'}</Title>
        <CampaingTitle>
          <CampaingTitleTooltip
            top={tooltipPosition.top}
            left={tooltipPosition.left}
          >
            {idea?.campaign?.title}
          </CampaingTitleTooltip>
          <div onMouseEnter={handleMouseEnter}>{ideaCampaingTitle}</div>
        </CampaingTitle>
        {isFinished ? (
          <CampaingStatusFinished>
            Não aceita novas iniciativas
          </CampaingStatusFinished>
        ) : (
          <CampaingStatusActived>Aceitando iniciativas</CampaingStatusActived>
        )}
        <FadeLine />
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
          >
        {idea?.ideaFiles.map((ideaFile, i) => (
          <ButtonFiles key={i}
            onClick={() => execOpenModal(ideaFile)}
          >
            <a target="_blank" rel="noreferrer">
              Arquivo {i + 1}
            </a>
          </ButtonFiles>
        ))}
        {modalPreviewFile && (
          <FilesDetails file={previewFile} close={setModalPreviewFile} />
        )}
        </div>

        <Subtitle>DESCRIÇÃO DA INICIATIVA</Subtitle>
        <Description>
          {idea?.description || `A iniciativa não tem uma descrição`}
        </Description>
        <Line />
        {idea?.ideaFields.map(field => (
          <div>
            <Subtitle>{field.title}</Subtitle>
            <Description>
              {getFieldValue(field) || `Este campo não tem uma descrição`}
            </Description>
            <Line />
          </div>
        ))}
        {potential !== '' && (
          <>
            <Subtitle>Potencial</Subtitle>
            <Description>{potential}</Description>
            <Line />
          </>
        )}
        {complexity !== '' && (
          <>
            <Subtitle>Complexidade</Subtitle>
            <Description>{complexityTypes[complexity]}</Description>
            <Line />
          </>
        )}

        <MessageForm onSubmit={handleSubmit(handleSubmitForm)}>
          <Message
            placeholder="Digite sua mensagem... "
            {...register('message')}
            error={errors.message}
          />
          <Buttons>
            <SendButton type="submit">
              <FiSend size={20} color={colors.font} />
            </SendButton>
            <RiAttachmentLine
              size={20}
              color={colors.font}
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
            />
            <InputButton
              type="file"
              ref={hiddenFileInput}
              onChange={handleRemoveAttachedFile}
            />
          </Buttons>
        </MessageForm>

        {attachedFile.name && (
          <AttachedFilesSection>
            <RiCheckLine
              size={24}
              color={colors.greenLive}
              style={{ marginRight: '12px' }}
            />
            {attachedFile.name}
            <RiCloseLine
              size={24}
              color={colors.font}
              style={{ marginLeft: '12px', cursor: 'pointer' }}
              onClick={() => setAttachedFile({ name: '', fileData: '' })}
            />
          </AttachedFilesSection>
        )}

        <CommentsSection>
          <CommentSectionPlusCounter>
            <span style={{ fontWeight: 600 }}>Comentários</span>
            <CommentCounter>{ideaComments?.length}</CommentCounter>
          </CommentSectionPlusCounter>
          {loading ? (
            <Skeleton className="comment-skeleton" count={1} />
          ) : ideaComments?.length === 0 ? (
            <p>Sem comentários</p>
          ) : (
            ideaComments?.map(item => {
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
            })
          )}
        </CommentsSection>
      </div>
    </Modal>
  );
}

export function IdeaViewMore({
  ...props
}: IdeaViewMoreModalProps): JSX.Element {
  return (
    <IdeaCommentProvider>
      <IdeaViewMoreModal {...props} />
    </IdeaCommentProvider>
  );
}
