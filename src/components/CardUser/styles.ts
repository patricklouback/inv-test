import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

interface AreaUserProps {
  areaColor?: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Image = styled.div<{ $img?: string }>`
  height: 36px;
  min-width: 36px;

  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.4);

  background-image: url(${({ $img }) => $img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px;
  box-shadow: 0 2px 5px -3px #00000061;
`;

export const NameUser = styled.span<{ isTheSameUser?: boolean }>`
  font-weight: ${({ isTheSameUser = false }) => (isTheSameUser ? 600 : 400)} !important;
  margin-bottom: 0 !important;
  font-size: 14px;
  letter-spacing: 0.3px;
  text-align: start;
  padding-left: 10px;

  transition: ease 0.5s;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const AreaUser = styled.span<AreaUserProps>`
  font-weight: 500 !important;
  margin-bottom: 0 !important;
  font-size: 14px;
  letter-spacing: 0.3px;
  text-align: start;
  padding-left: 10px;

  transition: ease 0.5s;
  color: ${props => props.areaColor};
`;

export const StatusUser = styled.span`
  font-weight: 200;
  margin-bottom: 0;
  margin-left: 10px;
  padding: 2px;
  font-size: 12px;
  letter-spacing: 0.3px;
  text-align: start;
  padding-left: 10px;

  transition: ease 0.5s;
  color: ${({ theme }) => theme.colors.fontLight};
  background-color: #b5b5b51a;

  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 2px;
`;

export const RespondInviteButton = styled.button`
  font-weight: 200;
  margin-bottom: 0;
  /* margin-left: 10px; */
  margin-top: 2px;
  padding: 2px;
  font-size: 12px;
  letter-spacing: 0.3px;

  transition: ease 0.5s;
  color: ${({ theme }) => theme.colors.secondaryLight[styleSlug]};
  background-color: ${({ theme }) => theme.colors.primary[styleSlug]};

  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight[styleSlug]};
  }
`;

export const NameAndAreaWrapper = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`;

export const OptionsWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const OptionAndSubOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 2px 4px 5px 0px rgba(0, 0, 0, 0.1);
  border: 2px solid ${({ theme }) => theme.colors.backgroundGrey};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;

  & > *:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.backgroundGrey};
  }
`;

export const OptionItem = styled.button`
  display: flex;
  width: 134px;
  height: 32px;
  padding: 11px 13px 10px 13px;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
  }
  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 0.5s ease-out 0s 1 load;
`;

export const OptionsButton = styled.button`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
    border-radius: 2px;
  }
`;

export const OptionsAvailable = styled.div<{ top: number }>`
  position: fixed;
  z-index: 99;
  width: 134px;
  top: ${({ top }) => top + 27}px;
`;



export const AllOptionsWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
`;

export const DangerText = styled.span`
  color: #EF6262;
`;