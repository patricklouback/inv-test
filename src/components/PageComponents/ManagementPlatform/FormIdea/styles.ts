import styled from 'styled-components';

export const Section = styled.section`
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  padding: 20px 0;
`;

export const FormIdea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CheckBox = styled.div`
  margin-top: 10px;
  padding-left: 20px;
`;

export const Label = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }

  svg {
    margin-left: 15px;
  }
`;

export const Input = styled.input`
  width: 20px;
  height: 20px;
`;

export const Text = styled.p`
  margin-left: 10px;
`;

export const ButtonSave = styled.button`
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

export const Value = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;

export const Warning = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding-left: 3%;

  strong {
    font-size: 0.9rem;
  }

  svg {
    margin-left: 2rem;
  }

  margin-bottom: 2rem;
`;
