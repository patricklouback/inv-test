/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { CardIdeia } from '@components/CardIdea';
import { UserCard } from '@components/CardUser';
import { ChangeCampaignModal } from '@components/Modals/ChangeCampaignModal';
import { LinkIdeasModal } from '@components/Modals/LinkIdeasModal';
import { RefuseIdeaModal } from '@components/Modals/RefuseIdeaModal';
import { RequestRepresentativeAnalysisModal } from '@components/Modals/RequestRepresentativeAnalysisModal';
import { RequestReviewModal } from '@components/Modals/RequestReviewModal';
import { RequestTechReview } from '@components/Modals/RequestTechReview';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { AuthContext } from 'contexts/AuthContext';
import { HistoryItensContext } from 'contexts/History';
import { IdeaContext } from 'contexts/Idea';
import { IdeaTagContext } from 'contexts/IdeaTags';
import { ProcessActivityContext } from 'contexts/ProcessActivity';
import { Idea, IdeaKanbamStep, IdeaTag } from 'interfaces/idea';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { hotjar } from 'react-hotjar';
import { BsLink45Deg } from 'react-icons/bs';
import { FaWalking } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RiFileEditLine } from 'react-icons/ri';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { FilesDetails } from '@components/PageComponents/IdeaDetail/ModalPreview';
import BarraSvg from '../../../../assets/inventta/barra.svg';
import DeleteTagSvg from '../../../../assets/inventta/exclude.svg';
import TicketSvg from '../../../../assets/inventta/ticketBigger.svg';
import {
  getStringWith3Dots,
  getTextWidth,
} from '../../../../utils/wordLengthCounter';
import { LinkedIdea } from '../Item/Links/LinkedIdea';
import { TagList } from '../Item/Tags';
import { ModalDirectApproval } from './ModalDirectApproval';
import {
  ButtonFiles,
  ColumnRigth,
  Container,
  Content,
  ContentParticipants,
  DeleteTag,
  DeleteTagWrapper,
  DropList,
  EmptyTags,
  Exit,
  FilesContainer,
  FirtInformation,
  Hashtag,
  IdeaAppId,
  IdeaDescription,
  ImagesIdea,
  Img,
  InfoBottom,
  InfoContainer,
  InfoTop,
  ItemDescription,
  ItemDroped,
  ItemImg,
  ItemParticipants,
  Line,
  LinkTitle,
  LinkTitleWrapper,
  ListDescriptionIdea,
  ListParticipants,
  MainTitle,
  ParagraphIdea,
  Participants,
  Tag,
  TagName,
  TagNameWrapper,
  TagTitle,
  TagTitleWrapper,
  Tags,
  TagsComponent,
  TagsWrapper,
  TextHashtag,
  TicketTag,
  TitleDescription,
  TitleParticipants,
} from './styles';

interface PreviewProps {
  setPreview: () => void;
  updateKanbanIdeas: () => Promise<void>;
  idea?: Idea;
  kanbanStep?: IdeaKanbamStep;
  shouldShowEvaluationCriteria: boolean;
  scrollToEvaluationCriteria?: () => void;
}

