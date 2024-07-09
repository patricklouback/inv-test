import { Container } from '@components/Container';
import { EvaluationCriteriaNotificationModal } from '@components/Modals/EvaluationCriteriaNotificationModal';
import { IdeaLinkedNotificationModal } from '@components/Modals/IdeaLinkedNotificationModal';
import { IdeaViewMore } from '@components/Modals/IdeaViewMoreModal';
import { NotifyStatusModal } from '@components/Modals/NotifyStatusModal';
import { ReplyCommentModal } from '@components/Modals/ReplyCommentModal';
import { RequestOwnerReviewModal } from '@components/Modals/RequestOwnerReviewModal';
import { SendIdeaResponseModal } from '@components/Modals/SendIdeaResponseModal';
import { SendVideoResponseModal } from '@components/Modals/SendVideoResponseModal';
import { DefaultSection } from '@components/SectionDefault';
import { NotificationsContext } from 'contexts/Notification';
import { formatDistance } from 'date-fns';
import ptBRLocale from 'date-fns/locale/pt-BR';
import parse from 'html-react-parser';
import { Notification, NotificationType } from 'interfaces/notification';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import { useTheme } from 'styled-components';
import { InviteUsersModal } from '@components/Modals/InviteUsersModal';
import { NotifyInviteUsersModal } from '@components/Modals/NotifyInviteUsersModal';
import {
  BadgeNotification,
  Container as C,
  DateContent,
  Icon,
  Info,
  InfoAndDateContainer,
  ItemImageUser,
  Items,
  ListNotifications,
  ReadMessages,
  Title,
} from './styles';

/* const dataExemple = [
  {
    id: 'asda cdd',
    type: true,
    title:
      'Proposta ”Aplicação de RFID” Quick-win aprovada - veja ospróximos passos',
    date: 'há 1 dia',
  },
]; */

