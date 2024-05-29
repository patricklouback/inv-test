import { Checkbox } from '@components/Checkbox';
import { Input } from '@components/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateAddUser } from '@validators/user';
import { AdmContext, ICreateUserDTO } from 'contexts/Adm';
import { Area } from 'interfaces/areas';
import { Departament } from 'interfaces/departament';
import { SetStateAction, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
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
  const {
    formState: { errors },
    register,
    getValues,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(yupValidateAddUser),
  });

  const handleSubmitUser = useCallback(
    async values => {
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
      await createUser(data);
      await getUsers();
      setIsModalAddUserOpen(false);
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
            errors={errors}
            register={register}
            name="name"
            placeholder="Nome"
          />

          <Label>Email</Label>
          <Input
            errors={errors}
            register={register}
            name="email"
            placeholder="Email"
          />

          <Label>Matrícula</Label>
          <Input
            errors={errors}
            register={register}
            name="registration"
            placeholder="Matrícula"
          />

          <Label>Senha Temporária</Label>
          <Input
            errors={errors}
            register={register}
            name="password"
            placeholder="******"
            type="password"
          />

          <Label>Área / Unidade do Negócio</Label>
          <Select name="areaId" {...register('areaId')} error={errors.areaId}>
            <option value="">Selecione</option>
            {areas.map(area => (
              <option value={area.id}>{area.name}</option>
            ))}
          </Select>

          <Label>Departamento</Label>
          <Select
            name="departamentId"
            {...register('departamentId')}
            error={errors.areaId}
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

        <ButtonAction id="green" type="submit">
          <span>Adicionar Usuarios</span>
        </ButtonAction>
      </Form>
    </ModalAddUser>
  );
}
