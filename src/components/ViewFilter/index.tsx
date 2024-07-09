import { DragEventHandler, HTMLAttributes } from 'react';
import { DefaultSection } from '@components/SectionDefault';
import { RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { BiZoomIn } from 'react-icons/bi';
import { Container, Scroll, QntCampaign } from './styles';

interface ViewFilterProps extends HTMLAttributes<HTMLDivElement> {
  children: any;
  title?: string;
  type?: 'funnel';
  onDrop?: DragEventHandler<HTMLDivElement>;
  qnt?: number | string;
  toggleWasScrolled?: () => void;
}

export const ViewFilter: React.FC<ViewFilterProps> = ({
  children,
  title = 'Direcionais',
  type,
  onDrop,
  qnt,
  toggleWasScrolled,
}): JSX.Element => {
  const { colors } = useTheme();
  return (
    <Container
      onDragOver={e => {
        e.preventDefault();
      }}
      onDrop={onDrop}
    >
      <DefaultSection
        type="filter"
        header={{
          Icon: type && <BiZoomIn color={colors.font} size={20} />,
          box_icon: !type && <RiTrophyLine color={colors.font} size={20} />,
          title,
          item_right: <QntCampaign>{qnt}</QntCampaign>,
          small_header: true,
        }}
      >
        <Scroll onScroll={toggleWasScrolled}>{children}</Scroll>
      </DefaultSection>
    </Container>
  );
};
