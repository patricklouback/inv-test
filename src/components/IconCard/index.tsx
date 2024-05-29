import Link from 'next/link';
import { Container } from './styles';

interface CardIconParams {
  link?: string;
  shadow?: boolean;
  background?: string;
  onClick?: () => void;
  name?: string;
}

export const CardIconComponent: React.FC<CardIconParams> = ({
  link,
  shadow = true,
  background,
  onClick,
  name,
  children,
}): JSX.Element => {
  return (
    <Container background={background} shadow={shadow}>
      {link ? (
        <Link href={link}>
          <a>{children}</a>
        </Link>
      ) : (
        <button name={name} type="button" onClick={onClick}>
          {children}
        </button>
      )}
    </Container>
  );
};
