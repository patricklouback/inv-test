import { TSection } from '..';
import { Sec, Title, Subtitle } from './styles';

export interface ISectionKind {
  section: TSection;
  title?: string;
  kind?: TSection;
  subtitle?: string;
  children?: React.ReactNode;
}
export const SectionKind = ({
  section,
  title,
  subtitle,
  children,
  kind,
}: ISectionKind): JSX.Element => {
  return (
    <Sec section={section} kind={kind}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {children}
    </Sec>
  );
};
