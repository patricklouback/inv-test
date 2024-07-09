import { NotificationPage } from '@components/PageComponents/Notification';
import { IdeaCommentProvider } from 'contexts/IdeaComments';

export default function Home() {
  return (
    <IdeaCommentProvider>
      <NotificationPage />
    </IdeaCommentProvider>
  );
}
