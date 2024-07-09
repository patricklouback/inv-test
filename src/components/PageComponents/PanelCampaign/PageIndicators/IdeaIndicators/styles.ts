import styled from 'styled-components';

export const Graphs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  max-width: 100%;
  gap: 1rem;
  grid-template-columns: minmax(200px, 1fr);
  padding-bottom: 4rem;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
`;

export const CampaignFilter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const IdeasInfoCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const IdeasInfoCard = styled.div`
  width: 90%;
`;

export const RowFour = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;

export const RowFourLeft = styled.div`
  display: flex;
  width: 50%;
`;

export const RowFourRight = styled.div`
  display: flex;
  width: 50%;
`;

export const RowFive = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RowFiveLeft = styled.div`
  display: flex;
  width: 40%;
`;

export const RowFiveMid = styled.div`
  display: flex;
  width: 40%;
`;

export const RowFiveRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

export const RowSix = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MessageContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
`;
