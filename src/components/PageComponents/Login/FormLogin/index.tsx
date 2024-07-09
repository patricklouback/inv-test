import { Input } from '@components/InputText';
import { useForm } from 'react-hook-form';

import Button from '@components/Button';
import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { FormLoginWrapper } from './styles';

interface propsLogin {
  type: 'button' | 'reset' | 'submit';
  hover: string;
  color: string;
  background: string;
  margin_vertical: number;
  max_width: number;
  center: boolean;
  isEmail: boolean;
}

export default function FormLogin({ ...propsButton }: propsLogin): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { authLogin } = useContext(AuthContext);

  return (
    <FormLoginWrapper onSubmit={handleSubmit(authLogin)}>
      <Input
        name="authenticationCode"
        id="authenticationCode"
        placeholder="******"
        errors={errors.authenticationCode}
        Icon={AiOutlineLock}
        isPassword={!propsButton.isEmail}
        {...register('authenticationCode')}
      />

      <Button {...propsButton} name="login" icon={<AiOutlineLock />}>
        Entrar
      </Button>
    </FormLoginWrapper>
  );
}
