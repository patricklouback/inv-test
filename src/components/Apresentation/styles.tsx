import styled from 'styled-components';

export const Apresentation = styled.div`
  margin-left: 30px;
  display: flex;
  max-width: 90rem;
  font-size: 18px;
  line-height: 40px;
  font-size: 700;
  align-items: center;
  position: relative;

  margin-top: 4rem;
  margin-bottom: 2.5rem;

  &::after {
    content: '';
    background-color: ${({ theme }) => theme.colors.borders};
    position: absolute;

    width: 2px;
    height: calc(100% - 20px);
    left: 310px;
    opacity: 0.3;
  }

  h1 {
    margin-left: 40px;
    line-height: 24px;
    font-size: 24px;
  }

  div {
    img {
      max-width: 300px;
      max-height: 300px;
      object-fit: contain;
    }
  }
  @media screen and (max-width: 510px) {
    display: none;
  }
`;
