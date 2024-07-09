import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  max-height: 40vh;
`;

export const Title = styled.h1`
  font-size: 2rem;
  padding: 1.2rem 0;
`;

export const SubTitle = styled.div`
  font-size: 1.3rem;
  padding: 1.2rem 0;
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  border: 0;
  width: 100%;
  height: 45px;
  outline: 0;
  max-width: 130px;
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.colors.background};
  padding: 0.8rem 1rem;
  background-color: ${({ theme }) => theme.colors.greenHipeLight};
  font-weight: 600;
  letter-spacing: 0.7px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greenLimao};
  }

  &:last-child {
    margin-left: auto;
  }
`;

export const CampaignsOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export const ChecboxContainer = styled.div<{ checked: boolean }>`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  min-height: 2.8rem;
  height: auto;
  margin: 2px 4px;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.greyLight};

  display: flex;
  align-items: center;
`;

export const VisibleCheckbox = styled.label<{ checked: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.6rem;

  min-width: 1rem;
  height: 1rem;

  border-radius: 0.15rem;
  border: 0.15rem solid ${({ theme }) => theme.colors.grey};
  background-color: white;

  svg {
    display: ${({ checked }) => (checked ? 'flex' : 'none')};
  }
`;

export const InvisibleCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
`;
