import { Input } from '@components/InputText';
import {
  CampaignStep,
  CampaignStepItem,
  CampaignStepType,
} from 'interfaces/campaign';
import { SetStateAction } from 'react';
import { FiCheck, FiPenTool, FiX } from 'react-icons/fi';
import { StepItemContainerWrapper } from './styles';

interface StepItemContainerProps {
  selected: boolean;
  valueChanged: string;
  setValueChanged: (value: SetStateAction<string>) => void;
  handleRemoveStepItem: (
    campaignStepItemId: string,
    campaignStepId: string,
    type: CampaignStepType
  ) => Promise<void>;
  handleEditStepItem: (
    stepItemEdited: CampaignStepItem,
    type: CampaignStepType
  ) => void;
  handleUpdateStepItem: (type: CampaignStepType) => Promise<void>;
  stepItem: CampaignStepItem;
  campaignStep: CampaignStep;
  type: CampaignStepType;
}

export const StepItemContainer = ({
  selected,
  valueChanged,
  setValueChanged,
  handleRemoveStepItem,
  handleUpdateStepItem,
  handleEditStepItem,
  stepItem,
  campaignStep,
  type,
}: StepItemContainerProps): JSX.Element => {
  return (
    <StepItemContainerWrapper>
      <Input
        disabled={!selected}
        value={selected ? valueChanged : stepItem.title}
        onChange={event => setValueChanged(event.target.value)}
      />
      <button
        type="button"
        onClick={() => handleRemoveStepItem(stepItem.id, campaignStep.id, type)}
      >
        <FiX size={24} />
      </button>
      <button
        type="button"
        onClick={() =>
          selected
            ? handleUpdateStepItem(type)
            : handleEditStepItem(stepItem, type)
        }
      >
        {selected ? <FiCheck size={24} /> : <FiPenTool size={24} />}
      </button>
    </StepItemContainerWrapper>
  );
};
