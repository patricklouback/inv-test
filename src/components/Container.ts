import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 6.75rem;

  @media screen and (max-width: 1410px) {
    padding: 0 80px;
  }

  @media screen and (max-width: 1340px) {
    padding: 0 60px;
  }

  @media screen and (max-width: 1310px) {
    padding: 0 30px;
  }

  @media screen and (max-width: 1240px) {
    padding: 0 15px;
  }
`;
