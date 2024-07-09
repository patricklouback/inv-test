import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const SelectOptionWrapper = styled.div<{
  height?: string;
  width?: string;
}>`
  font-weight: 500;
  font-size: 1.6rem;
  color: ${props => props.theme.colors.font};
  display: flex;
  width: ${props => props.width || '100'}%;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: ${props => props.height || '56px'};
  min-height: ${props => props.height || '56px'};

  select {
    padding: 0 10px;
    height: ${props => props.height || '56px'};
    min-height: ${props => props.height || '56px'};
    color: ${({ theme }) => theme.colors.font};
    outline: 0;
    width: 100%;

    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${props => props.theme.colors.borders};
    font-size: 1rem;

    &:disabled {
      color: ${props => props.theme.colors.borders};
    }

    &:focus {
      border: 2px solid ${props => props.theme.colors.primary[styleSlug]};
    }

    &::placeholder {
      color: #2d374899;
    }
  }
`;
