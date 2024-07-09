import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const LoginContent = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  height: 100vh;

  form {
    width: 100%;
    max-width: 400px;
  }

  .fade-line {
    &:first-child {
      top: 0;
    }

    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4px;

    background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight[styleSlug]} 20.87%,
      ${theme.colors.primary[styleSlug]} 52.62%,
      ${theme.colors.terceary[styleSlug]} 83.37%
    );`};
  }
`;

export const LoginBackground = styled.section`
  height: 100%;
  width: 300px;
  background-image: url(${({ theme }) => theme.images.login[styleSlug]});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex: 1;

  display: flex;
  justify-content: ${({ theme }) => theme.slug.login[styleSlug]};
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 890px) {
    display: none;
  }
`;

export const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
  .fade-line {
    &:first-child {
      top: 0;
    }

    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4px;

    background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight[styleSlug]} 20.87%,
      ${theme.colors.primary[styleSlug]} 52.62%,
      ${theme.colors.terceary[styleSlug]} 83.37%
    );`};
  }
  @media screen and (max-width: 890px) {
    width: 100%;
    position: fixed;
  }
`;

export const PoweredBy = styled.div`
  height: 24px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export const ImageContainer = styled.div`
  margin-top: 30vh;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vh;
`;
