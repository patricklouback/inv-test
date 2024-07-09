import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
`;

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const TextAreaContent = styled.textarea<{ error?: boolean }>`
  width: 100%;
  min-height: 74px;
  padding: 1rem;
  color: #949494;
  outline: 0;
  border-radius: 8px;
  background: #ffffff;
  border: ${({ error }) => (error ? '2px solid #f56565' : '2px solid #cfd1dc')};
  padding-right: 10px;
  resize: none;
`;

export const Footer = styled.div`
  display: flex;

  button {
    background: transparent;
    color: #849398;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
