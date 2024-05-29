import { User } from './user';

export type NotificationType =
  | 'COMMENT'
  | 'REPLY_COMMENT'
  | 'SEND_CAMPAIGN'
  | 'SEND_IDEA'
  | 'NOTIFY_STATUS'
  | 'RESPONSE'
  | 'SEND_VIDEO'
  | 'OWNER_REVIEW'
  | 'LINK'
  | 'EVALUATION_CRITERIA';

export interface Notification {
  id: string;
  title: string;
  description: string;
  userId: string;
  user: User;
  originUser?: User;
  originUserId?: string;
  type: NotificationType;
  status: 'READ' | 'UNREAD';
  createdAt: Date;
  link?: string;
}

export interface CreateNotification {
  areaIds?: string[];
  userIds?: string[];
  type: NotificationType;
  link: string;
  description: string;
  userOriginId?: string;
  receiverUserId?: string;
}
