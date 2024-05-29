import styled from 'styled-components';

export const ToForm = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
  border: 2px solid ${props => props.theme.colors.borders};
  border-radius: 10px;
  background-color: white;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: 10px;

  @media (max-width: 720px) {
    flex-direction: column;
  }

  .description {
    width: 140%;
  }

  .format {
    width: 60%;
  }
`;

export const Draft = styled.div`
  margin-left: 10px;
  width: 100%;
`;

export const Text = styled.p`
  font-size: 15px;
  margin-left: 8px;
  margin-bottom: 4px;
`;

export const DragIndicatorContainer = styled.span`
  padding-right: 10px;
  transform: translateY(10px);
`;

export const Index = styled.span`
  font-size: 18px;
  font-weight: 600;
  transform: translateY(10px);
`;

export const CheckBox = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

export const Label = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;

  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
  }

  svg {
    margin-left: 15px;
  }
`;

export const CustomCheckbox = styled.input`
  width: 20px;
  height: 20px;
`;

export const CustomInput = styled.input`
  font-weight: 500;
  font-size: 1.6rem;
  color: ${props => props.theme.colors.font};
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 56px;
  min-height: 56px;

  padding: 0 10px;
  height: 56px;
  min-height: 56px;
  color: ${({ theme }) => theme.colors.font};
  outline: 0;
  width: 100%;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${props => props.theme.colors.borders};
  font-size: 1rem;

  & + input {
    margin-left: 8px;
  }

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary};
  }
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  outline: none;

  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background: ${({ theme }) => theme.colors.grey_hover};
    border-radius: 50%;
  }
  margin: 0 2px;

  :first-child {
    margin-left: 0;
  }
  :last-child {
    margin-right: 0;
  }
`;

export const Actions = styled.div`
  display: flex;
  transform: translateY(-10px);
  margin-left: 7px;
`;

export const AddOption = styled.button`
  border: 0;
  background-color: transparent;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.fontLight};

  svg {
    margin-right: 8px;
  }
`;
