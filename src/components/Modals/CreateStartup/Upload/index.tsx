import { useState } from 'react';
import { Modal } from '@components/Modals/Modal';
import { RiUploadCloudLine } from 'react-icons/ri';
import { DropFileComponent } from '@components/DropFile';
import { ButtonAction } from '@components/PageComponents/IdeaRepository/styles';
import { IoMdDownload } from 'react-icons/io';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useUploadForm } from 'hooks';
import { useTheme } from 'styled-components';
import { styleSlug } from 'utils/constants';
import { Container, Paragraph, Form, ProgressBar } from './styles';

export function UploadModal({ onClose }: { onClose: () => void }) {
  const { colors } = useTheme();
  const [file, setFile] = useState<File>();
  const { uploadForm, progress, setProgress } = useUploadForm('/startups/csv');

  const onSubmitRegister = async (e): Promise<void> => {
    e.preventDefault();
    try {
      if (file?.type === 'text/csv') {
        const formData = new FormData();
        formData.append('file', file);
        await uploadForm(formData);
        setTimeout(() => {
          onClose();
          toast.success('Upload feito com sucesso');
        }, 1000);
      } else {
        toast.warn('O arquivo deve ser um CSV');
      }
    } catch (error) {
      onClose();
      toast.error('Erro ao fazer upload do arquivo');
    }
  };

  return (
    <Modal
      width="600px"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      handle={onClose}
    >
      <Container>
        <Paragraph>
          Para cadastrar as startups, baixe o arquivo .CSV padrão, insira os
          dados e faça upload em seguida.
        </Paragraph>
        <Link
          href="/docs/base-startups.csv"
          target="_blank"
          download
          className="downloadLink"
        >
          <IoMdDownload size={24} color="#2d3748" />
          <span>Download Arquivo Padrão</span>
        </Link>
        <div className="upload">
          <span className="header-upload">Upload Cadastro de Startups</span>
          <Form onSubmit={onSubmitRegister}>
            <DropFileComponent
              text_content="Arraste aqui o arquivo .CSV com as startups para o cadastro."
              name="files"
              accept=".csv"
              onFilesChange={files => {
                setFile(files[0]);
                setProgress(0);
              }}
              maxFiles={1}
            />
            <div
              style={{
                width: '100%',
                backgroundColor: '#e0e0e0',
                marginTop: '10px',
              }}
            >
              <ProgressBar progress={progress} />
            </div>
            <ButtonAction
              id="green"
              type="submit"
              $backgr={colors.primary[styleSlug]}
              disabled={progress === 100}
            >
              <RiUploadCloudLine size={30} />
              <span>Upload Startups</span>
            </ButtonAction>
          </Form>
        </div>
      </Container>
    </Modal>
  );
}
