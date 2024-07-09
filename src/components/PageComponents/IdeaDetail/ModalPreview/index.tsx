/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Modal, ModalContent, HeaderModal, FooterModal } from '../styles';

export function FilesDetails({
  file,
  close,
}: {
  file?: string;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loadError, setLoadError] = useState(false);
  const handleIframeError = () => {
    setLoadError(true);
  };

  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const valid = validExtensions.some((ext) => file?.includes(ext));


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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          {valid ? (
            <Image src={file} 
              width={400}
              height={400} 
              style={{
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              alt="file" 
            />
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
          {loadError && (
            <div>
              <span>Erro ao carregar o arquivo</span>
            </div>
          )}
        </div>
        <FooterModal>
          <Link href={file} target="_blank" rel="noreferrer">
            Download
          </Link>
        </FooterModal>
      </ModalContent>
    </Modal>
  );
}
