/* eslint-disable no-nested-ternary */
import Modal from 'react-modal';
import { Notification } from 'interfaces/notification';
import LinkIcon from '@components/Icons/Linkicon';
import { IoMdClose } from 'react-icons/io';
import {
  NotificationContainer,
  NotificationContent,
  MessageDescription,
  MessageDescriptionContainer,
  Button,
  ButtonContainer,
  ButtonLink,
  Exit,
  SenderUser,
  UserImg,
  Username,
} from './styles';

interface NotifyInviteUsersModalProps {
  isOpen: boolean;
  notification: Notification;
  onRequestClose: () => void;
}

export function NotifyInviteUsersModal({
  isOpen,
  notification,
  onRequestClose,
}: NotifyInviteUsersModalProps): JSX.Element {
  const isReject = notification?.title.includes('rejeitou');
  const isRemoved = notification?.title.includes('removeu');
  const textTitle = isReject
    ? 'rejeitou o seu convite.'
    : isRemoved
    ? 'removeu você da equipe.'
    : '';
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-invite-idea"
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <NotificationContainer>
        <Exit>
          <IoMdClose onClick={onRequestClose} />
        </Exit>
        <NotificationContent>
          <MessageDescriptionContainer>
            <SenderUser>
              <UserImg src={notification?.originUser?.image} />
              <Username>
                {notification?.originUser?.name} {textTitle}
              </Username>
            </SenderUser>
            {notification?.link && (
              <ButtonLink href={notification?.link}>
                Ver detalhes
                <LinkIcon />
              </ButtonLink>
            )}
            <MessageDescription>
              Iniciativa: "{notification?.title.split('"')[1]}"
            </MessageDescription>
            <MessageDescription>
              Justificativa: "{notification?.description}"
            </MessageDescription>
          </MessageDescriptionContainer>
        </NotificationContent>
        <ButtonContainer>
          <Button type="button" onClick={() => onRequestClose()}>
            Entendi
          </Button>
        </ButtonContainer>
      </NotificationContainer>
    </Modal>
  );
}
