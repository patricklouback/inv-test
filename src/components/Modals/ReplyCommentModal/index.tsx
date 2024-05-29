import Button from '@components/Button';
import { Textarea } from '@components/Textarea';
import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import { FormEvent, useCallback, useContext, useState } from 'react';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import {
  MessageTitle,
  SenderUser,
  NotificationContainer,
  UserImg,
  Username,
  NotificationContent,
  MessageDescription,
} from './styles';

interface ReplyCommentModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
  // idea: Idea;
  // setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  // setPreview?: React.Dispatch<SetStateAction<IdeaKanbamStep>>;
}

export function ReplyCommentModal({
  isOpen,
  notification,
  onRequestClose,
}: ReplyCommentModalProps): JSX.Element {
  const { createIdeaComment } = useContext(IdeaCommentContext);
  const [message, setMessage] = useState('');

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

        await createIdeaComment(formData);
        onRequestClose();
      }
    },
    [notification, createIdeaComment, onRequestClose, message]
  );

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={onRequestClose}
    >
      <NotificationContainer onSubmit={handleSubmitNewComment}>
        <NotificationContent>
          <SenderUser>
            <UserImg src={notification?.originUser?.image} />
            <MessageTitle>
              {notification?.title || 'Titulo da notificação'}
            </MessageTitle>
          </SenderUser>
          <MessageDescription>
            <Username>{notification?.originUser?.name}: </Username>
            <span>"{notification?.description}"</span>
          </MessageDescription>
        </NotificationContent>

        <Textarea
          name="message"
          placeholder="Descrição da resposta..."
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <Button type="submit">Enviar</Button>
      </NotificationContainer>
    </Modal>
  );
}
