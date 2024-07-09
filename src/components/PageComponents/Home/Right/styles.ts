import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const ContentRight = styled.div`
  min-width: 438px;
  width: 100%;

  @media screen and (max-width: 1048px) {
    max-width: 100%;
  }

  @media screen and (max-width: 600px) {
    min-width: 100%;
  }
`;

export const Scroll = styled.div`
  height: 99rem;
  overflow-y: scroll;
  padding-right: 1rem;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border-radius: 4px;
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
  }

  .idea-skeleton {
    max-height: 250px;
    border-radius: 8px;
    margin-bottom: 1rem;
    height: 100%;
    width: 100%;
  }

  @media (max-width: 1048px) {
    margin-bottom: 2rem;
  }
`;

export const Base = styled.div`
  @media screen and (max-width: 510px) {
    display: none;
  }
`;

export const NoneIdeas = styled.span`
  display: block;
  text-align: center;
  width: 100%;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.fontDarkGrey};
`;
