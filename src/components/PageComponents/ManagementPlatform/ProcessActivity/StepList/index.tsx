import { CampaignContext } from 'contexts/Campaign';
import { CampaignStep } from 'interfaces/campaign';
import { useCallback, useContext, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { Activity } from '../Activity';
import { StepComponent } from '../Step';
import {
  ListSteps,
  NewStepButton,
  NewStepButtonValue,
  Steps,
  StepsWrapper,
} from './styles';

const initialCampaignStepState = {
  id: '',
  campaignId: '',
  title: '',
  description: '',
  sequence: 0,
  campaignStepItems: [],
};
interface CampaignStepSelected extends CampaignStep {
  index?: number;
}

interface StepProps {
  campaignId: string;
  maxWidth: string;
  unselectedColor: '#67D1C4' | '#fff' | '#F6F6F8';
  selectedColor: '#67D1C4' | '#fff' | '#F6F6F8';
  stepList: CampaignStep[];
  processActivityId: string;
  editable?: boolean;
  handleImportProcessActivities?: () => void;
}

export const StepList: React.FC<StepProps> = ({
  campaignId,
  maxWidth,
  unselectedColor,
  selectedColor,
  stepList,
  processActivityId,
  editable = true,
  handleImportProcessActivities,
}): JSX.Element => {
  const { updateStep, deleteStep, createStep } = useContext(CampaignContext);
  const { colors } = useTheme();
  const [showNewStepButton, setShowNewStepButton] = useState(true);
  const [campaignStepSelected, setCampaignStepSelected] =
    useState<CampaignStepSelected>(initialCampaignStepState);

  const handleSelectStep = useCallback(
    (cs: CampaignStepSelected) => {
      if (campaignStepSelected.id === cs.id) {
        setCampaignStepSelected(initialCampaignStepState);
      } else {
        setCampaignStepSelected(cs);
      }
    },
    [campaignStepSelected]
  );

  const updateStepName = async (item: CampaignStep): Promise<string> => {
    const response = await updateStep(item);
    handleImportProcessActivities();

    return response;
  };

  const deleteStepItem = async (
    stepId: string,
    campaignId?: string
  ): Promise<void> => {
    await deleteStep(stepId, campaignId);
    handleImportProcessActivities();
  };

  const createStepName = async (item: CampaignStep): Promise<string> => {
    const newStep = await createStep(item);
    handleImportProcessActivities();

    if (newStep !== '') {
      setShowNewStepButton(true);
    }
    return '';
  };

  const newStepButton = useCallback(() => {
    if (showNewStepButton) {
      return (
        <NewStepButton
          type="button"
          onClick={() => setShowNewStepButton(false)}
        >
          <FiPlus color={colors.background} size={28} />
          <NewStepButtonValue>Criar Etapa</NewStepButtonValue>
        </NewStepButton>
      );
    }
    return (
      <StepComponent
        unselectedColor={unselectedColor}
        selectedColor={selectedColor}
        createOrUpdateStepName={createStepName}
        handleSelectStep={handleSelectStep}
        index={stepList.length}
        item={{
          title: '',
          id: null,
          campaignId,
          description: '',
          sequence: stepList.length,
          type: null,
          processActivityId,
          campaignStepItems: [],
        }}
        campaignStepSelected={campaignStepSelected}
        isCreating
        deleteStep={() => setShowNewStepButton(true)}
        editable={editable}
      />
    );
  }, []);

  return (
    <StepsWrapper>
      <Steps maxWidth={maxWidth}>
        <ListSteps>
          {stepList
            .sort((a, b) => a.sequence - b.sequence)
            .map((item, index) => (
              <StepComponent
                unselectedColor={unselectedColor}
                selectedColor={selectedColor}
                createOrUpdateStepName={updateStepName}
                item={item}
                index={item.sequence}
                campaignStepSelected={campaignStepSelected}
                handleSelectStep={handleSelectStep}
                isCreating={false}
                deleteStep={deleteStepItem}
                editable={editable}
              />
            ))}
          {editable &&
            (showNewStepButton ? (
              <NewStepButton
                type="button"
                onClick={() => setShowNewStepButton(false)}
                className="add-new-new-step"
              >
                <FiPlus color={colors.background} size={28} />
                <NewStepButtonValue>Criar Etapa</NewStepButtonValue>
              </NewStepButton>
            ) : (
              <StepComponent
                unselectedColor={unselectedColor}
                selectedColor={selectedColor}
                createOrUpdateStepName={createStepName}
                handleSelectStep={handleSelectStep}
                index={stepList.length}
                item={{
                  title: '',
                  id: null,
                  campaignId,
                  description: '',
                  sequence: stepList.length,
                  type: null,
                  processActivityId,
                  campaignStepItems: [],
                }}
                campaignStepSelected={campaignStepSelected}
                isCreating
                deleteStep={() => setShowNewStepButton(true)}
                editable={editable}
              />
            ))}
        </ListSteps>
      </Steps>
      <Activity campaingStep={campaignStepSelected} editable={editable} />
    </StepsWrapper>
  );
};
