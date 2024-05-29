import { CampaignContext } from 'contexts/Campaign';
import { IdeaContext } from 'contexts/Idea';
import { Idea } from 'interfaces/idea';
import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Modal from 'react-modal';
import { ImCheckmark } from 'react-icons/im';
import { Container, Title, SubmitButton, CampaignsOptionsContainer, ChecboxContainer, InvisibleCheckbox, SubTitle, VisibleCheckbox } from './styles';

interface ChangeCampaignModalProps {
  idea?: Idea;
  isOpen: boolean;
  onRequestClose?: () => void;
}

export const ChangeCampaignModal: React.FC<ChangeCampaignModalProps> = ({
  idea,
  isOpen,
  onRequestClose,
}): JSX.Element => {
  const { loadCampaigns, campaigns } = useContext(CampaignContext);
  const { updateIdeaCampaign } = useContext(IdeaContext);
  const [newIdeaCampaign, setNewIdeaCampaign] = useState(idea.campaignId);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleChangeCampaign = useCallback((campaignId) => {
    (async () => {
      await updateIdeaCampaign(idea.id, { campaignId });
    })()
  }, [updateIdeaCampaign, idea]);

  const handleCheckOrUncheckNewCampaign = useCallback((campaingId) => {
    if (newIdeaCampaign === campaingId) {
      return setNewIdeaCampaign(idea.campaignId);
    }
    return setNewIdeaCampaign(campaingId);
  }, []);

  const updateModalPosition = (element): void => {
    if (element.top !== modalPosition.top) setModalPosition({ top: element.top, left: element.left })
  }

  useEffect(() => {
    (async () => {
      await loadCampaigns();
    })()
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="view-more-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <div ref={el => { if (el) updateModalPosition(el.getBoundingClientRect()) }}>
        {idea.kanbanStep !== 'SELECT' ? (
          <Container onSubmit={() => handleChangeCampaign(newIdeaCampaign)}>
            <Title>Escolha o direcional para o qual deseja que a iniciativa seja alterada</Title>
            <CampaignsOptionsContainer>
              {campaigns.map(campaign => {
                return (
                  <ChecboxContainer
                    checked={campaign.id === newIdeaCampaign}
                    onClick={() => handleCheckOrUncheckNewCampaign(campaign.id)}
                  >
                    <InvisibleCheckbox
                      id={`input-${campaign.id}`}
                      type='checkbox'
                      key={campaign.id}
                      onChange={() => handleCheckOrUncheckNewCampaign(campaign.id)}
                      checked={campaign.id === newIdeaCampaign}
                    />
                    <VisibleCheckbox
                      checked={campaign.id === newIdeaCampaign}
                      onClick={() => handleCheckOrUncheckNewCampaign(campaign.id)}
                    >
                      <ImCheckmark size={12} />
                    </VisibleCheckbox>
                    <label htmlFor={`input-${campaign.id}`}>
                      {campaign.title}
                    </label>
                  </ChecboxContainer>
                )
              })}
            </CampaignsOptionsContainer>
            <SubmitButton type="submit">Mover</SubmitButton>
          </Container>
        ) : (
          <Container>
            <Title>Não é possível mover esta iniciativa</Title>
            <SubTitle>Iniciativas com Processo de Desenvolvimento ativo não podem ser movidas para outro Direcional</SubTitle>
            <SubTitle>Caso deseje mesmo movê-la, retorne-a para a etapa anterior.</SubTitle>
            <SubTitle>ATENÇÃO: Ao movê-la para outro Direcional, deverá ser escolhida uma nova Rota para a iniciativa e seu Processo de Desenvolvimento será resetado.</SubTitle>
          </Container>
        )}
      </div>
    </Modal>
  );
};
