import Button from '@components/Button';
import { useTheme } from 'styled-components';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import React from 'react';

import { styleSlug } from 'utils/constants';
import { getSsoClients } from 'utils/get-sso-clients';
import FormLoginMicrosoft from '../FormLoginMicrosoft';
import {
  Container,
  LeftSideTitle,
  LeftSideText,
  LeftSideQuestion,
  ButtonContainer,
} from './styles';

const SignOutButton = (): JSX.Element => {
  const { instance } = useMsal();

  const { colors } = useTheme();

  const propsLogin = {
    hover: '#c2c2c2',
    color: colors.font,
    background: '#e2e2e2',
    margin_vertical: 20,
    max_width: 190,
    center: true,
  };

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('emailLogin');
    const slug = localStorage.getItem('slug');
    const { redirect } = getSsoClients(slug);

    await instance.handleRedirectPromise();

    const logoutRequest = {
      account: instance.getAccountByHomeId(
        localStorage.getItem('@microsoft:homeAccountId')
      ),
      mainWindowRedirectUri: redirect,
    };

    localStorage.removeItem('@microsoft:homeAccountId');

    await instance.logoutPopup(logoutRequest);
  };

  return (
    <Button onClick={() => handleLogout()} {...propsLogin}>
      Sair
    </Button>
  );
};

export default function FormMicrosoftAuthenticated(): JSX.Element {
  const { colors } = useTheme();

  const { accounts } = useMsal();

  const propsLogin = {
    hover: colors.primaryLight[styleSlug],
    color: colors.fontWhite,
    background: colors.primary[styleSlug],
    margin_vertical: 20,
    max_width: 310,
    center: true,
  };

  /* const { accounts } = useMsal();

  useEffect(() => {
    if (accounts[0]) {
      // localStorage.setItem('emailLogin', accounts[0].username);
      console.log(accounts[0].username);
    }
  }, []); */

  return (
    <AuthenticatedTemplate>
      <Container>
        <LeftSideTitle>
          Olá, {accounts[0] ? accounts[0].name : 'Usuário não encontrado'}
        </LeftSideTitle>
        <LeftSideText>
          É um prazer ter você na nossa plataforma! Aqui é o lugar certo para
          contribuir com a inovação na empresa.
        </LeftSideText>
        <LeftSideQuestion> O que você deseja fazer agora? </LeftSideQuestion>
        <ButtonContainer>
          <SignOutButton />
          <FormLoginMicrosoft type="submit" {...propsLogin} />
        </ButtonContainer>
      </Container>
    </AuthenticatedTemplate>
  );
}
