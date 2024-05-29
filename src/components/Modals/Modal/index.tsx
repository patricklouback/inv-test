import React from 'react';
import { IoMdClose } from 'react-icons/io';
import SVGIcon from '../../../assets/inventta/ArrowRight.svg';
import {
  Container,
  Content,
  ExitModal,
  ModalHeader,
  SVGIconContent,
  Title,
} from './styles';

interface ModalProps {
  handle?: (value: boolean) => void;
  width?: string;
  height?: string;
  title?: string;
  hideCloseButton?: boolean;
  svgIcon?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  width,
  height,
  handle,
  title,
  hideCloseButton,
  svgIcon,
}): JSX.Element => {
  const [zIndex, setZIndex] = React.useState(99999);
  setTimeout(() => setZIndex(99999), 100);
  return (
    <Container zIndex={zIndex}>
      <Content width={width} height={height}>
        <ModalHeader>
          {title && (
            <Title>
              {svgIcon && (
                <SVGIconContent zIndex={zIndex}>
                  <SVGIcon />
                </SVGIconContent>
              )}
              {title}
            </Title>
          )}
          {!hideCloseButton && (
            <ExitModal onClick={() => handle(false)}>
              <IoMdClose size={25} />
            </ExitModal>
          )}
        </ModalHeader>
        {children}
      </Content>
    </Container>
  );
};
