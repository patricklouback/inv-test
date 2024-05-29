import Button from '@components/Button';
import { Input } from '@components/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from 'contexts/AuthContext';
import Image from 'next/image';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';
import { RiUserLine } from 'react-icons/ri';
import * as yup from 'yup';
import LogoImage from '../../../assets/inventta/logo-white.png';
import {
  FormSendMailWrapper,
  InputDescription,
  LeftSideTitle,
  LoginBackground,
  LoginContent,
  LoginWrapper,
} from './styles';

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Senha atual é obrigatória'),
  newPassword: yup.string().required('Nova senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('newPassword'), null],
      'Confirmação de senha deve ser igual à nova senha'
    )
    .required('Confirme a nova senha'),
});

type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>;

export default function ChangePasswordPage(): JSX.Element {
  const { changePassword } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  async function onSubmit(values: ChangePasswordSchema): Promise<void> {
    await changePassword({
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  }

  return (
    <LoginWrapper>
      <div className="fade-line" />
      <LoginContent>
        <LeftSideTitle>Altere sua senha</LeftSideTitle>
        <FormSendMailWrapper onSubmit={handleSubmit(onSubmit)}>
          <InputDescription>Informe sua senha atual:</InputDescription>
          <Input
            name="currentPassword"
            id="currentPassword"
            register={register}
            placeholder="Senha Atual"
            errors={errors}
            Icon={RiUserLine}
            isPassword
          />

          <InputDescription>Informe sua nova senha:</InputDescription>
          <Input
            name="newPassword"
            register={register}
            placeholder="Nova Senha"
            errors={errors}
            Icon={RiUserLine}
            isPassword
          />

          <InputDescription>Confirme sua nova senha:</InputDescription>
          <Input
            name="confirmPassword"
            register={register}
            placeholder="Confirme a Nova Senha"
            errors={errors}
            Icon={RiUserLine}
            isPassword
          />

          <Button name="login" icon={<FiLogIn />}>
            Enviar
          </Button>
        </FormSendMailWrapper>
      </LoginContent>
      <div className="fade-line" />
      <LoginBackground>
        <Image src={LogoImage} width="300px" objectFit="contain" />
      </LoginBackground>
    </LoginWrapper>
  );
}
