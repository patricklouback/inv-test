import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 22px;
    color: ${({ theme }) => theme.colors.font};

    @media (max-width: 840px) {
      margin-top: 22px;
    }
  }
`;

export const ListCampaing = styled.ul`
  .gap-between-items {
    padding-right: 1rem;
  }
`;

export const Item = styled.div`
  margin: 10px;
  padding-bottom: 20px;

  &:last-child {
    margin-right: 0;
  }

  &:first-child {
    margin-left: 0;
  }

  @media screen and(max-width: 1099px) {
    div footer .butt {
      width: 100%;
      max-width: 100%;
    }
  }
`;
