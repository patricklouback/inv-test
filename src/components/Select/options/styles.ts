import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Container = styled.div`
  max-height: 300px;
  position: absolute;
  top: 62px;
  background: ${({ theme }) => theme.colors.background};

  width: 100%;
  z-index: 24;
  border: 2px solid ${({ theme }) => theme.colors.borders};
  border-radius: 8px;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
    border-radius: 5px;
  }
`;

export const List = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};
  padding: 7px 20px;
  cursor: pointer;
  transition: ease-out 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.greyLight};
  }

  &:last-child {
    border-bottom: 0;
    border-radius: 0 0 7px 7px;
  }

  &:nth-child(1) {
    border-radius: 7px 7px 0 0;
  }
`;
