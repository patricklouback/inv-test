import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Draft = styled.div`
  /* margin-left: 10px; */
  width: 100%;
  margin-top: 20px;
`;

export const Text = styled.p`
  font-size: 15px;
  margin-left: 8px;
  margin-bottom: 4px;
`;

export const CustomInput = styled.input<{ height: string }>`
  font-weight: 500;
  color: ${props => props.theme.colors.font};
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: ${({ height }) => height || '64px'};
  min-height: 64px;

  padding: 0 10px;
  outline: 0;
  width: 100%;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${props => props.theme.colors.borders};
  font-size: 1rem;

  & + input {
    margin-left: 8px;
  }

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary[styleSlug]};
  }
  &::placeholder {
    color: #2d374899;
  }
`;

export const InputsContent = styled.div`
  margin-top: 60px;
  width: 100%;
`;

export const ButtonBackAndApprove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
