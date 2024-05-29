import styled from 'styled-components';

export const PhotoAndName = styled.div`
  display: flex;
  justify-content: initial;
  gap: 10px;
  align-items: center;
`;

export const CommentArea = styled.div`
  width: 100%;
  /* height: 148px; */
  border-color: #ced4da;
  border-radius: 10px;
  border-style: solid;
  padding: 10px;
  background-color: #ffffff;
  margin-top: 12px;
  /* margin-left: 49px; */
`;

export const RightSide = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
`;

export const ReplyAndLike = styled.div`
  display: flex;
`;

export const CommentText = styled.div`
  margin: 10px;
`;

export const ButtonIcon = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  background-color: white;
  display: flex;
  margin: 2px;
`;

export const CommentDate = styled.div`
  color: #2d3748;
  opacity: 50%;
`;

export const UserAndDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NumberOfLikes = styled.div`
  margin-right: 8px;
  font-size: 12px;
`;

export const Answers = styled.button`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  gap: 4px;
  border: none;
  background-color: transparent;
  margin-right: 4px;
`;

export const AnswersList = styled.ul`
  width: 100%;
  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 load;
`;

export const ScrollSubComments = styled.div.attrs<
  { height: number },
  { height: number }
>(props => {
  return { height: props.height || 499 };
})`
  padding: 8px;
  height: ${props => props.height}px;
  background: ${({ theme }) => theme.colors.greyLight};
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    margin-top: 16px;
    margin-bottom: 9px;
  }

  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    border-radius: 16px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  @media screen and (max-width: 980px) {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    min-width: 100%;
    height: auto;
  }
`;

export const AnswersWithBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const AnswerBar = styled.div`
  width: 4px;
  margin-top: 14px;
  background-color: ${({ theme }) => theme.colors.grey};
  border: ${({ theme }) => theme.colors.grey};
  border-radius: 4px;
`;
