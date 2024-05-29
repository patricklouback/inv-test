import { Notification } from 'interfaces/notification';

interface NotificationProps {
  loading: boolean;
  notifications: Notification[];
  haveUnread: boolean;
}

type NotificationActions =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_HAVE_UNREAD'; haveUnread: boolean }
  | { type: 'SET_NOTIFICATIONS'; notifications: Notification[] };

export const NotificationDefaultValues = {
  notifications: [],
  loading: false,
  haveUnread: false,
} as NotificationProps;

export const NotificationReducer = (
  state: NotificationProps,
  action: NotificationActions
): NotificationProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      newState.notifications = action.notifications;
      break;
    case 'SET_HAVE_UNREAD':
      newState.haveUnread = action.haveUnread;
      break;
    case 'SET_LOADING':
      newState.loading = action.loading;
      break;
    default:
      break;
  }
  return newState;
};
