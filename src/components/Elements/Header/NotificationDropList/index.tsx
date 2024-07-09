/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { DropMenuList } from '@components/DropMenuList';
import { NotificationsContext } from 'contexts/Notification';
import Link from 'next/link';
import React, { useCallback, useContext } from 'react';
import parse from 'html-react-parser';
import { FiBell } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import {
  Items,
  Icon,
  Value,
  ViewAll,
  EmpityNotification,
  ItemImageUser,
} from './styles';

export function NotificationDropList(): JSX.Element {
  const { notifications, readMessages, haveUnread } =
    useContext(NotificationsContext);
  const { colors } = useTheme();
  const { push } = useRouter();

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
      } else {
        push('/notifications');
      }

      readMessages([notification.id]);
    },
    [push, readMessages]
  );

  return (
    <DropMenuList
      haveUnread={haveUnread}
      Icon={<FiBell color={colors.font} size={20} />}
      extraBottom={
        notifications.length > 0 && (
          <ViewAll>
            <Link href="/notifications">Ver tudo</Link>
          </ViewAll>
        )
      }
    >
      <div>
        {notifications.length === 0 && (
          <EmpityNotification>
            <p>Não há notificações</p>
          </EmpityNotification>
        )}
        {notifications?.length > 0 &&
          notifications.slice(0, 5).map(item => (
            <Items key={item.id} onClick={() => handleNotificationClick(item)}>
              {item.originUserId && (
                <Icon>
                  <ItemImageUser
                    key={item.id}
                    images_users={item.originUser.image || '/images/user.png'}
                  />
                </Icon>
              )}
              <Value>{parse(item.title)}</Value>
            </Items>
          ))}
      </div>
    </DropMenuList>
  );
}
