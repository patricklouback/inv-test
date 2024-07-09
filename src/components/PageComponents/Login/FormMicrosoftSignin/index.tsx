/* eslint-disable no-console */
import { UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import Button from '@components/Button';
import { AuthContext } from 'contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { getIsEmail } from 'utils/isEmail';
import { styleSlug } from 'utils/constants';
import IconMicrosoft from '../../../../assets/inventta/microsoft.svg';
import FormLogin from '../FormLogin';
import FormSendMail from '../FormSendMail';
import {
  Container,
  DivisoryContainer,
  InputDescription,
  LeftSideTitle,
  Line,
  OrContainer,
} from './styles';

const SignInButton = ({ disabled }: { disabled: boolean }): JSX.Element => {
  const { instance } = useMsal();

  const { colors } = useTheme();

  const propsLogin = {
    hover: '#c2c2c2',
    color: colors.font,
    background: '#e2e2e2',
    margin_vertical: 20,
    max_width: 391,
    center: true,
  };

  const handleLogin = async (): Promise<void> => {
    await instance.handleRedirectPromise();

    await instance
      .loginPopup()
      .then(res => {
        localStorage.setItem(
          '@microsoft:homeAccountId',
          res.account.homeAccountId
        );
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Button
      onClick={() => handleLogin()}
      {...propsLogin}
      disabled={disabled}
      icon={<IconMicrosoft style={{ height: '20px' }} />}
    >
      Entrar com a Microsoft
    </Button>
  );
};

export default function FormMicrosoftSignin(): JSX.Element {
  const { colors } = useTheme();

  const hasSSO = localStorage.getItem('hasSSO') === 'true';

  const { loginStep } = useContext(AuthContext);

  const [isEmail, setIsEmail] = useState(true);

  const propsLogin = {
    hover: colors.primaryLight[styleSlug],
    color: colors.fontWhite,
    background: colors.primary[styleSlug],
    margin_vertical: 20,
    max_width: 391,
    center: true,
    isEmail,
  };

  useEffect(() => {
    const email = localStorage.getItem('emailLogin');
    setIsEmail(getIsEmail(email));
  }, [loginStep]);

  const getLoginDescription = (): string => {
    if (!loginStep) {
      return 'Matrícula ou Email:';
    }

    if (isEmail) {
      return 'Código de Autenticação:';
    }

    return 'Digite sua Senha';
  };

  return (
    <UnauthenticatedTemplate>
      <Container>
        <LeftSideTitle>Entrar na sua conta</LeftSideTitle>
        <InputDescription>{getLoginDescription()}</InputDescription>
        {!loginStep && <FormSendMail type="submit" {...propsLogin} />}
        {loginStep && <FormLogin type="submit" {...propsLogin} />}
        <DivisoryContainer>
          <Line />
          <OrContainer> OU </OrContainer>
          <Line />
        </DivisoryContainer>
        <SignInButton disabled={!hasSSO} />
      </Container>
    </UnauthenticatedTemplate>
  );
}
