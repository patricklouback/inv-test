import styled from 'styled-components';
import { MentionsInput } from 'react-mentions';

export const SectionComments = styled.div`
  margin-top: 54px;
`;

export const CommentInputContainer = styled.form`
  width: 100%;
  min-height: 64px;
  border-radius: 8px;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1.5px solid ${({ theme }) => theme.colors.borders};
  display: flex;
  height: 100%;
  padding: 0.5rem 0.1rem;
`;

export const ButtonAction = styled.button`
  height: 64px;
  width: 20px;
  background: ${({ theme }) => theme.colors.background};
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WapperActionsComment = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  svg {
    cursor: pointer;
  }

  > div {
    margin: 0 1rem;
  }
`;

export const TextareaItem = styled.textarea`
  min-height: 64px;
  padding: 24px 1rem;
  border: 0;
  outline: 0;
  flex: 1;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;

  width: 100%;
`;

export const StyledMentionsInput = styled(MentionsInput)`
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
`;

export const CommentSent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  span {
    font-weight: 500;
    font-size: 17px;
  }

  p {
    margin: 0 auto;
    margin-top: 1rem;
  }

  .comment-skeleton {
    width: 100%;
    height: 160px;
  }
`;

export const NameArchive = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  color: ${({ theme }) => theme.colors.font};
  margin: 24px 0;

  span + svg {
    cursor: pointer;
  }
`;

export const AttachButton = styled.div`
  height: 64px;
  width: 20px;
  background: ${({ theme }) => theme.colors.background};
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.small`
  color: ${props => props.theme.colors.notification.error};
  font-size: 1rem;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 14px;

  svg {
    margin-right: 10px;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
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
