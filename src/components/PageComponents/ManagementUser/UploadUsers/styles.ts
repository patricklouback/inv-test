import styled, { keyframes } from 'styled-components';
import { styleSlug } from 'utils/constants';

export const ModalRegister = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 580px; */
  width: 100%;
  max-width: 580px;
  height: 490px;
  background: ${({ theme }) => theme.colors.background};
  z-index: 999;
  border-radius: 24px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  .exit {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 65px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
  }
`;

export const ButtonAction = styled.button`
  &:nth-child(3) {
    background: ${({ theme }) => theme.colors.greenHipeLight};
  }
  &:nth-child(4) {
    background: ${({ theme }) => theme.colors.greenHipeLight};
  }
  max-width: 426px;
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  outline: none;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.font};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.5px;
  span {
    margin-left: 10px;
  }
  .filter {
    width: 26px;
    height: 21px;
    position: relative;
    svg:last-child {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    svg:first-child {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
    }
  }
  #icon {
    position: absolute;
    right: 10px;
  }
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const bounce = keyframes`
  to {
    opacity: 0.3;
    transform: translate3d(0, -1rem, 0);
  }
`;

export const Loadiing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;

  .loading {
    display: flex;
    justify-content: center;

    div {
      width: 1rem;
      height: 1rem;
      margin: 2rem 0.3rem;
      background: ${({ theme }) => theme.colors.primaryLight[styleSlug]};
      border-radius: 50%;
      animation: 0.9s ${bounce} infinite alternate;

      &:nth-child(2) {
        animation-delay: 0.3s;
      }

      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
  }
`;
