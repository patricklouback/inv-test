import { EvaluationCriteriasData } from 'interfaces/evaluationCriteriasData ';
import { useEffect, useState } from 'react';
import { User } from 'interfaces/user';
import { DirectApproval, IdeaKanbamStep } from 'interfaces/idea';
import {
  BodyContent,
  Container,
  Content,
  Header,
  HeaderLeft,
  HeaderRight,
  Item,
  ItemDescription,
  ShowLess,
  ShowMore,
  StepName,
  UserWrapper,
} from './styles';
import { EvaluationCriteriaItem } from './EvaluationCriteriaItem';
import { EvaluationStepStatus } from '../../Components/EvaluationStepStatus';
import { EvaluationRateResult } from '../../Components/EvaluationRateResult';
import { UserComponent } from '../../Components/UserComponent';

const mapStepName = {
  SCREENING: { name: 'Triagem', order: 1 },
  ANALYZE: { name: 'Em análise', order: 2 },
  IMPLEMENTED: { name: 'Em implementação', order: 4 },
};

export const EvaluationCriteriaComponent: React.FC<{
  directApprovals: DirectApproval[];
  directApprovalsUsers: User[];
  evaluationCriteriasData: EvaluationCriteriasData[];
  step?: string;
  ideaStep?: string;
  evaluatorUsersData: User[];
  scrolledToEvaluationCriterias: boolean;
  setScrolledToEvaluationCriterias: (value: boolean) => void;
}> = ({
  evaluationCriteriasData,
  step,
  evaluatorUsersData,
  scrolledToEvaluationCriterias,
  setScrolledToEvaluationCriterias,
  ideaStep,
  directApprovals,
  directApprovalsUsers,
}): JSX.Element => {
  const [numberOfPending, setNumberOfPendings] = useState(0);
  const [message, setMessage] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [isDirectApproval, setIsDirectApproval] = useState(false);
  const [evaluationCriteriaWasUnvailable, setEvaluationCriteriaWasUnvailable] =
    useState(false);

  const [evaluationCriteriaByStep, setEvaluationCriteriaByStep] = useState([]);

  const evaluationCriteriaByStepBuilder = (): any => {
    const evaluationCriteriasDataReduced = evaluationCriteriasData.reduce(
      (acc, evaluationCriteria) => {
        if (!acc[evaluationCriteria.userEvaluator.id]) {
          acc[evaluationCriteria.userEvaluator.id] = [];
        }
        acc[evaluationCriteria.userEvaluator.id].push(evaluationCriteria);
        return acc;
      },
      {} as { [key: string]: EvaluationCriteriasData[] }
    );
    return Object.keys(evaluationCriteriasDataReduced).map(key => ({
      userId: key,
      userImage: evaluatorUsersData.find(user => user.id === key)?.image,
      userArea: evaluatorUsersData.find(user => user.id === key)?.area?.name,
      userName: evaluatorUsersData.find(user => user.id === key)?.name,
      evaluationCriteriasData: evaluationCriteriasDataReduced[key],
    }));
  };

  useEffect(() => {
    setEvaluationCriteriaByStep(evaluationCriteriaByStepBuilder());
  }, [evaluationCriteriasData]);

  useEffect(() => {
    if (step !== ideaStep && numberOfPending > 0 && !isDirectApproval) {
      setEvaluationCriteriaWasUnvailable(true);
    }
  }, [numberOfPending]);

  useEffect(() => {
    setNumberOfPendings(
      new Set(
        evaluationCriteriasData
          .filter(evaluationCriteria => evaluationCriteria.criteriaRate === 0)
          .map(evaluationCriteria => evaluationCriteria.userEvaluator.id)
      ).size
    );
  }, [evaluationCriteriasData]);

  useEffect(() => {
    setIsDirectApproval(
      directApprovals.filter(
        directApproval => directApproval.kanbanStep === step
      ).length > 0
    );
  }, [directApprovals]);

  useEffect(() => {
    setMessage(() => {
      if (isDirectApproval) {
        return 'Aprovação direta';
      }
      if (numberOfPending === 0) {
        return 'Avaliação finalizada';
      }
      if (evaluationCriteriaWasUnvailable) {
        return 'A avaliação de critérios não estava disponível ou houve alteração em algum dos critérios';
      }
      if (numberOfPending === 1) {
        return '1 avaliador pendente';
      }
      if (numberOfPending > 1) {
        return `${numberOfPending} avaliadores pendentes`;
      }
    });
  }, [numberOfPending, evaluationCriteriaWasUnvailable]);

  useEffect(() => {
    if (scrolledToEvaluationCriterias && step === ideaStep) {
      setShowContent(true);
      setScrolledToEvaluationCriterias(false);
    }
  }, [scrolledToEvaluationCriterias]);

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <StepName>{mapStepName[step].name}</StepName>
          <EvaluationStepStatus
            isDirectApproval={
              isDirectApproval || evaluationCriteriaWasUnvailable
            }
            isPending={numberOfPending > 0}
            message={message}
          />
        </HeaderLeft>
        {!evaluationCriteriaWasUnvailable && (
          <HeaderRight onClick={() => setShowContent(!showContent)}>
            {showContent ? <ShowLess /> : <ShowMore />}
          </HeaderRight>
        )}
      </Header>
      {showContent &&
        (isDirectApproval ? (
          <BodyContent>
            <Content>
              <Item>Análise da etaoa</Item>
              <ItemDescription>
                {
                  directApprovals.find(
                    directApproval => directApproval.kanbanStep === step
                  ).analysis
                }
              </ItemDescription>
              <Item>Justificativa para a aprovação direta</Item>
              <ItemDescription>
                {
                  directApprovals.find(
                    directApproval => directApproval.kanbanStep === step
                  ).explanation
                }
              </ItemDescription>
              <Item>Responsável pela aprovação</Item>
              <UserWrapper>
                <UserComponent
                  userArea={
                    directApprovalsUsers?.find(
                      user =>
                        user.id ===
                        directApprovals?.find(
                          directApproval => directApproval.kanbanStep === step
                        ).userId
                    )?.area?.name
                  }
                  userName={
                    directApprovalsUsers?.find(
                      user =>
                        user.id ===
                        directApprovals?.find(
                          directApproval => directApproval.kanbanStep === step
                        ).userId
                    )?.name
                  }
                  userImage={
                    directApprovalsUsers?.find(
                      user =>
                        user.id ===
                        directApprovals?.find(
                          directApproval => directApproval.kanbanStep === step
                        ).userId
                    )?.image
                  }
                />
              </UserWrapper>
            </Content>
          </BodyContent>
        ) : (
          <div>
            {!evaluationCriteriaWasUnvailable && (
              <div>
                <BodyContent>
                  {evaluationCriteriaByStep.map((item, index) => (
                    <EvaluationCriteriaItem
                      userEvaluationCriteriasData={item}
                      step={step as IdeaKanbamStep}
                    />
                  ))}
                </BodyContent>
                <EvaluationRateResult
                  evaluationCriteriasData={evaluationCriteriasData}
                />
              </div>
            )}
          </div>
        ))}
    </Container>
  );
};
