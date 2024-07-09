import { ApresentationCompany } from '@components/Apresentation';
import { BackToTop } from '@components/BackToTop';
import { ConditionsAndTermsModal } from '@components/Modals/ConditionsAndTermsModal';
import { TourHome } from '@components/TourApp/TourHome';
import { AuthContext } from 'contexts/AuthContext';
import { IdeaCommentProvider } from 'contexts/IdeaComments';
import { TourId, TourStatus } from 'interfaces/tour';
import { useCallback, useContext } from 'react';
import CampaingComponent from './Carousel';
import { ContentLeft } from './Left';
import IdeasSentComponent from './Right';
import { ContentRight } from './Right/styles';
import { ContainerHome, ContentBottom } from './styles';

export default function HomePage() {
  const { user, acceptedTerms } = useContext(AuthContext);
  const unviewedHomeTour = user?.tours?.[TourId.HOME] === TourStatus.UNVIEWED;
  const onRequestCloseLogic = useCallback(() => {
    return null;
  }, []);

  return (
    <ContainerHome>
      {unviewedHomeTour && acceptedTerms && <TourHome />}
      <ConditionsAndTermsModal onRequestClose={onRequestCloseLogic} />
      <ApresentationCompany />
      <CampaingComponent />
      <ContentBottom>
        <ContentLeft />
        <ContentRight>
          <IdeaCommentProvider>
            <IdeasSentComponent />
          </IdeaCommentProvider>
        </ContentRight>
      </ContentBottom>
      <BackToTop />
    </ContainerHome>
  );
}
