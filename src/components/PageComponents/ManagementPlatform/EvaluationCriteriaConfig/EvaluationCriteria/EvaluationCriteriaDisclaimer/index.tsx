import React from 'react';
import { Content, Part1, Part2 } from './style';

interface EvaluationCriteriaDisclaimerProps {
  marginTop: string;
}

export const EvaluationCriteriaDisclaimer: React.FC<
  EvaluationCriteriaDisclaimerProps
> = ({ marginTop }): JSX.Element => {
  return (
    <Content marginTop={marginTop}>
      <Part1>
        A pontuação será baseada no peso do critério e em notas que variam de 1
        a 5, em ordem crescente
      </Part1>
      <Part2>
        Você precisa adicionar pelo menos um critério para cada etapa!
      </Part2>
    </Content>
  );
};
