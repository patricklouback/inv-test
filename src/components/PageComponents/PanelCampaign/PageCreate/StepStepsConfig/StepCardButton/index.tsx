import { ButtonHTMLAttributes } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { StepCardButtonWrapper } from './styles';

interface StepCardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const StepCardButton = ({
  children,
  ...props
}: StepCardButtonProps): JSX.Element => {
  return (
    <StepCardButtonWrapper {...props} type="button">
      {children}
      <div>
        <FiChevronUp size={24} />
      </div>
    </StepCardButtonWrapper>
  );
};
