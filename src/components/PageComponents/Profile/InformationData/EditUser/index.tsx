import { Input } from '@components/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateAddUser } from '@validators/user';
import { AuthContext } from 'contexts/AuthContext';
import { UserContext } from 'contexts/User';
import { Area } from 'interfaces/areas';
import { Departament } from 'interfaces/departament';
import { SetStateAction, useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import { ButtonAction, Form, Label, ModalAddUser, Select } from './styles';

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
    setValue,
  } = useForm({
    resolver: yupResolver(yupValidateAddUser),
  });

  const handleSubmitUser = useCallback(
    async data => {
      await updateMe(data);
      await getUser();
      setIsModalAddUserOpen(false);
    },
    [getUser, setIsModalAddUserOpen, updateMe]
  );

  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('areaId', user.areaId);
    setValue('departamentId', user.departamentId);
  }, [setValue, user]);

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
          <span>Salvar</span>
        </ButtonAction>
      </Form>
    </ModalAddUser>
  );
}
