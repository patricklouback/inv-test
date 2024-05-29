import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
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

interface SendIdeaResponseModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
  handleOpenIdeaModal: (ideaId: string) => void;
}

export function SendIdeaResponseModal({
  isOpen,
  notification,
  onRequestClose,
  handleOpenIdeaModal,
}: SendIdeaResponseModalProps): JSX.Element {
  const handleOpenIdea = useCallback(
    async notification => {
      if (notification?.link && notification?.link?.startsWith('/')) {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}${notification.link}`
        );
        const ideaId = url.searchParams.get('ideaId');
        handleOpenIdeaModal(ideaId);
      } else {
        toast.warning('Essa notificação não tem ação');
        onRequestClose();
      }
    },
    [handleOpenIdeaModal, onRequestClose]
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
