import Link from 'next/link';
import React from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import {
  Container,
  Content,
  ContentPage,
  HeaderIcon,
  HeaderSectionDefault,
  Relative,
  ReturnButton,
} from './styles';

interface SectionParam {
  children?: React.ReactNode;
  to_back?: string;
  type: 'normal' | 'full' | 'filter';
  header: {
    small_header?: boolean;
    title?: string;
    Icon?: any;
    box_icon?: any;
    item_right?: JSX.Element;
    children?: JSX.Element;
  };
  borderBottom?: boolean;
  back?: () => void;
}

export const DefaultSection: React.FC<SectionParam> = ({
  children,
  header,
  to_back,
  type,
  borderBottom,
  back,
}) => {
  return (
    <Relative borderBottom={borderBottom} type={type}>
      <Container borderBottom={borderBottom} type={type}>
        {to_back && (
          <Link href={to_back}>
            <Content>
              <BiLeftArrowAlt size={20} />
              <span>Voltar</span>
            </Content>
          </Link>
        )}

        {!to_back && back && (
          <ReturnButton onClick={back}>
            <BiLeftArrowAlt size={20} />
            <span>Voltar</span>
          </ReturnButton>
        )}

        <HeaderSectionDefault $small={header.small_header} type={type}>
          <div>
            {header.Icon}
            {header.box_icon && <HeaderIcon>{header.box_icon}</HeaderIcon>}
            <h2>{header.title}</h2>
            {!header.title && header.children && <div>{header.children}</div>}
          </div>
          {header.item_right}
        </HeaderSectionDefault>
        <ContentPage>{children}</ContentPage>
      </Container>
    </Relative>
  );
};
