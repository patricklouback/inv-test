import { DropFileComponent } from '@components/DropFile';
import { AdmContext } from 'contexts/Adm';
import { SetStateAction, useContext, useState } from 'react';
import { IoIosClose, IoMdDownload } from 'react-icons/io';
import { RiUploadCloudLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { ModalRegister, ButtonAction } from './styles';

interface UploadUsersProps {
  setIsModalRegisterOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function UploadUsers({
  setIsModalRegisterOpen,
}: UploadUsersProps): JSX.Element {
  const { importCSV } = useContext(AdmContext);

  const [file, setFile] = useState();
  const onSubmitRegister = async (e): Promise<void> => {
    e.preventDefault();

    if (file?.type === 'text/csv') {
      const formData = new FormData();
      formData.append('file', file);

      await importCSV(formData);

      setIsModalRegisterOpen(false);
    } else {
      toast.warn('O arquivo deve ser um CSV');
      setIsModalRegisterOpen(false);
    }
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

      <div className="content">
        <p>
          Para cadastrar os usuários faça o upload do arquivo .CSV modelo com os
          dados.
        </p>

        <div className="download">
          <IoMdDownload size={24} />
          <span>Download Arquivo Padrão</span>
        </div>
        <div className="upload">
          <span>Upload Cadastro de Usuários</span>
          <form onSubmit={onSubmitRegister}>
            <DropFileComponent
              text_content="Arraste o arquivo CSV com os usuários para cadastro aqui."
              name="files"
              setValue={(name, fileUploaded) => setFile(fileUploaded)}
              accept=".csv"
            />
            <ButtonAction id="green" type="submit">
              <RiUploadCloudLine size={30} />
              <span>Upload Usuarios</span>
            </ButtonAction>
          </form>
        </div>
      </div>
    </ModalRegister>
  );
}
