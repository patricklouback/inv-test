import { useForm } from 'react-hook-form';

import Button from '@components/Button';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { FormSendMailWrapper } from './styles';

interface propsLogin {
  type: 'button' | 'reset' | 'submit';
  hover: string;
  color: string;
  background: string;
  margin_vertical: number;
  max_width: number;
  center: boolean;
}

export default function FormLoginMicrosoft({
  ...propsButton
}: propsLogin): JSX.Element {
  const { loginAfterMicrosoftAuthenticate } = useContext(AuthContext);

  const { handleSubmit } = useForm();

  return (
    <FormSendMailWrapper onSubmit={handleSubmit(loginAfterMicrosoftAuthenticate)}>

      <Button {...propsButton} name="login" >
        Ir para Página Inicial
      </Button>

    </FormSendMailWrapper>
  );
}
