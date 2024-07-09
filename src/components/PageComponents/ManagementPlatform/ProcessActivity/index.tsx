import { CardIdeia } from '@components/CardIdea';
import { InfoWarning } from '@components/InfoWarning';
import { ProcessActivityContext } from 'contexts/ProcessActivity';
import { useContext, useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { FiAlertTriangle, FiPlus } from 'react-icons/fi';
import { MdOutlineAltRoute } from 'react-icons/md';
import { RiFileEditLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { RenderHeader } from '../RenderHeader';
import {
  ButtonSave,
  ButtonValue,
  Content,
  DraftC,
  InfoText,
  InfoTextContainer,
  Section,
} from './styles';

import { StepList } from './StepList';

interface ProcessActivityProps {
  hideHeader?: boolean;
  campaignId?: string;
  hideCreateNewProcess?: boolean;
  stepsEditable?: boolean;
  reRenderComponent?: boolean;
  setReRenderComponent?: () => void;
}

export const SectionProcessActivity: React.FC<ProcessActivityProps> = ({
  hideHeader,
  campaignId,
  hideCreateNewProcess,
  stepsEditable,
  reRenderComponent,
  setReRenderComponent,
}): JSX.Element => {
  const { colors } = useTheme();

  const { getProcessActivities, processActivities, processActivitiesCampaign } =
    useContext(ProcessActivityContext);
  const [row, setRow] = useState(true);
  const [addNewField, setAddNewField] = useState(false);
  const [created, setCreated] = useState(true);
  const [newProcess, setNewProcess] = useState('Novo Processo');
  const [localProcessActivities, setLocalProcessActivities] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (shouldFetchData) {
        await getProcessActivities(campaignId);

        setShouldFetchData(false);
        setCreated(false);
      }
    };

    fetchData();
  }, [
    shouldFetchData,
    campaignId,
    getProcessActivities,
    setLocalProcessActivities,
    processActivitiesCampaign,
    processActivities,
  ]);

  useEffect(() => {
    if (campaignId) {
      setLocalProcessActivities(processActivitiesCampaign);
    } else {
      setLocalProcessActivities(processActivities);
    }
  }, [processActivities, processActivitiesCampaign, campaignId]);

  useEffect(() => {
    if (reRenderComponent) {
      setShouldFetchData(true);
    }
  }, [reRenderComponent]);

  useEffect(() => {
    const fetchDataOnCreate = async (): Promise<void> => {
      if (created) {
        await getProcessActivities(campaignId);

        setShouldFetchData(false);
        setCreated(false);
      }
    };

    fetchDataOnCreate();
  }, [
    created,
    campaignId,
    getProcessActivities,
    setLocalProcessActivities,
    processActivitiesCampaign,
    processActivities,
  ]);

  const closeCreating = (): void => {
    setAddNewField(false);
    setNewProcess('Novo Processo');
  };

  return (
    <Section>
      {hideHeader ? (
        <Content>
          {localProcessActivities &&
            localProcessActivities.length > 0 &&
            localProcessActivities.map(processActivity => {
              return (
                <DraftC>
                  <CardIdeia
                    id={processActivity.id}
                    editable={!hideCreateNewProcess}
                    value={processActivity.name}
                    background={colors.greyLight}
                    campaignId={campaignId}
                    icon={<RiFileEditLine color={colors.red} size={20} />}
                    handleImportProcessActivities={setReRenderComponent}
                  />
                  <StepList
                    processActivityId={processActivity.id}
                    stepList={processActivity.campaignSteps}
                    unselectedColor="#F6F6F8"
                    selectedColor="#67D1C4"
                    maxWidth="80rem"
                    campaignId={campaignId === undefined ? null : campaignId}
                    editable={stepsEditable}
                    handleImportProcessActivities={setReRenderComponent}
                  />
                </DraftC>
              );
            })}

          {!hideCreateNewProcess &&
            (!addNewField ? (
              <ButtonSave type="button" onClick={() => setAddNewField(true)}>
                <FiPlus color={colors.background} size={28} />
                <ButtonValue>Criar nova rota</ButtonValue>
              </ButtonSave>
            ) : (
              <DraftC>
                <CardIdeia
                  closeCreating={closeCreating}
                  value={newProcess}
                  editable={!hideCreateNewProcess}
                  isCreating
                  background={colors.greyLight}
                  campaignId={campaignId}
                  icon={<RiFileEditLine color={colors.red} size={20} />}
                  handleImportProcessActivities={setReRenderComponent}
                />
              </DraftC>
            ))}
        </Content>
      ) : (
        <Collapsible
          className="general"
          triggerTagName="div"
          open
          trigger={
            <RenderHeader
              title="Template de rotas das iniciativas"
              icon={<MdOutlineAltRoute color={colors.font} size={14} />}
              stateIcon={row}
            />
          }
          onOpen={() => setRow(true)}
          onClose={() => setRow(false)}
        >
          <InfoTextContainer>
            <InfoText>
              <FiAlertTriangle size={22} color={colors.yellow} /> Crie, edite e
              exclua rotas aqui.
            </InfoText>
            <InfoText>
              Você também pode editar os estágios e atividades na criação de
              direcionais, mas somente aqui é possível modificar as rotas. Após
              concluir as alterações, você precisa criar um novo direcional.
            </InfoText>
          </InfoTextContainer>
          <Content>
            <InfoWarning
              type="INFO"
              text="As rotas criadas devem conter fluxos de trabalho diferentes. O desenvolvimento das iniciativas dependerá da rota escolhida pelo avaliador / gestor."
            />
            {localProcessActivities &&
              localProcessActivities.length > 0 &&
              localProcessActivities.map(processActivity => {
                return (
                  <DraftC>
                    <CardIdeia
                      id={processActivity.id}
                      editable
                      value={processActivity.name}
                      background={colors.greyLight}
                      campaignId={campaignId}
                      icon={<RiFileEditLine color={colors.red} size={20} />}
                      handleImportProcessActivities={setReRenderComponent}
                    />
                    <StepList
                      processActivityId={processActivity.id}
                      stepList={processActivity.campaignSteps}
                      unselectedColor="#F6F6F8"
                      selectedColor="#67D1C4"
                      maxWidth="80rem"
                      campaignId={campaignId === undefined ? null : campaignId}
                      handleImportProcessActivities={setReRenderComponent}
                    />
                  </DraftC>
                );
              })}
            {!hideCreateNewProcess &&
              (!addNewField ? (
                <ButtonSave
                  type="button"
                  onClick={() => setAddNewField(true)}
                  className="add-new-new-route"
                >
                  <FiPlus color={colors.background} size={28} />
                  <ButtonValue>Criar nova rota</ButtonValue>
                </ButtonSave>
              ) : (
                <DraftC>
                  <CardIdeia
                    closeCreating={closeCreating}
                    value={newProcess}
                    editable
                    isCreating
                    background={colors.greyLight}
                    campaignId={campaignId}
                    icon={<RiFileEditLine color={colors.red} size={20} />}
                    handleImportProcessActivities={setReRenderComponent}
                  />
                </DraftC>
              ))}
          </Content>
        </Collapsible>
      )}
    </Section>
  );
};
