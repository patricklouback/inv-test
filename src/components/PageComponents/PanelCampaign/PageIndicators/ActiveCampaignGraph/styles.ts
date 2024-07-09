import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

export const GraphContainer = styled.div`
  width: 100%;
`;

export const GraphFilterBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.7rem;
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 16px;
  justify-content: space-between;
  margin-bottom: 2rem;
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
`;

export const ButtonFilter = styled.button`
  width: auto;
  display: flex;
  align-items: center;
  border: none;
  gap: 1rem;
  background-color: #f6f6f8;
`;

export const ButtonContainer = styled.div`
  position: relative;
  margin-right: 1rem;
`;

export const Arrow = styled.div<{ selected?: boolean }>`
  position: absolute;
  bottom: -1px;
  right: -12px;
  display: flex;
  justify-content: center;
  align-items: center;

  transform: rotateZ(0deg);
  transition: 0.4s ease;
  ${({ selected }) =>
    selected &&
    css`
      transform: rotateZ(-180deg);
    `}
`;

export const ErrorText = styled.small`
  color: ${props => props.theme.colors.notification.error};
  font-size: 1rem;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 14px;

  svg {
    margin-right: 10px;
  }
`;

export const TitleFilterBar = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Balloon = styled.div`
  &::after {
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

export const ArrowInDate = styled.div<{ selected?: boolean }>`
  position: absolute;
  top: 64px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  transform: rotateZ(0deg);
  transition: 0.4s ease;
  ${({ selected }) =>
    selected &&
    css`
      transform: rotateZ(-180deg);
    `}
`;

export const ArrowInDate2 = styled.div<{ selected?: boolean }>`
  position: absolute;
  top: 130px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  transform: rotateZ(0deg);
  transition: 0.4s ease;
  ${({ selected }) =>
    selected &&
    css`
      transform: rotateZ(-180deg);
    `}
`;

export const ToggleFilters = styled.div<{ isArea?: boolean }>`
  position: absolute;
  top: 146%;
  right: -5px;
  z-index: 100;

  width: 200px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borders};
  padding-bottom: 5px;
`;

export const WapperTitleFilter = styled.div`
  width: 100%;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryLight[styleSlug]};
  margin-bottom: 5px;

  strong {
    font-size: 15px;
    padding: 1rem;
  }
`;

export const FilterContainer = styled.div`
  position: relative;
`;
export const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .datePicker {
    min-height: 56px;
    outline: 0;
    width: 70%;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${props => props.theme.colors.borders};
    padding: 0 1rem;

    margin: 5px 1.8rem;
  }

  @media screen and (max-width: 980px) {
    flex-direction: column;
    justify-content: space-between;
    height: auto;
  }
`;
