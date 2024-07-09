import { Input } from '@components/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateEditUser } from '@validators/user';
import { AuthContext } from 'contexts/AuthContext';
import { UserContext } from 'contexts/User';
import { Area } from 'interfaces/areas';
import { Departament } from 'interfaces/departament';
import { SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import { User } from 'interfaces/user';
import { NewSelect } from '@components/NewSelect';
import { ButtonAction, Form, ModalAddUser, Background } from './styles';

interface EditUserProps {
  setIsModalAddUserOpen: React.Dispatch<SetStateAction<boolean>>;
  departaments: Departament[];
  areas: Area[];
}

export function EditUser({
  setIsModalAddUserOpen,
  departaments,
  areas,
}: EditUserProps): JSX.Element {
  const { user, updateMe } = useContext(AuthContext);
  const { getUser } = useContext(UserContext);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(yupValidateEditUser),
    defaultValues: {
      ...user,
      areaId: areas.find(area => area.id === user.areaId)?.name || 'default',
      departamentId:
        departaments.find(departament => departament.id === user.departamentId)
          ?.name || 'default',
    },
  });

  const handleSubmitUser = async (data: User) => {
    const { id, name, email, areaId, departamentId } = data;
    const newUser = { id, name, email };

    const areaIdFind = areas.find(area => area.name === areaId);
    const departamentIdFind = departaments.find(
      departament => departament.name === departamentId
    );

    Object.assign(
      newUser,
      areaId && { areaId: areaIdFind?.id },
      departamentId && { departamentId: departamentIdFind?.id }
    );

    await updateMe(newUser);
    await getUser();
    setIsModalAddUserOpen(false);
  };

  return (
    <Background>
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
            <Input
              name="name"
              placeholder="Nome"
              label="Nome"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              name="email"
              label="Email"
              disabled={!!user?.email}
              placeholder="Email"
              error={errors.email?.message}
              {...register('email')}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}
            >
              <NewSelect
                label="Área / Unidade do Negócio"
                options={areas}
                name="areaId"
                error={errors.areaId?.message}
                {...register('areaId')}
              />
            </div>
            <NewSelect
              label="Departamento"
              options={departaments}
              name="departamentId"
              error={errors.departamentId?.message}
              {...register('departamentId')}
            />
          </div>

          <ButtonAction id="green" type="submit">
            <span>Salvar</span>
          </ButtonAction>
        </Form>
      </ModalAddUser>
    </Background>
  );
}
