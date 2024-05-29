import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border-radius: 16px;
  padding: 12px 24px;
  display: flex;
  align-items: center;

  > div {
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 0.5rem;
    box-shadow: 0 2px 5px -3px #00000061;

    margin-right: 12px;
  }

  strong {
    font-size: 20px;
  }
`;
