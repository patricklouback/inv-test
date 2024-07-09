import Image, { StaticImageData } from 'next/image';
import { CSSProperties, ReactNode } from 'react';
import { ContentTourHome, P, Title } from './style';

interface CardProps {
  description: string;
  imageUrl?: string | StaticImageData;
  size?: 'lg' | 'md' | 'sm';
  title: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Card({
  description,
  imageUrl,
  size = 'md',
  title,
  children,
  style,
}: CardProps): JSX.Element {
  return (
    <ContentTourHome size={size} style={style}>
      {imageUrl && <Image alt="Logo" src={imageUrl} />}
      <Title size={size}>{title}</Title>
      <P size={size}>{description}</P>
      {children}
    </ContentTourHome>
  );
}
