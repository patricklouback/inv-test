import styled, { css } from 'styled-components';

export const GraphContainer = styled.div`
  width: 100%;
`;

export const GraphFilterBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.7rem;
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 1rem;
  justify-content: space-between;
  margin-bottom: 0.5rem;
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

export const TitleFilterBar = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  h3 {
    font-size: 1rem;
    font-weight: 500;
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

export const RankingContainer = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.greyLight};
  max-height: 335px;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px ${({ theme }) => theme.colors.greyLight};
    border-radius: 4px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
`;

export const RankingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 1rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: solid 4px;
  border-bottom-color: ${({ theme }) => theme.colors.greyLight};
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 65%;
`;

export const RankNumber = styled.div`
  display: flex;
  height: 90px;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
`;

export const CampaignTitle = styled.div`
  max-width: 10rem;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RightSide = styled.div`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 38%;
`;

export const IdeasCounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IdeasCounterTitle = styled.div`
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 0.8rem;
`;

export const IdeasCounterNumber = styled.div`
  color: ${({ theme }) => theme.colors.greenLive};
  font-weight: 600;
  font-size: 0.9rem;
`;
