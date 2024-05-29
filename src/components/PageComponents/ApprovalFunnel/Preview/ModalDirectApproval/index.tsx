import { Modal } from '@components/Modals/Modal';
import { useContext, useState } from 'react';
import Button from '@components/Button';
import { UserContext } from 'contexts/User';
import { IdeaContext } from 'contexts/Idea';
import { IdeaKanbamStep } from 'interfaces/idea';
import ArrowRight from '../../../../../assets/inventta/ArrowRight.svg';
import {
  ButtonBackAndApprove,
  CustomInput,
  Draft,
  InputsContent,
  Text,
} from './styles';

export const ModalDirectApproval: React.FC<{
  setModalDirectApproval: (state: boolean) => void;
  nextKanbanStep: string;
  ideaId: string;
  kanbanStep: IdeaKanbamStep;
  nextStepKanban: IdeaKanbamStep;
  nextSequenceKanban: number;
  updateKanbanStatus: (
    kanbanStep: IdeaKanbamStep,
    nextSequenceKanban: number
  ) => Promise<boolean>;
}> = ({
  setModalDirectApproval,
  nextKanbanStep,
  ideaId,
  kanbanStep,
  nextStepKanban,
  nextSequenceKanban,
  updateKanbanStatus,
}): JSX.Element => {
  const [analysis, setAnalysis] = useState('');
  const [explanation, setExplanation] = useState('');
  const { user } = useContext(UserContext);
  const { createDirectApproval } = useContext(IdeaContext);

  const handleDirectApproval = async (): Promise<void> => {
    const directApprovalData = {
      ideaId,
      userId: user.id,
      analysis,
      explanation,
      kanbanStep,
    };
    const result = await updateKanbanStatus(nextStepKanban, nextSequenceKanban);
    if (result) {
      await createDirectApproval(directApprovalData);
    }
    setModalDirectApproval(false);
  };

  return (
    <Modal
      handle={() => setModalDirectApproval(false)}
      width="600px"
      height="auto"
      title={`Aprovação direta para ${nextKanbanStep}`}
      svgIcon={ArrowRight}
    >
      <InputsContent>
        <Draft>
          <Text>{`Análise da ${nextKanbanStep}*`}</Text>
          <CustomInput
            height="64px"
            name="name"
            value={analysis}
            placeholder=""
            onChange={event => setAnalysis(event.target.value)}
            type="text"
          />
        </Draft>
        <Draft>
          <Text>Justificativa para a aprovação direta*</Text>
          <CustomInput
            height="85px"
            name="name"
            value={explanation}
            placeholder=""
            onChange={event => setExplanation(event.target.value)}
            type="text"
          />
        </Draft>
        <ButtonBackAndApprove>
          <Button
            onClick={() => setModalDirectApproval(false)}
            max_width={184}
            isDark={false}
          >
            Voltar
          </Button>
          <Button max_width={234} onClick={handleDirectApproval}>
            Enviar avaliação
          </Button>
        </ButtonBackAndApprove>
      </InputsContent>
    </Modal>
  );
};
