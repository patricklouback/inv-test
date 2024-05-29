import styled from 'styled-components';

export const ContainerHome = styled.div``;

export const ContentBottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-top: 3rem;
  height: 100%;

  gap: 1.5rem;

  @media screen and (max-width: 1048px) {
    grid-template-columns: 1fr;
  }
`;
