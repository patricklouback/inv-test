import { useContext, useState } from 'react';
import { StartupsContext } from 'contexts/Startups';
import Button from '@components/Button';
import { useTheme } from 'styled-components';
import { Container, Content, WarningCloseDiv } from './styles';
import { Modal } from '../Modal';
import { Sidebar } from './Sidebar';
import { InformationModal } from './InformationPage';
import { DescriptionModal } from './DescriptionPage';
import { SquadModal } from './Squad';

interface WarningCloseProps {
  onCloseModalCreate: () => void;
  onCloseModalExclude: () => void;
}

const WarningClose = ({
  onCloseModalExclude,
  onCloseModalCreate,
}: WarningCloseProps) => {
  const { colors } = useTheme();

  return (
    <Modal width="600px" handle={onCloseModalExclude}>
      <Container>
        <WarningCloseDiv>
          <h1>Tem certeza que deseja sair?</h1>
          <p>Você perderá todos os dados inseridos até o momento.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              onClick={onCloseModalCreate}
              background={colors.notification.error}
            >
              Sair
            </Button>
            <Button onClick={onCloseModalExclude}>Continuar criando</Button>
          </div>
        </WarningCloseDiv>
      </Container>
    </Modal>
  );
};

export function CreateStartupModal({ onClose }: { onClose: () => void }) {
  const [close, setClose] = useState(false);
  const { stepCreate } = useContext(StartupsContext);

  const handleClose = () => {
    setClose(!close);
  };

  const renderChildren = () => {
    switch (stepCreate) {
      case 1:
        return <InformationModal />;
      case 2:
        return <DescriptionModal />;
      case 3:
        return <SquadModal onClose={onClose} />;
      default:
        return <InformationModal />;
    }
  };

  return (
    <Modal
      title="Dados da Startup"
      fadeHeader
      handle={handleClose}
    >
      <Container>
        <Sidebar />
        <Content>{renderChildren()}</Content>
        {close && (
          <WarningClose
            onCloseModalExclude={handleClose}
            onCloseModalCreate={onClose}
          />
        )}
      </Container>
    </Modal>
  );
}
