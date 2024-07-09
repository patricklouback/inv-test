import React, { ButtonHTMLAttributes } from 'react';

import { ButtonWrapper, Value } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  icon?: any;
  max_width?: number;
  center?: boolean;
  margin_horizontal?: number;
  margin_vertical?: number;
  background?: string;
  color?: string;
  hover?: string;
  right?: boolean;
};

export default function Button({
  children,
  loading,
  icon,
  max_width,
  margin_horizontal,
  center = false,
  background,
  color,
  right,
  margin_vertical,
  hover,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <ButtonWrapper
      right={right}
      margin_vertical={margin_vertical}
      $background={background}
      margin_horizontal={margin_horizontal}
      max_width={max_width}
      $center={center}
      color={color}
      $hover={hover}
      {...rest}
    >
      {loading ? (
        <div>
          <div className="donut" />
        </div>
      ) : (
        <>
          {icon}
          <Value>{children}</Value>
        </>
      )}
    </ButtonWrapper>
  );
}
