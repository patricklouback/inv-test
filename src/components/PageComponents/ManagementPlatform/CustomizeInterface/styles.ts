import styled from 'styled-components';

export const Section = styled.section`
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

export const DropFile = styled.div`
  margin-right: 20px;

  max-width: 370px;
  width: 100%;
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

export const Slogam = styled.div`
  max-width: 370px;
  width: 100%;
  margin-left: 20px;
`;

export const DropAndSlogan = styled.div`
  display: flex;
  justify-content: center;
`;
