import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const ConditionsAndTermsForm = styled.form<{ showTerms }>`
  display: ${({ showTerms }) => (showTerms ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  > div {
    margin-top: 1rem;
    padding: 10px;
    overflow-y: scroll;
    max-height: 500px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border-style: solid;
    border-radius: 5px;
  }
  > div::-webkit-scrollbar {
    width: 4px;
  }

  > div::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border-radius: 5px;
  }
`;

export const ModalTitle = styled.h1`
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.font};
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const ConditionsAndTermsContent = styled.div`
  min-width: 100%;
  max-width: fit-content;
  word-break: break-word;
  text-align: justify;
  text-justify: inter-word;
  word-wrap: break-word;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CheckboxLabel = styled.span`
  border: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
  > label {
    display: flex;
    gap: 8px;
  }
`;
