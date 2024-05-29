import { CampaignStep } from 'interfaces/campaign';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { FiCheck, FiX } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { normalizeString } from 'utils/normalizeString';
import { ItemStep } from '../../item';
import {
  AddStep,
  Circle,
  DeleteStep,
  Draft,
  Gate,
  ItemStepp,
  Line,
  Rotate,
  Value,
  ValueBox,
  ValueGate,
} from './styles';

interface CampaignStepSelected extends CampaignStep {
  index?: number;
}
interface StepProps {
  handleSelectStep: (any) => void;
  item: CampaignStep;
  index: number;
  campaignStepSelected: CampaignStepSelected;
  isCreating: boolean;
  createOrUpdateStepName: (item: CampaignStep) => Promise<string>;
  deleteStep: (id: string, campaignId?: string) => Promise<void> | void;
  unselectedColor: '#67D1C4' | '#fff' | '#F6F6F8';
  selectedColor: '#67D1C4' | '#fff' | '#F6F6F8';
  editable?: boolean;
}

export const StepComponent: React.FC<StepProps> = ({
  handleSelectStep,
  item,
  index,
  isCreating,
  campaignStepSelected,
  createOrUpdateStepName,
  deleteStep,
  unselectedColor,
  selectedColor,
  editable = true,
}): JSX.Element => {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(isCreating);
  const [itemEditTitle, setItemEditTitle] = useState<string>();

  const handleCreateStep = async (): Promise<void> => {
    const newItem = { ...item };
    newItem.title = itemEditTitle;
    const response = await createOrUpdateStepName(newItem);
    if (response === 'OK') {
      setIsEditing(false);
    }
  };
  const handleDeleteStep = async (): Promise<void> => {
    await deleteStep(item.id, item.campaignId);
  };
  const handleStepEdit = (newTitle: string): void => {
    setItemEditTitle(newTitle);
  };
  const handleKeyDown = (event): void => {
    if (event.key === 'Enter') {
      handleCreateStep();
    }
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const cancelEdit = (): void => {
    setIsEditing(false);
    if (isCreating) {
      deleteStep(null);
    }
  };

  return (
    <ItemStepp key={item.id}>
      {isEditing ? (
        <ValueBox>
          <Value
            autoFocus
            defaultValue={item.title}
            onChange={event => handleStepEdit(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </ValueBox>
      ) : (
        <ValueBox
          colorActive={campaignStepSelected.id !== item.id}
          className="value"
        >
          {item.title}
        </ValueBox>
      )}
      <ItemStep
        colors={
          item.id === campaignStepSelected?.id ? selectedColor : unselectedColor
        }
      />
      {editable ? (
        <>
          <AddStep
            backgroundColor={
              unselectedColor === '#fff' ? unselectedColor : 'none'
            }
          >
            {isEditing ? (
              <FiCheck size={22} onClick={() => handleCreateStep()} />
            ) : (
              <MdOutlineModeEdit
                id="edit"
                size={20}
                onClick={() => setIsEditing(true)}
              />
            )}
          </AddStep>
          <DeleteStep
            backgroundColor={
              unselectedColor === '#fff' ? unselectedColor : 'none'
            }
          >
            {isEditing ? (
              <FiX size={22} onClick={cancelEdit} />
            ) : (
              <RiDeleteBinLine size={22} onClick={() => handleDeleteStep()} />
            )}
          </DeleteStep>
        </>
      ) : null}
      <Rotate
        rotate={item.id === campaignStepSelected?.id}
        onClick={() => handleSelectStep({ ...item, index })}
      >
        <BiChevronDown
          size={24}
          color={colors.background}
          className={`button-${normalizeString(item.title)}`}
        />
      </Rotate>
      <Draft>
        <Line />
        <Line />
        <Line />
        <Gate>
          <ValueGate>Gate {1 + index}</ValueGate>
          <Circle status={index <= campaignStepSelected?.index}>
            <BsCheck color={colors.background} size={20} />
          </Circle>
        </Gate>
        <>
          <Line />
          <Line />
          <Line />
        </>
      </Draft>
    </ItemStepp>
  );
};
