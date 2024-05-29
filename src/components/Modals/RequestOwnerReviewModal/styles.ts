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
  gap: 16px;
  justify-content: center;
`;

export const Username = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;

  color: #3c3c3c;
`;

export const MessageTitle = styled.strong`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;

  text-align: center;

  color: #3c3c3c;
`;

export const MessageDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  gap: 24px;

  background: #e7e7e7;
  border-radius: 20px;
`;

export const MessageDescription = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 100% */
  text-align: center;
  color: #4f4f4f;
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

  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  transition: filter 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
