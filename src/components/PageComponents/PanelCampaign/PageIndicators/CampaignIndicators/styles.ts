import styled from "styled-components";

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

export const CampaignInfoCard = styled.div`
  width: 80%;
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
  width: 40%
`;