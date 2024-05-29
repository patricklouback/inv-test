import styled from 'styled-components';

export const Container = styled.div`
  input {
    max-width: 400px;
  }
  margin-bottom: 20px;
`;

export const InfoTextContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  gap: 20px;
  padding: 20px;
`;

export const InfoText = styled.div`
  padding-right: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0;
`;

export const StepItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  width: 100%;
`;

export const ButtonAddStepItem = styled.button`
  padding: 1rem;
  margin: 1rem 0;
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 0.5rem;
  transition: background-color 1s;
  background-color: ${({ theme }) => theme.colors.greyLight};
  :hover {
    background-color: ${({ theme }) => theme.colors.grey};
  }

  > svg {
    margin-right: 0.5rem;
  }
`;

export const NewStepContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > div {
    flex: 1;
  }

  > button {
    height: 40px;
    padding: 0 0.5rem;
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${({ theme }) => theme.font.primary};
    font-weight: 500;
    border: 0;
    border-radius: 0.5rem;
    transition: background-color 1s;
    :hover {
      background-color: ${({ theme }) => theme.colors.grey};
    }

    > svg {
      margin-right: 0.5rem;
    }
  }
`;

export const ContainerStep = styled.div`
  margin: 40px 0;

  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};
  padding-bottom: 20px;

  :last-child {
    padding-bottom: 0px;
    border-bottom: 0;
  }

  @media screen and (max-width: 980px) {
    margin: 10px 0;
  }
`;

export const ContentSteps = styled.div`
  margin: 20px 0;
`;
