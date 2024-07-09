/* eslint-disable no-restricted-syntax */
import { IdeaStep } from 'interfaces/idea';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  IdeaStepDefaultValues,
  IdeaStepReducer,
} from './reducers/IdeaStepReducer';

interface IdeaStepPropsData {
  ideaSteps: IdeaStep[];
  loading: boolean;
  listIdeaSteps: (
    ideaId: string,
    doNotsetValue?: boolean
  ) => Promise<IdeaStep[]>;
  approveIdeaStep: (ideaStepId: string, ideaId?: string) => Promise<void>;
  toggleIdeaStepItem: (stepId: string, stepItemId: string) => Promise<void>;
}

export const IdeaStepContext = createContext<IdeaStepPropsData>(
  {} as IdeaStepPropsData
);

export const IdeaStepProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    IdeaStepReducer,
    IdeaStepDefaultValues
  );

  const listIdeaSteps = useCallback(
    async (ideaId: string, doNotsetValue?: boolean) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.get(`/ideas/idea-steps/${ideaId}`);

        if (!doNotsetValue) {
          dispatch({ type: 'SET_IDEA_STEPS', ideaSteps: data.ideaSteps });
        }

        dispatch({ type: 'SET_LOADING', loading: false });
        return data.ideaSteps;
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Erro ao buscar os steps de validação!'
        );
      }
    },
    [dispatch]
  );

  const toggleIdeaStepItem = useCallback(
    async (stepId: string, stepItemId: string) => {
      try {
        const { data } = await api.put(`/ideas/idea-step-items/${stepItemId}`);
        const { ideaSteps } = dataReducer;

        const ideaStepIndex = ideaSteps.findIndex(item => item.id === stepId);

        const ideaStepItemIndex = ideaSteps[
          ideaStepIndex
        ].ideaStepItems.findIndex(item => item.id === stepItemId);

        ideaSteps[ideaStepIndex].ideaStepItems[ideaStepItemIndex].completed =
          data.ideaStepItem.completed;
        dispatch({ type: 'SET_IDEA_STEPS', ideaSteps });
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao validar atividade!'
        );
      }
    },
    [dataReducer]
  );

  const approveIdeaStep = useCallback(
    async (ideaStepId: string, ideaId: string) => {
      try {
        await api.put(`/ideas/idea-steps/approve/${ideaStepId}`, { ideaId });

        const newIdeaSteps = dataReducer.ideaSteps;

        const ideaStepIndex = newIdeaSteps.findIndex(i => i.id === ideaStepId);

        newIdeaSteps[ideaStepIndex].completed = true;

        dispatch({ type: 'SET_IDEA_STEPS', ideaSteps: newIdeaSteps });
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao validar atividade!'
        );
      }
    },
    [dataReducer]
  );

  const IdeaStepDataValue = useMemo(() => {
    return {
      ...dataReducer,
      listIdeaSteps,
      toggleIdeaStepItem,
      approveIdeaStep,
    };
  }, [dataReducer, listIdeaSteps, toggleIdeaStepItem, approveIdeaStep]);

  return (
    <IdeaStepContext.Provider value={IdeaStepDataValue}>
      {children}
    </IdeaStepContext.Provider>
  );
};
