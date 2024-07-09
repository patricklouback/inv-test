import { useRef, useState } from 'react';
import { Image } from '../NewComment/styles';
import {
  CommentArea,
  CommentText,
  ButtonIcon,
  PhotoAndName,
  ReplyAndLike,
  RightSide,
  UserAndDate,
  CommentDate,
  NumberOfLikes,
  Answers,
  AnswersList,
  ScrollSubComments,
  AnswersWithBar,
  AnswerBar,
} from './styles';
import ReplySvg from '../../../../../assets/inventta/reply.svg';
import LikeSvg from '../../../../../assets/inventta/like.svg';
import LikedSvg from '../../../../../assets/inventta/liked.svg';
import DownSvg from '../../../../../assets/inventta/down.svg';
import UpSvg from '../../../../../assets/inventta/up.svg';
import Trash from '../../../../../assets/inventta/trash.svg';
import { NewComment } from '../NewComment';
import { SubComment } from './SubComment/Index';

export const Comment: React.FC<{
  userName?: string;
  userImage?: string;
  userIsAdmin: boolean;
  userId: string;
  commentUserName?: string;
  commentUserImage?: string;
  commentUserId: string;
  comment?: string;
  likes?: number;
  liked?: boolean;
  commentId: string;
  createdAt: Date;
  subComments: any[];
  updateLikeSubcomment;
  updateLike: (commentId: string, liked: boolean) => void;
  createSubComment: (text: string, commentId: string) => void;
  deleteComment: (commentId: string) => void;
  deleteSubComment: (commentId: string) => void;
}> = ({
  userImage,
  userIsAdmin,
  userId,
  commentUserName,
  commentUserImage,
  commentUserId,
  comment,
  likes,
  liked,
  commentId,
  createdAt,
  subComments,
  updateLike,
  updateLikeSubcomment,
  createSubComment,
  deleteComment,
  deleteSubComment,
}): JSX.Element => {
  const [showReply, setShowReply] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [offSet, setOffset] = useState(3);
  const [scrollHeigth, setScrollHeigth] = useState(998);
  const commentRef = useRef(null);
  const subCommentsRef = useRef(null);

  function buildMaxMultipleOf3OffSet(): number {
    return subComments.length + (3 - (subComments.length % 3));
  }
  const createNewSubComment = async (text: string): Promise<any> => {
    await createSubComment(text, commentId);
    setShowAnswers(true);
    const maxOffSet = buildMaxMultipleOf3OffSet();
    setOffset(maxOffSet);
    if (subComments.length > 2) {
      setTimeout(() => {
        subCommentsRef.current.children[subComments.length].scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 1000);
    }
  };

  function getSubCommentsOffSetted(): any[] {
    return subComments.slice(0, offSet);
  }

  function shineComment(): void {
    commentRef.current.style.opacity = '0%';
    let opacity = 0;
    const increaseOpacity = setInterval(() => {
      opacity += 12.5;
      if (opacity > 100) {
        clearInterval(increaseOpacity);
      } else {
        commentRef.current.style.opacity = `${opacity}%`;
      }
    }, 100);
  }

  function canDeleteComment(): boolean {
    return userIsAdmin || commentUserId === userId;
  }

  const scrollBackToComment = (): void => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    shineComment();
  };
  return (
    <div>
      <CommentArea ref={commentRef}>
        <UserAndDate>
          <PhotoAndName>
            <Image $img={commentUserImage || '/images/user.png'} />
            <div> {commentUserName} </div>
          </PhotoAndName>
          <CommentDate>{createdAt.toLocaleDateString('pt-BR')}</CommentDate>
        </UserAndDate>
        <CommentText>{comment}</CommentText>
        <RightSide>
          <div />
          <div>
            <RightSide>
              <div />
              <NumberOfLikes>{likes}</NumberOfLikes>
            </RightSide>
            <ReplyAndLike>
              {subComments && subComments.length > 0 && (
                <div>
                  {!showAnswers && (
                    <Answers
                      onClick={() => {
                        setShowAnswers(true);
                        setScrollHeigth(998);
                        setOffset(
                          subComments.length < 3 ? subComments.length : 3
                        );
                      }}
                    >
                      <span> Abrir Respostas</span>
                      <DownSvg />
                    </Answers>
                  )}
                  {showAnswers && (
                    <Answers
                      onClick={() => {
                        setShowAnswers(false);
                        shineComment();
                      }}
                    >
                      <span> Fechar Respostas</span>
                      <UpSvg />
                    </Answers>
                  )}
                </div>
              )}
              {canDeleteComment() && (
                <ButtonIcon onClick={() => deleteComment(commentId)}>
                  <Trash />
                </ButtonIcon>
              )}
              <ButtonIcon onClick={() => setShowReply(!showReply)}>
                <ReplySvg />
              </ButtonIcon>
              <div>
                {!liked && (
                  <ButtonIcon onClick={() => updateLike(commentId, liked)}>
                    <LikeSvg />
                  </ButtonIcon>
                )}
                {liked && (
                  <ButtonIcon onClick={() => updateLike(commentId, liked)}>
                    <LikedSvg />
                  </ButtonIcon>
                )}
              </div>
            </ReplyAndLike>
          </div>
        </RightSide>
      </CommentArea>
      {showReply && (
        <NewComment userImage={userImage} createComment={createNewSubComment} />
      )}
      {showAnswers && subComments && subComments.length > 0 && (
        <div>
          {getSubCommentsOffSetted().length > 6 && (
            <ScrollSubComments height={scrollHeigth}>
              <AnswersList ref={subCommentsRef}>
                {getSubCommentsOffSetted().map(subComment => {
                  return (
                    <SubComment
                      key={subComment.id}
                      userName={subComment.userName}
                      userImage={subComment.userImage}
                      userIsAdmin={userIsAdmin}
                      userId={userId}
                      commentUserId={subComment.userId}
                      comment={subComment.text}
                      commentId={subComment.id}
                      liked={subComment.liked}
                      likes={subComment.likes}
                      createdAt={new Date(subComment.createdAt)}
                      updateLike={updateLikeSubcomment}
                      deleteSubComment={deleteSubComment}
                    />
                  );
                })}
              </AnswersList>
            </ScrollSubComments>
          )}
          {getSubCommentsOffSetted().length <= 6 && (
            <AnswersWithBar>
              <AnswersList ref={subCommentsRef}>
                {getSubCommentsOffSetted().map(subComment => {
                  return (
                    <SubComment
                      key={subComment.id}
                      userName={subComment.userName}
                      userImage={subComment.userImage}
                      userIsAdmin={userIsAdmin}
                      userId={userId}
                      commentUserId={subComment.userId}
                      comment={subComment.text}
                      commentId={subComment.id}
                      liked={subComment.liked}
                      likes={subComment.likes}
                      createdAt={new Date(subComment.createdAt)}
                      updateLike={updateLikeSubcomment}
                      deleteSubComment={deleteSubComment}
                    />
                  );
                })}
              </AnswersList>
              <AnswerBar />
            </AnswersWithBar>
          )}
          <div>
            {subComments.length > offSet && (
              <RightSide>
                <div />
                <Answers
                  onClick={() => {
                    setScrollHeigth(998);
                    setOffset(buildMaxMultipleOf3OffSet());
                  }}
                >
                  <span> Ver mais respostas</span>
                  <DownSvg />
                </Answers>
              </RightSide>
            )}
            {subComments.length <= offSet && (
              <RightSide>
                <div />
                <Answers
                  onClick={() => {
                    setShowAnswers(false);
                    setOffset(subComments.length < 3 ? subComments.length : 3);
                    scrollBackToComment();
                  }}
                >
                  <span> Fechar Respostas</span>
                  <UpSvg />
                </Answers>
              </RightSide>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
