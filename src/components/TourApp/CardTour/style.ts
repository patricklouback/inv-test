import styled, { css } from 'styled-components';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size: 'lg' | 'md' | 'sm';
}

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size: 'lg' | 'md' | 'sm';
}

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size: 'lg' | 'md' | 'sm';
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

export const ContentTourHome = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  font-family: 'Montserrat', sans-serif;

  ${props => {
    if (props.size === 'lg') {
      return css`
        width: 687px;
        height: 400px;
        padding: 0px 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      `;
    }
    if (props.size === 'md') {
      return css`
        width: 320px;
        padding: 6px 16px;
        display: flex;
        align-items: start;
        justify-content: space-around;
      `;
    }
    return css`
      width: 320px;
      height: 100px;
      padding: 6px 16px;
      display: flex;
      align-items: start;
      justify-content: space-around;
      margin-bottom: -24px;
    `;
  }}
`;

export const Image = styled.img`
  width: 40rem;
`;

export const Title = styled.h2<TitleProps>`
  color: #2d3748;
  line-height: 24px;
  ${props =>
    props.size === 'lg'
      ? css`
          font-size: 32px;
          font-weight: 700;
        `
      : css`
          font-size: 20px;
          font-weight: 600;
        `}
`;

export const P = styled.p<PProps>`
  color: #525556;
  line-height: 24px;
  ${props =>
    props.size === 'lg'
      ? css`
          font-size: 20px;
          font-weight: 400;
        `
      : css`
          text-align: justify;
          font-size: 16px;
          font-weight: 400;
        `}
`;

export const StartButton = styled.button<ButtonProps>`
  width: 202px;
  cursor: pointer;
  padding: 16px 32px;
  border-radius: 12px;
  border: 1px solid #47009a;

  //Typograph
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  font-family: 'Montserrat-Bold', sans-serif;

  //Transition
  transition: all;
  transition-duration: 250ms;

  &:hover,
  &:focus {
    background-color: #9d28f0;
    color: #ffffff;
  }

  ${props =>
    props.variant === 'primary' &&
    css`
      background-color: #47009a;
      color: #ffffff;
    `}

  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: transparent;
      color: #47009a;
    `}
`;

export const StepsButton = styled.button<ButtonProps>`
  width: 141px;
  cursor: pointer;
  padding: 8px 32px;
  border-radius: 16px;
  background-color: #9d28f0;
  border: 1px solid #9d28f0;
  color: #ffffff;

  //Typograph
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  font-family: 'Montserrat-Bold', sans-serif;

  //Transition
  transition: all;
  transition-duration: 250ms;

  &:hover,
  &:focus {
    background-color: transparent;
    color: #9d28f0;
  }
`;
