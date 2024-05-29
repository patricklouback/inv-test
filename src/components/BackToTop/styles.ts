import styled from 'styled-components';

export const Base = styled.div<{ display: string }>`
  width: 100%;
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: ${({ display }) => display};
  z-index: 10000000;
  justify-content: center;
  @media screen and (min-width: 510px) {
    display: none;
  }
`;

export const ButtonBack = styled.button<{ doAnimation: boolean }>`
  bottom: 20px;
  right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #48009b;
  color: #fff;
  border: none;
  border-radius: 5px;
  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: ${({ doAnimation }) =>
    doAnimation ? '1s ease-out 0s 1 load' : 'none'};
  font-size: 16px;
`;
