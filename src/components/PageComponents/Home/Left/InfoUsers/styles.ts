import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

interface ParamsItems {
  $img: string;
}

export const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const ListCard = styled.ul`
  margin-bottom: 25px;
  gap: 10px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 459px) {
    justify-content: center;
  }
`;

export const ItemCard = styled.li`
  background: ${({ theme }) => theme.colors.greyLight};
  /* max-width: 180px; */
  width: 100%;
  height: calc(135px + 109px);
  border-radius: 8px;
  overflow: hidden;

  @media screen and (max-width: 1048px) {
    max-width: 100%;
    height: calc(135px + 198px);
    margin: 0 3px;
  }

  @media screen and (max-width: 740px) {
    height: calc(135px + 121px);
  }

  @media screen and (max-width: 600px) {
    max-width: 230px;
    margin: 10px 0;
  }

  @media screen and (max-width: 522px) {
    max-width: 210px;
  }

  @media screen and (max-width: 459px) {
    max-width: 240px;
  }
`;

export const Imagem = styled.div<ParamsItems>`
  width: 100%;
  height: 136px;
  background-image: url(${({ $img }) => $img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBlue};

  @media screen and (max-width: 1048px) {
    height: 199px;
  }

  @media screen and (max-width: 740px) {
    height: 143px;
  }
`;

export const Content = styled.div`
  padding: 12px 16px;
  position: relative;
`;

export const Name = styled.h3`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const Rank = styled.div`
  position: absolute;
  top: -40px;
  background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
  color: #fff;

  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  height: 38px;
  width: 38px;
  border-top-right-radius: 8px;
`;

export const List = styled.ul`
  margin-top: 10px;
  list-style: none;
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  li {
    @media screen and (max-width: 1048px) {
      &:first-child {
        padding: 0;
      }

      &:last-child {
        padding: 0;
      }

      padding: 0 5px;
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;

    li {
      max-width: 100%;
    }
  }

  @media screen and (max-width: 575px) {
    li {
      max-width: 240px;
    }
  }

  @media screen and (max-width: 522px) {
    li {
      max-width: 210px;
    }
  }
`;

export const Item = styled.li`
  height: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    font-size: 12px;
    letter-spacing: 0.5px;
  }
`;

export const CardQnt = styled.span`
  margin-right: 8px;
  background: ${({ theme }) => theme.colors.background};
  width: 32px;
  height: 100%;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.primary[styleSlug]};
  font-size: 12px;
  border-radius: 8px;
`;
