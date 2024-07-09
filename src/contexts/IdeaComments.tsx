/* eslint-disable no-restricted-syntax */
import { IdeaComment } from 'interfaces/idea';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  IdeaCommentDefaultValues,
  IdeaCommentReducer,
} from './reducers/IdeaCommentReducer';

interface GetCommentParams {
  limit?: number;
  offset?: number;
  page?: number;
  orderColumn?: 'createdAt';
  type:
    | 'NORMAL'
    | 'DEVELOPMENT'
    | 'EVALUATION'
    | 'EVALUATION_CRITERIA'
    | string[];
  orderOrientation?: 'asc' | 'desc';
}

interface IdeaCommentPropsData {
  ideaComments: IdeaComment[];
  loading: boolean;
  createIdeaComment: (form: FormData, toastMessage?: boolean) => Promise<void>;
  getIdeaComments: (ideaId: string, params?: GetCommentParams) => Promise<void>;
  getIdeasComments: (
    ideaId: string[],
    params?: GetCommentParams
  ) => Promise<void>;
  deleteIdeaComment: (commenId: string) => Promise<void>;
  updateIdeaComment: (commentId: string, message: string) => Promise<void>;
  getPossibleMentionUsers: (ideaId: string) => Promise<any[]>;
  notificateMentionedUsers: (
    mentionedUsers: string[],
    ideaId: string
  ) => Promise<void>;
}

export const IdeaCommentContext = createContext<IdeaCommentPropsData>(
  {} as IdeaCommentPropsData
);

export const IdeaCommentProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    IdeaCommentReducer,
    IdeaCommentDefaultValues
  );

  const createIdeaComment = useCallback(
    async (form: FormData, toastMessage = true) => {
      try {
        const { data } = await api.post('/ideas/idea-comments', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const newComments = [data.comment, ...dataReducer.ideaComments];
        dispatch({ type: 'SET_IDEA_COMMENTS', ideaComments: newComments });
        if (toastMessage) {
          toast.success('Sucesso ao criar novo comentário');
        }
      } catch (error) {
        toast.error(`Erro ao criar o comentário!`);
      }
    },
    [dispatch, dataReducer.ideaComments]
  );

  const getIdeaComments = useCallback(
    async (ideaId: string, params = {}) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(
          `/ideas/idea-comments/${ideaId}`,
          {
            params,
          }
        );
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_IDEA_COMMENTS',
          ideaComments: responseData.ideaComments,
        });
      } catch (error) {
        toast.error('Erro ao buscar comentários 1');
      }
    },
    [dispatch]
  );

  const getIdeasComments = useCallback(
    async (ideasIds: string[], params = {}) => {
      try {
        let ideasComments = [];
        dispatch({ type: 'SET_LOADING', loading: true });
        await Promise.all(
          ideasIds.map(async ideaId => {
            const { data: responseData } = await api.get(
              `/ideas/idea-comments/${ideaId}`,
              {
                params,
              }
            );
            if (ideasComments.length === 0) {
              ideasComments = responseData.ideaComments;
            } else {
              ideasComments = ideasComments.concat(responseData.ideaComments);
            }
          })
        );
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_IDEA_COMMENTS',
          ideaComments: ideasComments,
        });
      } catch (error) {
        toast.error('Erro ao buscar comentários 2');
      }
    },
    [dispatch]
  );

  const getPossibleMentionUsers = useCallback(async (ideaId: string) => {
    try {
      const { data: possibleMentionUsers } = await api.get(
        `/users/mentions/${ideaId}`
      );
      return possibleMentionUsers;
    } catch (error) {
      toast.error('Erro ao buscar as menções dos usuários');
      return [];
    }
  }, []);

  const notificateMentionedUsers = useCallback(
    async (mentionedUsers: string[], ideaId: string) => {
      try {
        await api.post(`/notifications/mentions`, {
          mentionedUsers,
          ideaId,
        });
      } catch (error) {
        toast.error('Erro ao buscar as notificações do usuário');
      }
    },
    []
  );

  const deleteIdeaComment = useCallback(
    async (commentId: string, toastMessage = true) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.delete(`/ideas/idea-comments/${commentId}`);
        dispatch({ type: 'SET_LOADING', loading: false });
        if (toastMessage) {
          toast.success('Comentário excluído');
        }
      } catch (error) {
        toast.error('Erro ao excluir comentário');
      }
    },
    [dispatch]
  );

  const updateIdeaComment = useCallback(
    async (commentId: string, message: string, toastMessage = true) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.put(`/ideas/idea-comments/${commentId}`, {
          message,
        });
        dispatch({ type: 'SET_LOADING', loading: false });
        if (toastMessage) {
          toast.success('Comentário editado com sucesso.');
        }
        return data.newIdeaComment;
      } catch (error) {
        toast.error('Erro ao editar comentário.');
      }
    },
    [dispatch]
  );

  const IdeaDataValue = useMemo(() => {
    return {
      ...dataReducer,
      createIdeaComment,
      getIdeaComments,
      getIdeasComments,
      deleteIdeaComment,
      updateIdeaComment,
      getPossibleMentionUsers,
      notificateMentionedUsers,
    };
  }, [
    dataReducer,
    createIdeaComment,
    getIdeaComments,
    getIdeasComments,
    deleteIdeaComment,
    updateIdeaComment,
    getPossibleMentionUsers,
    notificateMentionedUsers,
  ]);

  return (
    <IdeaCommentContext.Provider value={IdeaDataValue}>
      {children}
    </IdeaCommentContext.Provider>
  );
};
