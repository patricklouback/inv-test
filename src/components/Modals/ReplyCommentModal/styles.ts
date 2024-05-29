import styled from 'styled-components';

export const NotificationContainer = styled.form`
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

export const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const UserImg = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

export const SenderUser = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const Username = styled.span`
  font-size: 1.2rem;
`;

export const MessageTitle = styled.strong`
  font-size: 1.1rem;

  color: ${({ theme }) => theme.colors.font};
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 600;
  line-height: 1.5rem;
`;

export const MessageDescription = styled.div``;

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
