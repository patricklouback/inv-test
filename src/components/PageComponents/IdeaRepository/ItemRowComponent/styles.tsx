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
  width: 100%;
  height: 30px;

  span {
    margin: 0 auto;
    letter-spacing: 0.4px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 21px;

    text-align: center;

    color: #ffffff;
  }

  display: grid;
  place-items: center;

  color: #fff;

  @media screen and (max-width: 1280px) {
    span {
      font-size: 8px;
    }
  }
`;

export const ItemValue = styled.td`
  .actions svg :first-child {
    cursor: pointer;
  }

  padding: 0.5rem 0;
  border: none;

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

export const ItemValueTitle = styled.td`
  padding: 0.5rem 3rem 0.5rem 0;
  padding-left: 10px;
  border: none;
  width: 25rem;
  text-align: left;
  font-size: 12px;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ItemValueCampaign = styled.td`
  padding: 0.5rem 3rem 0.5rem 0;
  border: none;
  width: 15rem;
  text-align: left;
  font-size: 12px;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ItemValueDate = styled.td`
  padding: 0.5rem 2rem 0.5rem 0;
  border: none;
  width: 9rem;
  text-align: left;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ItemValueStep = styled.td`
  padding: 0.5rem 2rem 0.5rem 0;
  border: none;
  width: 15rem;
  text-align: left;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const ItemValueStatus = styled.td`
  padding: 0.5rem 1rem 0.5rem 0;
  border: none;
  width: 220px;
  text-align: left;
`;

export const IdeaId = styled.td`
  text-align: center;
`;

const KanbanColors = {
  WAITING: '#315594',
  IN_REVIEW: '#8B095F',
  EXTERNAL_REVIEW: '#F99335',
  APPROVED: '#67D1C4',
  PAUSED: 'rgba(45, 55, 72, 0.6)',
  INACTIVE: '#B80F0A',
  DRAFT: '#df0075',
};

export const KanbanStatus = styled.div<{ type: string }>`
  background-color: ${({ type }) => KanbanColors[type]};
  padding: 1rem 0.8rem;
  height: 23px;
  width: fit-content;
  display: flex;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const KanbanStatusText = styled.span`
  color: #fff;
  font-size: 13px;
  font-weight: 600;
`;
