import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  flex-wrap: wrap;

  button {
    max-width: 300px;

    span {
      display: flex;
      align-items: center;

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const BoxDate = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 5px;
    height: 38px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #detailed-header-data {
    font-weight: bold;
    font-size: 16px;
  }

  #detailed-header-data-value {
    font-weight: normal;
    font-size: 16px;
  }

  @media screen and (max-width: 610px) {
    margin-bottom: 20px;
  }
`;

export const ContainerButton = styled.div`
  @media screen and (max-width: 510px) {
    width: 50%;
  }
`;
