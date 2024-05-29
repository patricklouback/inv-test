/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiUploadCloudLine } from 'react-icons/ri';
import { CgFileRemove } from 'react-icons/cg';
import { toast } from 'react-toastify';
import {
  Container,
  AreaDrop,
  AreaText,
  FilePreviewContainer,
  PreviewImage,
  RemoveFileButton,
  TextDropFile,
} from './styles';

interface DropFileProps {
  registerOptions?: any;
  register?: any;
  name: string;
  id?: string;
  text_content?: string;
  accept?: string;
  maxFiles: number;
  onFilesChange: (files: File[]) => void;
}

export const DropFileComponent: React.FC<DropFileProps> = ({
  register,
  name,
  text_content,
  accept,
  maxFiles,
  onFilesChange,
}): JSX.Element => {
  const [preview, setPreview] = useState<string>('');
  const [extension, setExtension] = useState<string>('');
  const [verifyBlob, setVerifyBlob] = useState<boolean>(false);
  const { getRootProps, getInputProps, acceptedFiles, isDragAccept, fileRejections } =
  useDropzone({maxFiles});

  const verifyIfIsImage = (extension): boolean => {
    let result;
    switch(extension) {
      case '.png' : result = true;
        break;
      case '.jpg' : result = true;
        break;
      case 'jpeg' : result= true;
        break;
      default: result = false;
    }
    return result;
  }

  useEffect(() => {
    onFilesChange(acceptedFiles);
    if (acceptedFiles.length > 0) {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      setVerifyBlob(true);
      setExtension(acceptedFiles[0].name.substring(acceptedFiles[0].name.length - 4));
    }
    if (fileRejections.length > 0) {
      toast.error(`O limite de arquivos permitido para envio é ${maxFiles}. Selecione novamente dentro do limite`, {autoClose: 7000})
    }
  }, [acceptedFiles]);

  return (
    <Container datatype="image">
      <AreaDrop {...getRootProps()}>
        <input
          accept={accept ?? 'image/*'}
          type="file"
          {...(register && { ...register(name) })}
          {...getInputProps()}
          multiple
        />
        <AreaText>
          {!preview && (
            <>
              {!isDragAccept && (
                <TextDropFile>
                  <RiUploadCloudLine size={24} />
                  {!text_content && (
                    <span>Arraste o arquivo de imagem aqui.</span>
                  )}
                  <span style={{ marginTop: 10 }}>
                    {text_content && text_content}
                  </span>
                </TextDropFile>
              )}
              {isDragAccept && <h3>SOLTE</h3>}
            </>
          )}
          {preview && verifyBlob && (
            <FilePreviewContainer>
              {acceptedFiles.length === 1 && acceptedFiles[0] 
                ? verifyIfIsImage(extension) 
                  ? <PreviewImage preview={preview} title="preview" /> 
                  : <ul>
                      {acceptedFiles.map((file) => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                : <ul>
                    {acceptedFiles.map((file) => (
                      <li key={file.name}>{file.name}</li>
                    ))}
                  </ul>
              }
              <RemoveFileButton type='button' onClick={() => {setPreview(''); setVerifyBlob(true)}}>
                <CgFileRemove size={20}/>
                <p>Remover Arquivos</p>
              </RemoveFileButton>
            </FilePreviewContainer>
          )}
        </AreaText>
      </AreaDrop>
    </Container>
  );
};
