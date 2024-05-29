import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import { useCallback } from 'react';
import {
  MessageTitle,
  NotificationContainer,
  NotificationContent,
  MessageDescription,
  MessageDescriptionContainer,
  Button,
  ButtonContainer,
} from './styles';

interface IdeaLinkedNotificationModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
}

export function IdeaLinkedNotificationModal({
  isOpen,
  notification,
  onRequestClose,
}: IdeaLinkedNotificationModalProps): JSX.Element {

  const handleClick = useCallback(async () => {
    onRequestClose();
  }, [onRequestClose]);

  const paragraphs = notification?.description.split(/\r?\n/);

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
          <MessageDescriptionContainer>
            <MessageTitle>
              Sua iniciativa foi vinculada!
            </MessageTitle>
            <MessageDescription>
              {paragraphs && paragraphs.map((paragraph) => 
                <>
                  <br/>
                  <p>{paragraph}</p>
                </>
              )}
            </MessageDescription>
          </MessageDescriptionContainer>
        </NotificationContent>
        <ButtonContainer>
          <Button type="button" onClick={handleClick}>
            Entendi
          </Button>
        </ButtonContainer>
      </NotificationContainer>
    </Modal>
  );
}
