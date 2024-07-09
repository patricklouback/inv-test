import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 480px;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  z-index: 999;
  padding: 2rem;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  #green {
    background: ${({ theme }) => theme.colors.greenHipeLight} !important;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 1.5rem;
  font-weight: 500;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 0.5;
  font-weight: 500;
`;

export const ContainerPreview = styled.div<{ hide: boolean }>`
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
  margin-top: 0.5rem;
  max-height: 150px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border-radius: 6px;
  padding: 0.5rem;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 2px;
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
  }
`;

export const ButtonNext = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary[styleSlug]};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.5px;

  &:disabled {
    background: ${({ theme }) => theme.colors.grey};
    cursor: not-allowed;
  }
`;

export const ButtonCancel = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary[styleSlug]};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-weight: 500;
  letter-spacing: 0.5px;
`;
