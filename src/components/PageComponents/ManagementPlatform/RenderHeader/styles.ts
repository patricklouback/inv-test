import styled from 'styled-components';

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.greyLight};
  height: 55px;

  padding: 0 20px;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

export const Icon = styled.div`
  margin-right: 10px;

  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const Title = styled.h2`
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 1px;
`;
