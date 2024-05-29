import styled from 'styled-components';

export const Container = styled.div`
  max-width: 295px;
  min-width: 295px;
  width: 100%;
  margin-right: 10px;

  @media screen and (max-width: 980px) {
    flex-direction: column;
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export const ViewItem = styled.a`
  cursor: pointer;
`;
