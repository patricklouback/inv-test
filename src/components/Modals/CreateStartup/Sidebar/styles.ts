import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Container = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 40%;
  border-right: 2px solid #d9d9d9;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 1.5rem 1rem 0;
  gap: 1rem;
`;
export const RowMap = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 68px;
  padding: 0 1rem;
  border-radius: 8px;
  border: none;
  background-color: ${({ $active }) => $active ? '#47009A0D' : 'transparent'};
  box-shadow: ${({ $active }) => $active ? "box-shadow: 0px 4px 4px 0px '#0000000D'" : 'none'};
    cursor: default;
`;

export const Title = styled.h3<{ $active?: boolean }>`
  font-size: 20px;
  width: 100%;
  color: ${({ $active, theme }) => $active ? theme.colors.primary[styleSlug] : '#525556'};
  font-weight: 500;
  text-align: start;
`;
