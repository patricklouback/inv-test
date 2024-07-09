import Modal from 'react-modal';
import { useContext, useState } from 'react';
import InfoIcon from '@components/Icons/InfoIcon';
import { Textarea } from '@components/Textarea';
import { IoMdClose } from 'react-icons/io';
import { IdeaContext } from 'contexts/Idea';
import {
  MessageTitle,
  NotificationContainer,
  NotificationContent,
  RejectContainer,
  RejectMessageDescription,
  Label,
  Content,
  RejectButton,
  RejectButtonContainer,
  RejectButtonSecondary,
  ContentIcon,
  Exit,
} from './styles';

interface DeleteInviteUsersModalProps {
  ideaId: string;
  userId: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function DeleteInviteUsersModal({
  ideaId,
  userId,
  isOpen,
  onRequestClose,
}: DeleteInviteUsersModalProps): JSX.Element {
  const { excludeUsersFromIdea } = useContext(IdeaContext);
  const [message, setMessage] = useState('');

  const handleDeleteInvite = async () => {
    await excludeUsersFromIdea({
      ideaId,
      message,
      receiverIds: [userId],
    });
    onRequestClose();
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-invite-idea"
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <NotificationContainer>
        <NotificationContent>
          <ContentIcon>
            <InfoIcon />
          </ContentIcon>
          <Exit>
            <IoMdClose onClick={onRequestClose} />
          </Exit>
          <RejectContainer>
            <MessageTitle>Envie um feedback</MessageTitle>
            <RejectMessageDescription>
              Explique o motivo para a remoção do participante.
            </RejectMessageDescription>
          </RejectContainer>
          <Content>
            <Label>Mensagem</Label>
            <Textarea
              name="message"
              placeholder="Digite a sua mensagem..."
              onChange={handleMessageChange}
            />
          </Content>
        </NotificationContent>
        <RejectButtonContainer>
          <RejectButton type="button" onClick={handleDeleteInvite}>
            Remover Participante
          </RejectButton>
          <RejectButtonSecondary type="button" onClick={onRequestClose}>
            Cancelar
          </RejectButtonSecondary>
        </RejectButtonContainer>
      </NotificationContainer>
    </Modal>
  );
}
