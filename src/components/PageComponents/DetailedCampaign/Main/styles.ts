import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const About = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  h2 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 16px;
  }

  p {
    line-height: 24px;
    margin: 10px 0;
  }
`;

export const Info = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;

  @media screen and (min-width: 740px) {
    flex-direction: row;
  }
`;

export const GoalsMet = styled.article`
  flex: 1;
  min-width: 380px;
  margin-right: 2rem;
  h2 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 1rem;
  }
  .markdownContainer {
    margin-bottom: 2rem;
  }

  .disabledH2 {
    h2 {
      text-transform: none;
      font-weight: 400;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 983px) {
    margin-bottom: 50px;
  }
`;

export const List = styled.ul`
  margin-left: 40px;
  list-style: none;
  margin-top: 12px;
`;

export const Item = styled.p`
  position: relative;
  line-height: 24px;
  .markdown h1 {
    text-transform: uppercase;
    font-size: 1.5rem;
  }
  .markdown h2 {
    text-transform: uppercase;
    font-size: 1.25rem;
  }
  .markdown h3 {
    text-transform: uppercase;
    font-size: 1rem;
  }
`;
