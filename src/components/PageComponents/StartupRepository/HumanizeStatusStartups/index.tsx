import { statusHumanized } from 'mocks';
import { Container } from './styles';

interface HumanizeStatusStartupsProps {
  status?: string;
}

export function HumanizeStatusStartups({
  status,
}: HumanizeStatusStartupsProps) {
  return (
    <Container $color={statusHumanized[status].color} className="truncate">
      <span>{statusHumanized[status].text}</span>
    </Container>
  );
}
