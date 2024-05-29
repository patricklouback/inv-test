import { Input } from '@components/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateAddUser } from '@validators/user';
import { AdmContext, ICreateUserDTO } from 'contexts/Adm';
import { Area } from 'interfaces/areas';
import { Departament } from 'interfaces/departament';
import { UserUpdate } from 'interfaces/user';
import { SetStateAction, useCallback, useContext, useEffect } from 'react';
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
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
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
      await editUser(user.id, data);
      await getUsers();
      setIsModalUpdateOpen(false);
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

  const handleSubmitButtonClick = useCallback(() => {
    const checkArea = watch('areaId');
    const checkDept = watch('departamentId');

    if (checkArea === null || checkArea === '') {
      toast.warning('Selecione uma área para poder enviar as alterações');
    }

    if (checkDept === null || checkDept === '') {
      toast.warning(
        'Selecione um departamento para poder enviar as alterações'
      );
    }
  }, []);

  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('registration', user.registration);
    setValue('areaId', user.areaId);
    setValue('departamentId', user.departamentId);
    setValue('isAdmin', user.isAdmin);
    setValue('isManager', user.isManager);
  }, [setValue, user]);

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

        <ButtonAction
          id="green"
          type="submit"
          onClick={handleSubmitButtonClick}
        >
          <span>Editar Usuários</span>
        </ButtonAction>
      </Form>
    </ModalUpdate>
  );
}
