import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiUploadCloudLine } from 'react-icons/ri';
import { CgFileRemove } from 'react-icons/cg';
import { UseFormRegister, FieldValues } from 'react-hook-form';
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
  register?: UseFormRegister<FieldValues>;
  name: string;
  id?: string;
  setValue: (name: string, acceptedFile: string | File) => void;
  text_content?: string;
  accept?: string;
  defaultValue?: string;
}

export const DropImageComponent = ({
  register,
  name,
  setValue,
  text_content,
  accept,
  defaultValue,
}: DropFileProps) => {
  const [preview, setPreview] = useState<string>();
  const { getRootProps, getInputProps, acceptedFiles, isDragAccept } =
    useDropzone({ accept: accept ?? 'image/*' });

  useEffect(() => {
    setValue(name, acceptedFiles[0]);
    if (acceptedFiles.length > 0) {
      const file = URL.createObjectURL(acceptedFiles[0]);
      return setPreview(file);
    }
    return setPreview(defaultValue);
  }, [acceptedFiles, defaultValue]);

  return (
    <Container datatype="image">
      <AreaDrop {...getRootProps()}>
        <input
          type="file"
          {...(register && { ...register(name) })}
          {...getInputProps()}
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
          {preview && (
            <FilePreviewContainer>
              <PreviewImage preview={preview} title="preview" />
              <RemoveFileButton type="button" onClick={() => setPreview('')}>
                <CgFileRemove size={20} />
                <p>Remover Arquivo</p>
              </RemoveFileButton>
            </FilePreviewContainer>
          )}
        </AreaText>
      </AreaDrop>
    </Container>
  );
};
