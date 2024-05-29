import { UserContext } from 'contexts/User';
import { EvaluationCriteriasData } from 'interfaces/evaluationCriteriasData ';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineExclamation } from 'react-icons/ai';
import { Idea } from 'interfaces/idea';
import { MessageWrapper, Skeleton, WarningIconWrapper } from './styles';
// import WarningSvg from '../../../../../../assets/inventta/Warning.svg';
import FullCheckSvg from '../../../../../../assets/inventta/FullCheck.svg';

export const PendingMessage: React.FC<{
  idea: Idea;
}> = ({ idea }): JSX.Element => {
  const { user, getUser, loading } = useContext(UserContext);
  const [isUserPending, setIsUserPending] = useState<boolean>(false);
  const [isCriteriaPending, setIsCriteriaPending] = useState<boolean>(false);
  useEffect(() => {
    getUser();
  }, [idea]);

  useEffect(() => {
    const evaluationCriterias = idea.evaluationCriteriasData.filter(
      evaluationCriteria => {
        const isCriteriaRateZero = evaluationCriteria.criteriaRate === 0;
        const isCriteriaStep =
          evaluationCriteria.evaluationCriteriasCampaignMetadata
            .criteriaStep === idea.kanbanStep;
        return isCriteriaRateZero && isCriteriaStep;
      }
    );

    const isCriteriaPending = evaluationCriterias.length > 0;

    const isUserPending = evaluationCriterias.some(
      ec => ec.userEvaluator.id === user.id
    );

    setIsUserPending(isUserPending);
    setIsCriteriaPending(isCriteriaPending);
  }, [idea, user]);

  if (!isUserPending) return null;

  return (
    <div>
      {loading && <Skeleton />}
      {!loading &&
        (isCriteriaPending ? (
          <MessageWrapper>
            <WarningIconWrapper>
              <AiOutlineExclamation />
            </WarningIconWrapper>
            <div>Faça a sua avaliação!</div>
          </MessageWrapper>
        ) : (
          <MessageWrapper>
            <FullCheckSvg />
            <div>Você concluiu sua avaliação!</div>
          </MessageWrapper>
        ))}
    </div>
  );
};
