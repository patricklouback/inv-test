import styled, { css, createGlobalStyle } from 'styled-components';

export const DragAndDropContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

export const ItemsContainer = styled.div``;

export const ButtonSave = styled.button`
  border-radius: 12px;
  width: auto;
  height: 56px;
  border: 0;
  outline: none;
  background: ${({ theme }) => theme.colors.greenHipeLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
  padding: 0 1rem;
`;

export const Value = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;
