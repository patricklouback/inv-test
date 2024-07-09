import styled from 'styled-components';
import { styleSlug } from 'utils/constants';



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

export const Username = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;

  text-align: center;

  color: #3c3c3c;
`;

export const MessageDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  gap: 24px;
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
  background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.font.primary};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

export const Button = styled.button`
  gap: 0.5rem;
  width: 100%;
  height: 50px;
  display: flex;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 8px;
  align-items: center;
  letter-spacing: 0.1rem;
  justify-content: center;
  transition: filter 0.2s;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
  border: 1px solid ${({ theme }) => theme.colors.primary[styleSlug]};
`;

export const ButtonLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.lightBlue};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const RejectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 24px 16px;
  gap: 24px;
`;

export const RejectMessageDescription = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 100% */
  text-align: start;
  color: #4f4f4f;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 0.5;
  font-weight: 500;
`;

export const RejectButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

export const RejectButton = styled.button`
  gap: 0.5rem;
  width: 100%;
  height: 50px;
  display: flex;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 8px;
  align-items: center;
  letter-spacing: 0.1rem;
  justify-content: center;
  transition: filter 0.2s;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.notification.error};
  border: 1px solid ${({ theme }) => theme.colors.notification.error};
`;

export const RejectButtonSecondary = styled.button`
  gap: 0.5rem;
  width: 100%;
  height: 50px;
  display: flex;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 8px;
  align-items: center;
  letter-spacing: 0.1rem;
  justify-content: center;
  transition: filter 0.2s;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borders};
`;

export const ContentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
`;

export const Exit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;

  position: absolute;
  top: 20px;
  right: 20px;

  svg {
    cursor: pointer;
  }
`;

export const UserImg = styled.img<{ src: string | null }>`
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