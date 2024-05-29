import { useMsal } from '@azure/msal-react';
import Image from 'next/image';
import { useEffect } from 'react';
import LogoImage from '../../../assets/inventta/logo-white.png';
import FormMicrosoftAuthenticated from './FormMicrosoftAuthenticated';
import FormMicrosoftSignin from './FormMicrosoftSignin';
import { LoginBackground, LoginContent, LoginWrapper } from './styles';

export default function LoginPage(): JSX.Element {
  const { accounts } = useMsal();

  useEffect(() => {
    if (accounts[0]) {
      localStorage.setItem('emailLogin', accounts[0].username);
      // eslint-disable-next-line no-console
    }
  }, [accounts]);

  return (
    <LoginWrapper>
      <div className="fade-line" />
      <LoginContent>
        <FormMicrosoftSignin />
        <FormMicrosoftAuthenticated />
      </LoginContent>
      <div className="fade-line" />
      <LoginBackground>
        <Image src={LogoImage} width="300px" objectFit="contain" />
      </LoginBackground>
    </LoginWrapper>
  );
}
