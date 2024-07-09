import { useMsal } from '@azure/msal-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { styleSlug } from 'utils/constants';
import LogoImage from '../../../assets/inventta/logo-white.png';
import LogoAccamargo from '../../../assets/inventta/logo_acc.png';
import LogoAvantti from '../../../assets/inventta/logo.png';
import FormMicrosoftAuthenticated from './FormMicrosoftAuthenticated';
import FormMicrosoftSignin from './FormMicrosoftSignin';
import {
  FooterContainer,
  ImageContainer,
  LoginBackground,
  LoginContent,
  LoginWrapper,
  PoweredBy,
} from './styles';

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
        {styleSlug === 'default' ? (
          <Image
            src={LogoImage}
            width="300"
            objectFit="contain"
            alt="Logo Inventta"
          />
        ) : (
          <>
            <ImageContainer>
              <Image
                alt="logo acc"
                src={LogoAccamargo}
                width={648}
                objectFit="contain"
              />
            </ImageContainer>
            <FooterContainer>
              <PoweredBy>Powered By</PoweredBy>
              <Image
                src={LogoAvantti}
                width="300"
                objectFit="contain"
                alt="Logo Inventta"
              />
            </FooterContainer>
          </>
        )}
      </LoginBackground>
    </LoginWrapper>
  );
}
