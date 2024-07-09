import styled from 'styled-components';

export const IndicatorCards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(186px, 1fr));
  margin-bottom: 2rem;
  gap: 1rem;
`;

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

export const CampaignInfoCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

export const IdeasInfoCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const CampaignInfoCard = styled.div`
  width: 80%;
`;

export const IdeasInfoCard = styled.div`
  width: 90%;
`;

export const CampaignFilter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RowOne = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RowOneLeft = styled.div`
  display: flex;
  width: 65%;
`;

export const RowOneRight = styled.div`
  display: flex;
  width: 40%;
`;

export const RowTwo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RowTwoLeft = styled.div`
  display: flex;
  width: 65%;
  margin-right: 20px;
`;

export const RowTwoMid = styled.div`
  display: flex;
  width: 40%;
`;

export const EngagementInfoCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 25%;
`;

export const RowThree = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;

export const RowThreeLeft = styled.div`
  display: flex;
  width: 50%;
`;

export const RowThreeRight = styled.div`
  display: flex;
  width: 50%;
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
