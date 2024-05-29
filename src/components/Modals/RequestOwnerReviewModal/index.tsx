import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
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

interface RequestOwnerReviewModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
}

export function RequestOwnerReviewModal({
  isOpen,
  notification,
  onRequestClose,
}: RequestOwnerReviewModalProps): JSX.Element {
  const { push } = useRouter();

  const handleClick = useCallback(async () => {
    onRequestClose();
    if (notification) {
      push(`/${notification.link}`);
    }
  }, [notification, onRequestClose, push]);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-owner"
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
            Visualizar iniciativa
          </Button>
        </ButtonContainer>
      </NotificationContainer>
    </Modal>
  );
}
