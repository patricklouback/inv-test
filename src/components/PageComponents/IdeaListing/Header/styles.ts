import styled, { css } from 'styled-components';

export const WapperHeader = styled.header<{ size?: number }>`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 30px;

  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};

  ${({ size }) => {
    if (size <= 857) {
      return css`
        flex-direction: column;
        align-items: normal;
      `;
    }
  }}
`;

export const WapperTitleFilter = styled.div`
  width: 100%;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryLight};
  margin-bottom: 5px;

  strong {
    font-size: 15px;
    padding: 1rem;
  }
`;

export const StyledCheckboxContainer = styled.div`
  padding-left: 0.7rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  margin-bottom: 0.3rem;

  cursor: pointer;

  span {
    margin-top: 2px;
    display: inline-block;
  }

  label {
    min-width: 21px;
  }
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
`;

export const VisibleCheckbox = styled.label<{ checked: boolean }>`
  width: 21px;
  height: 21px;
  border-radius: 4px;
  border: 1.4px solid #47009a;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    display: ${({ checked }) => (checked ? 'flex' : 'none')};
  }
`;

export const ToggleFilters = styled.div<{ isArea?: boolean }>`
  position: absolute;
  top: 120%;

  z-index: 100;

  width: ${({ isArea }) => (isArea ? '400px' : '100%')};
  max-height: 200px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borders};
  padding-bottom: 5px;

  overflow-y: auto;

  @media (max-width: 715px) {
    width: 100%;
  }
`;

export const Balloon = styled.div`
  ::after {
    content: '';
    position: absolute;
    left: 20%;
    bottom: -19px;
    z-index: 200;
    width: 10px;
    height: 10px;
    background-color: #fff;
    transform: rotate(45deg);
    border-bottom: 2px solid transparent;
    border-top: 1.8px solid ${({ theme }) => theme.colors.borders};
    border-left: 1.8px solid ${({ theme }) => theme.colors.borders};
    border-right: 2px solid transparent;
  }
`;

export const WapperButtonsActions = styled.div<{ size?: number }>`
  display: flex;
  gap: 1rem;
  ${({ size }) => {
    if (size <= 541) {
      return css`
        flex-direction: column;
      `;
    }
  }}

  @media (max-width: 740px) {
    flex-direction: column;
  }
`;

export const ButtonContainer = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  max-width: 220px;
`;

export const FilterOptions = styled.div`
  position: absolute;
  top: 110%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  max-height: 200px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.borders};
  z-index: 100;
  overflow-y: auto;
`;

export const Button = styled.button<{ size?: number }>`
  padding: 0 10px;
  font-weight: 400;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  height: 3.5rem;

  border: none;
  outline: none;
  background: ${({ theme }) => theme.colors.secondaryLight2};
  color: ${({ theme }) => theme.colors.background};

  border-radius: 12px;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }

  ${({ size }) => {
    if (size <= 541) {
      return css`
        min-height: 56px;
        margin: 0;

        margin: 5px 0;

        :first-child {
          margin-top: 0;
        }

        :last-child {
          margin-bottom: 0;
        }
      `;
    }
  }}

  @media (max-width: 740px) {
    height: 2.5rem;
  }
`;

export const ValueButton = styled.p`
  width: 100%;
  white-space: nowrap;
`;

export const BoxIcons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  margin-right: 10px;

  width: 35px;

  display: flex;
  flex-direction: row;
  align-items: center;

  svg :last-child {
    position: absolute;
    right: -4px;
  }
`;

export const LabelNotification = styled.label<{ size?: number }>`
  display: flex;
  max-width: 290px;
  width: 100%;
  align-items: center;
  margin-left: 2rem;

  ${({ size }) => {
    if (size <= 857) {
      return css`
        margin-top: 30px;
      `;
    }
  }}
`;

export const SpanValueBox = styled.span`
  font-size: 15px;
  letter-spacing: 0.4px;
  user-select: none;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const InputCheckBox = styled.input`
  width: 17px;
  height: 17px;
  border-radius: 3px;

  margin-right: 10px;
`;

export const BadgeNotification = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: -20%;
  right: 20%;
  background-color: ${({ theme }) => theme.colors.terceary};
`;

export const WapperIconNotification = styled.div`
  position: relative;

  width: 22px;
  height: 22px;
  background: ${({ theme }) => theme.colors.borders};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3px;
  margin-right: 5px;
`;
