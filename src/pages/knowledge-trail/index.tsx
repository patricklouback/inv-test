import { KnowledgeTrailPage } from '@components/PageComponents/KnowledgeTrail';
import { TourKnowledgeTrail } from '@components/TourApp/TourKnowledgeTrail';
import { AuthContext } from 'contexts/AuthContext';
import { BannersProvider } from 'contexts/Banners';
import { CommentsListProvider } from 'contexts/CommentsContext';
import { NotificationsProvider } from 'contexts/Notification';
import { ProviderUser } from 'contexts/User';
import { VideoListProvider } from 'contexts/VideoListContext';
import { TourId, TourStatus } from 'interfaces/tour';
import { useContext } from 'react';

export default function Home(): JSX.Element {
  const { user } = useContext(AuthContext);
  const unviewedTourKnowledgeTrail =
    user?.tours[TourId.KNOWLEDGE_TRAIL] === TourStatus.UNVIEWED;
  return (
    <CommentsListProvider>
      <VideoListProvider>
        <ProviderUser>
          <NotificationsProvider>
            <BannersProvider>
              {unviewedTourKnowledgeTrail && <TourKnowledgeTrail />}
              <KnowledgeTrailPage />
            </BannersProvider>
          </NotificationsProvider>
        </ProviderUser>
      </VideoListProvider>
    </CommentsListProvider>
  );
}
