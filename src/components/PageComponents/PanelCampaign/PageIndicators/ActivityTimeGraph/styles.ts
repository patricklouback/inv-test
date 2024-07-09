import styled from 'styled-components';

export const GraphAndTitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 100%;
  align-self: center;
`;

export const GraphFilterBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.7rem;
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 1rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const TitleFilterBar = styled.div`
  width: auto;
  height: 35px;
  display: flex;
  align-items: center;
  gap: 1rem;
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const AverageTimeWrapper = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.grey};
  border-radius: 10px;
  padding: 8px 20px;
`;

export const AverageTime = styled.span`
  font-weight: 600;
  font-size: 2rem;
  margin-left: 5px;
  margin-right: 5px;
`;
