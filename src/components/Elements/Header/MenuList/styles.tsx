import styled from 'styled-components';

export const Items = styled.button`
  padding: 20px;
  user-select: none;
  border: 0;
  width: 100%;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};
  background: ${({ theme }) => theme.colors.background};
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.greyLight};
  }

  &:last-child {
    border-bottom: 0;
    border-radius: 0 0 7px 7px;
  }

  &:nth-child(1) {
    border-radius: 7px 7px 0 0;
  }
`;
