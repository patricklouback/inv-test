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
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const ButtonWrapper = styled.button<ButtonWrapperParams>`
  background: ${({ theme, background }) =>
    !background ? theme.colors.primary : background};
  color: ${({ theme, color }) => (!color ? theme.colors.background : color)};
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;

  margin: ${({ center, right }) =>
    (center && `0 auto`) || (right && `0 0 0 auto`)};

  margin-top: ${({ margin_vertical }) => `${margin_vertical}px`};
  margin-bottom: ${({ margin_vertical }) => `${margin_vertical}px`};

  justify-content: center;
  padding: 0 2rem;
  border: 0;
  width: ${({ max_width }) => (!max_width ? `100%` : `${max_width}px`)};
  font-size: 16px;
  letter-spacing: 0.8px;
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 400;
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
`;

export const Value = styled.span`
  margin-left: 10px;
`;
