import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Container = styled.div`
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;
`;

export const Title = styled.h3`
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const Value = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const StepsButton = styled.button`
  width: max-content;
  cursor: pointer;
  padding: 8px 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
  border: 1px solid ${({ theme }) => theme.colors.primary[styleSlug]};
  color: #ffffff;

  align-self: flex-end;

  //Typograph
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  font-family: 'Montserrat-Bold', sans-serif;

  //Transition
  transition: all;
  transition-duration: 250ms;

  &:hover,
  &:focus {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary[styleSlug]};
  }
`;
