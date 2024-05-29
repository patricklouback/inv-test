import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { UserContext } from 'contexts/User';
import { Idea, IdeaKanbamStep } from 'interfaces/idea';
import {
  FormEvent,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Modal from 'react-modal';
import { Container, Description, Message, Title, SubmitButton } from './styles';

interface RefuseIdeaModalProps {
  idea?: Idea;
  isOpen: boolean;
  onRequestClose?: () => void;
  setPreview?: React.Dispatch<SetStateAction<IdeaKanbamStep>>;
  onSubmitReview: () => Promise<void>;
}

export const RefuseIdeaModal: React.FC<RefuseIdeaModalProps> = ({
  idea,
  isOpen,
  onRequestClose,
  setPreview,
  onSubmitReview,
}): JSX.Element => {
  const { declineIdea } = useContext(ApprovalFunnelContext);
  const { getUser, user } = useContext(UserContext);

  const [reason, setReason] = useState('');

  const getSequenceNumber = useCallback((sequence: number): any => {
    if (sequence >= 100000) {
      return sequence;
    }
    const paddedSequence = sequence.toString().padStart(6, '0');
    return paddedSequence;
  }, []);

  const handleDeclineIdea = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      await declineIdea(idea.id, {
        notification: {
          title: `Sua iniciativa #${getSequenceNumber(idea.sequence)} não seguirá adiante. Clique aqui para ver o comentário do avaliador.`,
          description: reason,
          // originUserId: user.id,
        },
      });
      setPreview(undefined);
      await onSubmitReview();
    },
    [declineIdea, idea, reason, onSubmitReview, setPreview]
  );

  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <Container onSubmit={handleDeclineIdea}>
        <Title>Recusar iniciativa</Title>
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
