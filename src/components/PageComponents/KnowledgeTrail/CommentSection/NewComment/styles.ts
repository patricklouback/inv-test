import styled from 'styled-components';

export const Content = styled.div`
  margin-top: 32px;
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

export const InputComment = styled.textarea`
  width: 96%;
  height: 133px;
  border-color: #ced4da;
  border-radius: 10px;
  border-style: solid;
  padding: 10px;
`;

export const CommentPhoto = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Image = styled.div<{ img?: string }>`
  height: 36px;
  min-width: 36px;

  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.4);

  background-image: url(${({ img }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px;
  box-shadow: 0 2px 5px -3px #00000061;
`;

export const ButtonComment = styled.button`
  margin-top: 8px;
  margin-bottom: 24px;
  background: #67d1c4;
  color: #ffffff;
  height: 56px;
  border-color: #67d1c4;
  border-radius: 10px;
  border-style: solid;
  width: 137px;
  font-size: 16px;
  gap: 8px;
  margin-left: 88.5%;
`;

export const ButtonCommentDisabled = styled.div`
  margin-top: 8px;
  margin-bottom: 36px;
  background: ${({ theme }) => theme.colors.grey};
  color: ${({ theme }) => theme.colors.greyLight};
  height: 56px;
  border-color: ${({ theme }) => theme.colors.grey};
  border-radius: 10px;
  border-style: solid;
  width: 137px;
  font-size: 16px;
  gap: 8px;
  margin-left: 88.5%;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
