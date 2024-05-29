import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { normalizeString } from 'utils/normalizeString';
import { Header, Icon, Title } from './styles';

interface renderHeaderProps {
  title: string;
  icon: JSX.Element;
  stateIcon?: boolean;
}

export const RenderHeader: React.FC<renderHeaderProps> = ({
  title,
  icon,
  stateIcon,
}): JSX.Element => {
  return (
    <Header>
      <div className={`render-header-${normalizeString(title)}`}>
        <Icon>{icon}</Icon>
        <Title>{title}</Title>
      </div>

      {stateIcon && <BiChevronUp size={28} />}
      {!stateIcon && <BiChevronDown size={28} />}
    </Header>
  );
};
