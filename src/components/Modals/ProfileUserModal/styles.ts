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
  gap: 1.4rem;
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

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1px;
`;

export const UserImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 10%;
`;

export const Username = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;

  color: ${({ theme }) => theme.colors.font};
`;

export const HeaderDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5px;
`;

export const Bold = styled.span`
  font-weight: 500;
  line-height: 24px;

  color: ${({ theme }) => theme.colors.font};
`;

export const HeaderDescriptionItem = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 200;
  font-size: 14px;
  line-height: 14px;

  color: ${({ theme }) => theme.colors.fontLight};
`;

export const Divisor = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.borders};
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 24px 16px;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 180px;
  height: 64px;

  border: 2px solid ${({ theme }) => theme.colors.borders};
  border-radius: 12px;
`;

export const CardLeft = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 18px;
`;

export const SubText = styled.span`
  font-size: 12px;
`;

export const CardRight = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  max-width: 60%;
`;


export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const FooterDescription = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 100% */
  text-align: start;
  color: #4f4f4f;
`;

export const StatusUser = styled.span<{ active?: boolean }>`
  font-weight: 200;
  margin-bottom: 0;
  margin-left: 10px;
  padding: 2px;
  font-size: 14px;
  letter-spacing: 0.3px;
  text-align: start;
  padding: 5px;

  transition: ease 0.5s;
  color: ${({ theme, active }) => (active ? '#28B446' : theme.colors.fontLight)};
  background-color: ${({ active }) => (active ? '#78B5321a' : '#b5b5b51a')};

  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 3px;
`;