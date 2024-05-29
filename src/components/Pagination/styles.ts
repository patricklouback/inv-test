import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const BoxContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 12px;
  font-size: 16px;
`;

export const ButtonPreview = styled.button`
  :disabled {
    color: ${({ theme }) => theme.colors.grey};
  }
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 12px;
  font-size: 16px;
`;
