/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { ErrorText, InputWrapper } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  placeholder?: string;
  fontSize?: string;
  width?: string;
  height?: number;
  name?: string;
  registerOptions?: Record<string, any>;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  Icon?: any;
  max_width?: number;
  font_size?: number;
  values?: string;
  setValue?: () => void;
  onChange?: ChangeEventHandler<any>;
  register?: UseFormRegister<any>;
  onFocus?: () => void;
  onBlur?: (e) => void;
  isPassword?: boolean;
}

export const Input = ({
  id,
  fontSize,
  width,
  height,
  errors,
  Icon,
  max_width,
  font_size,
  register,
  name,
  registerOptions,
  isPassword,
  ...props
}: InputProps) => {
  const { colors } = useTheme();

  const wrapperProps = {
    icon: Icon,
    fontSize,
    width,
    height,
    font_size,
    max: max_width,
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (): void => {
    setShowPassword(s => !s);
  };

  return (
    <label>
      <InputWrapper datatype={name} disable={props.disabled} {...wrapperProps}>
        {Icon && (
          <div id="icon_absolute">
            <Icon size={20} color={colors.fontLight} />
          </div>
        )}
        <input
          name={name}
          type={isPassword && !showPassword ? 'password' : 'default'}
          {...(register && { ...register(name || id, registerOptions) })}
          {...props}
        />
        {isPassword &&
          (showPassword ? (
            <RiEyeLine id="icon_absolute_eye" onClick={toggleShowPassword} />
          ) : (
            <RiEyeCloseLine
              id="icon_absolute_eye"
              onClick={toggleShowPassword}
            />
          ))}

        {errors && Object.entries(errors).length !== 0 && (
          <ErrorText>
            {Object.entries(errors).map(
              item =>
                item[0] === name && (
                  <>
                    <BiErrorCircle
                      color={colors.notification.error}
                      size={22}
                    />
                    {item[1].message}
                  </>
                )
            )}
          </ErrorText>
        )}
      </InputWrapper>
    </label>
  );
};
