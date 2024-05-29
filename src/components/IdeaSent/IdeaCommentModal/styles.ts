import styled, { css } from 'styled-components';

export const IdeaCommentForm = styled.form`
  > div {
    margin-bottom: 1rem;
  }
`;

export const ModalTitle = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.font};
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 600;
  margin-bottom: 1rem;
`;
