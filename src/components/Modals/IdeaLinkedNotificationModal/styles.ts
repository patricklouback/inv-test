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

export const MessageTitle = styled.strong`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const Button = styled.button`
  padding: 1rem 4rem;

  border: 1px solid ${({ theme }) => theme.colors.primary[styleSlug]};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
  color: ${({ theme }) => theme.colors.background};
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  transition: filter 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary[styleSlug]};
  }
`;
