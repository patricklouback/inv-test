import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  flex: 1;
`;

export const Scroll = styled.div`
  padding: 8px;
  border-top: 6px solid ${({ theme }) => theme.colors.grey};
  height: 670px;
  background: ${({ theme }) => theme.colors.greyLight};
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  @media screen and (max-width: 980px) {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    min-width: 100%;
    height: auto;
  }
`;

export const QntCampaign = styled.div`
  width: 32px;
  height: 22px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 12px;
`;
