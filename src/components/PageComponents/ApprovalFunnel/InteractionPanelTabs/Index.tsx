import React, { useEffect, useState } from 'react';
import { Idea } from 'interfaces/idea';
import { Button, TabsWrapper } from './styles';
import { ProcessDevelop } from './ProcessDevelop';
import { IdeaEvaluationCriterias } from './IdeaEvaluationCriterias';
import { Records } from './Records';

export const InteractionPanelTabs: React.FC<{
  idea: Idea;
  setUpdateSteps: () => void;
  shouldShowEvaluationCriteria: boolean;
  scrolledToEvaluationCriterias: boolean;
  setScrolledToEvaluationCriterias: (value: boolean) => void;
}> = ({
  idea,
  setUpdateSteps,
  shouldShowEvaluationCriteria,
  scrolledToEvaluationCriterias,
  setScrolledToEvaluationCriterias,
}): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
  };

  useEffect(() => {
    if (scrolledToEvaluationCriterias) {
      setActiveTab(1);
    }
  }, [scrolledToEvaluationCriterias]);

  const removeEvaluationTabWhenNecessary = (tab: any): boolean => {
    return shouldShowEvaluationCriteria
      ? true
      : tab.title !== 'Avaliação dos critérios';
  };

  const tabs = [
    {
      title: 'Desenvolvimento',
      content: <ProcessDevelop idea={idea} setUpdateSteps={setUpdateSteps} />,
    },
    {
      title: 'Avaliação dos critérios',
      content: (
        <IdeaEvaluationCriterias
          idea={idea}
          directApprovals={idea.directApprovals}
          directApprovalsUsers={idea.directApprovalsUsers}
          ideaStep={idea.kanbanStep}
          scrolledToEvaluationCriterias={scrolledToEvaluationCriterias}
          setScrolledToEvaluationCriterias={setScrolledToEvaluationCriterias}
          evaluationCriteriasData={idea.evaluationCriteriasData}
          evaluatorUsersData={idea.evaluatorsUsers}
        />
      ),
    },
    {
      title: 'Registros',
      content: <Records ideaId={idea.id} />,
    },
  ].filter(tab => removeEvaluationTabWhenNecessary(tab));

  return (
    <div>
      <TabsWrapper>
        {tabs.map((tab, index) => (
          <Button
            selected={activeTab === index}
            key={tab.title}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </Button>
        ))}
      </TabsWrapper>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};
