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

export const AreaAndDept = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 47px;
`;

export const TextInput = styled.input`
  height: 40px;
  min-width: 270px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-size: 1rem;
  padding-left: 10px;
  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const AreaTextInput = styled.input`
  height: 40px;
  min-width: 230px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-size: 1rem;
  padding-left: 10px;
  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const ColorInput = styled.input`
  min-height: 40px;
  width: 110px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-size: 1rem;
  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const LabelColor = styled.label`
  font-weight: bold;
  margin-bottom: 6px;
`;

export const ButtonCreate = styled.button`
  border-radius: 12px;
  max-width: 100px;
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

export const Send = styled.p`
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;

export const FormContainer = styled.form`
  width: 370px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ColorInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

export const AreaContainer = styled.div`
  display: flex;
  gap: 20px;
`;
