/* eslint-disable no-restricted-syntax */
import { IdeaChange } from 'interfaces/idea';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  IdeaChangeDefaultValues,
  IdeaChangeReducer,
} from './reducers/IdeaChangeReducer';

interface IdeaChangePropsData {
  ideaChanges: IdeaChange[];
  ideaChangesForUser: IdeaChange[];
  loading: boolean;
  getIdeaChanges: (ideaId: string) => Promise<void>;
  updateIdeaChange: (id: string) => Promise<void>;
  getAllIdeaChangesForUser: () => Promise<any>;
}

export const IdeaChangeContext = createContext<IdeaChangePropsData>(
  {} as IdeaChangePropsData
);

export const IdeaChangeProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    IdeaChangeReducer,
    IdeaChangeDefaultValues
  );

  const getIdeaChanges = useCallback(
    async (ideaId: string) => {
      try {
        const { data } = await api.get(`/ideas/idea-changes/${ideaId}`);
        dispatch({
          type: 'SET_IDEA_CHANGES',
          ideaChanges: data.ideaChangesList,
        });
      } catch (error) {
        console.error('Error', error);
        // toast.error('Error');
      }
    },
    [dispatch]
  );

  const getAllIdeaChangesForUser = useCallback(async (): Promise<any> => {
    try {
      const { data } = await api.get(`/ideas/idea-changes`);
      dispatch({
        type: 'SET_IDEA_CHANGES_FOR_USER',
        ideaChangesForUser: data.ideaChangesForUserList,
      });
      return data.ideaChangesForUserList;
    } catch (error) {
      console.error('Error', error);
      // toast.error('Error');
    }
  }, [dispatch]);

  const updateIdeaChange = useCallback(async (id: string) => {
    try {
      const { data } = await api.put(`/ideas/idea-changes/${id}`);
      return data.ideaChangeUpdate;
    } catch (error) {
      toast.error(
        'Erro ao alterar status de visualização das alterações da iniciativa.'
      );
    }
  }, []);

  const IdeaChangeDataValue = useMemo(() => {
    return {
      ...dataReducer,
      updateIdeaChange,
      getIdeaChanges,
      getAllIdeaChangesForUser,
    };
  }, [dataReducer, updateIdeaChange, getIdeaChanges, getAllIdeaChangesForUser]);

  return (
    <IdeaChangeContext.Provider value={IdeaChangeDataValue}>
      {children}
    </IdeaChangeContext.Provider>
  );
};
