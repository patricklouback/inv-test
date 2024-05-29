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
  isDark?: boolean;
  border?: string;
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
  isDark,
  border,
  ...rest
}: ButtonProps) {
  return (
    <ButtonWrapper
      isDark={isDark === undefined ? true : isDark}
      right={right}
      margin_vertical={margin_vertical}
      background={background}
      margin_horizontal={margin_horizontal}
      max_width={max_width}
      center={center}
      color={color}
      hover={hover}
      border={border}
      {...rest}
    >
      {loading ? (
        <div>
          <div className="donut" />
        </div>
      ) : (
        <>
          <Value>{children}</Value>
          {icon}
        </>
      )}
    </ButtonWrapper>
  );
}
