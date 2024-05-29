import styled, { css } from 'styled-components';
import { MentionsInput } from 'react-mentions';

interface CommentInputProps {
  error: boolean;
}

export const TitleCommentEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WapperStep2 = styled.div`
  margin-left: 15px;
  width: 100%;
`;

export const WapperTitleActiv = styled.div`
  height: 52px;
  display: flex;
  align-items: center;

  padding: 0 24px;
  border-radius: 22px 22px 0 0;

  strong {
    margin-right: 5px;
    text-transform: uppercase;
  }
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.background};
`;

export const WapperActivity = styled.div`
  height: 52px;
  display: flex;
  align-items: center;

  padding: 0 24px;
  border-radius: 0 0 22px 22px;

  background: ${({ theme }) => theme.colors.background};

  span {
    letter-spacing: 0.4px;
  }
`;

export const IconActivity = styled.div`
  margin-right: 10px;
  background: ${({ theme }) => theme.colors.grey};
  width: 27px;
  height: 27px;

  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ValueActivity = styled.span`
  letter-spacing: 0.4px;
`;

export const FormStep2 = styled.form`
  margin-top: 20px;
  margin-bottom: 40px;

  button {
    background-color: transparent;
    border: none;
  }
`;

export const WapperComment = styled.div`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};

  border-radius: 8px;

  display: flex;
`;

export const InputComment = styled.textarea<CommentInputProps>`
  border-radius: 8px;
  height: 58px;
  width: calc(100% - 90px);
  outline: none;
  border: none;
  resize: none;

  &::placeholder {
    font-size: 16px;
    font-weight: normal;
  }

  padding-top: 20px;
  padding-left: 35px;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.font};

  ${({ theme, error }) => css`
    border: ${error ? `1px solid ${theme.colors.red}` : 'none'};
  `}
`;

export const StyledMentionsInput = styled(MentionsInput)<CommentInputProps>`
  border-radius: 8px;
  height: 58px;
  width: calc(100% - 90px);
  outline: none;
  border: none;
  resize: none;
  width: 100%;
  max-width: 100%;
  white-space: pre-wrap;
  min-height: 64px;
  word-break: break-word;

  textarea {
    min-height: 64px;
    padding: 24px 1rem;
    border: 0;
    outline: 0;
  
    -moz-box-shadow: none;
    box-shadow: none;
  
    max-width: 100%;
  }

  &::placeholder {
    font-size: 16px;
    font-weight: normal;
  }

  padding-top: 20px;
  padding-left: 35px;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.font};

  ${({ theme, error }) => css`
    border: ${error ? `1px solid ${theme.colors.red}` : 'none'};
  `}
`;

export const WapperActions = styled.div`
  width: 110px;

  display: flex;
  gap: 0.7rem;
  justify-content: center;
  align-items: center;
`;

export const ButtonAction = styled.button`
  width: 20px;
  height: 30px;
  /* margin: 0 8px; */
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NameArchive = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.font};
  margin: 12px 0;

  svg + svg {
    cursor: pointer;
  }
`;

export const WapperContentComments = styled.div``;

export const TitleComment = styled.h2`
  font-weight: normal;
  font-size: 17px;
  letter-spacing: 0.4px;
`;

export const ListComments = styled.ul`
  margin-top: 10px;
  list-style: none;
`;

export const AttachButton = styled.div`
  height: 64px;
  width: 22px;
  background: ${({ theme }) => theme.colors.background};
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const CommentPlusActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const CommentContainer = styled.div`
  width: 100%;
`;

export const CommentActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 20px 0;
  padding-right: 10px;
  padding-bottom: 5px;
  background-color: #ffffff;
  border-radius: 8px;
  gap: 30px;
  cursor: pointer;
`;

export const CommentSectionPlusCounter = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 20px;
  margin-left: 20px;
  color: #ffffff;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.font};
  border-radius: 5px;
  font-size: 0.7rem;
`;
