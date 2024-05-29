/* eslint-disable jsx-a11y/label-has-associated-control */
import { KanbanStep } from 'interfaces/idea';
import { ConfigContext } from 'contexts/ConfigContext';
import { useContext, useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { GrSteps } from "react-icons/gr";
import { useTheme } from 'styled-components';
import { RenderHeader } from '../RenderHeader';
import { RenderToKanbanSteps } from '../RenderToKanbanSteps';
import {
  Content,
  FormKanbanStep,
  Section,
} from './styles';

export const SectionKanbanSteps: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { getKanbanSteps } = useContext(ConfigContext);

  const [row, setRow] = useState(true);
  const [kanbanStepsState, setKanbanStepsState] = useState<KanbanStep[]>([]);


  const changeKanbanStepsState = (newState: KanbanStep[]): void => {
    setKanbanStepsState(newState);
  }

  useEffect(() => {
    const loadKanbanSteps = async (): Promise<void> => {
      const result = await getKanbanSteps();
      setKanbanStepsState(result);
    }
    loadKanbanSteps();
  }, [getKanbanSteps]);

  return (
    <Section>
      <Collapsible
        className="general"
        triggerTagName="div"
        open
        trigger={
          <RenderHeader
            title="Alterar títulos das etapas do Funil"
            icon={<GrSteps color={colors.font} size={14} />}
            stateIcon={row}
          />
        }
        onOpen={() => setRow(true)}
        onClose={() => setRow(false)}
      >
        <Content>
        {kanbanStepsState?.length > 0 && (
          <FormKanbanStep>
            {kanbanStepsState.map((item, index) => (
              <RenderToKanbanSteps kanbanStep={item} index={index} key={item.id} changeKanbanStepState={changeKanbanStepsState} />
            ))}
          </FormKanbanStep>
        )}
        </Content>
      </Collapsible>
    </Section>
  );
};
