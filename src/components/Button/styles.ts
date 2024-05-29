import styled, { keyframes } from 'styled-components';

interface ButtonWrapperParams {
  max_width: number;
  center: boolean;
  margin_horizontal: number;
  background: string;
  color: string;
  hover: string;
  margin_vertical: number;
  right?: boolean;
  isDark?: boolean;
  border?: string;
  disabled?: boolean;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const ButtonWrapper = styled.button<ButtonWrapperParams>`
  background: ${({ theme, background, isDark }) =>
    // eslint-disable-next-line no-nested-ternary
    !background
      ? isDark
        ? theme.colors.primary
        : theme.colors.background
      : background};
  color: ${({ theme, color, isDark }) =>
    // eslint-disable-next-line no-nested-ternary
    !color ? (isDark ? theme.colors.background : theme.colors.primary) : color};
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  margin: ${({ center, right }) =>
    (center && `0 auto`) || (right && `0 0 0 auto`)};

  margin-top: ${({ margin_vertical }) => `${margin_vertical}px`};
  margin-bottom: ${({ margin_vertical }) => `${margin_vertical}px`};

  justify-content: center;
  padding: 0 2rem;
  border: ${({ theme, isDark, border }) =>
    border || (isDark ? 0 : `1px solid ${theme.colors.primary}`)};
  width: ${({ max_width }) => (!max_width ? `100%` : `${max_width}px`)};
  font-size: 16px;
  letter-spacing: 0.8px;
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: ${({ isDark }) => (isDark ? 500 : 600)};
  transition: background-color 0.2s;
  &:hover {
    background: ${({ theme, hover }) =>
      !hover ? theme.colors.primaryLight : hover};
  }

  .donut {
    width: 2rem;
    height: 2rem;
    margin: 2rem;
    border-radius: 50%;
    border: 0.3rem solid rgba($bluebell, 0.3);
    border-top-color: $bluebell;
    animation: 1.5s ${spin} infinite linear;

    &.multi {
      border-bottom-color: $bluebell;
    }
  }

  @media screen and (max-width: 890px) {
    width: 100%;
  }
`;

export const Value = styled.span`
  margin-left: 10px;
  margin-right: 5px;
`;
