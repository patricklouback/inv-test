import styled from 'styled-components';

export const GraphContainer = styled.div`
  width: 100%;
`;

export const GraphFilterBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.7rem;
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 16px;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
`;

export const ButtonFilter = styled.button`
  width: auto;
  display: flex;
  align-items: center;
  border: none;
  gap: 1rem;
  background-color: #f6f6f8;
`;

export const TitleFilterBar = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
`;
