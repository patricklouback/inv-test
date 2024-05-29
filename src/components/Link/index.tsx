import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';

import { ButtonContainer } from './styles';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  link?: string;
  Icon?: any;
  value: string;
  background?: string;
  color?: string;
  height?: number;
  max?: number;
  center?: boolean;
  hover?: string;
  hoverWeigth?: number;
  hoverColor?: string;
  marginTop?: number;
  onClick?: () => void;
  idt?: string;
  isSelected?: boolean;
  disabled?: boolean;
  borderRadius?: number;
  borderStyle?: string;
  borderWidth?: number;
  borderColor?: string;
  noWrap?: boolean;
};

export default function ButtonLink({
  link,
  Icon,
  value,
  color,
  height = 56,
  max,
  background = 'font',
  center,
  marginTop,
  hover,
  hoverWeigth,
  hoverColor,
  onClick,
  idt,
  isSelected,
  disabled,
  borderRadius,
  borderStyle,
  borderWidth,
  borderColor,
  noWrap,
}: ButtonProps): JSX.Element {
  if (disabled) {
    return (
      <ButtonContainer
        onClick={null}
        className={idt}
        marginTop={marginTop}
        hover={hover}
        hoverWeigth={hoverWeigth}
        hoverColor={hoverColor}
        height={height}
        max={max}
        color={color}
        background={background}
        center={center}
        isSelected={isSelected}
        disabled
        borderRadius={borderRadius}
        borderStyle={borderStyle}
        borderWidth={borderWidth}
        borderColor={borderColor}
        noWrap={noWrap}
      >
        {Icon}
        {value}
      </ButtonContainer>
    );
  }

  if (link) {
    return (
      <Link href={link}>
        <ButtonContainer
          onClick={onClick}
          className={idt}
          marginTop={marginTop}
          hover={hover}
          hoverWeigth={hoverWeigth}
          hoverColor={hoverColor}
          height={height}
          max={max}
          color={color}
          background={background}
          center={center}
          isSelected={isSelected}
          borderRadius={borderRadius}
          borderStyle={borderStyle}
          borderWidth={borderWidth}
          borderColor={borderColor}
          noWrap={noWrap}
        >
          {Icon}
          {value}
        </ButtonContainer>
      </Link>
    );
  }

  return (
    <ButtonContainer
      className={idt}
      marginTop={marginTop}
      hover={hover}
      hoverWeigth={hoverWeigth}
      hoverColor={hoverColor}
      height={height}
      max={max}
      color={color}
      background={background}
      center={center}
      onClick={onClick}
      isSelected={isSelected}
      borderRadius={borderRadius}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      borderColor={borderColor}
      noWrap={noWrap}
    >
      {Icon}
      {value}
    </ButtonContainer>
  );
}
