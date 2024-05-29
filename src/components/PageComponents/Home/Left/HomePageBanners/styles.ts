import styled from "styled-components";

interface IBannerProps {
  index: number;
  isTrial?: boolean;
};

export const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 50px;
  border-bottom: 3px solid rgba(141, 172, 224, 0.4);

  width: 100%;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-left: 18px;
  letter-spacing: 0.4px;

  @media screen and (max-width: 520px) {
    font-size: 16px;
    margin-bottom: 10px;
  }

`;

export const BannerContent = styled.div<React.FC>``;

export const CustomArrowLeft = styled.div`
  cursor: pointer;
  position: absolute;
  background: ${({ theme }) => theme.colors.secondary};
  :hover {
    opacity: 1;
  }
  transition: 0.4s ease;
  opacity: 0.7;
  width: 52px;
  height: 52px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 4px 4px 0px;

  svg path {
    color: ${({ theme }) => theme.colors.terceary};
  }
`;

export const CustomArrowRight = styled.div`
  :hover {
    opacity: 1;
  }
  transition: 0.4s ease;
  opacity: 0.7;
  cursor: pointer;
  position: absolute;
  background: ${({ theme }) => theme.colors.secondary};
  width: 52px;
  height: 52px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0px 0px 4px;
  right: 0;

  svg path {
    color: ${({ theme }) => theme.colors.terceary};
  }
`;

export const ListBanner = styled.ul`
  .custom-container--class {
    height: 400px;
    max-width: 580px;
  }

  @media screen and (max-width: 520px) {
    .custom-container--class {
      height: 200px;
      max-width: 375px;
    }
  }
`;

export const BannCont = styled.div`
  height: 323px;
  &:hover {
    cursor: pointer;
  }
`;

export const TopBannerContentWrapper = styled.div<IBannerProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
  width: 60%;
  height: 100%;
  gap: 15px;
`;

export const TopAllContent = styled.div<IBannerProps>`
  display: flex;
  justify-content: ${({ index }) => index === 0 ? 'end' : 'start'};
  width: 100%;
  height: 100%;
  padding-left: 5%;
  padding-right: 1%;
`;

export const BannerTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.background};
  width: 95%;

  @media screen and (max-width: 520px) {
    font-size: 14px;
  }
`;

export const BannerSubtitle = styled.div<IBannerProps>`
  display: ${({ index, isTrial }) => index === 0 && isTrial ? 'none' : 'flex'};
  color: ${({ theme }) => theme.colors.background};
  width: 99%;

  @media screen and (max-width: 520px) {
    font-size: 10px;
  }
`;

export const ActionButtonWrapper = styled.div<IBannerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 37px;
  font-weight: 600;
  border-radius: 8px;
  background-color: 
    ${({ theme, index }) => index === 0 ? theme.colors.bannerButtonPurple : theme.colors.bannerButtonGreen};
  /* color: ${({ theme }) => theme.colors.fontWhite}; */
  &:hover {
    cursor: pointer;
    background-color: ${({ theme, index }) => index === 0 ? theme.colors.bannerButtonPurpleHover : theme.colors.bannerButtonGreenHover};
  }

  @media screen and (max-width: 520px) {
    width: 200px;
    height: 30px;
  }
`;

