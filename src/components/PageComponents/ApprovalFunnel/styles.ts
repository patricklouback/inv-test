import styled, { css } from 'styled-components';

interface FunnelProps {
  isOpened: boolean;
}

interface StyledComponentProps {
  isOpen: boolean;
}

export const C = styled.div`
  padding-bottom: 50px;
  padding-top: 15px;
`;

export const ListFunnel = styled.div<FunnelProps>`
  display: grid;
  gap: 1rem;
  //overflow-x: scroll;

  grid-template-columns: repeat(4, 1fr);

  justify-content: space-between;

  ${({ isOpened }) =>
    isOpened &&
    css`
      grid-template-columns: 1fr 3fr;
    `}
`;

export const ItemFunnel = styled.div`
  height: 100%;
  /* max-width: 288px; */
  /* display: flex; */
  /* flex: 1; */
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* flex: 1; */
  padding: 1rem;
  border-radius: 8px;
  /* flex-wrap: wrap; */
  gap: 10px;

  .card-skeleton {
    min-height: 400px;
    border-radius: 8px;
    flex: 1;
  }

  .card-skeleton-container {
    background-color: ${({ theme }) => theme.colors.greyLight};
    min-width: 280px;
    display: flex;
    /* flex: 1; */
    padding: 1rem;
    border-radius: 8px;
    /* flex-direction: column; */
    height: 100%;

    /* &:last-child {
      padding-right: 0;
    } */
  }
`;

export const Sections = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  flex: 1;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 28px 12px 24px;
  gap: 12px;

  max-width: 1224px;
  height: 60px;

  background: #f6f6f8;
  border-radius: 16px;

  margin-bottom: 16px;
  margin-top: 7px;
`;

export const SectionBanner = styled.div<StyledComponentProps>`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  height: 120px;
`;

export const BannerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding-left: 3%;
`;

export const BannerWrapperContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;
  align-items: center;
  height: 100%;
  max-width: 95%;
`;

export const BannerTitle = styled.div`
  font-weight: 600;
`;

export const BannerSubtitle = styled.div``;

export const Separator = styled.div`
  width: 2px;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.font};
  margin: 0 10px; /* Ajuste a margem conforme necessário */
  border-radius: 10px;
`;

export const GoToLink = styled.span`
  font-weight: 500;
  text-decoration: underline;
  min-width: 110px;
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`;

export const CloseButtonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 37px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.grey_hover};
  }
`;

export const SectionSubHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 12px;
  justify-content: space-between;
  align-items: center;
`;

export const Leftside = styled.div`
  display: flex;
  gap: 12px;
`;

export const LeftsideIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 6px;
  background-color: white;

  /* gap: 7.5px; */

  width: 36px;
  height: 36px;

  background: #ffffff;
  border-radius: 6px;
`;

export const LeftsideTitle = styled.h2`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;

  color: #2d3748;
`;

export const Rightside = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 275px;
  width: 44%;
`;

export const BackButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  cursor: pointer;
  max-width: 80px;

  span {
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
  }
`;

export const WapperInput = styled.label`
  width: 100%;
  max-width: 360px;
  position: relative;
  #icon {
    position: absolute;
    width: 50px;
    height: 100%;
    border-radius: 8px 0 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 640px) {
    max-width: unset;
  }
`;

export const InputSearch = styled.input`
  padding-left: 40px;
  width: 350px;
  height: 45px;
  outline: none;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.font};
  letter-spacing: 0.8px;
  &:disabled {
    color: ${({ theme }) => theme.colors.borders};
  }
  ::placeholder {
    font-size: 14px;
    letter-spacing: 0.4px;
    color: ${({ theme }) => theme.colors.fontLight};
    font-weight: normal;
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
