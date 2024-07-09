import Button from '@components/Button';
import { Select } from '@components/Select';
import { Textarea } from '@components/Textarea';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { AuthContext } from 'contexts/AuthContext';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { Idea, IdeaKanbamStep } from 'interfaces/idea';
import { User } from 'interfaces/user';
import { SetStateAction, useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { RiUser3Line } from 'react-icons/ri';
import Modal from 'react-modal';
import {
  ModalTitle,
  SelectedUsersContainer,
  SelectUser,
  SendIdeaContainer,
} from './styles';

type UserOption = Pick<User, 'id' | 'name' | 'image'>;

interface RequestRepresentativeAnalysisModalProps {
  isOpen: boolean;
  idea: Idea;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setPreview?: React.Dispatch<SetStateAction<IdeaKanbamStep>>;
  onSubmitReview: () => Promise<void>;
}

export function RequestRepresentativeAnalysisModal({
  isOpen,
  idea,
  setIsOpen,
  setPreview,
  onSubmitReview,
}: RequestRepresentativeAnalysisModalProps): JSX.Element {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { reviewAgentIdea, searchIdeaUsers } = useContext(
    ApprovalFunnelContext
  );
  const { user } = useContext(AuthContext);
  const { createIdeaComment } = useContext(IdeaCommentContext);

  const [reason, setReason] = useState('');
  const [areaRepresentativeOptions, setAreaRepresentativeOptions] = useState<
    UserOption[]
  >([]);
  const [selectedAreaRepresentativeUser, setSelectedAreaRepresentativeUser] =
    useState<UserOption>();

  const onSearchAreaPresentative = useCallback(
    async search => {
      const data = await searchIdeaUsers(search, idea?.campaignId, 'AGENT');
      setAreaRepresentativeOptions(data);
    },
    [idea?.campaignId, searchIdeaUsers]
  );

  const handleSelectAreaRepresentativeUser = useCallback(
    ({ value }) => {
      const representativeUser = areaRepresentativeOptions.find(
        user => user.id === value
      );
      setSelectedAreaRepresentativeUser(representativeUser);
    },
    [areaRepresentativeOptions]
  );

  const getSequenceNumber = useCallback((sequence: number): any => {
    if (sequence >= 100000) {
      return sequence;
    }
    const paddedSequence = sequence.toString().padStart(6, '0');
    return paddedSequence;
  }, []);

  const handleSubmitAgentReview = useCallback(async () => {
    const formData = new FormData();

    formData.append('ideaId', idea?.id);
    formData.append('message', reason);
    formData.append('type', 'EVALUATION');
    formData.append('notificationType', 'AGENT_REVIEW');
    formData.append('targetUserId', selectedAreaRepresentativeUser?.id);

    const toastMessage = false;
    await createIdeaComment(formData, toastMessage);
    await reviewAgentIdea(idea?.id, {
      notification: {
        title: `${
          user.name
        } solicitou sua avaliação na iniciativa #${getSequenceNumber(
          idea.sequence
        )}. Clique aqui para acessar.`,
        description: reason,
        userId: selectedAreaRepresentativeUser?.id,
        originUserId: user.id,
        link: `/approval-funnel`,
        type: 'AGENT_REVIEW',
      },
      kanbanStatus: 'AGENT_REVIEW',
    });
    // setPreview(undefined);
    await onSubmitReview();
  }, [
    idea,
    reason,
    reviewAgentIdea,
    createIdeaComment,
    selectedAreaRepresentativeUser?.id,
    onSubmitReview,
    user,
    getSequenceNumber,
  ]);

  const handleRemoveAreaRepresentativeUser = useCallback(() => {
    setSelectedAreaRepresentativeUser(undefined);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}
    >
      <SendIdeaContainer onSubmit={handleSubmit(handleSubmitAgentReview)}>
        <ModalTitle>Solicite Análise Técnica</ModalTitle>
        <Select
          name="userId"
          placeholder="Digite o nome do usuário"
          icon={<RiUser3Line size={20} />}
          dataSelect={areaRepresentativeOptions.filter(
            option => option.id !== selectedAreaRepresentativeUser?.id
          )}
          onChange={onSearchAreaPresentative}
          onClickOption={handleSelectAreaRepresentativeUser}
          setClean={() => setAreaRepresentativeOptions([])}
        />
        {selectedAreaRepresentativeUser && (
          <SelectedUsersContainer>
            <SelectUser onClick={() => handleRemoveAreaRepresentativeUser()}>
              {selectedAreaRepresentativeUser.name} <FiX />
            </SelectUser>
          </SelectedUsersContainer>
        )}
        <Textarea
          name="message"
          errors={errors}
          placeholder="Descrição da solicitação"
          value={reason}
          onChange={event => setReason(event.target.value)}
        />
        <Button type="submit">Enviar</Button>
      </SendIdeaContainer>
    </Modal>
  );
}
