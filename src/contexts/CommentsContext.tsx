import { videoComments } from 'interfaces/comments';

import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  VideoCommentsDefaultValues,
  VideoCommentsReducer,
} from './reducers/VideoCommentReducer';

interface CommentsListPropsData {
  getAllComments: (videoId: number, userId: string) => Promise<videoComments[]>;
  createComment: (data: any) => Promise<videoComments[]>;
  createSubComment: (data: any) => Promise<videoComments[]>;
  likeComment: (data: any) => void;
  unlikeComment: (data: any) => void;
  likeSubComment: (data: any) => void;
  unlikeSubComment: (data: any) => void;
  deleteComment: (commentId: string) => Promise<videoComments[]>;
  deleteSubComment: (commentId: string) => Promise<videoComments[]>;
}

export const CommentsListContext = createContext<CommentsListPropsData>(
  {} as CommentsListPropsData
);

export const CommentsListProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    VideoCommentsReducer,
    VideoCommentsDefaultValues
  );

  const getAllComments = useCallback(
    async (videoId: number, userId: string) => {
      try {
        const { data } = await api.get('/videos/comments/all', {
          params: {
            videoId,
            userId,
          },
        });
        dispatch({ type: 'SET_ALL_COMMENTS', comments: data });
        return data;
      } catch (error) {
        toast.info('Erro ao buscar os comentários dos vídeos');
      }
    },
    [dispatch]
  );

  const createComment = useCallback(async commments => {
    try {
      const { data } = await api.post('/videos/comments/comment', {
        data: commments,
      });
      dispatch({ type: 'SET_ALL_COMMENTS', comments: data });
      return data;
    } catch (error) {
      toast.info('Erro ao criar comentário');
    }
  }, []);

  const createSubComment = useCallback(async commments => {
    try {
      const { data } = await api.post('/videos/comments/subcomment', {
        data: commments,
      });
      dispatch({ type: 'SET_ALL_COMMENTS', comments: data });
      return data;
    } catch (error) {
      toast.info('Erro ao criar sub comentário');
    }
  }, []);

  const likeComment = useCallback(async commentLike => {
    try {
      await api.post('/videos/comments/like', {
        userId: commentLike.userId,
        commentId: commentLike.commentId,
      });
    } catch (error) {
      toast.info('Erro ao curtir comentário');
    }
  }, []);

  const unlikeComment = useCallback(async commentLike => {
    try {
      await api.delete('/videos/comments/comment/like', {
        data: {
          userId: commentLike.userId,
          commentId: commentLike.commentId,
        },
      });
    } catch (error) {
      toast.info('Erro ao descurtir comentário');
    }
  }, []);

  const likeSubComment = useCallback(async commentLike => {
    try {
      await api.post('/videos/comments/subcomment/like', {
        userId: commentLike.userId,
        subCommentId: commentLike.commentId,
      });
    } catch (error) {
      toast.info('Erro ao curtir sub comentário');
    }
  }, []);

  const unlikeSubComment = useCallback(async commentLike => {
    try {
      await api.delete('/videos/comments/subcomment/like', {
        data: {
          userId: commentLike.userId,
          subCommentId: commentLike.commentId,
        },
      });
    } catch (error) {
      toast.info('Erro ao descurtir sub comentário');
    }
  }, []);

  const deleteComment = useCallback(async commentId => {
    try {
      const { data } = await api.delete('/videos/comments/comment', {
        data: {
          commentId,
        },
      });
      dispatch({ type: 'SET_ALL_COMMENTS', comments: data });
      return data;
    } catch (error) {
      toast.info('Erro ao deletar comentário');
    }
  }, []);

  const deleteSubComment = useCallback(async subCommentId => {
    try {
      const { data } = await api.delete('/videos/comments/subcomment', {
        data: {
          subCommentId,
        },
      });
      dispatch({ type: 'SET_ALL_COMMENTS', comments: data });
      return data;
    } catch (error) {
      toast.info('Erro ao deletar comentário');
    }
  }, []);

  const CommentListValue = useMemo(() => {
    return {
      ...dataReducer,
      getAllComments,
      createComment,
      likeComment,
      unlikeComment,
      likeSubComment,
      unlikeSubComment,
      createSubComment,
      deleteComment,
      deleteSubComment,
    };
  }, [
    dataReducer,
    getAllComments,
    createComment,
    likeComment,
    unlikeComment,
    likeSubComment,
    unlikeSubComment,
    createSubComment,
    deleteComment,
    deleteSubComment
  ]);

  return (
    <CommentsListContext.Provider value={CommentListValue}>
      {children}
    </CommentsListContext.Provider>
  );
};
