import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface CardProps {
  color: 'green' | 'blue' | 'gray' | 'pink';
}

const cardColors = {
  green: `#16B4A9; border-radius: 12px`,
  blue: '#A3B2CD',
  gray: '#808080',
  pink: '#C3528E',
};

export const GlobalIndicatorsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const FilterBar = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.greyLight};
  padding: 0.875rem;
  border-radius: 12px;
  margin-bottom: 1.75rem;
  gap: 1rem;
`;

export const TitleFilterBar = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 1.25rem;
    line-height: 1.875rem;
  }
`;

export const ButtonFilter = styled.button`
  width: auto;
  display: flex;
  align-items: center;
  border: none;
  gap: 1rem;
  background-color: #f6f6f8;
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

export const ToggleFilters = styled.div<{ isArea?: boolean }>`
  position: absolute;
  top: 146%;
  right: -5px;
  z-index: 100;

  /* width: ${({ isArea }) => (isArea ? '400px' : '100%')}; */
  width: 200px;
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
  border: 1.4px solid ${({theme}) => theme.colors.primary[styleSlug]};
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    display: ${({ checked }) => (checked ? 'flex' : 'none')};
  }
`;

export const IndicatorsFilterContainer = styled.div`
  position: relative;
  margin-right: 1rem;
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

export const IndicatorCards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(186px, 1fr));
  margin-bottom: 2rem;
  gap: 1rem;
`;

// export const Graphs = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 25px;
//   max-width: 1039px;
//   gap: 1rem;
//   grid-template-columns: minmax(200px, 1fr);
//   padding-bottom: 4rem;

//   @media (min-width: 1200px) {
//     grid-template-columns: repeat(2, minmax(200px, 1fr));
//   }
// `;

export const Graphs = styled.div`
  display: grid;
  margin: 0px;
  max-width: 1039px;
  gap: 1rem;
  grid-template-columns: minmax(200px, 1fr);
  padding-bottom: 4rem;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
`;

export const Card = styled.div<CardProps>`
  width: 100%;
  height: 100%;
  //max-height: 120px;
  counter-increment: grid-item;
  border-radius: 12px;
  background: ${props => cardColors[props.color]};
  padding: 1rem 0.8rem 0.5rem 0.5rem;

  h2 {
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.125rem;
    text-align: right;
    color: #fff;
    margin-bottom: 1rem;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 3rem;
  img {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3.5rem;
    width: 4.5rem;
  }

  span {
    position: absolute;
    bottom: 12px;
    right: 0;
    display: inline-block;
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 4rem;
    line-height: 2rem;
    color: #fff;
  }

  .campaign-active {
    position: absolute;
    height: 4.5rem;
    bottom: -12px;
    left: -3px;
  }

  .campaign-waiting {
    bottom: -2px;
    left: -5px;
  }

  .campaign-paused {
    height: 4.5rem;
    bottom: -11px;
    left: -13px;
  }

  .campaign-done {
    height: 3.8rem;
    left: -8px;
  }
`;

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  padding-top: 10px;
`;
export const UnvailableFeatureWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;
