import styled from 'styled-components';

export const ListSteps = styled.ul`
  max-width: 54rem;
  width: 100%;
  display: flex;
  height: 8rem;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    height: 5px;
    border-radius: 5px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
  }

  @media (max-width: 1200px) {
    max-width: 48rem;
  }

  @media (max-width: 1020px) {
    max-width: 42rem;
  }

  @media (max-width: 980px) {
    max-width: 58rem;
  }
`;

export const Item = styled.li`
  display: flex;
  cursor: pointer;

  @media screen and (max-width: 980px) {
    margin: 0 10px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;
