import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 40px 0;
`;

export const ContentPage = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  margin-top: 1rem;

  @media screen and (max-width: 510px) {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .ittem {
    min-width: 240px;
    width: 100%;
  }
`;

export const BackButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  cursor: pointer;
  max-width: 80px;

  span {
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
  }
`;
