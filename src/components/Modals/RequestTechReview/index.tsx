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

type UserOption = Pick<User, 'id' | 'name'>;

interface RequestTechReviewProps {
  isOpen: boolean;
  idea: Idea;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setPreview?: React.Dispatch<SetStateAction<IdeaKanbamStep>>;
  onSubmitReview: () => Promise<void>;
}

export function RequestTechReview({
  isOpen,
  idea,
  setIsOpen,
  setPreview,
  onSubmitReview,
}: RequestTechReviewProps): JSX.Element {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { getSupportUsers, reviewTechIdea } = useContext(ApprovalFunnelContext);
  const { user } = useContext(AuthContext);
  const { createIdeaComment } = useContext(IdeaCommentContext);

  const [reason, setReason] = useState('');
  const [selectedSupportUser, setSelectedSupportUser] = useState<UserOption>();
  const [supportUsersOptions, setSupportUsersOptions] = useState<UserOption[]>(
    []
  );

  const handleSearchSupportUsers = useCallback(
    async search => {
      const foundUsers = await getSupportUsers(idea?.campaignId, { search });
      setSupportUsersOptions(foundUsers);
    },
    [getSupportUsers, idea]
  );

  const handleSelectSupportUser = useCallback(
    ({ value }) => {
      const supportUser = supportUsersOptions.find(user => user.id === value);
      setSelectedSupportUser(supportUser);
    },
    [supportUsersOptions]
  );

  const handleSubmitTechReview = useCallback(async () => {
    const formData = new FormData();

    formData.append('ideaId', idea?.id);
    formData.append('message', reason);
    formData.append('type', 'DEVELOPMENT');

    const toastMessage = false;
    await createIdeaComment(formData, toastMessage);

    await reviewTechIdea(idea?.id, {
      notification: {
        title: 'Solicitação de revisão técnica',
        description: reason,
        userId: selectedSupportUser?.id,
        originUserId: user.id,
        link: `/idea/${idea.id}`,
        type: 'TECH_REVIEW',
      },
      kanbanStatus: 'TECH_REVIEW',
    });
    // setPreview(undefined);
    await onSubmitReview();
  }, [
    idea,
    reason,
    reviewTechIdea,
    selectedSupportUser,
    createIdeaComment,
    onSubmitReview,
    user,
  ]);

  const handleRemoveUser = useCallback(() => {
    setSelectedSupportUser(undefined);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={() => setIsOpen(false)}
    >
      <SendIdeaContainer onSubmit={handleSubmit(handleSubmitTechReview)}>
        <ModalTitle>Parecer Técnico</ModalTitle>
        <Select
          name="userId"
          placeholder="Digite o nome do usuário"
          icon={<RiUser3Line size={20} />}
          dataSelect={supportUsersOptions.filter(
            option => option.id !== selectedSupportUser?.id
          )}
          onChange={handleSearchSupportUsers}
          onClickOption={handleSelectSupportUser}
          setClean={() => setSupportUsersOptions([])}
        />
        {selectedSupportUser && (
          <SelectedUsersContainer>
            <SelectUser onClick={() => handleRemoveUser()}>
              {selectedSupportUser.name} <FiX />
            </SelectUser>
          </SelectedUsersContainer>
        )}
        <Textarea
          name="description"
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