export const PreviewFunnel: React.FC<PreviewProps> = ({
  setPreview,
  updateKanbanIdeas,
  kanbanStep,
  idea,
  shouldShowEvaluationCriteria,
  scrollToEvaluationCriteria,
}): JSX.Element => {
  const { updateIdea } = useContext(IdeaContext);
  const { colors } = useTheme();
  const [nextStepKanban, setNextStepKanban] = useState<IdeaKanbamStep>();
  const [nextSequenceKanban, setNextSequenceKanban] = useState<number>();
  const { user } = useContext(AuthContext);
  const { updateKanbanIdeaStatus } = useContext(ApprovalFunnelContext);
  const { getIdeaTags, allIdeaTags, updateIdeaTagChecked, filteredIdeaTags } =
    useContext(IdeaTagContext);
  const ideaTagsList = allIdeaTags.filter(
    ideaTag => ideaTag.ideaId === idea.id && ideaTag.checked
  );
  // ALL LOGIC MODAL ----------------------------------------------------------
  const [dropItems, setDropItems] = useState(false);
  const [dropTypeItems, setDropTypeItems] = useState(false);
  const [isModalTechReviewOpen, setIsModalTechReviewOpen] = useState(false);
  const [
    isModalRepresentativeAnalysisOpen,
    setIsModalRepresentativeAnalysisOpen,
  ] = useState(false);
  const [isModalRefuseIdeaOpen, setIsModalRefuseIdeaOpen] = useState(false);
  const [isModalChangeCampaignOpen, setIsModalChangeCampaignOpen] =
    useState(false);
  const [isModalLinkIdeasOpen, setIsModalLinkIdeasOpen] = useState(false);
  const [isModalRevisionIdeaOpen, setIsModalRevisionIdeaOpen] = useState(false);
  const [showEditTag, setShowEditTag] = useState(false);
  const MAX_TITLE_WIDTH = 200;
  const { getProcessActivities, processActivitiesCampaign } = useContext(
    ProcessActivityContext
  );
  const { getHistoryItens } = useContext(HistoryItensContext);
  const [modalDirectApproval, setModalDirectApproval] = useState(false);
  const [modalPreviewFile, setModalPreviewFile] = useState<boolean>(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const optionItemRef = useRef(null);

  const getMaxWidth = (): number => {
    return MAX_TITLE_WIDTH + (showEditTag ? 0 : 20);
  };

  const buildTagName = (name: string): string => {
    return getTextWidth(name) > getMaxWidth()
      ? getStringWith3Dots(name, getMaxWidth())
      : name;
  };

  useEffect(() => {
    const handleOutsideClick = (event): void => {
      if (
        optionItemRef.current &&
        !optionItemRef.current.contains(event.target)
      ) {
        setShowEditTag(false);
        event.stopPropagation();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleUpdateIdea = useCallback(
    async (processActivityId: string) => {
      await updateIdea(idea.id, { processActivityId });
      await getHistoryItens(idea.id);
      setDropTypeItems(false);
    },
    [updateIdea, idea?.id]
  );

  useEffect(() => {
    (async (): Promise<void> => {
      if (allIdeaTags.length === 0) {
        await getIdeaTags(filteredIdeaTags);
      }
    })();
  }, [getIdeaTags, idea?.id]);

  const updateStatus = useCallback(
    async (toStep: IdeaKanbamStep, sequence: number): Promise<boolean> => {
      if (
        (!idea.processActivity && toStep === 'SELECT') ||
        (!idea.processActivity && toStep === 'IMPLEMENTED')
      ) {
        toast.error('É necessário que a iniciativa tenha uma rota definida');
        return false;
      }
      await updateKanbanIdeaStatus(idea, toStep, sequence);
      if (toStep === 'SELECT') {
        if (hotjar.initialized()) {
          hotjar.event('select_idea');
        } else {
          console.error('hotjar não inicializado corretamente');
        }
      }
      setPreview();
      return true;
    },
    [updateKanbanIdeaStatus, idea, setPreview]
  );

  const nextStatus = useCallback((kanbanStep: IdeaKanbamStep) => {
    let nextStepKanban: IdeaKanbamStep = kanbanStep;
    let nextSequenceKanban: number;
    switch (kanbanStep) {
      case 'SCREENING':
        nextStepKanban = 'ANALYZE';
        nextSequenceKanban = 2;
        break;
      case 'ANALYZE':
        nextStepKanban = 'SELECT';
        nextSequenceKanban = 3;
        break;
      case 'SELECT':
        nextStepKanban = 'IMPLEMENTED';
        nextSequenceKanban = 4;
        break;
      default:
        break;
    }
    setNextStepKanban(nextStepKanban);
    setNextSequenceKanban(nextSequenceKanban);
  }, []);

  const getSequenceNumber = useCallback((sequence: number): any => {
    if (sequence >= 100000) {
      return sequence;
    }
    const paddedSequence = sequence.toString().padStart(6, '0');
    return paddedSequence;
  }, []);

  const showEditTagTogle = (): void => {
    setShowEditTag(!showEditTag);
  };

  const deleteTagFromCard = async (ideaTag: IdeaTag): Promise<void> => {
    await updateIdeaTagChecked(ideaTag.id, false);
    await getIdeaTags(filteredIdeaTags);
  };

  const nextKanbanStep = (ideaKanbanStep: IdeaKanbamStep): string => {
    let result;
    switch (ideaKanbanStep) {
      case 'SCREENING':
        result = 'Análise';
        break;
      case 'ANALYZE':
        result = 'Seleção';
        break;
      case 'SELECT':
        result = 'Implementação';
        break;
      default:
        result = '';
    }
    return result;
  };

  useEffect(() => {
    getProcessActivities(idea.campaignId);
  }, [getProcessActivities, idea.campaignId]);

  const handleScrollToEvaluationCriteria = (): void => {
    setTimeout(() => setDropItems(false), 100); // TODO entender pq funciona com timeout
    scrollToEvaluationCriteria();
  };

  const handleConfirmNextStep = (): void => {
    // updateStatus(nextStepKanban, nextSequenceKanban);
  };

  const execOpenModal = (file: string) => {
    setModalPreviewFile(true);
    setPreviewFile(file);
  };

  return (
    <>
      <RequestRepresentativeAnalysisModal
        idea={idea}
        isOpen={isModalRepresentativeAnalysisOpen}
        setIsOpen={setIsModalRepresentativeAnalysisOpen}
        setPreview={setPreview}
        onSubmitReview={updateKanbanIdeas}
      />

      <RequestTechReview
        idea={idea}
        isOpen={isModalTechReviewOpen}
        setIsOpen={setIsModalTechReviewOpen}
        setPreview={setPreview}
        onSubmitReview={updateKanbanIdeas}
      />

      <RequestReviewModal
        isOpen={isModalRevisionIdeaOpen}
        idea={idea}
        onRequestClose={() => {
          setIsModalRevisionIdeaOpen(false);
        }}
        setPreview={setPreview}
        onSubmitReview={updateKanbanIdeas}
      />

      <RefuseIdeaModal
        isOpen={isModalRefuseIdeaOpen}
        idea={idea}
        onRequestClose={() => {
          setIsModalRefuseIdeaOpen(false);
        }}
        setPreview={setPreview}
        onSubmitReview={updateKanbanIdeas}
      />

      <ChangeCampaignModal
        isOpen={isModalChangeCampaignOpen}
        idea={idea}
        onRequestClose={() => {
          setIsModalChangeCampaignOpen(false);
        }}
      />

      <LinkIdeasModal
        isOpen={isModalLinkIdeasOpen}
        idea={idea}
        linkedIdeasState={idea.secondaryLinks}
        onRequestClose={() => {
          setIsModalLinkIdeasOpen(false);
        }}
      />

      <Container>
        <Exit>
          <IoMdClose onClick={setPreview} />
        </Exit>
        <Line />
        <Content>
          <Tags>
            <Tag
              click
              onBlur={() => setTimeout(() => setDropTypeItems(false), 100)}
              onClick={() => setDropTypeItems(true)}
            >
              <CardIdeia
                value={idea.processActivity?.name || 'Definir'}
                icon={
                  !idea?.processActivity?.name ? (
                    <FiSearch size={20} />
                  ) : (
                    <RiFileEditLine color={colors.red} size={20} />
                  )
                }
                useMargin
              />
              {dropTypeItems && (
                <DropList>
                  {processActivitiesCampaign.map(processActivity => (
                    <ItemDroped
                      onClick={() => handleUpdateIdea(processActivity.id)}
                    >
                      <div id="frag" />
                      {`Definir como ${processActivity.name}`}
                    </ItemDroped>
                  ))}
                </DropList>
              )}
            </Tag>

            <Tag
              click
              onBlur={() => setTimeout(() => setDropItems(false), 100)}
              onClick={() => {
                setDropItems(true);
                nextStatus(kanbanStep);
              }}
            >
              {kanbanStep !== 'IMPLEMENTED' && (
                <CardIdeia
                  background={colors.greenHipeLight}
                  value="Ações"
                  backgroundIcon={colors.greenHipeLight}
                  icon={<FaWalking color={colors.font} size={20} />}
                />
              )}

              {dropItems && (
                <DropList>
                  {kanbanStep !== 'IMPLEMENTED' && (
                    <ItemDroped
                      onClick={() => {
                        return idea.campaign.usingCriteria
                          ? setModalDirectApproval(true)
                          : updateStatus(nextStepKanban, nextSequenceKanban);
                      }}
                    >
                      <div id="frag" />
                      Aprovação direta para {nextKanbanStep(kanbanStep)}
                    </ItemDroped>
                  )}
                  {/* {kanbanStep !== 'SELECT' && kanbanStep !== 'IMPLEMENTED' && (
                    <ItemDroped
                      onClick={() => {
                        updateStatus('IMPLEMENTED', 4);
                      }}
                    >
                      Aprovar direta para Implementação
                    </ItemDroped>
                  )} */}

                  {shouldShowEvaluationCriteria && (
                    <ItemDroped onClick={handleScrollToEvaluationCriteria}>
                      Avaliação dos critérios
                    </ItemDroped>
                  )}

                  <ItemDroped
                    onClick={() => {
                      setIsModalRepresentativeAnalysisOpen(true);
                    }}
                  >
                    Solicitar Parecer Técnico
                    <MdKeyboardArrowRight size={28} />
                  </ItemDroped>
                  <ItemDroped
                    onClick={() => {
                      setIsModalRevisionIdeaOpen(true);
                    }}
                  >
                    Solicitar Revisão
                    <MdKeyboardArrowRight size={18} />
                  </ItemDroped>
                  {(user.isAdmin || user.isManager) && (
                    <ItemDroped
                      onClick={() => {
                        setIsModalRefuseIdeaOpen(true);
                      }}
                    >
                      Recusar Iniciativa
                    </ItemDroped>
                  )}
                  {(user.isAdmin || user.isManager) && (
                    <ItemDroped
                      onClick={() => {
                        setIsModalChangeCampaignOpen(true);
                      }}
                    >
                      Mover a Iniciativa
                      <MdKeyboardArrowRight size={18} />
                    </ItemDroped>
                  )}
                  {(user.isAdmin || user.isManager) && (
                    <ItemDroped
                      onClick={() => {
                        setIsModalLinkIdeasOpen(true);
                      }}
                    >
                      Vincular Iniciativas
                      <MdKeyboardArrowRight size={18} />
                    </ItemDroped>
                  )}
                </DropList>
              )}
            </Tag>
          </Tags>

          <FirtInformation>
            <InfoContainer>
              <InfoTop>
                <TextHashtag>
                  <Hashtag>#{idea?.campaign?.sequence || 0}</Hashtag>
                  {idea?.campaign?.title}
                </TextHashtag>
                <IdeaAppId>{`#${getSequenceNumber(idea.sequence)}`}</IdeaAppId>
              </InfoTop>
              <InfoBottom>
                <MainTitle>{idea?.title}</MainTitle>
                <FilesContainer>
                  {idea?.ideaFiles.map((ideaFile, i) => (
                    <ButtonFiles key={i}
                      onClick={() => execOpenModal(ideaFile)}
                      >
                      <a rel="noreferrer">
                        Arquivo {i + 1}
                      </a>
                    </ButtonFiles>
                  ))}
                </FilesContainer>
                {modalPreviewFile && (
                  <FilesDetails
                    file={previewFile}
                    close={setModalPreviewFile}
                  />
                )}
                <IdeaDescription>
                  <ReactMarkdown>{idea?.description}</ReactMarkdown>
                </IdeaDescription>
                <ListDescriptionIdea>
                  {idea?.ideaFields?.map(iField => (
                    <ItemDescription key={iField.id}>
                      <TitleDescription>{iField.title}</TitleDescription>
                      <ParagraphIdea>
                        {iField.type === 'SELECT' ? (
                          <IdeaDescription>
                            <ReactMarkdown>
                              {
                                JSON.parse(iField.options).find(
                                  i =>
                                    i.value ===
                                    iField?.ideaFieldValues[0]?.value
                                ).name
                              }
                            </ReactMarkdown>
                          </IdeaDescription>
                        ) : (
                          <IdeaDescription>
                            <ReactMarkdown>
                              {iField?.ideaFieldValues[0]?.value}
                            </ReactMarkdown>
                          </IdeaDescription>
                        )}
                      </ParagraphIdea>
                    </ItemDescription>
                  ))}
                </ListDescriptionIdea>
              </InfoBottom>
            </InfoContainer>
            <ColumnRigth>
              <Participants>
                <TitleParticipants>Criador da Iniciativa</TitleParticipants>
                <ContentParticipants>
                  <ListParticipants>
                    {idea?.ideaUsers?.map((user, i) => (
                      <ItemParticipants key={i}>
                        {user.type === 'OWNER' ? (
                          <UserCard
                            name={user?.user?.name}
                            area={user?.user?.area.name ?? null}
                            areaColor={user?.user?.area.color ?? null}
                          />
                        ) : null}
                      </ItemParticipants>
                    ))}
                  </ListParticipants>
                </ContentParticipants>
              </Participants>
              {idea?.ideaUsers?.some(user => user.type === 'COLLABORATOR') ? (
                <Participants>
                  <TitleParticipants>
                    Participantes da Iniciativa
                  </TitleParticipants>
                  <ContentParticipants>
                    <ListParticipants>
                      {idea?.ideaUsers?.map((user, i) => (
                        <ItemParticipants key={i}>
                          {user.type === 'COLLABORATOR' ? (
                            <UserCard name={user?.user?.name} />
                          ) : null}
                        </ItemParticipants>
                      ))}
                    </ListParticipants>
                  </ContentParticipants>
                </Participants>
              ) : null}
              <TagTitleWrapper>
                <TicketTag>
                  <TicketSvg />
                </TicketTag>
                <TagTitle>Etiquetas</TagTitle>
              </TagTitleWrapper>
              <TagsComponent>
                <TagsWrapper
                  onClick={showEditTagTogle}
                  ref={optionItemRef}
                  hoverBackgroundColor={ideaTagsList.length > 0}
                >
                  {ideaTagsList.length === 0 ? (
                    <EmptyTags>Clique aqui para adicionar</EmptyTags>
                  ) : (
                    ideaTagsList.map(ideaTag => (
                      <TagNameWrapper backgroundColor={ideaTag.tag.color}>
                        <TagName color={ideaTag.tag.textColor}>
                          {buildTagName(ideaTag.tag.name)}
                        </TagName>
                        {showEditTag && (
                          <DeleteTagWrapper>
                            <BarraSvg />
                            <DeleteTag
                              onClick={event => {
                                event.stopPropagation();
                                deleteTagFromCard(ideaTag);
                              }}
                            >
                              <DeleteTagSvg />
                            </DeleteTag>
                          </DeleteTagWrapper>
                        )}
                      </TagNameWrapper>
                    ))
                  )}
                </TagsWrapper>
                {showEditTag && (
                  <TagList
                    ideaId={idea.id}
                    width="100%"
                    editTagTopOffset={300}
                  />
                )}
              </TagsComponent>
              {idea.secondaryLinks.length > 0 ? (
                <>
                  <LinkTitleWrapper>
                    <BsLink45Deg size={22} />
                    <LinkTitle>Vínculos</LinkTitle>
                  </LinkTitleWrapper>
                  {idea.secondaryLinks.map(linkedIdea => (
                    <LinkedIdea
                      linkIsOpen
                      linkedIdea={linkedIdea}
                      hasBorder={false}
                      showCreator
                    />
                  ))}
                </>
              ) : null}
            </ColumnRigth>
          </FirtInformation>

          <ImagesIdea>
            <ItemImg>
              <Img src="https://via.placeholder.com/213x156" />
            </ItemImg>
            <ItemImg>
              <Img src="https://via.placeholder.com/213x156" />
            </ItemImg>
            <ItemImg>
              <Img src="https://via.placeholder.com/213x156" />
            </ItemImg>
          </ImagesIdea>
        </Content>
      </Container>
      {modalDirectApproval && (
        <ModalDirectApproval
          ideaId={idea.id}
          kanbanStep={idea.kanbanStep}
          setModalDirectApproval={setModalDirectApproval}
          nextKanbanStep={nextKanbanStep(kanbanStep)}
          nextStepKanban={nextStepKanban}
          nextSequenceKanban={nextSequenceKanban}
          updateKanbanStatus={updateStatus}
        />
      )}
    </>
  );
};
