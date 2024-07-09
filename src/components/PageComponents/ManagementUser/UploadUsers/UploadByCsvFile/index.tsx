import { DropFileComponent } from '@components/DropFile';
import { AdmContext } from 'contexts/Adm';
import { SetStateAction, useContext, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { RiUploadCloudLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { ButtonAction, Container, Download } from './styles';

interface UploadUsersProps {
  setIsModalRegisterOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function UploadUsersByCsvFile({
  setIsModalRegisterOpen,
}: UploadUsersProps): JSX.Element {
  const { importCSV } = useContext(AdmContext);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitRegister = async (e): Promise<void> => {
    e.preventDefault();

    if (uploadedFiles[0]?.type === 'text/csv') {
      setIsLoading(true);

      await importCSV(uploadedFiles[0]);
      setIsLoading(false);

      setIsModalRegisterOpen(false);
    } else {
      toast.warn('O arquivo deve ser um CSV');
      setIsModalRegisterOpen(false);
    }
  };

  const downloadClick = (): void => {
    fetch('Inventta Users Example 1.csv').then(response => {
      response.blob().then(blob => {
        const fileUrl = window.URL.createObjectURL(blob);
        const alink = document.createElement('a');
        alink.href = fileUrl;
        alink.download = 'Inventta Users Example 1.csv';
        alink.click();
      });
    });
  };

  const handleFilesChange = (files: File[]): any => {
    setUploadedFiles(files);
  };

  return (
    <Container className="content">
      <p>
        Para cadastrar os usuários faça o upload do arquivo .CSV modelo com os
        dados.
      </p>

      <Download onClick={downloadClick}>
        <IoMdDownload size={24} />
        <span>Download Arquivo Padrão</span>
      </Download>
      <div className="upload">
        <span>Upload Cadastro de Usuários</span>
        <form onSubmit={onSubmitRegister}>
          <DropFileComponent
            text_content="Arraste o arquivo CSV com os usuários para cadastro aqui."
            name="files"
            // setValue={(name, fileUploaded) => setFile(fileUploaded)}
            accept=".csv"
            onFilesChange={handleFilesChange}
            maxFiles={1}
          />
          <ButtonAction id="green" type="submit" disabled={isLoading}>
            {isLoading ? (
              <FaSpinner size={30} />
            ) : (
              <>
                <RiUploadCloudLine size={30} />
                <span>Upload Usuarios</span>
              </>
            )}
          </ButtonAction>
        </form>
      </div>
    </Container>
  );
}
