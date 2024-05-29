import styled from "styled-components";

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

export const EngagementInfoCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 25%;
`;

export const CampaignInfoCard = styled.div`
  width: 80%;
`;

export const CampaignFilter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RowTwo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RowTwoLeft = styled.div`
  display: flex;
  width: 65%;
  margin-right: 25px;
`;

export const RowTwoMid = styled.div`
  display: flex;
  width: 40%
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
  width: 50%
`;