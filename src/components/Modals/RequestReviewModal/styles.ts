import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span``;

export const Message = styled.h2`
  margin: 1rem 0;
  font-size: 1.5rem;
`;

export const SubmitButton = styled.button`
  border: 0;
  width: 100%;
  height: 45px;
  outline: 0;
  max-width: 130px;
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.greenHipeLight};
  font-weight: 600;
  letter-spacing: 0.7px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greenLimao};
  }

  &:last-child {
    margin-left: auto;
  }
`;

export const Description = styled.textarea`
  border-radius: 0.5rem;
  border: 2px solid #cfd1dc;
  resize: none;
  margin-bottom: 0.8rem;
  padding: 1.5rem;
  overflow: auto;
  outline: none;
  box-shadow: none;
  background: #ffffff;
  font-size: 1rem;
  width: 100%;
`;
