import { SetStateAction, useCallback, useContext, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useTheme } from 'styled-components';
import { AddUserIcon } from '@components/Icons';
import { styleSlug } from 'utils/constants';
import { Select } from '@components/Select';
import { PreviewUserAddsComponent } from '@components/PageComponents/PanelCampaign/PageCreate/AcessConfig/PreviewUser';
import { IdeaContext } from 'contexts/Idea';
import { debounce } from 'lodash';
import { IdeaUser } from 'interfaces/idea';
import { Textarea } from '@components/Textarea';
import { ContentIcon } from '../styles';
import {
  Background,
  ButtonCancel,
  ButtonNext,
  ContainerPreview,
  Content,
  Description,
  Header,
  Label,
  Modal,
  Title,
} from './styles';

interface UserOptions {
  id: string;
  name: string;
  image?: string;
}

interface AddParticipantsProps {
  setIsModalAddUserOpen: React.Dispatch<SetStateAction<boolean>>;
  existingIdeaUsers: IdeaUser[];
  ideaId: string;
}

export function AddParticipants({
  setIsModalAddUserOpen,
  existingIdeaUsers,
  ideaId,
}: AddParticipantsProps): JSX.Element {
  const { colors } = useTheme();
  const { getAvailableIdeaUsers, inviteUsersToIdea, viewIdea } =
    useContext(IdeaContext);
  const [users, setIdeaUsers] = useState<UserOptions[]>([]);
  const [message, setMessage] = useState<string>('');
  const [availableIdeaUsers, setAvailableIdeaUsers] = useState<UserOptions[]>(
    []
  );
  const [step, setStep] = useState<'add' | 'confirm'>('add');

  const handleSearchUsers = useCallback(
    debounce(async (search: string) => {
      const new_users = await getAvailableIdeaUsers(search);

      const serialized = new_users
        .map(e => {
          if (
            users.find(user => user.id === e.id) ||
            existingIdeaUsers.find(user => user.userId === e.id)
          ) {
            return undefined;
          }
          return e;
        })
        .filter(Boolean);

      setAvailableIdeaUsers(serialized);
    }, 300),
    [getAvailableIdeaUsers, users]
  );

  const setClean = useCallback(() => {
    setAvailableIdeaUsers(availableIdeaUsers);
  }, [setAvailableIdeaUsers, availableIdeaUsers]);

  const handleAddUser = useCallback(
    (userId: string) => {
      const newArrayItems = [
        ...users,
        availableIdeaUsers.find(u => u.id === userId),
      ];

      setIdeaUsers(newArrayItems);
    },
    [users, availableIdeaUsers]
  );

  const handleRemoveIdeaUser = useCallback(
    (userId: string) => {
      const newArrayItems = users.filter(element => element.id !== userId);

      setIdeaUsers(newArrayItems);
    },
    [users]
  );

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleConfirm = async () => {
    if (step === 'add') {
      setStep('confirm');
      return;
    }

    const receiverIds = users.map(user => user.id);

    await inviteUsersToIdea({
      receiverIds,
      ideaId,
      message,
    });
    viewIdea(ideaId);
    setMessage('');
    setIsModalAddUserOpen(false);
  };

  const handleCancel = () => {
    setStep('add');
    setClean();
    setMessage('');
    setIdeaUsers([]);
    setIsModalAddUserOpen(false);
  };

  return (
    <Background>
      <Modal>
        <Header>
          <ContentIcon clickable={false}>
            <AddUserIcon color={colors.primary[styleSlug]} size={32} />
          </ContentIcon>
          <IoIosClose
            size={40}
            style={{ cursor: 'pointer' }}
            onClick={() => setIsModalAddUserOpen(false)}
          />
        </Header>
        <Title>Convidar pessoas </Title>
        <Description>
          Convide pessoas para participar da implantação desta iniciativa.
        </Description>
        {step === 'add' ? (
          <Content>
            <Label>Adicionar pessoas</Label>
            <Select
              name="users"
              placeholder="Buscar pessoas..."
              onChange={handleSearchUsers}
              dataSelect={availableIdeaUsers}
              onClickOption={({ value }) => handleAddUser(value)}
              setClean={setClean}
            />
            <ContainerPreview hide={users.length === 0}>
              {users?.map(user => (
                <PreviewUserAddsComponent
                  key={user.id}
                  clickRemove={() => handleRemoveIdeaUser(user.id)}
                  name={user.name}
                  image={
                    user.image ? user.image : 'https://via.placeholder.com/50'
                  }
                />
              ))}
            </ContainerPreview>
          </Content>
        ) : (
          <Content>
            <Label>Mensagem</Label>
            <Textarea
              name="message"
              placeholder="Digite a sua mensagem..."
              onChange={handleMessageChange}
            />
          </Content>
        )}
        <ButtonNext disabled={!users.length} onClick={handleConfirm}>
          {step === 'add' ? 'Próximo' : 'Enviar convite'}
        </ButtonNext>
        <ButtonCancel onClick={handleCancel}>Cancelar</ButtonCancel>
      </Modal>
    </Background>
  );
}
