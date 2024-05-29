import styled from 'styled-components';

interface ChipProps {
  isInternalComment: boolean;
}

export const ItemComment = styled.div`
  background: ${({ theme }) => theme.colors.background};
  margin: 20px 0;
  padding: 5px 24px;
  border-radius: 8px;

  p {
    margin: 10px 0;
    line-height: 25px;
    font-size: 17px;
    color: ${({ theme }) => theme.colors.font};
  }
`;

export const HeaderComment = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .date {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const FooterComment = styled.footer<{ file?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 15px;

  a {
    border: 0;
    background: ${({ theme }) => theme.colors.lightBlue};
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  }
`;

export const ChipCommentType = styled.div<ChipProps>`
  padding: 0.5rem;
  /* width: 50px; */
  /* height: 50px; */
  font-family: ${({ theme }) => theme.font.primary};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  font-size: 12px;
  background-color: ${({ theme, isInternalComment }) =>
    isInternalComment ? theme.colors.accent : theme.colors.greyDark};
  margin-right: 1rem;
`;

export const LeftHeaderComment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.input`
  max-width: 480px;
  width: 100%;
  height: 64px;

  border: 0;
  outline: none;
  border-radius: 8px;

  margin-top: 8px;

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }

  background: ${({ theme }) => theme.colors.background};
  padding-left: 24px;

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary};
  }
`;