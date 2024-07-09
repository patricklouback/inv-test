import styled from 'styled-components';

export const RouteGraphContainer = styled.div`
  display: flex;
`;

export const GraphContainer = styled.div`
  width: 50%;
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
