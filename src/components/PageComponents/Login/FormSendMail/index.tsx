import { Input } from '@components/InputText';
import { useForm } from 'react-hook-form';

import Button from '@components/Button';
import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { RiUserLine } from 'react-icons/ri';
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

export default function FormSendMail({
  ...propsButton
}: propsLogin): JSX.Element {
  const { sendEmailToAuthenticate, authLoginWithoutAuthentication } =
    useContext(AuthContext);

  const isTrial = process.env.NEXT_PUBLIC_CLIENT === 'trial';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <FormSendMailWrapper
      onSubmit={handleSubmit(
        isTrial ? authLoginWithoutAuthentication : sendEmailToAuthenticate
      )}
    >
      <Input
        name="email"
        id="email"
        register={register}
        placeholder="Entre com matrícula ou email..."
        errors={errors.email}
        Icon={RiUserLine}
      />

      <Button {...propsButton} name="login" icon={<FiLogIn />}>
        Próximo
      </Button>
    </FormSendMailWrapper>
  );
}
