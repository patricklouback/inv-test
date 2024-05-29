// import { ToolTip } from '@components/Tooltip';
import { ToolTip } from '@components/TooltipComponent';
import React from 'react';
import { Container, Description, TitleWrapper } from './styles';

export interface IstylesContainerSimples {
  max_width?: number;
  margin_left?: number;
  margin_right?: number;
  margin_top?: number;
  margin_bottom?: number;
}

interface ContentSimpleParams {
  children?: React.ReactNode;
  title: string;
  styles?: IstylesContainerSimples;
  description?: string;
  tooltipMessage?: string;
}

export const ContentSimpleComponent = ({
  children,
  title,
  styles,
  description,
  tooltipMessage,
}: ContentSimpleParams) => {
  return (
    <Container {...styles}>
      <TitleWrapper>
        <span>{title}</span>
        {tooltipMessage && <ToolTip text={tooltipMessage} />}
      </TitleWrapper>
      <Description>{description ?? ''}</Description>
      {children}
    </Container>
  );
};
