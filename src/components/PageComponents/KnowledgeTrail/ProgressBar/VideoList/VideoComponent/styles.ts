/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

interface BigLoadingProps {
  myText: number;
  marginTop?: number;
}

export const BigLoading = styled.div.attrs<BigLoadingProps>(props => ({
  myText: props.myText,
  marginTop: props.marginTop || 0
}))`
  background: linear-gradient(
      to ${props => (props.myText < 51 ? 'right' : 'left')},
      ${props => (props.myText < 51 ? '#e0e0e0' : '#68D2C5')} 50%,
      transparent 50%
    ),
    linear-gradient(
      ${props => `${90 + 3.6 * props.myText}deg`},
      #68d2c5 50%,
      #e0e0e0 50%
    );
  &::before {
    content: '${props => (props.myText !== null ? `${props.myText}%` : '')}';
  }

  border-radius: 50%;
  display: block;
  position: relative;
  align-items: center;
  height: 65px;
  width: 65px;
  margin-left: 14px;
  margin-top: ${props => props.marginTop}px;

  &::before {
    align-items: center;
    background-color: #fcfcfc;
    border-radius: 50%;
    display: inline-flex;
    height: 100%;
    justify-content: center;
    transform: scale(0.8);
    width: 100%;
  }

  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 load;
`;

interface BigLoadedProps {
  marginTop?: number;
}

export const BigLoaded = styled.div.attrs<BigLoadedProps>(props => {
  return { marginTop: props.marginTop || 0 };
})`
  background: linear-gradient(to left, #68d2c5 50%, transparent 50%),
    linear-gradient(
      ${() => `${90 + 3.6 * 100}deg`},
      #68d2c5 50%,
      #e0e0e0 50%
    );
  &::before {
    content: '';
  }
  &::after {
    position: absolute;
    content: '';
    top: 48%;
    left: 33%;
    transform: scaleX(-1) rotate(135deg);
    width: 10px;
    height: 17px;
    border-top: 4px solid #68d2c5;
    border-right: 4px solid #68d2c5;
    transform-origin: left top;
  }

  border-radius: 50%;
  display: block;
  position: relative;
  align-items: center;
  height: 65px;
  width: 64px;
  margin-left: 15px;
  margin-top: ${props => props.marginTop}px;

  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 load;

  &::before {
    align-items: center;
    background-color: #fcfcfc;
    border-radius: 50%;
    display: inline-flex;
    font-size: 150%;
    height: 100%;
    justify-content: center;
    transform: scale(0.8);
    width: 100%;
  }
`;

export const SmallLoaded = styled.div`
  background: linear-gradient(to left, #68d2c5 50%, transparent 50%),
    linear-gradient(
      ${() => `${90 + 3.6 * 100}deg`},
      #68d2c5 50%,
      #e0e0e0 50%
    );
  &::before {
    content: '';
  }
  &::after {
    position: absolute;
    content: '';
    top: 52%;
    left: 33%;
    transform: scaleX(-1) rotate(135deg);
    width: 3px;
    height: 8px;
    border-top: 2px solid #68d2c5;
    border-right: 2px solid #68d2c5;
    transform-origin: left top;
  }

  border-radius: 50%;
  display: block;
  height: 30px;
  position: relative;
  width: 29px;
  align-items: center;
  left: 32px;
  /* opacity: 0; */

  @keyframes load {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 load;

  /* transition-timing-function: ease-in;
  transition: 3s;
  transform: translateY(0); */
  &::before {
    align-items: center;
    background-color: #fcfcfc;
    border-radius: 50%;
    display: inline-flex;
    font-size: 150%;
    height: 100%;
    justify-content: center;
    transform: scale(0.8);
    width: 100%;
  }
`;

export const BigToLoading = styled.div`
  background: linear-gradient(
      to right,
      ${() => '#e0e0e0'} 50%,
      transparent 50%
    ),
    linear-gradient(${() => `${90 + 3.6 * 0}deg`}, #68d2c5 50%, #e0e0e0 50%);
  &::before {
    content: '';
  }

  border-radius: 50%;
  display: block;
  position: relative;
  align-items: center;
  height: 65px;
  width: 65px;
  margin-left: 14px;

  &::before {
    align-items: center;
    background-color: #fcfcfc;
    border-radius: 50%;
    display: inline-flex;
    height: 100%;
    justify-content: center;
    transform: scale(0.8);
    width: 100%;
  }
`;

export const SmallToLoading = styled.div`
  background: linear-gradient(
      to right,
      ${() => '#e0e0e0'} 50%,
      transparent 50%
    ),
    linear-gradient(${() => `${90 + 3.6 * 0}deg`}, #68d2c5 50%, #e0e0e0 50%);
  &::before {
    content: '';
  }

  border-radius: 50%;
  display: block;
  height: 30px;
  position: relative;
  width: 29px;
  align-items: center;
  left: 32px;

  &::before {
    align-items: center;
    background-color: #fcfcfc;
    border-radius: 50%;
    display: inline-flex;
    font-size: 150%;
    height: 100%;
    justify-content: center;
    transform: scale(0.8);
    width: 100%;
  }
`;

interface LineProps {
  repeat?: boolean;
  height?: number;
  invert?: boolean;
}

export const Line = styled.div.attrs<LineProps>(props => {
  return {
    repeat: props.repeat || false,
    height: props.height || 51,
    invert: props.invert || false,
  };
})`
  padding: 0px;
  margin-left: 46px;
  height: ${props => props.height}px;
  background: ${props =>
    props.repeat
      ? props.invert
        ? 'repeating-linear-gradient(#FFFFFF, #FFFFFF 6px, #B5B5B5 6px, #B5B5B5 10px)'
        : 'repeating-linear-gradient(#B5B5B5, #B5B5B5 6px, #FFFFFF 6px, #FFFFFF 8px)'
      : props.theme.colors.primary[styleSlug]};
  line-height: 1px;
  left: 40px;
  top: 40px;
  width: 2px;
  transition-timing-function: ease-in;
  transition: 1s;
  transform: translateY(0);
`;

export const LoadingDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    cursor: pointer;
  }
`;

export const VideoDescription = styled.div.attrs<{
  fontSize?: number;
  marginTop?: number;
  marginLeft?: number;
  width?: number;
  marginRight?: number;
  isBold?: boolean;
}>(props => ({
  fontSize: props.fontSize || 14,
  marginTop: props.marginTop || 0,
  marginLeft: props.marginLeft || 14,
  width: props.width || 166,
  marginRight: props.marginRight || 22,
  isBold: props.isBold || false,
}))`
  margin-left: ${props => props.marginLeft}px;
  width: ${props => props.width}px;
  margin-right: ${props => props.marginRight}%;
  font-size: ${props => props.fontSize}px;
  margin-top: ${props => props.marginTop}px;
  font-weight: ${props => (props.isBold ? 'bold' : 'normal')};
`;
