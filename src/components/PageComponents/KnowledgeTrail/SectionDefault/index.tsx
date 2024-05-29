import React from 'react';
import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';
import {
  Container,
  HeaderSectionDefault,
  Content,
  Relative,
  ContentPage,
  HeaderIcon,
} from './styles';

interface SectionParam {
  children?: JSX.Element;
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
}

export const DefaultSection: React.FC<SectionParam> = ({
  children,
  header,
  to_back,
  type,
  borderBottom,
}) => {
  return (
    <Relative borderBottom={borderBottom} type={type}>
      <Container borderBottom={borderBottom} type={type}>
        {!!to_back && (
          <Link href={to_back}>
            <Content>
              <BiLeftArrowAlt size={20} />
              <span>Voltar</span>
            </Content>
          </Link>
        )}
        <HeaderSectionDefault small={header.small_header} type={type}>
          <div>
            {header.Icon}
            {header.box_icon && <HeaderIcon>{header.box_icon}</HeaderIcon>}
            <h1>{header.title}</h1>
            {!header.title && header.children && <div>{header.children}</div>}
          </div>
          {header.item_right}
        </HeaderSectionDefault>
        <ContentPage>{children}</ContentPage>
      </Container>
    </Relative>
  );
};
