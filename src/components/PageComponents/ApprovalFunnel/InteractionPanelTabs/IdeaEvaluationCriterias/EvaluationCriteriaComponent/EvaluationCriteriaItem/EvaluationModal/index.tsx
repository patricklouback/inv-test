import { Modal } from '@components/Modals/Modal';
import { EvaluationCriteriasData } from 'interfaces/evaluationCriteriasData ';
import { ToolTip } from '@components/TooltipComponent';
import { SelectOption } from '@components/SelectOption';
import { useContext, useState } from 'react';
import Button from '@components/Button';
import { IdeaContext } from 'contexts/Idea';
import {
  ButtonBackAndSend,
  Criteria,
  CriteriaInformation,
  CriteriaName,
  CriteriasWrapper,
  Footnote,
  FootnoteAndScore,
  Score,
  WarningDescription,
  WarningTitle,
} from './styles';

const RateOptions = [
  {
    name: 'Selecione uma nota',
    value: '0',
  },
  {
    name: 'Nota 1',
    value: '1',
  },
  {
    name: 'Nota 2',
    value: '2',
  },
  {
    name: 'Nota 3',
    value: '3',
  },
  {
    name: 'Nota 4',
    value: '4',
  },
  {
    name: 'Nota 5',
    value: '5',
  },
];

export const EvaluationModal: React.FC<{
  setShowModal: (value: boolean) => void;
  evaluationCriteriasData: EvaluationCriteriasData[];
}> = ({ setShowModal, evaluationCriteriasData }): JSX.Element => {
  const [newEvaluationCriteriasData, setNewEvaluationCriteriasData] = useState<
    EvaluationCriteriasData[]
  >(evaluationCriteriasData);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { idea, updateIdeaEvaluationCriteria } = useContext(IdeaContext);

  const updateEvaluationCriteriaRate = (id: string, rate: number): void => {
    const updatedEvaluationCriteriasData = newEvaluationCriteriasData.map(
      evaluationCriteria => {
        if (evaluationCriteria.id === id) {
          return {
            ...evaluationCriteria,
            criteriaRate: rate,
          };
        }
        return evaluationCriteria;
      }
    );
    setNewEvaluationCriteriasData(updatedEvaluationCriteriasData);
  };

  const handleSendEvaluationCriterias = async (): Promise<void> => {
    await updateIdeaEvaluationCriteria(newEvaluationCriteriasData, idea.id);
    setShowConfirmationModal(false);
    setShowModal(false);
  };
  return (
    <div>
      {showConfirmationModal && (
        <Modal width="440px" height="auto" hideCloseButton>
          <WarningTitle>Atenção</WarningTitle>
          <WarningDescription>
            Ao enviar a sua avaliação, não será mais possível fazer alterações.
            Deseja enviar mesmo assim?
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
              Revisar
            </Button>
            <Button
              max_width={184}
              onClick={handleSendEvaluationCriterias}
              color="white"
              background="#EF6262;
              "
            >
              Enviar avaliação
            </Button>
          </ButtonBackAndSend>
        </Modal>
      )}
      {!showConfirmationModal && (
        <Modal
          handle={() => setShowModal(false)}
          width="650px"
          height="auto"
          title="Avaliar iniciativa"
        >
          <CriteriasWrapper>
            {newEvaluationCriteriasData.map(evaluationCriteria => (
              <Criteria>
                <CriteriaInformation>
                  <CriteriaName>
                    {`${evaluationCriteria.evaluationCriteriasCampaignMetadata.criteriaName}*`}
                  </CriteriaName>
                  <ToolTip
                    size={24}
                    text={
                      `<b>Descrição:</b>\n\n` +
                      `${evaluationCriteria.evaluationCriteriasCampaignMetadata.criteriaDescription}`
                    }
                    textWidth={260}
                  />
                </CriteriaInformation>
                <SelectOption
                  width="100"
                  name="Selecione uma nota"
                  onChange={event =>
                    updateEvaluationCriteriaRate(
                      evaluationCriteria.id,
                      Number(event.target.value)
                    )
                  }
                  options={RateOptions}
                  height="56px"
                  value={evaluationCriteria.criteriaRate}
                />
              </Criteria>
            ))}
          </CriteriasWrapper>
          <FootnoteAndScore>
            <Footnote>(*) - Obrigatório</Footnote>
            <Score>
              {`Potuação parcial: ${Math.round(
                (newEvaluationCriteriasData.reduce(
                  (acc, evaluationCriteria) =>
                    acc + evaluationCriteria.criteriaRate,
                  0
                ) *
                  20) /
                  newEvaluationCriteriasData.length
              )} pontos`}
            </Score>
          </FootnoteAndScore>
          <ButtonBackAndSend>
            <Button
              onClick={() => setShowModal(false)}
              max_width={184}
              isDark={false}
            >
              Voltar
            </Button>
            <Button
              max_width={234}
              onClick={() => setShowConfirmationModal(true)}
            >
              Enviar avaliação
            </Button>
          </ButtonBackAndSend>
        </Modal>
      )}
    </div>
  );
};
