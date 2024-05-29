import styled from 'styled-components';

export const SendIdeaContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    min-height: 200px;
  }

  > button[type='submit'] {
    max-width: 200px;
    margin-left: auto;
  }
`;

export const ModalTitle = styled.strong`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.font};
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

export const SelectedUsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SelectUser = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  padding: 0.5rem;
  border: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.font.primary};
`;
