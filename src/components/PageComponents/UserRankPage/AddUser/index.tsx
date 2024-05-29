import { Input } from '@components/InputText';
import { hotjar } from 'react-hotjar';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateAddUser } from '@validators/user';
import { AdmContext } from 'contexts/Adm';
import { Area } from 'interfaces/areas';
import { Departament } from 'interfaces/departament';
import { SetStateAction, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import { ButtonAction, Form, Label, ModalAddUser, Select } from './styles';

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
    handleSubmit,
  } = useForm({
    resolver: yupResolver(yupValidateAddUser),
  });

  const handleSubmitUser = useCallback(
    async values => {
      await createUser(values);
      await getUsers();
      setIsModalAddUserOpen(false);
      if (hotjar.initialized()) {
        hotjar.event('upload_user');
      } else {
        console.error('hotjar não inicializado corretamente');
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
          <span>Adicionar Usuarios</span>
        </ButtonAction>
      </Form>
    </ModalAddUser>
  );
}
