import styled from 'styled-components';

interface ButtonParams {
  $background?: string;
  color?: string;
  height?: number;
  max?: number;
  $center?: boolean;
  $hover?: string;
  hoverWeigth?: number;
  hoverColor?: string;
  marginTop?: number;
  isSelected?: boolean;
  disabled?: boolean;
  borderRadius?: number;
  borderStyle?: string;
  borderWidth?: number;
  borderColor?: string;
  noWrap?: boolean;
}

export const ButtonContainer = styled.div<ButtonParams>`
  margin: ${({ $center }) => $center && '0 auto'};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  cursor: pointer;

  max-width: ${({ max }) => `${max}px`};
  width: 100%;
  height: ${({ height }) => `${height}px`};
  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : 'normal')};

  background: ${({ isSelected, $hover, $background }) =>
    isSelected ? !!$hover && $hover : $background};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : '12px'};
  color: ${({ isSelected, hoverColor, color, disabled }) =>
    isSelected && !disabled ? !!hoverColor && hoverColor : color};
  border-style: ${({ borderStyle }) => borderStyle || 'none'};
  border-color: ${({ borderColor }) => borderColor || 'none'};
  border-width: ${({ borderWidth }) =>
    borderWidth ? `${borderWidth}px` : '0px'};
  font-size: 16px;
  letter-spacing: 0.8px;
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: ${({ isSelected, hoverWeigth }) =>
    isSelected ? !!hoverWeigth && hoverWeigth : 400};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  transition: $background-color 0.2s;
  &:hover {
    $background: ${({ $hover, disabled, $background }) =>
      !disabled ? !!$hover && $hover : $background};
    font-weight: ${({ hoverWeigth, disabled }) =>
      !disabled ? !!hoverWeigth && hoverWeigth : 400};
    color: ${({ hoverColor, disabled, color }) =>
      !disabled ? !!hoverColor && hoverColor : color};
  }

  svg {
    margin-right: 15px;
  }

  @media screen and (max-width: 610px) {
    max-width: 100%;
  }
`;
