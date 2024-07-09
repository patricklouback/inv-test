import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const CheckboxContainer = styled.span``;

export const InvisibleCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
`;

export const VisibleCheckbox = styled.label<{ checked: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1rem;
  height: 1rem;

  border-radius: 0.15rem;
  border: 0.15rem solid
    ${({ checked, theme }) =>
      checked ? theme.colors.primaryLight[styleSlug] : theme.colors.grey};

  svg {
    display: ${({ checked }) => (checked ? 'flex' : 'none')};
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  flex-direction: row !important;
  gap: 0.5rem !important;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
