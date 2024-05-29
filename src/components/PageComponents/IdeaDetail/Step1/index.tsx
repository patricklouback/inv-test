import { IdeaStep } from 'interfaces/idea';
import { FiMap } from 'react-icons/fi';
import {
  IconActivity,
  InputCheckBox,
  Label,
  ValueActivity,
  ValueCheckBox,
  WapperActivities,
  WapperActivity,
  WapperStep1,
  WapperTitleActiv,
} from './styles';

interface Step1Props {
  stepSelected: IdeaStep;
}

export const Step1: React.FC<Step1Props> = ({ stepSelected }): JSX.Element => {
  return (
    <WapperStep1>
      <div>
        <WapperTitleActiv>
          <strong>Etapa {stepSelected.sequence}</strong> - {stepSelected.title}
        </WapperTitleActiv>
        <WapperActivity>
          <IconActivity>
            <FiMap size={14} />
          </IconActivity>
          <ValueActivity>Atividades</ValueActivity>
        </WapperActivity>
      </div>
      <WapperActivities>
        {stepSelected?.ideaStepItems?.map(stepItem => (
          <Label>
            <InputCheckBox type="checkbox" />
            <ValueCheckBox>{stepItem.title}</ValueCheckBox>
          </Label>
        ))}
      </WapperActivities>
    </WapperStep1>
  );
};
