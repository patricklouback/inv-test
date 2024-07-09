import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

// MODAL

interface MessageInputProps {
  error?: boolean;
}

export const ModalForm = styled.form``;

export const Title = styled.h1`
  font-size: 2rem;
  padding: 1.2rem 0;
`;

export const Subtitle = styled.h2`
  font-size: 1.1rem;
  padding: 1rem 0 0;
`;

export const Description = styled.div`
  font-size: 1rem;
  padding: 0.5rem 0 0;
  line-height: 1.5rem;
  font-weight: 200;
  white-space: pre-wrap;
  text-align: justify;
`;

export const Line = styled.hr`
  margin: 1.5rem 0 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MessageForm = styled.form`
  display: grid;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.borders};
  grid-template-columns: [textarea] 7fr [buttons] 0.5fr;
  border-radius: 0.25rem;
  height: 100px;
`;

export const ButtonFiles = styled.button`
  margin: 2rem 0 1rem;
  border:none;
  a {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
`;

export const Message = styled.textarea<MessageInputProps>`
  resize: none;
  width: 100%;

  padding: 1rem;

  border: 0;
  overflow-y: scroll;

  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
  }

  ${({ error, theme }) => css`
    border: ${error ? `1px solid ${theme.colors.red}` : 0};
  `}
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const SendButton = styled.button`
  background: transparent;
  border: 0;
  outline: none;
`;

export const InputButton = styled.input`
  display: none;
`;

export const CommentsSection = styled.section`
  padding: 1rem 0;

  .alternative-comments {
    background: ${({ theme }) => theme.colors.greyLight};
  }

  strong {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`;

export const Comments = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleIdea = styled.div`
  padding: 10px 50px;
  min-height: 80px;
  display: flex;
  align-items: center;
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const FadeLine = styled.div`
  margin: 8px 0;
  width: 100%;
  height: 3px;

  background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight[styleSlug]} 20.87%,
      ${theme.colors.primary[styleSlug]} 52.62%,
      ${theme.colors.terceary[styleSlug]} 83.37%
    );`};
`;

export const Content = styled.div`
  padding: 10px 50px;
  height: calc(100vh - 173px);
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
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

  .alternative-comments {
    background: ${({ theme }) => theme.colors.greyLight};
  }
`;

export const AttachedFilesSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.font};
  margin: 24px 0;
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
  background-color: #f6f6f8;
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

export const CampaingTitleTooltip = styled.div.attrs<
  { top: number; left: number },
  { top: number; left: number }
>(props => {
  return { top: props.top || 0, left: props.left || 0 };
})`
  visibility: hidden;
  width: auto;
  margin-left: 17px;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 11111991;
  color: rgba(253, 253, 253, 1);
  background: rgba(109, 109, 109, 1);
  text-align: left;
  max-width: 501px;
  top: auto;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
  left: ${props => props.left + 17}px;
`;

export const CampaingTitle = styled.div`
  display: inline-block;
  background: rgba(16, 80, 189, 0.1);
  width: auto;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  margin-right: 14px;
  margin-bottom: 8px;
  &:hover ${CampaingTitleTooltip} {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const CampaingStatusFinished = styled.div`
  display: inline-block;
  background: rgba(82, 85, 86, 0.15);
  width: auto;
  padding: 4px 8px 4px 8px;
  color: rgba(82, 85, 86, 1);
  border-radius: 4px;
`;

export const CampaingStatusActived = styled.div`
  display: inline-block;
  background: rgba(6, 218, 15, 0.1);
  width: auto;
  padding: 4px 8px 4px 8px;
  color: rgba(25, 150, 30, 1);
  border-radius: 4px;
`;
