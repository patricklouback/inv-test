/* eslint-disable react/button-has-type */
import { Input } from '@components/InputText';
import { BiErrorCircle, BiPlus } from 'react-icons/bi';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  yupValidateCreateStartupStep3,
  ValidateCreateStartupStep3,
} from '@validators/createStartup';
import { useFieldArray, useForm } from 'react-hook-form';
import { StartupsContext } from 'contexts/Startups';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { ErrorText } from '@components/InputText/styles';
import { useTheme } from 'styled-components';
import { RowInput } from '../InformationPage/styles';
import { Container } from './styles';
import { Content, Footer } from '../DescriptionPage/styles';
import { FooterCustom } from '../Footer';

export function SquadModal({ onClose }: { onClose: () => void }) {
  const { createStartupStep, createStartupFinish, cleanStartupStep } =
    useContext(StartupsContext);
  const { colors } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(yupValidateCreateStartupStep3),
    defaultValues: { startupMembers: [{ name: '', role: '' }] },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'startupMembers',
  });

  const handleForm = async ({ startupMembers }: ValidateCreateStartupStep3) => {
    try {
      await createStartupFinish(startupMembers)
      cleanStartupStep();
      onClose();
      toast.success('Startup criada com sucesso!');
    } catch (error) {
      onClose();
      cleanStartupStep()
      toast.error('Erro ao criar startup');
    }
  };

  const handleAddMember = () => {
    if (fields.length >= 4) {
      return;
    }
    append({ name: '', role: '' });
  };

  return (
    <Container onSubmit={handleSubmit(handleForm)}>
      <Content>
        {fields.map((field, index) => (
          <RowInput key={field.id}>
            <div style={{ width: '60%' }}>
              <Input
                label={`Membro ${index + 1}`}
                placeholder="Digite o nome"
                {...register(`startupMembers.${index}.name`)}
                error={errors.startupMembers?.[index]?.name?.message}
              />
            </div>
            <div style={{ width: '40%' }}>
              <Input
                placeholder="Digite o cargo"
                label="Digite o cargo"
                {...register(`startupMembers.${index}.role`)}
                error={errors.startupMembers?.[index]?.role?.message}
              />
            </div>
          </RowInput>
        ))}
        <ErrorText style={{ display: fields.length >= 4 ? 'block' : 'none' }}>
          <BiErrorCircle color={colors.notification.error} size={22} />
          Não é possível adicionar mais de 4 membros
        </ErrorText>

        <Footer>
          <button type="button" onClick={handleAddMember}>
            <BiPlus size={24} color="#849398" />
            Adicionar outros membros {fields.length}/4
          </button>
        </Footer>
      </Content>
      <FooterCustom label="Finalizar" type="submit" />
    </Container>
  );
}
