import { forwardRef } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { useTheme } from 'styled-components';
import { Select, Container, Label, ErrorText } from './styles';

type NewSelectProps = {
  label?: string;
  options: any[];
  onChange: (e: React.ChangeEvent<HTMLOptionElement>) => void;
  error?: string;
  keyOption?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const NewSelect = forwardRef<HTMLSelectElement, NewSelectProps>(
  ({ label, options = [], onChange, error, keyOption, ...props }, ref) => {
    const { colors } = useTheme();

    return (
      <Container>
        {label && <Label>{label}</Label>}
        <Select onChange={onChange} {...props} ref={ref} defaultValue="default">
          <option value="default" disabled>
            Selecione uma opção
          </option>
          {options.length > 0 &&
            options.map(option => (
              <option
                key={option.name}
                value={option[keyOption as string] || option.name}
              >
                {option[keyOption as string] || option.name}
              </option>
            ))}
        </Select>
        {error && (
          <ErrorText position>
            <BiErrorCircle color={colors.notification.error} size={22} />
            {error}
          </ErrorText>
        )}
      </Container>
    );
  }
);
