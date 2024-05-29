import Button from '@components/Button';
import { Select } from '@components/Select';
import { Textarea } from '@components/Textarea';
import { NotificationsContext } from 'contexts/Notification';
import { UserContext } from 'contexts/User';
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

interface ModalSendVideoProps {
  isOpen: boolean;
  videoId: number;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function ModalSendVideo({
  isOpen,
  setIsOpen,
  videoId,
}: ModalSendVideoProps): JSX.Element {
  const { getUserOptions } = useContext(UserContext);
  const { createNotification } = useContext(NotificationsContext);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);

  const handleSearchUser = useCallback(
    async search => {
      const getUsers = await getUserOptions({ search });

      setUserOptions(getUsers);
    },
    [getUserOptions]
  );

  const handleSelectUser = useCallback(
    ({ value }) => {
      if (selectedUsers.some(user => user.id === value)) {
        setSelectedUsers(state => state.filter(user => user.id === value));
      } else {
        setSelectedUsers(state => [
          ...state,
          userOptions.find(user => user.id === value),
        ]);
      }
    },
    [userOptions, selectedUsers]
  );

  const clearModal = useCallback(() => {
    setSelectedUsers([]);
    setValue('description', '');
  }, [setValue]);

  const handleSubmitNotification = useCallback(
    async event => {
      await createNotification({
        userIds: selectedUsers.map(sUser => sUser.id),
        link: `knowledge-trail?videoId=${videoId}`,
        description: event.description,
        type: 'SEND_VIDEO',
      });
      clearModal();
      setIsOpen(false);
    },
    [createNotification, selectedUsers, clearModal, setIsOpen]
  );

  const handleRemoveUser = useCallback((userId: string) => {
    setSelectedUsers(state => state.filter(u => u.id !== userId));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={() => setIsOpen(false)}
    >
      <SendIdeaContainer onSubmit={handleSubmit(handleSubmitNotification)}>
        <ModalTitle>Enviar Vídeo</ModalTitle>
        <Select
          name="userId"
          placeholder="Digite o nome do usuário"
          icon={<RiUser3Line size={20} />}
          dataSelect={userOptions.filter(
            option => !selectedUsers.some(sUser => sUser.id === option.id)
          )}
          onChange={handleSearchUser}
          onClickOption={handleSelectUser}
          setClean={() => setUserOptions([])}
        />
        {selectedUsers.length !== 0 && (
          <SelectedUsersContainer>
            {selectedUsers.map(sUser => (
              <SelectUser
                key={sUser.id}
                onClick={() => handleRemoveUser(sUser.id)}
              >
                {sUser.name} <FiX />
              </SelectUser>
            ))}
          </SelectedUsersContainer>
        )}
        <Textarea
          name="description"
          errors={errors}
          register={register}
          placeholder="Descrição da notificação"
        />
        <Button type="submit">Enviar</Button>
      </SendIdeaContainer>
    </Modal>
  );
}
