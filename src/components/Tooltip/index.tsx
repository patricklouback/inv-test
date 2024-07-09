import { IconType } from 'react-icons';
import { useState } from 'react';
import { TooltipContainer, TooltipContent } from './styles';

interface TooltipProps {
  icon: IconType;
  iconColor: string;
  iconSize: number;
  top?: number;
  left?: number;
  children?: React.ReactNode;
  infoBackgroundColor?: string;
}
// TODO: Implementar lógica de posicionamento do Tooltip Content

export default function Tooltip({
  icon,
  iconColor = 'black',
  iconSize = 20,
  top,
  left,
  children,
  infoBackgroundColor,
}: TooltipProps): JSX.Element {
  return (
    <TooltipContainer>
      {icon({ size: iconSize, color: iconColor })}
      <TooltipContent
        top={top}
        left={left}
        backgroundColor={infoBackgroundColor}
      >
        {children}
      </TooltipContent>
    </TooltipContainer>
  );
}
