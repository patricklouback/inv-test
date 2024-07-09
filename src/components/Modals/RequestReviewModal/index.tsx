import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { AuthContext } from 'contexts/AuthContext';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { IdeaContext } from 'contexts/Idea';
import { Idea, IdeaKanbamStep } from 'interfaces/idea';
import {
  FormEvent,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import Modal from 'react-modal';
import { Container, Description, Message, Title, SubmitButton } from './styles';

interface RequestReviewModalProps {
  idea?: Idea;
  isOpen: boolean;
  onRequestClose?: () => void;
  setPreview?: React.Dispatch<SetStateAction<IdeaKanbamStep>>;
  onSubmitReview: () => Promise<void>;
}

export const RequestReviewModal: React.FC<RequestReviewModalProps> = ({
  idea,
  isOpen,
  onRequestClose,
  setPreview,
  onSubmitReview,
}): JSX.Element => {
  const { reviewIdea } = useContext(ApprovalFunnelContext);
  const { user } = useContext(AuthContext);
  const { createIdeaComment } = useContext(IdeaCommentContext);

  const [reason, setReason] = useState('');

  const getSequenceNumber = useCallback((sequence: number): any => {
    if (sequence >= 100000) {
      return sequence;
    }
    const paddedSequence = sequence.toString().padStart(6, '0');
    return paddedSequence;
  }, []);

  const handleRequestReview = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('ideaId', idea?.id);
      formData.append('message', reason);
      formData.append('type', 'DEVELOPMENT');
      formData.append('notificationType', 'OWNER_REVIEW');

      const toastMessage = false;
      await createIdeaComment(formData, toastMessage);

      await reviewIdea(idea.id, {
        notification: {
          title: `Foi solicitada uma revisão na sua iniciativa #${getSequenceNumber(
            idea.sequence
          )}. Clique aqui para ver as sugestões, faça as alterações e envie novamente!`,
          description: reason,
          link: `/idea/${idea.id}`,
          type: 'OWNER_REVIEW',
        },
        kanbanStatus: 'OWNER_REVIEW',
      });
      // setPreview(undefined);
      await onSubmitReview();
    },
    [idea, reason, reviewIdea, user, createIdeaComment, onSubmitReview]
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      ariaHideApp={false}
    >
      <Container onSubmit={handleRequestReview}>
        <Title>Solicitar revisão</Title>
        <Message>Comentário</Message>
        <Description
          cols={30}
          rows={10}
          value={reason}
          onChange={event => setReason(event.target.value)}
        />
        <SubmitButton type="submit">Enviar</SubmitButton>
      </Container>
    </Modal>
  );
};
