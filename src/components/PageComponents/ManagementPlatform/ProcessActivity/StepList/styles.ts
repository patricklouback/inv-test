import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const StepsWrapper = styled.div``;

export const Steps = styled.div<{ maxWidth: string }>`
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  display: flex;
  padding-bottom: 33px;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    height: 5px;
    border-radius: 5px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
    border-radius: 5px;
  }

  @media (max-width: 1200px) {
    max-width: 48rem;
  }

  @media (max-width: 1020px) {
    max-width: 42rem;
  }

  @media (max-width: 980px) {
    max-width: 58rem;
  }
`;

export const ListSteps = styled.ul`
  margin-top: 60px;
  list-style: none;

  display: flex;

  li {
  }
`;

export const NewStepButton = styled.button`
  border-radius: 12px;
  width: auto;
  height: 56px;
  border: 0;
  outline: none;
  background: ${({ theme }) => theme.colors.primaryPurple};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding: 0 1rem;
`;

export const NewStepButtonValue = styled.p`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;
