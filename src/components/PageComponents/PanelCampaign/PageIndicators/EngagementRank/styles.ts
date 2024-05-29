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

export const EngagementTitle = styled.div`
  display: flex;
  font-size: 0.9rem;
  align-items: center;
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
  gap: 15px;
`;

export const IdeasCounterTitle = styled.div`
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 0.9rem;
`;

export const IdeasCounterNumber = styled.div`
  color: ${({ theme }) => theme.colors.greenLive};
  font-weight: 600;
  font-size: 0.9rem;
`;

export const UserNameAndPoints = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Icon = styled.div`
  margin-right: 18px;
`;

export const ItemImageUser = styled.div<{ images_users: string }>`
  border-radius: 8px;
  overflow: hidden;
  background-image: url(${({ images_users }) => images_users});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-top: 5px;

  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.background};

  :first-child {
    margin-left: 0px;
  }

  margin-left: -14px;
`;

export const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const UserPoints = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.fontGrey};
`;