export const NotificationPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { push } = useRouter();

  const [modalType, setModalType] = useState<NotificationType | undefined>();
  const [isViewIdeaOpen, setIsViewIdeaOpen] = useState(false);
  const [viewIdeaId, setViewIdeaId] = useState('');
  const [currentNotification, setCurrentNotification] = useState<
    Notification | undefined
  >();

  const { notifications, getNotifications, readMessages, loading } =
    useContext(NotificationsContext);

  const handleReadMessages = useCallback(async () => {
    const notificationsIds = notifications.map(
      notitification => notitification.id
    );

    await readMessages(notificationsIds);
  }, [notifications, readMessages]);

  const handleNotificationClick = useCallback(
    async notification => {
      const onlyRedirectNotificationsTypes = [
        'KANBAN_PROCESS_DEVELOP',
        'TECH_REVIEW',
        'AGENT_REVIEW',
        'COMMENT',
        'SEND_CAMPAIGN',
        'SEND_VIDEO',
      ];

      const notificationType = notification.type;

      if (onlyRedirectNotificationsTypes.includes(notificationType)) {
        const { link } = notification;
        if (link) push(link);
      }

      if (!onlyRedirectNotificationsTypes.includes(notificationType)) {
        setCurrentNotification(notification);
        setModalType(notificationType);
      }

      readMessages([notification.id]);
    },
    [push, readMessages]
  );

  const handleCloseIdeaModal = useCallback(() => {
    setViewIdeaId('');
    setIsViewIdeaOpen(false);
  }, []);

  const handleOpenIdeaModal = useCallback((ideaId: string) => {
    setViewIdeaId(ideaId);
    setIsViewIdeaOpen(true);
  }, []);

  useEffect(() => {
    async function loadData(): Promise<void> {
      await getNotifications();
    }

    loadData();
  }, [getNotifications]);

  return (
    <Container>
      <C>
        <IdeaLinkedNotificationModal
          notification={currentNotification}
          isOpen={modalType === 'LINK'}
          onRequestClose={() => setModalType(undefined)}
        />
        <RequestOwnerReviewModal
          notification={currentNotification}
          isOpen={modalType === 'OWNER_REVIEW'}
          onRequestClose={() => setModalType(undefined)}
        />

        <EvaluationCriteriaNotificationModal
          isOpen={modalType === 'EVALUATION_CRITERIA'}
          onRequestClose={() => setModalType(undefined)}
        />

        <InviteUsersModal
          notification={currentNotification}
          isOpen={modalType === 'REPLY_INVITE_IDEA'}
          onRequestClose={() => setModalType(undefined)}
        />

        <NotifyInviteUsersModal
          notification={currentNotification}
          isOpen={modalType === 'NOTIFY_INVITE_IDEA'}
          onRequestClose={() => setModalType(undefined)}
        />

        {/* <CommentResponseModal
          notification={currentNotification}
          isOpen={modalType === 'COMMENT'}
          onRequestClose={() => setModalType(undefined)}
        /> */}

        <ReplyCommentModal
          notification={currentNotification}
          isOpen={modalType === 'REPLY_COMMENT'}
          onRequestClose={() => setModalType(undefined)}
        />

        {viewIdeaId && isViewIdeaOpen && (
          <IdeaViewMore
            ideaId={viewIdeaId}
            isOpen={isViewIdeaOpen}
            onRequestClose={handleCloseIdeaModal}
          />
        )}

        <SendIdeaResponseModal
          handleOpenIdeaModal={handleOpenIdeaModal}
          notification={currentNotification}
          isOpen={modalType === 'SEND_IDEA'}
          onRequestClose={() => setModalType(undefined)}
        />

        <NotifyStatusModal
          notification={currentNotification}
          isOpen={modalType === 'NOTIFY_STATUS'}
          onRequestClose={() => setModalType(undefined)}
        />

        <SendVideoResponseModal
          notification={currentNotification}
          isOpen={modalType === 'SEND_VIDEO'}
          onRequestClose={() => setModalType(undefined)}
        />

        {
          // Não sabemos se irá existir
        }
        {/*
        {modalType === 'SEND_CAMPAIGN' && (
          <NotifyResponseModal
            notification={currentNotification}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
          />
        )} */}

        <DefaultSection
          type="normal"
          header={{
            box_icon: <FiBell color={colors.font} size={20} />,
            title: 'Notificações',
            item_right: (
              <ReadMessages onClick={handleReadMessages}>
                Marcar como lido
              </ReadMessages>
            ),
          }}
          to_back="/"
        >
          <ListNotifications>
            {loading &&
              [1, 2, 3].map(element => (
                <Skeleton
                  key={element}
                  className="campaigns-sekeleton"
                  containerClassName="container-campaigns-skeleton"
                  count={1}
                />
              ))}
            {!loading &&
              notifications.map(item => (
                <Items
                  key={item.id}
                  read={item.status === 'READ'}
                  onClick={() => handleNotificationClick(item)}
                >
                  {item.status === 'UNREAD' && <BadgeNotification />}
                  <InfoAndDateContainer>
                    <Info>
                      <Icon>
                        {item.originUserId ? (
                          <ItemImageUser
                            key={item.id}
                            images_users={
                              item.originUser.image || '/images/user.png'
                            }
                          />
                        ) : (
                          <div />
                        )}
                      </Icon>
                      <Title>
                        {parse(
                          item.title.length > 220
                            ? `${item.title.substring(0, 220)}...`
                            : item.title
                        )}
                      </Title>
                    </Info>
                    <DateContent>
                      há{' '}
                      {formatDistance(new Date(), new Date(item.createdAt), {
                        locale: ptBRLocale,
                        addSuffix: false,
                      })}
                    </DateContent>
                  </InfoAndDateContainer>
                </Items>
              ))}
          </ListNotifications>
        </DefaultSection>
      </C>
    </Container>
  );
};
