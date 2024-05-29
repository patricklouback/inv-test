import styled from 'styled-components';

export const Section = styled.section`
  margin-bottom: 1rem;
  margin-top: 0;
`;

export const DraftC = styled.div`
  margin: 50px 0;

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

export const ButtonAddCriteria = styled.button`
  border-radius: 12px;
  width: auto;
  height: 56px;
  border: 0;
  outline: none;
  background: ${({ theme }) => theme.colors.greenHipeLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
  padding: 0 1rem;
`;

export const ButtonValue = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;

export const DisclaimerAndFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
