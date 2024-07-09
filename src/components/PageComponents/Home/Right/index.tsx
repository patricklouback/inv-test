import { ItemIdeaSent } from '@components/IdeaSent';
import { FilterComponent } from '@components/ItemFilter';
import { IdeaViewMore } from '@components/Modals/IdeaViewMoreModal';
import { DefaultSection } from '@components/SectionDefault';
import { AuthContext } from 'contexts/AuthContext';
import { IdeaContext } from 'contexts/Idea';
import { useCallback, useContext, useEffect, useState } from 'react';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { NoneIdeas, Base, Scroll } from './styles';

export default function IdeasSentComponent(): JSX.Element {
  const { getIdeasForUserArea, loading, ideas, idea, viewIdea } =
    useContext(IdeaContext);
  const { token } = useContext(AuthContext);

  const [isOpenIdeaViewMoreModal, setIsOpenIdeaViewMoreModal] = useState(false);

  const handleOpenIdeaViewMoreModal = useCallback(
    async (ideaId: string) => {
      await viewIdea(ideaId);
      setIsOpenIdeaViewMoreModal(true);
    },
    [viewIdea]
  );

  const handleCloseIdeaViewMoreModal = useCallback(() => {
    setIsOpenIdeaViewMoreModal(false);
  }, []);

  useEffect(() => {
    async function loadData(): Promise<void> {
      getIdeasForUserArea({
        orderColumn: 'createdAt',
        orderOrientation: 'desc',
        status: 'PUBLISHED',
      });
    }

    if (token) {
      loadData();
    }
  }, [getIdeasForUserArea, token]);

  function renderIdeas(): JSX.Element {
    return ideas.length > 0 ? (
      <>
        {ideas.map(idea => (
          <ItemIdeaSent
            showTags
            key={idea.id}
            idea={idea}
            isAlternative
            onClick={() => handleOpenIdeaViewMoreModal(idea.id)}
          />
        ))}
      </>
    ) : (
      <NoneIdeas>Nenhuma iniciativa submetida.</NoneIdeas>
    );
  }

  return (
    <Base>
      {idea?.id && (
        <IdeaViewMore
          isOpen={isOpenIdeaViewMoreModal}
          ideaId={idea.id}
          onRequestClose={handleCloseIdeaViewMoreModal}
        />
      )}
      <DefaultSection
        type="full"
        header={{
          title: 'Iniciativas submetidas',
          Icon: <RiLightbulbFlashLine size={24} />,
          item_right: <FilterComponent screen="ideas" />,
        }}
      >
        <Scroll>
          {loading
            ? [1, 2, 3, 4].map(i => (
                <Skeleton
                  key={i}
                  className="idea-skeleton"
                  containerClassName="container-idea-skeleton"
                  count={1}
                />
              ))
            : renderIdeas()}
        </Scroll>
      </DefaultSection>
    </Base>
  );
}
