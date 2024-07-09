import { Checkbox } from '@components/Checkbox';
import { Input } from '@components/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateAddUser } from '@validators/user';
import { AdmContext, ICreateUserDTO } from 'contexts/Adm';
import { Area } from 'interfaces/areas';
import { Departament } from 'interfaces/departament';
import { SetStateAction, useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import {
  AdminContainer,
  AdminTypeTip,
  ButtonAction,
  Form,
  Label,
  ManagerContainer,
  ManagerTypeTip,
  ModalAddUser,
  Select,
  UserType,
  UserTypeTooltip,
} from './styles';

interface AddUserProps {
  setIsModalAddUserOpen: React.Dispatch<SetStateAction<boolean>>;
  areas: Area[];
  departaments: Departament[];
}

export function AddUser({
  setIsModalAddUserOpen,
  areas,
  departaments,
}: AddUserProps): JSX.Element {
  const { createUser, getUsers } = useContext(AdmContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    register,
    getValues,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(yupValidateAddUser),
    defaultValues: {
      name: '',
      email: '',
      registration: '',
      areaId: '',
      departamentId: '',
      isAdmin: false,
      isManager: false,
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
        toast.warning('Insira um email ou matrícula para criar um usuário.');
        return;
      }

      if (!hasPassword && hasRegistration) {
        toast.warning(
          'Se houver matrícula a redefinição da senha é obrigatória, apague a matrícula para continuar, ou redefina a senha.'
        );
        return;
      }

      if (emptyArea) {
        toast.warning('Selecione uma área para poder criar um usuário.');
        return;
      }

      if (emptyDept) {
        toast.warning('Selecione um departamento para poder criar um usuário.');
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
        await createUser(data);
        await getUsers();
      } catch (error) {
        toast.error('Erro ao criar usuário');
      } finally {
        setIsLoading(false);
        setIsModalAddUserOpen(false);
      }
    },
    [createUser, setIsModalAddUserOpen, getUsers]
  );

  return (
    <ModalAddUser>
      <div className="exit">
        <IoIosClose
          size={33}
          style={{ cursor: 'pointer' }}
          onClick={() => setIsModalAddUserOpen(false)}
        />
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
          <Select
            name="areaId"
            error={!!errors?.areaId?.message}
            {...register('areaId')}
          >
            <option value="">Selecione</option>
            {areas.map(area => (
              <option value={area.id}>{area.name}</option>
            ))}
          </Select>

          <Label>Departamento</Label>
          <Select
            name="departamentId"
            error={!!errors?.departamentId?.message}
            {...register('departamentId')}
          >
            <option value="">Selecione</option>
            {departaments.map(departament => (
              <option value={departament.id}>{departament.name}</option>
            ))}
          </Select>

          <UserType>
            <AdminContainer>
              <Checkbox
                label="Administrador"
                name="isAdmin"
                register={register}
                getValues={getValues}
              />
              <AdminTypeTip>
                <AiOutlineQuestionCircle color="black" />
                <UserTypeTooltip>
                  Administrador tem acesso à gestão dos usuários e a
                  configuração da plataforma.
                </UserTypeTooltip>
              </AdminTypeTip>
            </AdminContainer>
            <ManagerContainer>
              <Checkbox
                label="Gestor"
                name="isManager"
                register={register}
                getValues={getValues}
              />
              <ManagerTypeTip>
                <AiOutlineQuestionCircle color="black" />
                <UserTypeTooltip>
                  Gestor da plataforma tem acesso ao banco de iniciativas e
                  painle de gestão.
                </UserTypeTooltip>
              </ManagerTypeTip>
            </ManagerContainer>
          </UserType>
        </div>

        <ButtonAction id="green" disabled={isLoading} type="submit">
          <span>{isLoading ? 'Criando usuário...' : 'Adicionar Usuario'}</span>
        </ButtonAction>
      </Form>
    </ModalAddUser>
  );
}
