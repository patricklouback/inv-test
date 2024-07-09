/* eslint-disable react/button-has-type */
import { Input } from '@components/InputText';
import { BiPlus } from 'react-icons/bi';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateCreateStartupStep2 } from '@validators/createStartup';
import { Startup } from 'interfaces/startups';
import {  useForm } from 'react-hook-form';
import { StartupsContext } from 'contexts/Startups';
import {  useContext } from 'react';
import { FooterCustom } from '../Footer';
import {
  Container,
  Footer,
  Content,
} from './styles';
import { TextArea } from './TextArea';



export function DescriptionModal() {
  const { createStartupStep } = useContext(StartupsContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Startup>({
    resolver: yupResolver(yupValidateCreateStartupStep2),
  });

  const inputs = [
    {
      id: 1,
      label: 'Site',
      placeholder: 'www.startup.com',
      register: register('url'),
      error: errors.url?.message,
    },
    {
      id: 2,
      label: 'Rede social principal',
      placeholder: 'linkedin.com/in/startup',
      register: register('linkedIn'),
      error: errors.linkedIn?.message,
    },
    {
      id: 3,
      label: 'Email da Startup*',
      placeholder: 'startup@example.com',
      register: register('email'),
      error: errors.email?.message,
    },
  ];

  const handleForm = (startupData: Startup) => {
    createStartupStep(startupData);
  };

  return (
    <Container onSubmit={handleSubmit(handleForm)}>
      <Content>
        <TextArea
          placeholder="Um breve histórico da startup, dos serviços ou produtos oferecidos.."
          label='Descrição da Startup'
          error={errors.description?.message}
          {...register('description')}
        />
        {inputs.map(({ id, label, placeholder, register, error }) => (
          <Input
            key={id}
            label={label}
            placeholder={placeholder}
            {...register}
            error={error}
          />
        ))}
      </Content>
      <FooterCustom label="Continuar" type="submit" />
    </Container>
  );
}
