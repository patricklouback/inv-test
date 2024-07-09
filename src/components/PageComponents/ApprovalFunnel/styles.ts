import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface FunnelProps {
  isOpened: boolean;
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




