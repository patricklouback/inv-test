import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { IdeaContext } from 'contexts/Idea';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { Idea } from 'interfaces/idea';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import { HiOutlineLink, HiOutlinePlus } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';
import { useTheme } from 'styled-components';
import { getSequenceNumber } from 'utils/sequenceNumber';
import { getStringWith3Dots, getTextWidth } from 'utils/wordLengthCounter';
import {
  AddIdeaWrapper,
  Container,
  IdAndCloseWrapper,
  IdeaTitleWrapper,
  InputSearch,
  LinkTitleWrapper,
  LinkedIdeaCard,
  LinkedIdeasContainer,
  LinkedIdeasWrraper,
  ModalHeader,
  PossibleLinkIdeaCard,
  ResultSearcIdeasContainer,
  SearchIdeasWrapper,
  Subtitle,
  Title,
  WapperInput,
} from './styles';

interface LinkIdeasProps {
  idea?: Idea;
  isOpen: boolean;
  linkedIdeasState?: Idea[];
  setLinkedIdeasState?: any;
  onRequestClose?: () => void;
}

export const LinkIdeasModal: React.FC<LinkIdeasProps> = ({
  idea,
  isOpen,
  onRequestClose,
}): JSX.Element => {
  const { colors } = useTheme();
  const {
    linkIdeas,
    unLinkIdeas,
    listLinkedIdeas,
    allLinkedIdeas,
    listAllLinkedIdeas,
  } = useContext(ApprovalFunnelContext);
  const [ideasIds, setIdeasIds] = useState<string[]>([]);
  const { getIdeasForLink, ideasForLink, viewIdea } = useContext(IdeaContext);
  const { getIdeasComments } = useContext(IdeaCommentContext);
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  const [isSearchingIdea, setIsSearchingIdea] = useState(false);
  const [searchState, setSearchState] = useState('');
  const [ideasForLinkState, setIdeasForLinkState] = useState(ideasForLink);

  useEffect(() => {
    if (idea?.id && allLinkedIdeas) {
      const newIdeaIds = [];
      allLinkedIdeas.forEach(linkedIdea => newIdeaIds.push(linkedIdea));
      setIdeasIds(newIdeaIds.length === 0 ? [idea.id] : newIdeaIds);
    }
  }, [allLinkedIdeas]);

  async function loadAllLinkedIdeas(ideaId: string): Promise<void> {
    await listAllLinkedIdeas(ideaId);
  }

  useEffect(() => {
    async function loadComments(): Promise<void> {
      await getIdeasComments(ideasIds, {
        type: ['DEVELOPMENT', 'EVALUATION'],
      });
    }
    if (ideasIds.length > 0) {
      loadComments();
    }
  }, [ideasIds]);

  const handleLinkIdea = useCallback(
    async (ideaToLink: string) => {
      await linkIdeas(idea.id, ideaToLink);
      await viewIdea(idea.id);
      setIdeasForLinkState(
        await getIdeasForLink({
          search: searchState,
          ideaId: idea.id,
        })
      );
      await loadAllLinkedIdeas(idea.id);
    },
    [
      listLinkedIdeas,
      linkIdeas,
      setIdeasForLinkState,
      getIdeasForLink,
      searchState,
      idea,
    ]
  );

  const handleUnlinkidea = useCallback(
    async (secondaryIdeaId: string) => {
      await unLinkIdeas({
        params1: idea.id,
        params2: secondaryIdeaId,
      });
      await viewIdea(idea.id);
      setIdeasForLinkState(
        await getIdeasForLink({
          search: searchState,
          ideaId: idea.id,
        })
      );
    },
    [
      idea.id,
      unLinkIdeas,
      listLinkedIdeas,
      setIdeasForLinkState,
      getIdeasForLink,
      searchState,
    ]
  );

  const handleSearching = useCallback(() => {
    setIsSearchingIdea(true);
  }, []);

  const handleNotSearching = useCallback(() => {
    setIsSearchingIdea(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsAddingIdea(false);
    onRequestClose();
    handleNotSearching();
  }, [setIsAddingIdea, onRequestClose, handleNotSearching]);

  const buildIdeaTitle = (name: string): string => {
    const maxWidth = 250;
    return getTextWidth(name) > maxWidth
      ? getStringWith3Dots(name, maxWidth)
      : name;
  };

  useEffect(() => {
    (async () => {
      setIdeasForLinkState(
        await getIdeasForLink({
          search: searchState,
          ideaId: idea.id,
        })
      );
    })();
  }, [listLinkedIdeas, getIdeasForLink, idea, searchState]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="react-modal-idea-links"
      overlayClassName="react-modal-overlay"
    >
      <Container>
        <ModalHeader>
          <LinkTitleWrapper>
            <HiOutlineLink size={25} />
            <Title>Vínculos</Title>
          </LinkTitleWrapper>
          <IoMdClose
            onClick={handleClose}
            size={20}
            style={{ cursor: 'pointer' }}
          />
        </ModalHeader>
        <Subtitle>
          <p>
            <i>
              Ao vincular iniciativas, os comentários serão unificados e essa
              será a principal. Você poderá desfazer a qualquer momento.
            </i>
          </p>
        </Subtitle>
        <LinkedIdeasContainer>
          <div>Iniciativas complementares</div>
          <p>
            <i>
              Adicione outras iniciativas <strong>sem rotas definidas</strong>,
              que possuem um nível de semelhança, mas que não são totalmente
              dependentes.
            </i>
          </p>
          <LinkedIdeasWrraper>
            {idea.secondaryLinks.length > 0
              ? idea.secondaryLinks.map(linkedIdea => (
                  <LinkedIdeaCard key={linkedIdea.id}>
                    <IdeaTitleWrapper>
                      <BsCircleFill size={8} />
                      <p>{buildIdeaTitle(linkedIdea.title)}</p>
                    </IdeaTitleWrapper>
                    <IdAndCloseWrapper>
                      <p>ID #{getSequenceNumber(linkedIdea.sequence)}</p>
                      <IoMdClose
                        onClick={() => handleUnlinkidea(linkedIdea.id)}
                        size={15}
                        style={{ cursor: 'pointer' }}
                      />
                    </IdAndCloseWrapper>
                  </LinkedIdeaCard>
                ))
              : null}
          </LinkedIdeasWrraper>
          <AddIdeaWrapper
            isAdding={isAddingIdea}
            onClick={() => setIsAddingIdea(true)}
          >
            <HiOutlinePlus size={16} />
            <p>Adicionar iniciativa</p>
          </AddIdeaWrapper>
          <SearchIdeasWrapper isAdding={isAddingIdea}>
            <WapperInput>
              <div id="icon">
                <AiOutlineSearch color={colors.font} size={20} />
              </div>
              <InputSearch
                placeholder="Buscar por título, ID ou palavra-chave"
                value={searchState}
                onChange={e => setSearchState(e.target.value)}
                onFocus={handleSearching}
                // onBlur={handleNotSearching}
              />
            </WapperInput>
          </SearchIdeasWrapper>
          <ResultSearcIdeasContainer isSearchingIdea={isSearchingIdea}>
            {ideasForLinkState.length > 0
              ? ideasForLinkState.map(idea => (
                  <PossibleLinkIdeaCard
                    key={idea.id}
                    onClick={() => handleLinkIdea(idea.id)}
                  >
                    <IdeaTitleWrapper>
                      <BsCircleFill size={8} />
                      <p>{buildIdeaTitle(idea.title)}</p>
                    </IdeaTitleWrapper>
                    <IdAndCloseWrapper>
                      <p>ID #{getSequenceNumber(idea.sequence)}</p>
                    </IdAndCloseWrapper>
                  </PossibleLinkIdeaCard>
                ))
              : null}
          </ResultSearcIdeasContainer>
        </LinkedIdeasContainer>
      </Container>
    </Modal>
  );
};
