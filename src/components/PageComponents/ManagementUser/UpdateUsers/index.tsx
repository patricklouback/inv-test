import { Input } from '@components/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateAddUser } from '@validators/user';
import { AdmContext, ICreateUserDTO } from 'contexts/Adm';
import { Area } from 'interfaces/areas';
import { Departament } from 'interfaces/departament';
import { UserUpdate } from 'interfaces/user';
import { SetStateAction, useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';

import {
  AdminContainer,
  AdminTypeTip,
  ButtonAction,
  CheckboxInput,
  CheckboxWrapper,
  Form,
  Label,
  ManagerContainer,
  ManagerTypeTip,
  ModalUpdate,
  Select,
  UserImage,
  UserType,
  UserTypeTooltip,
} from './styles';

interface UpdateUsersProps {
  setIsModalUpdateOpen: React.Dispatch<SetStateAction<boolean>>;
  areas: Area[];
  departaments: Departament[];
  user: UserUpdate;
}

export function UpdateUsers({
  setIsModalUpdateOpen,
  areas,
  departaments,
  user,
}: UpdateUsersProps): JSX.Element {
  const { getUsers, editUser } = useContext(AdmContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(yupValidateAddUser),
    defaultValues: {
      name: user.name,
      email: user.email,
      registration: user.registration ?? '',
      areaId: user.areaId ?? '',
      departamentId: user.departamentId ?? '',
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      password: '',
    },
  });

  const handleSubmitUser = useCallback(
    async values => {
      const hasEmail = values.email !== '';
      const hasRegistration = values.registration !== '';
      const hasPassword = values.password !== '';

      const emptyArea =
        values.areaId === '' ||
        values.areaId === null ||
        values.areaId === undefined;

      const emptyDept =
        values.departamentId === '' ||
        values.departamentId === null ||
        values.departamentId === undefined;

      if (!hasEmail && !hasRegistration) {
        toast.warning(
          'Insira um email ou matrícula para poder enviar as alterações'
        );
        return;
      }

      if (!hasPassword && hasRegistration) {
        toast.warning(
          'Se houver matrícula a redefinição da senha é obrigatória, apague a matrícula para continuar, ou redefina a senha.'
        );
        return;
      }

      if (emptyArea) {
        toast.warning('Selecione uma área para poder enviar as alterações');
        return;
      }

      if (emptyDept) {
        toast.warning(
          'Selecione um departamento para poder enviar as alterações'
        );
        return;
      }
      setIsLoading(true);

      const data: ICreateUserDTO = {
        name: values.name,
        areaId: values.areaId,
        departamentId: values.departamentId,
        email: values.email === '' ? undefined : values.email,
        registration:
          values.registration === '' ? undefined : values.registration,
        password: values.password === '' ? undefined : values.password,
        isAdmin: values.isAdmin,
        isManager: values.isManager,
      };
      try {
        await editUser(user.id, data);
        await getUsers();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsModalUpdateOpen(false);
      }
    },
    [editUser, setIsModalUpdateOpen, getUsers, user]
  );

  const handleChangeCheckbox = useCallback(
    name => {
      const checkState = watch(name);

      if (checkState) {
        setValue(name, false);
      } else {
        setValue(name, true);
      }
    },
    [watch, setValue]
  );

  return (
    <ModalUpdate>
      <div className="exit">
        <IoIosClose
          size={33}
          style={{ cursor: 'pointer' }}
          onClick={() => setIsModalUpdateOpen(false)}
        />
      </div>
      <div className="content">
        <div className="info-user">
          <div className="img">
            <UserImage
              src={user.image ? user.image : 'https://via.placeholder.com/100'}
              alt="Imagem do usuário"
            />
          </div>
          <div className="data">
            <p>{user.name}</p>
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit(handleSubmitUser)}>
        <div>
          <Label>Nome</Label>
          <Input
            name="name"
            placeholder="Nome"
            {...register('name')}
            error={errors?.name?.message}
          />
          <Label>Email</Label>
          <Input
            name="email"
            placeholder="Email"
            {...register('email')}
            error={errors?.email?.message}
          />
          <Label>Matrícula</Label>
          <Input
            name="registration"
            placeholder="Matrícula"
            {...register('registration')}
            error={errors?.registration?.message}
          />

          <Label>Senha Temporária</Label>
          <Input
            name="password"
            type="password"
            placeholder="******"
            {...register('password')}
            error={errors?.password?.message}
          />
          <Label>Área / Unidade do Negócio</Label>
          <Select name="areaId" {...register('areaId')}>
            <option value="">Selecione</option>
            {areas.map(area => (
              <option value={area.id}>{area.name}</option>
            ))}
          </Select>
          <Label>Departamento</Label>
          <Select name="departamentId" {...register('departamentId')}>
            <option value="">Selecione</option>
            {departaments.map(departament => (
              <option value={departament.id}>{departament.name}</option>
            ))}
          </Select>
          <UserType>
            <AdminContainer>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  {...register('isAdmin')}
                  checked={watch('isAdmin')}
                  onChange={() => handleChangeCheckbox('isAdmin')}
                />
                <span>Administrador</span>
              </CheckboxWrapper>
              <AdminTypeTip>
                <AiOutlineQuestionCircle color="black" />
                <UserTypeTooltip>
                  Administrador tem acesso à gestão dos usuários e a
                  configuração da plataforma.
                </UserTypeTooltip>
              </AdminTypeTip>
            </AdminContainer>
            <ManagerContainer>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  {...register('isManager')}
                  checked={watch('isManager')}
                  onChange={() => handleChangeCheckbox('isManager')}
                />
                <span>Gerente</span>
              </CheckboxWrapper>
              <ManagerTypeTip>
                <AiOutlineQuestionCircle color="black" />
                <UserTypeTooltip>
                  Gestor da plataforma tem acesso ao banco de iniciativas e
                  painel de gestão.
                </UserTypeTooltip>
              </ManagerTypeTip>
            </ManagerContainer>
          </UserType>
        </div>

        <ButtonAction id="green" type="submit" disabled={isLoading}>
          <span>{isLoading ? 'Salvando...' : 'Editar Usuários'}</span>
        </ButtonAction>
      </Form>
    </ModalUpdate>
  );
}
