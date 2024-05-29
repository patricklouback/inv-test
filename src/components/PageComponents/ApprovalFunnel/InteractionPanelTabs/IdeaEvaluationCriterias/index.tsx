import { EvaluationCriteriasData } from 'interfaces/evaluationCriteriasData ';
import { User } from 'interfaces/user';
import { DirectApproval, Idea } from 'interfaces/idea';
import { useContext, useEffect } from 'react';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { Container, Description } from './styles';
import { EvaluationCriteriaComponent } from './EvaluationCriteriaComponent';
import { IdeaComments } from '../Components/IdeaComments';

const showableEvaluationCriterias = {
  SCREENING: ['SCREENING'],
  ANALYZE: ['SCREENING', 'ANALYZE'],
  SELECT: ['SCREENING', 'ANALYZE', 'SELECT'],
  IMPLEMENTED: ['SCREENING', 'ANALYZE', 'SELECT', 'IMPLEMENTED'],
};

const mapStepName = {
  SCREENING: { name: 'Triagem', order: 1 },
  ANALYZE: { name: 'Em análise', order: 2 },
  IMPLEMENTED: { name: 'Em implementação', order: 4 },
};

export const IdeaEvaluationCriterias: React.FC<{
  evaluationCriteriasData: EvaluationCriteriasData[];
  ideaStep?: string;
  evaluatorUsersData: User[];
  scrolledToEvaluationCriterias: boolean;
  directApprovals: DirectApproval[];
  directApprovalsUsers: User[];
  setScrolledToEvaluationCriterias: (value: boolean) => void;
  idea: Idea;
}> = ({
  evaluationCriteriasData,
  evaluatorUsersData,
  scrolledToEvaluationCriterias,
  setScrolledToEvaluationCriterias,
  ideaStep,
  directApprovals,
  directApprovalsUsers,
  idea,
}): JSX.Element => {
  const { getIdeaComments, ideaComments } = useContext(IdeaCommentContext);
  const evaluationCriteriaByStepBuilder = (): any => {
    const evaluationCriteriasDataReduced = evaluationCriteriasData.reduce(
      (acc, evaluationCriteria) => {
        if (
          !acc[
            evaluationCriteria.evaluationCriteriasCampaignMetadata.criteriaStep
          ]
        ) {
          acc[
            evaluationCriteria.evaluationCriteriasCampaignMetadata.criteriaStep
          ] = [];
        }
        acc[
          evaluationCriteria.evaluationCriteriasCampaignMetadata.criteriaStep
        ].push(evaluationCriteria);
        return acc;
      },
      {} as { [key: string]: EvaluationCriteriasData[] }
    );
    return Object.keys(evaluationCriteriasDataReduced)
      .map(key => ({
        step: key,
        evaluationCriteriasData: evaluationCriteriasDataReduced[key],
      }))
      .filter(item => showableEvaluationCriterias[ideaStep].includes(item.step))
      .sort((a, b) => {
        return mapStepName[a.step].order - mapStepName[b.step].order;
      });
  };

  useEffect(() => {
    getIdeaComments(idea.id, { type: ['EVALUATION_CRITERIA'] });
  }, [idea]);

  return (
    <Container>
      <Description>
        Os critérios são distribuídos de acordo com a etapa do funil. Você pode
        avaliar apenas a(s) etapa(s) em que foi designado. Esse espaço é
        restrito aos avaliadores.
      </Description>
      {evaluationCriteriaByStepBuilder().map((item, index) => (
        <EvaluationCriteriaComponent
          directApprovals={directApprovals}
          directApprovalsUsers={directApprovalsUsers}
          ideaStep={ideaStep}
          step={item.step}
          scrolledToEvaluationCriterias={scrolledToEvaluationCriterias}
          setScrolledToEvaluationCriterias={setScrolledToEvaluationCriterias}
          evaluationCriteriasData={item.evaluationCriteriasData}
          evaluatorUsersData={evaluatorUsersData}
        />
      ))}
      <IdeaComments
        type={['EVALUATION_CRITERIA']}
        idea={idea}
        ideasIds={[idea.id]}
        ideaStepSelected={null}
        showComments
        ideaFilteredComments={ideaComments}
      />
    </Container>
  );
};
