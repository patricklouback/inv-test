import { DropMenuList } from '@components/DropMenuList';
import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { Container, StepsButton, Title, Value } from './styles';

export function ResetTourApp(): JSX.Element {
  const { colors } = useTheme();
  const { resetTour } = useContext(AuthContext);

  const handleResetTour = async (): Promise<void> => {
    await resetTour();
  };

  return (
    <DropMenuList Icon={<FiHelpCircle color={colors.font} size={20} />}>
      <Container>
        <Title>Retomar tutorial</Title>
        <Value>Deseja retomar o tutorial do Avantt.i?</Value>
        <StepsButton onClick={handleResetTour}>Sim</StepsButton>
      </Container>
    </DropMenuList>
  );
}
