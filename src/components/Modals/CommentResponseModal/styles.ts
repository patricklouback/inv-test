import styled from 'styled-components';

export const NotificationContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button[type='submit'] {
    max-width: 200px;
    margin-left: auto;
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  gap: 1rem;
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
  font-size: 1.1rem;
  display: block;
  padding: 0.5rem 0;
  /* text-align: center; */
  color: ${({ theme }) => theme.colors.font};
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 600;
  line-height: 1.5rem;
`;

export const MessageDescription = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight};
  border-radius: 0.25rem;
  padding: 0.5rem;
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

export const ResponseArea = styled.textarea`
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.borders};
  border-radius: 0.25rem;
  height: 100px;
  overflow-y: scroll;
  padding: 0.5rem 1rem;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
