import { MentionsInput } from 'react-mentions';
import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

// MODAL

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
  overflow-y: scroll;
  max-height: 55rem;

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

  @media (max-height: 1080px) {
    max-height: 35rem;
  }

  @media (max-height: 768px) {
    max-height: 25rem;
  }
`;

export const CommentInputContainer = styled.form`
  width: 100%;
  min-height: 64px;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1.5px solid ${({ theme }) => theme.colors.borders};
  display: flex;
  height: 100%;
  padding-left: 1rem;

  textarea {
    min-height: 64px;
    padding: 24px 0;
    border: 0;
    outline: 0;
    flex: 1;
    height: inherit;
    resize: none;
    max-height: 200px;
    overflow-y: auto;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  button {
    height: 64px;
    width: 64px;
    background: transparent;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SectionInfo = styled.div`
  margin-bottom: 20px;
`;

export const Article = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.greyLight};
  padding: 35px 0;

  h2 {
    text-transform: uppercase;
    font-size: 16px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.font};
  }

  p {
    line-height: 24px;
    letter-spacing: 0.3px;
    color: ${({ theme }) => theme.colors.font};
    white-space: pre-wrap;
    text-align: justify;
  }
`;

export const SectionImages = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.greyLight};
  padding-bottom: 35px;
`;

export const SectionComments = styled.div`
  margin-top: 54px;
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

export const NameArchive = styled.div`
  align-items: center;
  justify-content: center;
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
