import styled from 'styled-components';

export const NotificationContainer = styled.div`
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
  gap: 1.1rem;
`;
export const UserImg = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

export const SenderUser = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Username = styled.span`
  font-size: 1.2rem;
`;

export const MessageTitle = styled.strong`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  font-size: 1.3rem;

  color: ${({ theme }) => theme.colors.font};
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 600;
  line-height: 1.5rem;
`;

export const MessageDescriptionContainer = styled.div``;

export const MessageDescription = styled.span`
  display: block;
  margin-top: 0.8rem;
  line-height: 1.2rem;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const Button = styled.button`
  padding: 1rem 4rem;
  border: 0;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;
