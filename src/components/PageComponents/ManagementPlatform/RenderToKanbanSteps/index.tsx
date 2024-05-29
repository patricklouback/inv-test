/* eslint-disable no-param-reassign */
import { KanbanStep } from 'interfaces/idea';
import { ConfigContext } from 'contexts/ConfigContext';
import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FiCheck, FiEdit2, } from 'react-icons/fi';
import {
  ToForm,
  Index,
  Content,
  Draft,
  Text,
  InputWrapper,
  CustomInput,
  IconButton,
  Actions,
} from './styles';

interface RenderKanbanStepsProps {
  kanbanStep: KanbanStep;
  index: number;
  isCreate?: boolean;
  changeKanbanStepState?:(newState: KanbanStep[]) => void;
}

export const RenderToKanbanSteps: React.FC<RenderKanbanStepsProps> = ({
  kanbanStep,
  index,
  isCreate = false,
  changeKanbanStepState,
}): JSX.Element => {
  const [isEditable, setIsEditable] = useState(false);
  const [kanbanStepBase, setKanbanStepBase] = useState<KanbanStep>();
  const {
    getKanbanSteps,
    updateKanbanStep,
  } = useContext(ConfigContext);

  const handleChangeKanbanStepsState = useCallback((newState: KanbanStep[]): void => {
    changeKanbanStepState(newState);
  },[changeKanbanStepState]);

  const handleEditKanbanStepBase = useCallback(event => {
    const { name, value } = event.target;

    setKanbanStepBase(state => ({ ...state, [name]: value }));
  }, []);

  const handleUpdateKanbanStep = useCallback(async () => {
    await updateKanbanStep(kanbanStep.id, kanbanStepBase.title);
    setIsEditable(false);
    const result = await getKanbanSteps();
    handleChangeKanbanStepsState(result);
  }, [
    updateKanbanStep,
    getKanbanSteps,
    handleChangeKanbanStepsState,
    kanbanStepBase,
    kanbanStep.id,
  ]);

  useEffect(() => {
    setKanbanStepBase(kanbanStep);

    if (isCreate) {
      setIsEditable(true);
    }
  }, [kanbanStep, isCreate]);
        return (
          <InputWrapper>
            <ToForm>
              <Index>{index + 1}.</Index>
              <Content>
                <Draft>
                  <Text>Título</Text>
                  <CustomInput
                    value={kanbanStepBase?.title}
                    name="title"
                    onChange={handleEditKanbanStepBase}
                    placeholder="Título"
                    type="text"
                    disabled={!isEditable}
                  />
                </Draft>
                <Actions>
                  {isEditable ? (
                    <IconButton
                      onClick={handleUpdateKanbanStep}
                    >
                      <FiCheck size={20} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setIsEditable(true)}>
                      <FiEdit2 size={20} />
                    </IconButton>
                  )}
                </Actions>
              </Content>
            </ToForm>
          </InputWrapper>
        )
};
