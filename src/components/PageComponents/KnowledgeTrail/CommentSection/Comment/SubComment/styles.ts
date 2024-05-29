import styled from 'styled-components';

export const PhotoAndName = styled.div`
  display: flex;
  justify-content: initial;
  gap: 10px;
  align-items: center;
`;

export const CommentArea = styled.div`
  width: 96%;
  height: 148px;
  border-color: #ced4da;
  border-radius: 10px;
  border-style: solid;
  padding: 10px;
  background-color: #ffffff;
  margin-top: 12px;
  margin-left: 49px;

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

export const LikeComponentAndLikes = styled.div`
  margin-left: 95%;
`;

export const LikeComponent = styled.div`
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
`;

export const ButtonIconSpace = styled.div`
  width: 25px;
  height: 25px;
  border: none;
  background-color: white;
  margin-right: 24px;
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
  margin-left: 47px;
  font-size: 12px;
`;

export const LikeAndTrash = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
