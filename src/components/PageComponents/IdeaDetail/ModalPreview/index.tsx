import React, { useState } from 'react';
import { Modal, ModalContent, HeaderModal, FooterModal } from '../styles';

export function FilesDetails({
  file,
  close,
}: {
  file: string;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loadError, setLoadError] = useState(false);
  const handleIframeError = () => {
    setLoadError(true);
  };


  return (
    <Modal>
      <ModalContent>
        <HeaderModal>
          <span>Pré-visualização do arquivo</span>
          <button type="button" onClick={() => close(false)}>
            X
          </button>
        </HeaderModal>
        <div className="fade-line" />
        {!file || loadError ? (
          <div className="no-file">
            <span>Arquivo não encontrado ou não pode ser exibido</span>
          </div>
        ) : (
          <iframe
            src={file}
            width="100%"
            height="100%"
            title="file"
            onError={handleIframeError}
            loading="lazy"
          />
        )}
        <FooterModal>
          <a href={file} target="_blank" rel="noreferrer">
            Download
          </a>
        </FooterModal>
      </ModalContent>
    </Modal>
  );
}
