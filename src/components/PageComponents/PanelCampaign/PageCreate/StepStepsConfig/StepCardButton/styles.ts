import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface StepCardButtonProps {
  selected?: boolean;
}

export const StepCardButtonWrapper = styled.button<StepCardButtonProps>`
  margin: 1rem 0;
  height: 56px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  font-family: ${({ theme }) => theme.font.primary};
  color: ${({ theme }) => theme.colors.font};
  font-weight: 700;
  max-width: 200px;
  width: 100%;
  position: relative;

  > div {
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -10px;
    ${({ selected }) =>
      selected &&
      css`
        transform: rotate(180deg);
      `}
    color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme, selected }) =>
      selected ? theme.colors.primaryLight[styleSlug] : theme.colors.font};

    transition: transform 0.2s;
  }
`;
