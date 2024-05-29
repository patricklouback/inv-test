import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  MessageTitle,
  SenderUser,
  NotificationContainer,
  UserImg,
  Username,
  NotificationContent,
  MessageDescriptionContainer,
  Button,
  ButtonContainer,
  MessageDescription,
} from './styles';

interface SendVideoResponseModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
}

export function SendVideoResponseModal({
  isOpen,
  notification,
  onRequestClose,
}: SendVideoResponseModalProps): JSX.Element {
  const { push } = useRouter();
  const handleOpenIdea = useCallback(
    async notification => {
      if (notification?.link) {
        push(notification.link);
      } else {
        toast.warning('Essa notificação não tem ação');
        onRequestClose();
      }
    },
    [onRequestClose]
  );
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <NotificationContainer>
        <NotificationContent>
          <SenderUser>
            <UserImg src={notification?.originUser?.image} />
            <Username>{notification?.originUser?.name}</Username>
          </SenderUser>
          <MessageDescriptionContainer>
            <MessageTitle>
              {notification?.title || 'Titulo da notificação'}
            </MessageTitle>
            <MessageDescription>
              "{notification?.description}"
            </MessageDescription>
          </MessageDescriptionContainer>
        </NotificationContent>
        <ButtonContainer>
          <Button onClick={() => handleOpenIdea(notification)}>
            Visualizar
          </Button>
        </ButtonContainer>
      </NotificationContainer>
    </Modal>
  );
}
