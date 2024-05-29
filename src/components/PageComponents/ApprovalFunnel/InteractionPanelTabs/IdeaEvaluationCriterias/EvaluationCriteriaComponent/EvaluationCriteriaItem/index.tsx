import { EvaluationCriteriasData } from 'interfaces/evaluationCriteriasData ';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'contexts/User';
import { IdeaKanbamStep } from 'interfaces/idea';
import {
  Container,
  ActionOrStatus,
  EvaluateButton,
  EvaluationStepFinishedWrapper,
  PartialRate,
  User,
} from './style';
import { EvaluationStepStatus } from '../../../Components/EvaluationStepStatus';
import { EvaluationModal } from './EvaluationModal';
import { UserComponent } from '../../../Components/UserComponent';

export const EvaluationCriteriaItem: React.FC<{
  userEvaluationCriteriasData: {
    userId: string;
    userImage: string;
    userArea: string;
    userName: string;
    evaluationCriteriasData: EvaluationCriteriasData[];
  };
  step: IdeaKanbamStep;
}> = ({ userEvaluationCriteriasData }, step): JSX.Element => {
  const { user } = useContext(UserContext);
  const [partialPontuation, setPartialPontuation] = useState(0);
  const [isAllEvaluated, setIsAllEvaluated] = useState(false);

  useEffect(() => {
    setIsAllEvaluated(
      userEvaluationCriteriasData.evaluationCriteriasData.filter(
        evaluationCriteria => evaluationCriteria.criteriaRate === 0
      ).length === 0
    );
  }, [userEvaluationCriteriasData.evaluationCriteriasData]);

  const isLoggedUser = user.id === userEvaluationCriteriasData.userId;

  useEffect(() => {
    if (isAllEvaluated) {
      setPartialPontuation(
        Math.round(
          (20 *
            userEvaluationCriteriasData.evaluationCriteriasData.reduce(
              (acc, evaluationCriteria) =>
                acc +
                evaluationCriteria.criteriaRate *
                  evaluationCriteria.evaluationCriteriasCampaignMetadata
                    .criteriaWeight,
              0
            )) /
            userEvaluationCriteriasData.evaluationCriteriasData.reduce(
              (acc, evaluationCriteria) =>
                acc +
                evaluationCriteria.evaluationCriteriasCampaignMetadata
                  .criteriaWeight,
              0
            )
        )
      );
    }
  }, [isAllEvaluated]);

  const [showEvaluationModal, setShowEvaluationModal] = useState(false);

  const [evaluationCriteriasModal, setEvaluationCriteriasModal] = useState<
    EvaluationCriteriasData[]
  >([]);

  const handleShowModal = (): void => {
    setEvaluationCriteriasModal(
      userEvaluationCriteriasData.evaluationCriteriasData
    );
    setShowEvaluationModal(true);
  };

  return (
    <Container>
      {showEvaluationModal && (
        <EvaluationModal
          setShowModal={setShowEvaluationModal}
          evaluationCriteriasData={evaluationCriteriasModal}
        />
      )}
      <User>
        <UserComponent
          userArea={userEvaluationCriteriasData.userArea}
          userName={userEvaluationCriteriasData.userName}
          userImage={userEvaluationCriteriasData?.userImage}
        />
      </User>
      <ActionOrStatus>
        {isAllEvaluated && (
          <EvaluationStepFinishedWrapper>
            <EvaluationStepStatus message="Concluída" isPending={false} />
            <PartialRate>{`Pontuação parcial: ${partialPontuation}`}</PartialRate>
          </EvaluationStepFinishedWrapper>
        )}
        {!isAllEvaluated && !isLoggedUser && (
          <EvaluationStepStatus message="Pendente" isPending />
        )}
        {!isAllEvaluated && isLoggedUser && (
          <EvaluateButton onClick={handleShowModal}>Avaliar</EvaluateButton>
        )}
      </ActionOrStatus>
    </Container>
  );
};
