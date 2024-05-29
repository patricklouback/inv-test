import styled from 'styled-components';

export const Container = styled.div<{ background?: string; width?: number }>`
  display: flex;
  background: ${({ theme, background }) =>
    background || theme.colors.background};
  height: 58px;
  align-items: center;
  padding: 7px;
  border-radius: 12px;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  max-width: max-content;
`;

export const Value = styled.span<{ useMargin: boolean; paddingLeft: boolean }>`
  color: ${({ theme }) => theme.colors.font};
  font-weight: bold;
  padding-left: ${({ paddingLeft }) => (paddingLeft ? '10' : 0)}px;
  font-size: 15px;
  letter-spacing: 0.3px;
  margin-left: ${({ useMargin }) => (useMargin ? '10px' : 0)};
  margin-right: ${({ useMargin }) => (!useMargin ? '10px' : 0)};
`;

export const EditableValue = styled.input<{ useMargin?: boolean }>`
  display: flex;
  flex-grow: 1;
  width: 100%;
  color: ${({ theme }) => theme.colors.font};
  font-weight: bold;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: none;
  border-radius: 8px;
  letter-spacing: 0.3px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px;

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    min-width: 20rem;
    border: 2px solid ${props => props.theme.colors.primary};
    background-color: white;
  }
`;

export const AddProcessActivity = styled.div<{
  backgroundColor?: string;
  isCreating?: boolean;
}>`
  border: 2px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  width: 32px;
  height: 32px;
  padding-top: ${({ isCreating }) => (isCreating ? 4 : 6)}px;
  padding-left: ${({ isCreating }) => (isCreating ? 4 : 5)}px;
  background: ${({ backgroundColor }) => backgroundColor || 'none'};

  &:hover {
    cursor: pointer;
  }
`;

export const DeleteProcessActivity = styled.div<{ backgroundColor?: string }>`
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 2px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  padding-top: 4px;
  padding-left: 3px;
  background: ${({ backgroundColor }) => backgroundColor || 'none'};

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonWrapper = styled.div<{ width?: number }>`
  display: flex;
  width: ${({ width }) => width + 60 || 120}px;
  justify-content: start;
  align-items: baseline;
`;
