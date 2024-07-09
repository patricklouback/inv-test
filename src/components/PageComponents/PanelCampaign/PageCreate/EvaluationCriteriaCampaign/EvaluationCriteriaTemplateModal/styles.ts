import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 2rem;
  padding: 1rem 0;
`;

export const Description = styled.h3`
  font-size: 1.1rem;
  font-weight: 300;
  padding: 0.5rem 0 0;
`;

export const Subtitle = styled.h2`
  font-size: 1.3rem;
  padding: 1.5rem 0 0;
`;

export const Content = styled.div`
  padding: 10px 20px;
  margin-bottom: 20px;
  max-height: 250px;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
    border-radius: 10px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
`;
