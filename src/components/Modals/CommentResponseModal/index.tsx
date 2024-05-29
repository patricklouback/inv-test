import Button from '@components/Button';
import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { NotificationsContext } from 'contexts/Notification';
import { IdeaContext } from 'contexts/Idea';
import {
  MessageTitle,
  SenderUser,
  NotificationContainer,
  UserImg,
  Username,
  NotificationContent,
  MessageDescription,
  ResponseArea,
} from './styles';

interface CommentResponseModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
}

export function CommentResponseModal({
  isOpen,
  notification,
  onRequestClose,
}: CommentResponseModalProps): JSX.Element {
  const { createIdeaComment } = useContext(IdeaCommentContext);
  const { createNotification } = useContext(NotificationsContext);
  const { updateIdeaKanbanStatus } = useContext(IdeaContext);
  const [message, setMessage] = useState('');

  const clearMessageArea = useCallback(() => {
    setMessage('');
  }, []);

  const handleCloseModal = useCallback(() => {
    clearMessageArea();
    onRequestClose();
  }, [clearMessageArea, onRequestClose]);

  const handleSubmitNewComment = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (notification.link && notification.link.startsWith('/')) {
        const formData = new FormData();
        const url = new URL(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}${notification.link}`
        );
        const ideaId = url.searchParams.get('ideaId');
        formData.append('ideaId', ideaId);
        formData.append('message', message);
        formData.append('type', 'DEVELOPMENT');

        const toastMessage = false;
        await createIdeaComment(formData, toastMessage);
        await createNotification({
          userIds: [notification.originUserId],
          link: notification.link,
          description: message,
          type: 'RESPONSE',
          receiverUserId: notification.userId,
        });
        updateIdeaKanbanStatus(ideaId, 'OWNER_REVIEW', toastMessage);
        onRequestClose();
        clearMessageArea();
      }
    },
    [
      notification,
      createIdeaComment,
      onRequestClose,
      updateIdeaKanbanStatus,
      message,
      clearMessageArea,
      createNotification,
    ]
  );

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
    >
      <NotificationContainer onSubmit={handleSubmitNewComment}>
        <NotificationContent>
          <SenderUser>
            <UserImg src={notification?.originUser?.image} />
            <Username>{notification?.originUser?.name} </Username>
          </SenderUser>
          <MessageDescription>
            <MessageTitle>
              {notification?.title || 'Titulo da notificação'}
            </MessageTitle>
            <span>"{notification?.description}"</span>
          </MessageDescription>
        </NotificationContent>

        <ResponseArea
          name="description"
          placeholder="Descrição da resposta..."
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <Button type="submit">Enviar</Button>
      </NotificationContainer>
    </Modal>
  );
}
