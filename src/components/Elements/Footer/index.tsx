import { FooterWrapper } from './styles';
import FooterSvg from '../../../assets/inventta/footer.svg';

export default function Footer(): JSX.Element {
  return (
    <FooterWrapper>
      <div className="fade-line" />
      <FooterSvg />
    </FooterWrapper>
  );
}
