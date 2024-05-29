import { useState } from 'react';
import { UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { ImCheckmark } from 'react-icons/im';
import {
  CheckboxContainer,
  InvisibleCheckbox,
  CheckboxLabel,
  VisibleCheckbox,
} from './styles';

interface CheckboxProps {
  label: string;
  name: string;
  register?: UseFormRegister<any>;
  getValues?: UseFormGetValues<any>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  register,
  getValues,
  name,
}) => {
  const [isChecked, setIsChecked] = useState(getValues(name) || false);

  return (
    <CheckboxContainer>
      <CheckboxLabel onClick={() => setIsChecked(!isChecked)}>
        <InvisibleCheckbox type="checkbox" name={name} {...register(name)} />
        <VisibleCheckbox checked={getValues(name) || false}>
          <ImCheckmark size={12} />
        </VisibleCheckbox>
        <span>{label}</span>
      </CheckboxLabel>
    </CheckboxContainer>
  );
};
