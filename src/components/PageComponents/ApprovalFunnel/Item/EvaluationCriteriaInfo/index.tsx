import { Idea } from 'interfaces/idea';
import { useEffect, useState } from 'react';
import { EvaluationCriteriasData } from 'interfaces/evaluationCriteriasData ';
import { EvaluationStepStatus } from '../../InteractionPanelTabs/Components/EvaluationStepStatus';
import { EvaluationRateResult } from '../../InteractionPanelTabs/Components/EvaluationRateResult';
import { PendingMessage } from './PendingMessage';

export const EvaluationCriteriaInfo: React.FC<{ idea: Idea }> = ({
  idea,
}): JSX.Element => {
  const [numberOfPending, setNumberOfPendings] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const [filteredEvaluationCriterias, setFilteredEvaluationCriterias] =
    useState<EvaluationCriteriasData[]>([]);

  useEffect(() => {
    setNumberOfPendings(
      new Set(
        idea.evaluationCriteriasData
          .filter(
            evaluationCriteria =>
              evaluationCriteria.criteriaRate === 0 &&
              evaluationCriteria.evaluationCriteriasCampaignMetadata
                .criteriaStep === idea.kanbanStep
          )
          .map(evaluationCriteria => evaluationCriteria.userEvaluator.id)
      ).size
    );
    setFilteredEvaluationCriterias(
      idea.evaluationCriteriasData.filter(
        evaluationCriteria =>
          evaluationCriteria.evaluationCriteriasCampaignMetadata
            .criteriaStep === idea.kanbanStep
      )
    );
  }, [idea]);

  useEffect(() => {
    setIsPending(numberOfPending > 0);
    setMessage(() => {
      if (numberOfPending === 0) {
        return 'Avaliação finalizada';
      }
      if (numberOfPending === 1) {
        return '1 avaliador pendente';
      }
      if (numberOfPending > 1) {
        return `${numberOfPending} avaliadores pendentes`;
      }
    });
  }, [numberOfPending]);

  return (
    <div>
      <EvaluationStepStatus isPending={isPending} message={message} />
      {!isPending ? (
        <EvaluationRateResult
          isForCardIdeas
          evaluationCriteriasData={filteredEvaluationCriterias}
        />
      ) : (
        <PendingMessage idea={idea} />
      )}
    </div>
  );
};
