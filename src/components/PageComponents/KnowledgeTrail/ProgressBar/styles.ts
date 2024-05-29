import styled from 'styled-components';

export const Container = styled.div`
  width: 353px;
  margin-right: 10px;
  border-radius: 16px;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    bottom: -12px;
    z-index: 10;
    left: 0;
    right: 0;
    height: 50px;
    /*background-image: linear-gradient(
      to bottom,
      rgba(246, 246, 248, 0.2) 0%,
      rgba(246, 246, 248, 1) 75%,
      rgba(246, 246, 248, 0) 100%
    );*/
  }
  &::after {
    background: #f6f6f8;
  }

  @media screen and (max-width: 980px) {
    flex-direction: column;
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export const Scroll = styled.div`
  padding: 8px;
  height: 646px;
  background: ${({ theme }) => theme.colors.greyLight};
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    border-radius: 16px;
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

export const TopBar = styled.div`
  width: 353px;
  background-color: #f5f5f5;
  height: 20px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
