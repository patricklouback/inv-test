import styled, { css } from 'styled-components';

type DivType = React.HTMLAttributes<HTMLDivElement>;

interface InputProps {
  height?: number;
  width?: string;
  padding?: string;
  margin?: string;
  label?: string;
  icon: any;
  fontSize?: string;
  max: number;
  font_size: number;
  disable?: boolean;
}

export const InputWrapper = styled.div<InputProps & DivType>`
  /* -----1440 x 1024----- */
  font-size: ${props => (props.fontSize ? props.fontSize : '1.6rem')};
  color: ${props => props.theme.colors.font};
  display: flex;
  max-width: ${({ max }) => `${max}px`};
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: ${props => (props.label ? '0.8rem' : '')};
  position: relative;

  #icon_absolute {
    position: absolute;
    top: 1.8rem;
    transform: translate(15px, -48%);
  }

  #icon_absolute_eye {
    position: absolute;
    top: 1.8rem;
    right: 8%;
    transform: translate(15px, -48%);

    cursor: pointer;
    transition: all 0.3s ease;

    width: 1.1rem;
    height: 1.1rem;
  }

  #icon_absolute_eye:hover {
    color: #BBBBBB
  }

  input {
    font-weight: 400;
    height: ${({ height }) => `${height}px`};
    color: ${({ theme }) => theme.colors.font};
    min-height: 56px;
    outline: 0;
    width: 100%;
    ${({ disable }) =>
      disable &&
      css`
        cursor: not-allowed;
      `}

    ${({ icon, padding }) => {
      if (!icon) {
        return css`
          padding: ${padding || `0px 0px 0px 20px`};
        `;
      }
      return css`
        padding-left: 45px;
      `;
    }}

    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${props => props.theme.colors.borders};
    font-size: ${({ font_size }) => `${font_size}px` || '1rem'};
    padding-right: 10px;

    @media screen and (max-width: 890px) {
      font-size: 16px;
    }

    &::placeholder {
      font-size: ${({ fontSize }) => fontSize || `16px`};
    }
    &:disabled {
      color: ${props => props.theme.colors.fontGrey};
    }
    &:focus {
      border: 2px solid ${props => props.theme.colors.primary};
    }
  }
`;

export const ErrorText = styled.small`
  color: ${props => props.theme.colors.notification.error};
  font-size: 1rem;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 14px;

  svg {
    margin-right: 10px;
  }
`;
