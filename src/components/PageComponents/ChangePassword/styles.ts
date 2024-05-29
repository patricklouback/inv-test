import styled from 'styled-components';

export const LoginContent = styled.section`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  gap: 5rem;

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

export const FormSendMailWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const LeftSideTitle = styled.div`
  width: 382px;
  height: 38px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 120%;

  text-align: center;

  @media screen and (max-width: 890px) {
    text-align: center;
    width: 100%;
    margin-bottom: 6.5vh;
    font-size: 24px;
    line-height: 130%;
  }
`;

export const InputDescription = styled.div`
  width: 392px;
  height: 24px;
  left: 200px;
  top: 315px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: -1rem;
  @media screen and (max-width: 890px) {
    width: 100%;
  }
`;