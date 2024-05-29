import { SetStateAction, useState } from 'react';
import { FaFileCsv } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import IconMicrosoft from '../../../../assets/inventta/microsoft.svg';
import { UploadUsersByCsvFile } from './UploadByCsvFile';
import { ButtonAction, Loadiing, ModalRegister } from './styles';

interface UploadUsersProps {
  setIsModalRegisterOpen: React.Dispatch<SetStateAction<boolean>>;
  setModalAddUserOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function UploadUsers({
  setIsModalRegisterOpen,
  setModalAddUserOpen,
}: UploadUsersProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadCsvForm, setShowUploadCsvForm] = useState(false);
  const handleUploadUsersByMicrosoft = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { status } = await api.get('/users/update-users');

      if (status !== 200) throw new Error('Não foi possível sincronizar');

      toast.success('Usuários Atualizados com sucesso!');
      setIsModalRegisterOpen(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Erro ao sincronizar com a Microsoft'
      );
    }
  };

  const renderComponents = (): JSX.Element => {
    if (isLoading) {
      return (
        <Loadiing>
          <div className="loading">
            <div />
            <div />
            <div />
          </div>
        </Loadiing>
      );
    }
    if (showUploadCsvForm)
      return (
        <UploadUsersByCsvFile setIsModalRegisterOpen={setIsModalRegisterOpen} />
      );

    return (
      <>
        <ButtonAction onClick={handleUploadUsersByMicrosoft}>
          <span>Sincronizar pela Microsoft</span>
          <IconMicrosoft id="icon" style={{ height: '20px' }} />
        </ButtonAction>
        <ButtonAction
          onClick={() => {
            setShowUploadCsvForm(true);
          }}
        >
          Upload por CSV
          <FaFileCsv id="icon" size={28} />
        </ButtonAction>
        <ButtonAction
        onClick={() => setModalAddUserOpen(true)}
        >
          <span>Adicionar Usuários</span>
        </ButtonAction>
      </>
    );
  };

  return (
    <ModalRegister>
      <div className="exit">
        <IoIosClose
          size={33}
          style={{ cursor: 'pointer' }}
          onClick={() => setIsModalRegisterOpen(false)}
        />
      </div>

      {renderComponents()}
    </ModalRegister>
  );
}
