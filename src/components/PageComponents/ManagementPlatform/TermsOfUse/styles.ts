import styled from 'styled-components';

export const Section = styled.section`
  margin: 30px 0;
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  padding: 20px 0;
`;

export const General = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonSave = styled.button`
  border-radius: 12px;
  max-width: 145px;
  width: 100%;
  height: 56px;
  border: 0;
  outline: none;
  background: ${({ theme }) => theme.colors.greenHipeLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
`;

export const Value = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;

export const UseTermsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const UseTerms = styled.div`
  min-width: 64%;
`;
