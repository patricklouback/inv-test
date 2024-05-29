import styled, { css } from "styled-components";

export const ValueBox = styled.span<{colorActive?: boolean}>`
  width: 400px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme, colorActive }) =>
    colorActive ? theme.colors.greenHipeLight : theme.colors.background};
`;

export const Value = styled.input<{colorActive?: boolean}>`
  margin-right: 10px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #F6F6F8;
  font-weight: 600;
  border: 0;
  outline: none;
  border-radius: 8px;
  font-size: 15px;

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary};
    background-color: white;
  }
`;

export const AddStep = styled.div<{backgroundColor?: string}>`
  border: 2px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  width: 32px;
  height: 32px;
  padding-top: 4px;
  padding-left: 3px;
  background: ${({backgroundColor}) => backgroundColor || 'none' };
  cursor: pointer;
`

export const DeleteStep = styled.div<{backgroundColor?: string}>`
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 2px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  padding-top: 4px;
  padding-left: 3px;
  background: ${({backgroundColor}) => backgroundColor || 'none' };
  cursor: pointer;
`