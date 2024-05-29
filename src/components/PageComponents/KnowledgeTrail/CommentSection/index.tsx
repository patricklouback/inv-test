import { AuthContext } from 'contexts/AuthContext';
import { CommentsListContext } from 'contexts/CommentsContext';
import { useContext, useEffect, useState } from 'react';
import { Comment } from './Comment';
import { NewComment } from './NewComment';
import { Title } from './styles';
import { Content } from './styles';

export const CommentSection: React.FC<{
  videoId: number;
}> = ({ videoId }): JSX.Element => {
  const { user } = useContext(AuthContext);
  const {
    getAllComments,
    createComment,
    likeComment,
    unlikeComment,
    likeSubComment,
    unlikeSubComment,
    createSubComment,
    deleteComment,
    deleteSubComment,
  } = useContext(CommentsListContext);
  const [comments, setComments] = useState([]);
  const [commentListId, setCommentListId] = useState('');

  function buildComments(data: any): void {
    if (data.length > 0) {
      const videoComments = data.find(
        videoComment => videoComment.videoId === videoId
      );
      if (videoComments !== undefined) {
        setComments(videoComments.comments);
        setCommentListId(videoComments.id);
      }
    }
  }

  useEffect(() => {
    let mounted = true;
    if (user !== undefined && videoId !== undefined) {
      getAllComments(videoId, user.id).then(data => {
        if (mounted) {
          buildComments(data);
        }
      });
      return () => {
        mounted = false;
      };
    }
  }, [getAllComments, videoId]);

  const deleteCommentAndRefresh = (commentId: string): void => {
    deleteComment(commentId).then(data => {
      getAllComments(videoId, user.id).then(data => {
        buildComments(data);
      });
    });
  };

  const deleteSubCommentAndRefresh = (commentId: string): void => {
    deleteSubComment(commentId).then(data => {
      getAllComments(videoId, user.id).then(data => {
        buildComments(data);
      });
    });
  };

  const createNewComment = (text: string): void => {
    createComment({
      text,
      likes: 0,
      commentListId,
      userId: user.id,
    }).then(data => {
      buildComments(data);
    });
  };

  const createNewSubComment = (text: string, commentId: string): void => {
    createSubComment({
      text,
      likes: 0,
      commentId,
      userId: user.id,
    }).then(data => {
      buildComments(data);
    });
  };

  function findSubComment(commentsList: any[], commentId: string): any {
    for (let i = 0; i < commentsList.length; i += 1) {
      for (let j = 0; j < commentsList[i].subCommentsList.length; j += 1) {
        if (commentsList[i].subCommentsList[j].id === commentId) {
          return commentsList[i].subCommentsList[j];
        }
      }
    }
  }

  const updateLike = (
    commentId: string,
    liked: boolean,
    isSubComment = false
  ): void => {
    const newComments = [...comments];
    let comment;
    if (isSubComment) {
      comment = findSubComment(newComments, commentId);
    } else {
      comment = newComments.find(item => item.id === commentId);
    }
    if (!liked) {
      comment.liked = true;
      comment.likes += 1;
      likeComment({
        userId: user.id,
        commentId,
      });
    } else {
      comment.liked = false;
      comment.likes -= 1;
      unlikeComment({
        userId: user.id,
        commentId,
      });
    }
    setComments(newComments);
  };

  const updateLikeSubcomment = (commentId: string, liked: boolean): void => {
    const newComments = [...comments];
    const comment = findSubComment(newComments, commentId);
    if (!liked) {
      comment.liked = true;
      comment.likes += 1;
      likeSubComment({
        userId: user.id,
        commentId,
      });
    } else {
      comment.liked = false;
      comment.likes -= 1;
      unlikeSubComment({
        userId: user.id,
        commentId,
      });
    }
    setComments(newComments);
  };

  return (
    <Content>
      <Title>
        Nos conte o que achou da discussão! Tem alguma dica? Alguma experiência
        aplicando esses métodos e ferramentas? Compartilhe!
      </Title>
      {user && (
        <NewComment
          userName={user.name}
          userImage={user.image}
          createComment={createNewComment}
        />
      )}
      {user && (
        <ul>
          {comments.map(comment => {
            return (
              <div key={comment.id}>
                <Comment
                  userName={user.name}
                  userImage={user.image}
                  userIsAdmin={user.isAdmin}
                  userId={user.id}
                  commentUserId={comment.userId}
                  commentUserName={comment.userName}
                  commentUserImage={comment.userImage}
                  comment={comment.text}
                  commentId={comment.id}
                  liked={comment.liked}
                  likes={comment.likes}
                  createdAt={new Date(comment.createdAt)}
                  updateLike={updateLike}
                  createSubComment={createNewSubComment}
                  subComments={comment.subCommentsList}
                  updateLikeSubcomment={updateLikeSubcomment}
                  deleteComment={deleteCommentAndRefresh}
                  deleteSubComment={deleteSubCommentAndRefresh}
                />
              </div>
            );
          })}
        </ul>
      )}
    </Content>
  );
};
