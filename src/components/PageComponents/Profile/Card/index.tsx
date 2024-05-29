import { Container, Infos, Title, Value, WapperIcon } from './styles';

interface ItemProps {
  title: string;
  value?: string;
  icon?: JSX.Element;
}

export const Card: React.FC<ItemProps> = ({
  title,
  value,
  icon,
}): JSX.Element => {
  return (
    <Container>
      <Title>{title}</Title>
      <Infos>
        <WapperIcon>{icon}</WapperIcon>
        <Value>{value}</Value>
      </Infos>
    </Container>
  );
};
