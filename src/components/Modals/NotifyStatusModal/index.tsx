import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import { useCallback } from 'react';
import {
  MessageTitle,
  SenderUser,
  NotificationContainer,
  UserImg,
  Username,
  NotificationContent,
  MessageDescription,
  MessageDescriptionContainer,
  Button,
  ButtonContainer,
} from './styles';

interface NotifyStatusModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
}

export function NotifyStatusModal({
  isOpen,
  notification,
  onRequestClose,
}: NotifyStatusModalProps): JSX.Element {
  const handleClick = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

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
          <Button type="button" onClick={handleClick}>
            OK
          </Button>
        </ButtonContainer>
      </NotificationContainer>
    </Modal>
  );
}
