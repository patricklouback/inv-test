import { ConfigContext } from 'contexts/ConfigContext';
import ButtonLink from '@components/Link';
import { IdeaFieldDragAndDrop } from '@components/IdeaFieldDragAndDrop';
import { LuImport } from 'react-icons/lu';
import { useCallback, useContext, useState } from 'react';
import Modal from 'react-modal';
import { useTheme } from 'styled-components';
import { styleSlug } from 'utils/constants';
import {
  Subtitle,
  Title,
  Description,
  Content,
  ButtonsContainer,
} from './styles';

interface IdeaFieldsTemplateModalProps {
  isOpen: boolean;
  campaignId: string;
  onRequestClose: () => void;
}

export function IdeaFieldsTemplateModal({
  isOpen,
  campaignId,
  onRequestClose,
}: IdeaFieldsTemplateModalProps): JSX.Element {
  const { colors } = useTheme();

  const { importIdeaFieldsForCampaign } = useContext(ConfigContext);

  const [isWarningModal, setIsWarningModal] = useState(false);

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const updateModalPosition = (element): void => {
    if (element.top !== modalPosition.top)
      setModalPosition({ top: element.top, left: element.left });
  };

  const importIdeaFields = useCallback(() => {
    importIdeaFieldsForCampaign(campaignId);
    setIsWarningModal(false);
    onRequestClose();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="view-more-modal-content"
      ariaHideApp={false}
      onRequestClose={onRequestClose}
    >
      {!isWarningModal && (
        <div
          ref={el => {
            if (el) updateModalPosition(el.getBoundingClientRect());
          }}
        >
          <Title>
            <LuImport size={34} />
            Importar template de formulário
          </Title>
          <Description>
            O template importado substituirá o existente e essa ação não poderá
            ser desfeita. Sempre será importada a versão mais recente.
          </Description>
          <Subtitle>Visualização prévia do modelo</Subtitle>
          <Content>
            <IdeaFieldDragAndDrop creatable={false} dragable={false} />
          </Content>
          <ButtonsContainer>
            <ButtonLink
              value="Cancelar"
              max={150}
              borderColor={colors.borders}
              hover={colors.backgroundGrey}
              hoverWeigth={500}
              borderStyle="solid"
              borderWidth={2}
              onClick={onRequestClose}
            />
            <ButtonLink
              value="Usar template"
              max={150}
              color={colors.fontWhite}
              background={colors.primary[styleSlug]}
              hover={colors.primaryLight[styleSlug]}
              hoverWeigth={500}
              onClick={() => setIsWarningModal(true)}
            />
          </ButtonsContainer>
        </div>
      )}
      {isWarningModal && (
        <div
          ref={el => {
            if (el) updateModalPosition(el.getBoundingClientRect());
          }}
        >
          <Title>Atenção!</Title>
          <Description>
            Você realizou alterações que irão impactar as iniciativas futuras.
          </Description>
          <Subtitle>Deseja continuar mesmo assim?</Subtitle>
          <ButtonsContainer>
            <ButtonLink
              value="Voltar"
              max={150}
              borderColor={colors.borders}
              hover={colors.backgroundGrey}
              hoverWeigth={500}
              borderStyle="solid"
              borderWidth={2}
              onClick={() => setIsWarningModal(false)}
            />
            <ButtonLink
              value="Sim, continuar"
              max={150}
              color={colors.fontWhite}
              background={colors.lightRed}
              hover={colors.red}
              hoverWeigth={500}
              onClick={importIdeaFields}
            />
          </ButtonsContainer>
        </div>
      )}
    </Modal>
  );
}

export function IdeaFieldsTemplate({
  ...props
}: IdeaFieldsTemplateModalProps): JSX.Element {
  return <IdeaFieldsTemplateModal {...props} />;
}
