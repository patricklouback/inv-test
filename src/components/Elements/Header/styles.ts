import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

interface UserLoggedInfoProps {
  $logged?: boolean;
}

export const HeaderWrapper = styled.header`
  width: 100vw;
  display: flex;
  height: 5.5rem;
  background-color: ${({ theme }) => theme.colors.secondaryLight[styleSlug]};
  justify-content: space-around;
  align-items: center;
  position: relative;

  z-index: 999;
  top: 0;

  div.fade-line {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 0.5rem;

    background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight[styleSlug]} 20.87%,
      ${theme.colors.primary[styleSlug]} 52.62%,
      ${theme.colors.terceary[styleSlug]} 83.37%
    );`};
  }
`;

export const HeaderContent = styled.div<UserLoggedInfoProps>`
  display: flex;
  justify-content: ${({ $logged }) => $logged && 'space-between'};
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;

  .header-logo-company {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20rem;

    @media (max-width: 1000px) {
      margin-left: 6rem;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .logo {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 2.25rem;
    }
  }

  img.company-logo {
    width: auto;
    height: 4rem;
    scale: 0.8;
  }
`;

export const UserInfo = styled.div<{ $image: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;

  .user-icons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    /* max-width: 140px; */
    margin-right: 2rem;
    position: relative;

    width: 100%;
  }

  .user-identification {
    width: fit-content;
    min-width: 7rem;
  }

  @media screen and (max-width: 740px) {
    display: none;
  }
`;
