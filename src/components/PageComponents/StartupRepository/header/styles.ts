import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const ContainerSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 10px;

  button {
    width: 286px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100% !important;
    }
  }
`;

export const ButtonDownload = styled.button`
  background: white;
  display: flex;
  color: ${({theme}) => theme.colors.primary[styleSlug]};
  height: 56px;
  border-color: #b5b5b5;
  border-radius: 10px;
  border-style: solid;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 1;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonDownloadText = styled.div`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.01px;
`;
