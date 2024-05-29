import styled from 'styled-components';

export const ItemRow = styled.tr`
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};

  .title {
    font-weight: 600;
    line-height: 20px;
  }

  .actions {
    display: flex;
    align-items: center;
    margin: auto 0;
  }

  .date {
    letter-spacing: 0.6px;
  }

  .id {
    align-items: center;
  }
`;

interface ItemSubRowProps {
  linkIsOpen: boolean;
}

export const ItemSubRow = styled.tr<ItemSubRowProps>`
  display: ${({ linkIsOpen }) => (linkIsOpen ? 'table-row' : 'none')};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};
  background-color: ${({ theme }) => theme.colors.grey_hover};

  .title {
    font-weight: 600;
    line-height: 20px;
  }

  .actions {
    display: flex;
    align-items: center;
    margin: auto 0;
  }

  .date {
    letter-spacing: 0.6px;
  }

  .id {
    align-items: center;
  }
`;

export const DownIconWrapper = styled.div`
  cursor: pointer;
`;

export const IdWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const CardItem = styled.div<{ color?: string }>`
  background: ${({ color }) => color};

  max-width: 180px;
  border-radius: 20px;
  width: 80%;
  height: 35px;

  span {
    margin: 0 auto;
    letter-spacing: 0.4px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;

    text-align: center;

    color: #ffffff;
  }

  display: grid;
  place-items: center;

  color: #fff;
`;

export const ItemValue = styled.td`
  .actions svg :first-child {
    cursor: pointer;
  }

  padding: 0.5rem 0;
  border: none;
  width: 16.3%;

  text-align: left;
  svg {
    margin-right: 12px;
  }

  @media screen and (max-width: 635px) {
    svg {
      margin-right: 0px;
    }
    :last-child {
      text-align: right;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ItemValueYear = styled.td`
  padding: 0.5rem 3rem 0.5rem 0;
  border: none;
  width: 10.3%;
  text-align: left;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ItemValueMarket = styled.td`
  padding: 0.5rem 3rem 0.5rem 0;
  border: none;
  width: 14.3%;
  text-align: left;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ItemValueAudience = styled.td`
  padding: 0.5rem 2rem 0.5rem 0;
  border: none;
  width: 14.3%;
  text-align: left;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ItemValueLocation = styled.td`
  padding: 0.5rem 1rem 0.5rem 0;
  border: none;
  width: 14.3%;
  text-align: left;
`;

export const StartupTitle = styled.td`
  padding-left: 10px;
  text-align: start;
  width: 20%;
  font-weight: 500;
`;
