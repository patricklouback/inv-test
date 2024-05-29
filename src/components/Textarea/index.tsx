import React, { useRef } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import { useTheme } from 'styled-components';
import TextareaMarkdown, {
  TextareaMarkdownRef,
} from 'textarea-markdown-editor';
import { DATA_ACTIONS } from './actions';
import { Container, ErrorText, Item } from './styles';

interface TextareaParams
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  placeholder?: string;
  cols?: number;
  rows?: number;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: Record<string, string>
  mark?: boolean;
  errors?: FieldErrors;
}

export function Textarea({
  cols,
  rows,
  name,
  registerOptions,
  register,
  mark,
  errors,
  ...props
}: TextareaParams) {
  const ref = useRef<TextareaMarkdownRef>(null);
  const { colors } = useTheme();

  const renderButtonAction = (
    onClick: () => void,
    title: string,
    value: JSX.Element | string
  ) => {
    return (
      <button
        disabled={props?.disabled}
        title={title}
        type="button"
        onClick={onClick}
      >
        <strong>{value}</strong>
      </button>
    );
  };

  return mark ? (
    <Container datatype={name}>
      <div className="actions">
        {DATA_ACTIONS.map(item => (
          <small key={item.id}>
            {renderButtonAction(
              () => ref.current?.trigger(item.type),
              item.title,
              item.value
            )}
          </small>
        ))}
      </div>

      <TextareaMarkdown
        className="textarea"
        id="input__"
        ref={ref}
        {...props}
      />

      {errors && Object.entries(errors).length !== 0 && (
        <ErrorText>
          {Object.entries(errors).map(
            item =>
              item[0] === name && (
                <>
                  <BiErrorCircle color={colors.notification.error} size={22} />
                  {item[1].message}
                </>
              )
          )}
        </ErrorText>
      )}
    </Container>
  ) : (
    <>
      <Item
        id="input__"
        {...(register && { ...register(name, registerOptions) })}
        {...props}
        rows={rows}
      />
      {errors && Object.entries(errors).length !== 0 && (
        <ErrorText>
          {Object.entries(errors).map(
            item =>
              item[0] === name && (
                <>
                  <BiErrorCircle color={colors.notification.error} size={22} />
                  {item[1].message}
                </>
              )
          )}
        </ErrorText>
      )}
    </>
  );
}
