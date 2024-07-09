import Button from '@components/Button';
import { Footer } from './styles';

interface FooterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function FooterCustom({ label, ...props }: FooterProps) {
  return (
    <Footer>
      <p>(*) - Campos obrigatórios</p>
      <Button style={{ width: '177px' }} {...props}>
        {label}
      </Button>
    </Footer>
  );
}
