import { EvaluationCriteriasData } from 'interfaces/evaluationCriteriasData ';
import { ToolTip } from '@components/TooltipComponent';
import { useEffect, useState } from 'react';
import {
  Content,
  EvaluationResultBox,
  EvaluationResultBoxCardIdea,
  EvaluationResultContainer,
  PointsResult,
  Result,
  TooltipContainer,
} from './styles';

const TEXT_TOOLTIP =
  'O cálculo da pontuação é feito em duas etapas: \n\n' +
  '1. Média ponderada conforme peso <b>dos critérios</b> e notas enviadas.\n' +
  '2. Média aritmética <b>dos avaliadores</b>';

export const EvaluationRateResult: React.FC<{
  evaluationCriteriasData: EvaluationCriteriasData[];
  isForCardIdeas?: boolean;
}> = ({ evaluationCriteriasData, isForCardIdeas }): JSX.Element => {
  const [totalPoints, setTotalPoints] = useState(0);

  const pointsResult = (): number => {
    return Math.round(
      (evaluationCriteriasData.reduce(
        (acc, evaluationCriteria) =>
          acc +
          evaluationCriteria.criteriaRate *
            evaluationCriteria.evaluationCriteriasCampaignMetadata
              .criteriaWeight,
        0
      ) *
        20) /
        evaluationCriteriasData.reduce(
          (acc, evaluationCriteria) =>
            acc +
            evaluationCriteria.evaluationCriteriasCampaignMetadata
              .criteriaWeight,
          0
        )
    );
  };

  useEffect(() => {
    setTotalPoints(pointsResult());
  }, [evaluationCriteriasData]);
  return (
    <Content>
      {isForCardIdeas ? (
        <EvaluationResultContainer isForCardIdea={isForCardIdeas}>
          <EvaluationResultBoxCardIdea>
            <Result>
              Pontuação obtida:&nbsp;&nbsp;&nbsp;
              <PointsResult>{`${totalPoints}`}</PointsResult>
              /100 pts
            </Result>
            <TooltipContainer>
              <ToolTip textWidth={300} centralizeText text={TEXT_TOOLTIP} />
            </TooltipContainer>
          </EvaluationResultBoxCardIdea>
        </EvaluationResultContainer>
      ) : (
        <EvaluationResultContainer>
          <EvaluationResultBox>
            <Result>
              Pontuação total: <PointsResult>{totalPoints}</PointsResult>
              /100
            </Result>
            <TooltipContainer>
              <ToolTip textWidth={300} centralizeText text={TEXT_TOOLTIP} />
            </TooltipContainer>
          </EvaluationResultBox>
        </EvaluationResultContainer>
      )}
    </Content>
  );
};
