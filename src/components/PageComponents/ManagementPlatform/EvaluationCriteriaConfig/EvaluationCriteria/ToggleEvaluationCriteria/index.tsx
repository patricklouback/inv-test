import React from 'react';
import { AntSwitch, Content, SwitchContent, TextAsking } from './style';

interface ToggleEvaluationCriteriaProps {
  isActive: boolean;
  toggleEvaluationCriteria: () => Promise<void>;
}
export const ToggleEvaluationCriteria: React.FC<ToggleEvaluationCriteriaProps> = ({isActive, toggleEvaluationCriteria}): JSX.Element => {
  return (
    <Content>
      <TextAsking>
        Deseja utilizar critérios para a avaliação das inciativas?
      </TextAsking>
      <SwitchContent onClick={toggleEvaluationCriteria}>
        <AntSwitch
          disabled={false}
          state={
            isActive
          }
        />
      </SwitchContent>
    </Content>
  );
};
