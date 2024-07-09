import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import { useContext, useEffect, useState } from 'react';
import InviteIcon from '@components/Icons/Inviteicon';
import CheckIcon from '@components/Icons/CheckIcon';
import LinkIcon from '@components/Icons/Linkicon';
import InfoIcon from '@components/Icons/InfoIcon';
import { Textarea } from '@components/Textarea';
import { IoMdClose } from 'react-icons/io';
import { IdeaContext } from 'contexts/Idea';
import {
  MessageTitle,
  NotificationContainer,
  NotificationContent,
  MessageDescription,
  MessageDescriptionContainer,
  Button,
  ButtonContainer,
  ButtonSecondary,
  ButtonLink,
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

interface InviteUsersModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
}

export function InviteUsersModal({
  isOpen,
  notification,
  onRequestClose,
}: InviteUsersModalProps): JSX.Element {
  const { acceptInvite, rejectInvite } = useContext(IdeaContext);
  const [rejectStep, setRejectStep] = useState(false);
  const [notificationData, setNotificationData] = useState(notification);
  const [ideaId, setIdeaId] = useState('');
  const [message, setMessage] = useState<string>('');

  const handleAcceptInvite = async () => {
    await acceptInvite({ ideaId });
    onRequestClose();
  };

  const handleRejectInvite = async () => {
    await rejectInvite({ ideaId, message });
    onRequestClose();
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (notification) {
      setIdeaId(notification.link.split('/')[2]);
      setNotificationData(notification);
    }
  }, [notification]);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-invite-idea"
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      {rejectStep ? (
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
                Explique para o gestor por qual motivo você está rejeitando a
                participação na equipe.
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
            <RejectButton type="button" onClick={handleRejectInvite}>
              Enviar Resposta
            </RejectButton>
            <RejectButtonSecondary onClick={onRequestClose}>
              Cancelar
            </RejectButtonSecondary>
          </RejectButtonContainer>
        </NotificationContainer>
      ) : (
        <NotificationContainer>
          <Exit>
            <IoMdClose onClick={onRequestClose} />
          </Exit>
          <NotificationContent>
            <MessageDescriptionContainer>
              <InviteIcon />
              <MessageTitle>Novo Convite</MessageTitle>
              <MessageDescription>
                {notificationData?.title.split('Clique')[0]}
              </MessageDescription>
              {notificationData?.link && (
                <ButtonLink href={notificationData?.link}>
                  Ver detalhes
                  <LinkIcon />
                </ButtonLink>
              )}
              <MessageDescription>
                {notification?.description}
              </MessageDescription>
            </MessageDescriptionContainer>
            <MessageDescription>O que você deseja fazer?</MessageDescription>
          </NotificationContent>
          <ButtonContainer>
            <ButtonSecondary type="button" onClick={() => setRejectStep(true)}>
              Recusar
            </ButtonSecondary>
            <Button type="button" onClick={handleAcceptInvite}>
              <CheckIcon />
              Aceitar Convite
            </Button>
          </ButtonContainer>
        </NotificationContainer>
      )}
    </Modal>
  );
}
