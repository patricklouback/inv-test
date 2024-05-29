import styled from 'styled-components';

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
      ${theme.colors.primaryLight} 20.87%,
      ${theme.colors.primary} 52.62%,
      ${theme.colors.terceary} 83.37%
    );`};
  }
`;

export const LoginBackground = styled.section`
  height: 100%;
  width: 300px;
  background-image: url('/background_login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
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
      ${theme.colors.primaryLight} 20.87%,
      ${theme.colors.primary} 52.62%,
      ${theme.colors.terceary} 83.37%
    );`};
  }
  @media screen and (max-width: 890px) {
    width: 100%;
    position: fixed;
  }
`;
