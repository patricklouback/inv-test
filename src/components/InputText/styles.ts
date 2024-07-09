import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

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
  gap: ${props => (props.label ? '0.8rem !important' : '')};
  position: relative;


  #icon_absolute {
    position: absolute;
    top: 1.8rem;
    transform: translate(15px, -48%);
  }

  .input_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px !important;
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

  #icon_absolute_eye&:hover {
    color: #bbbbbb;
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
      border: 2px solid ${props => props.theme.colors.primary[styleSlug]};
    }
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  color: #2d3748;
  font-weight: 500;
  width: 100%;
`;

export const ErrorText = styled.span<{ position?: boolean }>`
  color: ${props => props.theme.colors.notification.error};
  font-size: 1rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
  /* margin-bottom: 10px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* position: absolute; */
  /* bottom: -35px; */
 

  svg {
    margin-right: 10px;
  }
`;
