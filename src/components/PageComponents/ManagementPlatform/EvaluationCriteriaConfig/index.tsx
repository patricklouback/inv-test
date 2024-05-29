import React, { useContext, useEffect } from 'react';
import { EvaluationCriteriaConfigurationContext } from 'contexts/EvaluationCriteriaConfiguration';
import { EvaluationCriteria } from './EvaluationCriteria';

export const EvaluationCriteriaConfig: React.FC = (): JSX.Element => {
  const {
    getEvaluationCriteriaConfig,
    evaluationCriteriasConfig,
    updateEvaluationCriteriaConfig,
    createEvaluationCriteriaConfig,
    deleteEvaluationCriteriaConfig
  } = useContext(EvaluationCriteriaConfigurationContext);
  useEffect(() => {
    getEvaluationCriteriaConfig();
  }, []);
  return (
    <EvaluationCriteria
      hideToggle
      isToggleActive
      evaluationCriterias={evaluationCriteriasConfig}
      updateEvaluationCriteria={updateEvaluationCriteriaConfig}
      createEvaluationCriteria={createEvaluationCriteriaConfig}
      deleteEvaluationCriteria={deleteEvaluationCriteriaConfig}
    />
  );
};
