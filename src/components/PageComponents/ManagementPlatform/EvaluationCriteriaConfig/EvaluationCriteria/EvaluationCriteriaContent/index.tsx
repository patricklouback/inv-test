import React, { useRef, useState } from 'react';
import { SelectOption } from '@components/SelectOption';
import { EditAndCheck } from '@components/ActionsButton/EditAndCheck';
import { DeleteOrCancel } from '@components/ActionsButton/DeleteOrCancel';
import { IEvaluationCriteria } from 'interfaces/evaluationCriteria';
import { Modal } from '@components/Modals/Modal';
import Button from '@components/Button';
import { Campaign } from '@default-types';
import {
  Action,
  ButtonBackAndSend,
  Content,
  CustomInput,
  CustomTextArea,
  Draft,
  Index,
  Text,
  WarningDescription,
  WarningTitle,
} from './style';

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

const WeightOptions = [
  {
    name: '1',
    value: '1',
  },
  {
    name: '2',
    value: '2',
  },
  {
    name: '3',
    value: '3',
  },
  {
    name: '4',
    value: '4',
  },
  {
    name: '5',
    value: '5',
  },
];

export const EvaluationCriteriaContent: React.FC<{
  evaluationCriteriaName: string;
  evaluationCriteriaDescription: string;
  evaluationCriteriaStep: string;
  evaluationCriteriaWeight: number;
  evaluationCriteriaId?: string;
  isCreating?: boolean;
  width: number;
  setIsCreating?: (value: boolean) => void;
  index: number;
  updateEvaluationCriteria: (
    evaluationCriteriaId: string,
    newEvaluationCriteria: IEvaluationCriteria
  ) => Promise<{ updated: boolean }>;
  createEvaluationCriteria: (
    newEvaluationCriteria: IEvaluationCriteria
  ) => Promise<{ created: boolean }>;
  deleteEvaluationCriteria: (
    evaluationCriteriaId: string
  ) => Promise<{ deleted: boolean }>;
  campaign?: Campaign;
  hideActions?: boolean;
}> = ({
  evaluationCriteriaName,
  evaluationCriteriaDescription,
  evaluationCriteriaStep,
  evaluationCriteriaWeight,
  evaluationCriteriaId,
  isCreating = false,
  setIsCreating,
  index,
  width,
  updateEvaluationCriteria,
  createEvaluationCriteria,
  deleteEvaluationCriteria,
  campaign,
  hideActions
}): JSX.Element => {
  const [isEditing, setIsEditing] = useState(isCreating);
  const [newName, setNewName] = useState(evaluationCriteriaName);
  const [newDescription, setNewDescription] = useState(
    evaluationCriteriaDescription
  );
  const [newStep, setNewStep] = useState(evaluationCriteriaStep);
  const [newWeight, setNewWeight] = useState(evaluationCriteriaWeight);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleCancelEdit = (): void => {
    setNewName(evaluationCriteriaName);
    setNewDescription(evaluationCriteriaDescription);
    setNewStep(evaluationCriteriaStep);
    setNewWeight(evaluationCriteriaWeight);
    setIsEditing(false);
    if (isCreating) setIsCreating(false);
  };
  const [action, setAction] = useState('');

  const handleUpdateEvaluationCriteria = async (): Promise<void> => {
    const newEvaluationCriteria = {
      criteriaName: newName,
      criteriaDescription: newDescription,
      criteriaStep: newStep,
      criteriaWeight: newWeight,
    };
    const result = await updateEvaluationCriteria(
      evaluationCriteriaId,
      newEvaluationCriteria
    );
    if (result.updated) setIsEditing(false);
  };

  const handleCreateEvaluationCriteria = async (): Promise<void> => {
    const newEvaluationCriteria = {
      criteriaName: newName,
      criteriaDescription: newDescription,
      criteriaStep: newStep,
      criteriaWeight: newWeight,
    };
    const result = await createEvaluationCriteria(newEvaluationCriteria);
    if (result.created) setIsCreating(false);
  };

  const handleCheck = (): void => {
    if (isCreating) {
      if (
        campaign !== null &&
        campaign !== undefined &&
        campaign.status === 'PUBLISHED'
      ) {
        setAction('create');
        setShowConfirmationModal(true);
      } else {
        handleCreateEvaluationCriteria();
      }
    } else if (
      campaign !== null &&
      campaign !== undefined &&
      campaign.status === 'PUBLISHED'
    ) {
      setAction('update');
      setShowConfirmationModal(true);
    } else {
      handleUpdateEvaluationCriteria();
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (
      campaign !== null &&
      campaign !== undefined &&
      campaign.status === 'PUBLISHED'
    ) {
      setAction('delete');
      setShowConfirmationModal(true);
    } else {
      await deleteEvaluationCriteria(evaluationCriteriaId);
    }
  };

  const descriptionElement = useRef(null);

  const handleChangeDescription = (event: any = null): void => {
    if (event) {
      setNewDescription(event.target.value);
    }
    if (descriptionElement.current) {
      descriptionElement.current.style.height = 'auto';
      descriptionElement.current.style.height = `${descriptionElement.current.scrollHeight}px`;
    }
  };

  handleChangeDescription();

  const handleConfirmation = async (): Promise<void> => {
    if (action === 'create') {
      handleCreateEvaluationCriteria();
    }
    if (action === 'update') {
      handleUpdateEvaluationCriteria();
    }
    if (action === 'delete') {
      await deleteEvaluationCriteria(evaluationCriteriaId);
    }
    setShowConfirmationModal(false);
  };

  return (
    <Content width={width}>
      <Index>{`${index + 1}.`}</Index>
      <Draft>
        <Text>Nome*</Text>
        <CustomInput
          name="name"
          value={newName}
          placeholder="Nome do critério"
          onChange={event => setNewName(event.target.value)}
          type="text"
          disabled={!isEditing}
        />
      </Draft>
      <Draft>
        <Text>Descrição</Text>
        <CustomTextArea
          ref={descriptionElement}
          name="description"
          value={newDescription}
          placeholder="Explicação do critério"
          onChange={handleChangeDescription}
          type="text"
          disabled={!isEditing}
        />
      </Draft>
      <Draft>
        <Text>Etapa*</Text>
        <SelectOption
          name="step"
          onChange={event => setNewStep(event.target.value)}
          disabled={!isEditing}
          options={StepOptions}
          height="64px"
          value={newStep}
        />
      </Draft>
      <Draft>
        <Text>Peso*</Text>
        <SelectOption
          name="weight"
          onChange={event => setNewWeight(Number(event.target.value))}
          disabled={!isEditing}
          options={WeightOptions}
          height="64px"
          value={newWeight}
        />
      </Draft>
      {!hideActions && <Action>
        <EditAndCheck
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleCheck={handleCheck}
        />
      </Action>}
      {!hideActions && <Action>
        <DeleteOrCancel
          handleDeleteItem={handleDelete}
          handleCancelEdit={handleCancelEdit}
          isEditing={isEditing}
        />
      </Action>}
      {showConfirmationModal && (
        <Modal width="440px" height="auto" hideCloseButton>
          <WarningTitle>Ação não recomendada</WarningTitle>
          <WarningDescription>
            Você está tentando fazer uma modificação em um critério que já está
            sendo utilizado.
          </WarningDescription>
          <WarningDescription>
            As avaliações concluídas da etapa serão reabertas. Deseja continuar
            mesmo assim?
          </WarningDescription>
          <ButtonBackAndSend>
            <Button
              onClick={() => setShowConfirmationModal(false)}
              max_width={184}
              isDark={false}
              border="1px solid #525556"
              color="#525556"
              //   background='none'
            >
              Voltar
            </Button>
            <Button
              max_width={184}
              onClick={handleConfirmation}
              color="white"
              background="#EF6262;
              "
            >
              Sim, modificar
            </Button>
          </ButtonBackAndSend>
        </Modal>
      )}
    </Content>
  );
};
