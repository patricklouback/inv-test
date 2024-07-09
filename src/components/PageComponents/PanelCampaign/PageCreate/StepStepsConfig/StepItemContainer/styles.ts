import styled from 'styled-components';

export const StepItemContainerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;

  margin-bottom: 0.5rem;

  > div {
    flex: 1;

    > input {
      flex: 1;
    }
  }

  > button {
    height: 40px;
    width: 40px;
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 0.5rem;
    transition: background-color 1s;
    &:hover {
      background-color: ${({ theme }) => theme.colors.grey};
    }
  }
`;
