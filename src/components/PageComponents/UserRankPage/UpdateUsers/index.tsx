import { Input } from '@components/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateAddUser } from '@validators/user';
import { AdmContext } from 'contexts/Adm';
import { Area } from 'interfaces/areas';
import { Departament } from 'interfaces/departament';
import { UserUpdate } from 'interfaces/user';
import { useEffect } from 'react';
import { SetStateAction, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';

import { ButtonAction, Form, Label, ModalUpdate, Select } from './styles';

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
  } = useForm({
    resolver: yupResolver(yupValidateAddUser),
  });

  const handleSubmitUser = useCallback(
    async values => {
      await editUser(user.id, values);
      await getUsers();
      setIsModalUpdateOpen(false);
    },
    [editUser, setIsModalUpdateOpen, getUsers, user]
  );

  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('areaId', user.areaId);
    setValue('departamentId', user.departamentId);
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
          <div className="img" />
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
        </div>

        <ButtonAction id="green" type="submit">
          <span>Editar Usuários</span>
        </ButtonAction>
      </Form>
    </ModalUpdate>
  );
}
