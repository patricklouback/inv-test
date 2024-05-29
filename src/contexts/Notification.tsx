/* eslint-disable no-restricted-syntax */
import { IdeaKanbamStep } from 'interfaces/idea';
import { CreateNotification, Notification } from 'interfaces/notification';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { AuthContext } from './AuthContext';
import {
  NotificationDefaultValues,
  NotificationReducer,
} from './reducers/NotificationReducer';

interface NotificationsPropsData {
  notifications: Notification[];
  haveUnread: boolean;
  loading: boolean;
  readMessages: (notificationIds: string[]) => Promise<void>;
  createNotification: (form: CreateNotification) => Promise<void>;
  getNotifications: () => Promise<void>;
  notificateIdeaUsers: (
    ideadId: string,
    toStep: IdeaKanbamStep
  ) => Promise<void>;
}

export const NotificationsContext = createContext<NotificationsPropsData>(
  {} as NotificationsPropsData
);

export const NotificationsProvider: React.FC = ({ children }): JSX.Element => {
  const { token } = useContext(AuthContext);
  const [dataReducer, dispatch] = useReducer(
    NotificationReducer,
    NotificationDefaultValues
  );
  const getNotifications = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.get<{ notifications: Notification[] }>(
        '/notifications/list'
      );
      const haveUnread = data.notifications.some(
        notification => notification.status === 'UNREAD'
      );

      dispatch({ type: 'SET_HAVE_UNREAD', haveUnread });
      dispatch({
        type: 'SET_NOTIFICATIONS',
        notifications: data.notifications,
      });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (err) {
      dispatch({ type: 'SET_LOADING', loading: false });
      dispatch({ type: 'SET_HAVE_UNREAD', haveUnread: false });
      dispatch({ type: 'SET_NOTIFICATIONS', notifications: [] });
    }
  }, []);

  const readMessages = useCallback(async (notificationIds: string[]) => {
    try {
      await api.put('/notifications/readNotification', {
        notificationIds,
      });

      dispatch({ type: 'SET_HAVE_UNREAD', haveUnread: false });
      getNotifications();
    } catch (err) {
      toast.error('Erro ao ler as notificações');
    }
  }, []);

  const createNotification = useCallback(async (body: CreateNotification) => {
    try {
      await api.post('/notifications/notification', {
        ...body,
      });
      toast.success('Sucesso ao enviar notificação!');
    } catch (err) {
      toast.error('Erro ao criar nova notificação');
    }
  }, []);

  const notificateIdeaUsers = useCallback(
    async (ideaId: string, toStep: IdeaKanbamStep) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.post(`/notifications/idea-users/${ideaId}`, {
          toStep,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.error('Erro notificar os Idealizadores da iniciativa');
      }
    },
    []
  );

  useEffect(() => {
    if (token) {
      getNotifications();
    }
  }, [token, getNotifications]);

  const CampaignDataValue = useMemo(() => {
    return {
      ...dataReducer,
      readMessages,
      getNotifications,
      createNotification,
      notificateIdeaUsers,
    };
  }, [
    dataReducer,
    readMessages,
    getNotifications,
    createNotification,
    notificateIdeaUsers,
  ]);

  return (
    <NotificationsContext.Provider value={CampaignDataValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
