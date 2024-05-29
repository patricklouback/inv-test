import ButtonLink from '@components/Link';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { Title, Description, ButtonsContainer } from './styles';
import { Content } from './styles';

interface EvaluationCriteriaNotificationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function EvaluationCriteriaNotificationModal({
  isOpen,
  onRequestClose,
}: EvaluationCriteriaNotificationModalProps): JSX.Element {
  const { colors } = useTheme();
  const { push } = useRouter();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const updateModalPosition = (element): void => {
    if (element.top !== modalPosition.top)
      setModalPosition({ top: element.top, left: element.left });
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    document.addEventListener('click', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleEscapeKey);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="view-more-modal-content"
      ariaHideApp={false}
      style={{ content: { width: '500px', height: '400px' } }}
    >
      <Content>
        <div
          ref={el => {
            if (el) updateModalPosition(el.getBoundingClientRect());
          }}
        >
          <Title>Você é um avaliador!</Title>
          <Description>
            Acesse a nova página "Funil de aprovação" e inicie a avaliação das
            iniciativas, de acordo com os critérios.
          </Description>
          <Description>
            No seu perfil, você pode verificar todas as avaliações pendentes
          </Description>
          <ButtonsContainer>
            <ButtonLink
              value="Ir para o perfil"
              max={180}
              borderColor={colors.primaryPurple}
              color={colors.primaryPurple}
              hover={colors.backgroundGrey}
              hoverWeigth={500}
              borderStyle="solid"
              borderWidth={2}
              onClick={() => push('/profile')}
              center
              noWrap
            />
            <ButtonLink
              value="Começar a avaliar"
              max={180}
              center
              color={colors.fontWhite}
              background={colors.primaryPurple}
              hover={colors.bannerButtonPurpleHover}
              hoverWeigth={500}
              onClick={() => push('/approval-funnel')}
              noWrap
            />
          </ButtonsContainer>
        </div>
      </Content>
    </Modal>
  );
}

export function IdeaFieldsTemplate({
  ...props
}: EvaluationCriteriaNotificationModalProps): JSX.Element {
  return <EvaluationCriteriaNotificationModal {...props} />;
}
