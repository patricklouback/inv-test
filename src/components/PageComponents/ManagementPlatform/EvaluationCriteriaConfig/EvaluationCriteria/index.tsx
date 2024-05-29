import Collapsible from 'react-collapsible';
import { RiEdit2Line } from 'react-icons/ri';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { IEvaluationCriteria } from 'interfaces/evaluationCriteria';
import { Campaign } from '@default-types';
import {
  ButtonAddCriteria,
  ButtonValue,
  DisclaimerAndFilterWrapper,
  Section,
} from './style';
import { RenderHeader } from '../../RenderHeader';
import { ToggleEvaluationCriteria } from './ToggleEvaluationCriteria';
import { EvaluationCriteriaContent } from './EvaluationCriteriaContent';
import { EvaluationCriteriaDisclaimer } from './EvaluationCriteriaDisclaimer';
import { FilteredEvaluationCriteria } from './FilteredEvaluationCriteria';

interface EvaluationCriteriaProps {
  hideHeader?: boolean;
  hideToggle?: boolean;
  evaluationCriterias: IEvaluationCriteria[];
  updateEvaluationCriteria?: (
    evaluationCriteriaId: string,
    newEvaluationCriteria: IEvaluationCriteria
  ) => Promise<{ updated: boolean }>;
  createEvaluationCriteria?: (
    newEvaluationCriteria: IEvaluationCriteria
  ) => Promise<{ created: boolean }>;
  deleteEvaluationCriteria?: (
    evaluationCriteriaId: string
  ) => Promise<{ deleted: boolean }>;
  isToggleActive?: boolean;
  toggleEvaluationCriteria?: () => Promise<void>;
  campaign?: Campaign;
  hideActions?: boolean;
}

export const EvaluationCriteria: React.FC<EvaluationCriteriaProps> = ({
  hideHeader,
  hideToggle,
  evaluationCriterias,
  updateEvaluationCriteria,
  createEvaluationCriteria,
  deleteEvaluationCriteria,
  isToggleActive,
  toggleEvaluationCriteria,
  campaign,
  hideActions,
}): JSX.Element => {
  const [row, setRow] = useState(true);
  const { colors } = useTheme();
  const [isCreating, setIsCreating] = useState(false);
  const [filteredevaluationCriterias, setFilteredevaluationCriterias] =
    useState<IEvaluationCriteria[]>([]);

  return (
    <Section>
      <Collapsible
        className="general"
        triggerTagName="div"
        open
        trigger={
          hideHeader ? (
            <div />
          ) : (
            <RenderHeader
              title="Gerenciamento de Critérios"
              icon={<RiEdit2Line color={colors.font} size={14} />}
              stateIcon={row}
            />
          )
        }
        onOpen={() => setRow(true)}
        onClose={() => setRow(false)}
      >
        {!hideToggle && (
          <ToggleEvaluationCriteria
            isActive={isToggleActive}
            toggleEvaluationCriteria={toggleEvaluationCriteria}
          />
        )}
        {isToggleActive && (
          <DisclaimerAndFilterWrapper>
            <EvaluationCriteriaDisclaimer marginTop={hideToggle ? '0' : '20'} />
            <FilteredEvaluationCriteria
              marginTop={hideToggle ? '10' : '24'}
              setFiltered={setFilteredevaluationCriterias}
              evaluationCriterias={evaluationCriterias}
            />
          </DisclaimerAndFilterWrapper>
        )}
        {isToggleActive &&
          filteredevaluationCriterias?.map((evaluationCriteria, index) => {
            return (
              <EvaluationCriteriaContent
                hideActions={hideActions}
                width={87}
                key={evaluationCriteria.id}
                evaluationCriteriaName={evaluationCriteria.criteriaName}
                evaluationCriteriaDescription={
                  evaluationCriteria.criteriaDescription
                }
                evaluationCriteriaStep={evaluationCriteria.criteriaStep}
                evaluationCriteriaWeight={evaluationCriteria.criteriaWeight}
                evaluationCriteriaId={evaluationCriteria.id}
                index={index}
                updateEvaluationCriteria={updateEvaluationCriteria}
                createEvaluationCriteria={createEvaluationCriteria}
                deleteEvaluationCriteria={deleteEvaluationCriteria}
                campaign={campaign}
              />
            );
          })}

        {isToggleActive &&
          !hideActions &&
          (isCreating ? (
            <EvaluationCriteriaContent
              evaluationCriteriaName=""
              evaluationCriteriaDescription=""
              evaluationCriteriaStep="ANALYZE"
              evaluationCriteriaWeight={1}
              index={evaluationCriterias.length + 1}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              updateEvaluationCriteria={updateEvaluationCriteria}
              createEvaluationCriteria={createEvaluationCriteria}
              deleteEvaluationCriteria={deleteEvaluationCriteria}
              width={hideHeader ? 87 : 95}
              campaign={campaign}
            />
          ) : (
            <ButtonAddCriteria
              type="button"
              onClick={() => setIsCreating(true)}
            >
              <FiPlus color={colors.background} size={28} />
              <ButtonValue>Adicionar novo critério</ButtonValue>
            </ButtonAddCriteria>
          ))}
      </Collapsible>
    </Section>
  );
};
