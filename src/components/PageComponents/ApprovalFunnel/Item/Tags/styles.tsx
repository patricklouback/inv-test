import styled, { keyframes } from 'styled-components';

export const TicketsAvailable = styled.div<{ width: string, overflow: boolean}>`
  z-index: 11;
  width: ${props => props.width ? props.width : '187px'};
  height: 196px;

  background: ${({ theme }) => theme.colors.fontWhite};
  border: 1px solid ${({ theme }) => theme.colors.backgroundGrey};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  overflow-y: ${props => props.overflow ? 'scroll' : 'hidden'};

  ::-webkit-scrollbar {
    width: 5px;
    height: 59px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};  
    border-radius: 10px;
  }

  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 0.5s ease-out 0s 1 load;
`;

export const Tag = styled.div`
  display: flex;
  width: 100%;
  height: 39px;
  padding: 9px;
  align-items: center;
  justify-content: space-between;
`;

export const TagAndCheckbox = styled.div`
  display: flex;
  align-items: center;
`

export const CheckboxTag = styled.input.attrs({type: 'checkbox'})`
  position: relative;
  width: 16px;
  height: 16px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 29%;
    transform: rotateZ(45deg);
    width: 4px;
    height: 7px;
    border: 2px solid black;
    border-top: none;
    border-left: none;
    border-radius: 2px;
    opacity: 0;
  }

  &:checked:before {
    opacity: 1;
  }
`;

export const TagName = styled.div.attrs<
{ 
  textColor: string,
  backgroundColor: string;
},
{ 
  textColor: string,
  backgroundColor: string;
}>(
props => {
  return {
    textColor: props.textColor,
    backgroundColor: props.backgroundColor
  };
}
)`
  display: block;
  white-space: nowrap; /* Impede quebrar a linha */
  overflow: hidden; /* Esconde qualquer texto adicional que exceda o tamanho */
  text-overflow: ellipsis;
  max-width: 100px;
  margin-left: 10px;
  margin-top: 1px;
  padding: -1px;
  font-weight: bold;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding-left: 6px;
  padding-right: 6px;
  height: 23px;
  border-radius: 4px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
`;

export const EditTagName = styled.div<{top: number}>`
  position: absolute;
  width: 123px;
  height: 62px;
  background: ${({ theme }) => theme.colors.fontWhite};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-top: 4px;
  padding-left: 8px;
  font-size: 10px;
  font-weight: bold;
  top: ${props => props.top}px;
`;

export const EditTagNameTextArea = styled.input`
  width: 107px;
  height: 22px;
  background: ${({ theme }) => theme.colors.fontWhite};
  border: 1.4px solid #5192FF;
  box-shadow: 0px 0px 3px #5192FF;
  border-radius: 4px;
  padding-left: 4px;
  margin-top: 8px;
  white-space: nowrap;
  resize: none;
  font-size: 12px;
`;

export const Edit = styled.div`
  cursor: pointer;
`

export const EditWrapper = styled.div`
  /* position: relative; */
`
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: ${({ theme }) => theme.colors.primaryLight};
  border-bottom-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-left-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-right-color: ${({ theme }) => theme.colors.backgroundGrey};
  animation: ${spin} 1s linear infinite;
`;