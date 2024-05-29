import { SelectHTMLAttributes } from 'react';
import { SelectOptionWrapper } from './styles';

interface OptionsProps {
  value: string;
  name: string;
}

interface SelectOptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: OptionsProps[];
  name: string;
  height?: string;
  width?: string;
}

export function SelectOption({
  name,
  options,
  height,
  width,
  ...rest
}: SelectOptionsProps): JSX.Element {
  return (
    <SelectOptionWrapper height={height} width={width}>
      <select name={name} {...rest}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </SelectOptionWrapper>
  );
}
