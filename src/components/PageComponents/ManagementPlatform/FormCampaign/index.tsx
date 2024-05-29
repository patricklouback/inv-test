/* eslint-disable jsx-a11y/label-has-associated-control */
import { InfoWarning } from '@components/InfoWarning';
import { ConfigContext } from 'contexts/ConfigContext';
import { CampaignField } from 'interfaces/campaign';
import { useContext, useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FiPlus } from 'react-icons/fi';
import { RiTrophyLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { AiFillWarning } from 'react-icons/ai';
import { RenderHeader } from '../RenderHeader';
import { RenderToCampaignForm } from '../RenderToCampaignForm';
import {
  ButtonSave,
  Content,
  FormCampaign,
  Section,
  Value,
  Warning,
} from './styles';

const defaultCampaign: Omit<CampaignField, 'id' | 'campaignFieldValues' | 'campaignId'> = {
  sequence: 0,
  status: 'ACTIVE',
  title: 'Título',
  name: '',
};

export const SectionFormCampaign: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { getDefaultCampaignFields, updateCampaignFieldsSequence, campaignFields } = useContext(ConfigContext);

  const [row, setRow] = useState(true);
  const [addNewField, setAddNewField] = useState(false);
  const [campaignFieldsState, setCampaignFieldsState] = useState<CampaignField[]>(campaignFields);

  const onDragEnd = (result): void => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newCampaignFields: CampaignField[] = Array.from(campaignFieldsState);
    const item = newCampaignFields.splice(source.index, 1);
    newCampaignFields.splice(destination.index, 0, item[0]);

    setCampaignFieldsState(newCampaignFields);

    updateCampaignFieldsSequence(newCampaignFields);
  };

  const changeCampaignFieldState = (newState: CampaignField[]): void => {
    setCampaignFieldsState(newState);
  }

  useEffect(() => {
    const loadIdeaFields = async (): Promise<void> => {
      const result = await getDefaultCampaignFields();
      setCampaignFieldsState(result);
    }
    loadIdeaFields();
  }, [getDefaultCampaignFields]);

  return (
    <Section>
      <Collapsible
        className="general"
        triggerTagName="div"
        open
        trigger={
          <RenderHeader
            title="Template para campos dos Direcionais de inovação"
            icon={<RiTrophyLine color={colors.font} size={14} />}
            stateIcon={row}
          />
        }
        onOpen={() => setRow(true)}
        onClose={() => setRow(false)}
      >
        <Content>
          <FormCampaign>
            <InfoWarning 
              type='INFO'
              text='Os campos fazem parte do detalhamento de um direcional de inovação.'
            />
            <Warning>
              <strong>Os campos Título, Descrição, Resumo e Objetivos Estratégicos são padrão do sistema e não precisam ser adicionados. </strong>
            </Warning>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='elements'>
                {(provided) => { 
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {campaignFieldsState.map((item, index) => (
                        <RenderToCampaignForm 
                          campaignField={item} 
                          index={index} 
                          key={item.id} 
                          changeCampaignFieldState={changeCampaignFieldState} 
                        />
                      ))}
                      {provided.placeholder}
                      {addNewField && (
                        <RenderToCampaignForm
                          campaignField={{ ...defaultCampaign } as CampaignField}
                          index={campaignFieldsState.length}
                          setAddField={setAddNewField}
                          changeCampaignFieldState={changeCampaignFieldState}
                          isCreate
                        />
                      )}
                      {!addNewField && (
                        <ButtonSave type="button" onClick={() => setAddNewField(true)}>
                          <FiPlus color={colors.background} size={28} />
                          <Value>Adicionar novo campo</Value>
                        </ButtonSave>
                      )}
                    </div>
                  )
                }}
              </Droppable>
            </DragDropContext>
          </FormCampaign>
        </Content>
      </Collapsible>
    </Section>
  );
};
