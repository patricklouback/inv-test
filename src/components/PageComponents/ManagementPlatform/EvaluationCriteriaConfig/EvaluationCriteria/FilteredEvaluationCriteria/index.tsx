import { DropdownFilter } from '@components/DropdownFilter';
import { useEffect, useState } from 'react';
import { Content } from './style';

const StepOptions = [
  {
    name: 'Triagem',
    value: 'SCREENING',
  },
  {
    name: 'Em análise',
    value: 'ANALYZE',
  },
  {
    name: 'Em implementação',
    value: 'IMPLEMENTED',
  },
];

const StatusOption = [
  {
    name: 'Concluido',
    value: 'rated',
  },
  {
    name: 'Pendente',
    value: 'pending',
  },
  {
    name: 'Aprovação direta',
    value: 'directApproved',
  },
];

export const FilteredEvaluationCriteria: React.FC<{
  setFiltered;
  evaluationCriterias;
  marginTop;
  border?;
  title?;
  status?;
}> = ({
  setFiltered,
  evaluationCriterias,
  marginTop,
  border,
  title,
  status,
}): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setFiltered(
      status
        ? evaluationCriterias.filter(evaluationCriteriaConfig => {
            return (
              selectedItems.length === 0 ||
              selectedItems.some(
                item => item === evaluationCriteriaConfig.status
              )
            );
          })
        : evaluationCriterias.filter(evaluationCriteriaConfig => {
            return (
              selectedItems.length === 0 ||
              selectedItems.some(
                item => item === evaluationCriteriaConfig.criteriaStep
              )
            );
          })
    );
  }, [selectedItems, evaluationCriterias]);

  const handleSelect = (id: string, checked: boolean): void => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  return (
    <Content marginTop={marginTop}>
      <DropdownFilter
        border={border}
        itemsList={status ? StatusOption : StepOptions}
        selectedItems={selectedItems}
        handleSelect={handleSelect}
        filterTitle={title || 'Etapa'}
      />
    </Content>
  );
};
