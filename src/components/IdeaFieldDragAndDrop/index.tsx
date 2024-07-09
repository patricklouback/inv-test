import { useTheme } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from 'contexts/ConfigContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FiPlus } from 'react-icons/fi';
import { RenderToForm } from '@components/PageComponents/ManagementPlatform/RenderToForm';
import { IdeaField } from 'interfaces/idea';
import {
  DragAndDropContainer,
  ItemsContainer,
  ButtonSave,
  Value,
} from './styles';

interface IdeaFieldDragAndDropProps {
  campaignId?: string;
  dragable?: boolean;
  creatable?: boolean;
}

const defaultIdeaField: Omit<IdeaField, 'id' | 'ideaFieldValues' | 'ideaId'> = {
  description: 'Descrição',
  options: '',
  sequence: 0,
  status: 'ACTIVE',
  title: 'Título',
  type: 'TEXT',
  name: '',
  obligatoriness: 'MANDATORY',
};

export const IdeaFieldDragAndDrop = ({
  campaignId,
  dragable = true,
  creatable = true,
}: IdeaFieldDragAndDropProps): JSX.Element => {
  const { colors } = useTheme();
  const {
    getCampaignIdeaFields,
    getDefaultIdeaFields,
    updateIdeaFieldsSequence,
    ideaFields,
  } = useContext(ConfigContext);

  const [addNewField, setAddNewField] = useState(false);
  const [ideaFieldsState, setIdeaFieldsState] =
    useState<IdeaField[]>(ideaFields);

  const onDragEnd = (result): any => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newIdeaFields: IdeaField[] = Array.from(ideaFieldsState);
    const item = newIdeaFields.splice(source.index, 1);
    newIdeaFields.splice(destination.index, 0, item[0]);

    setIdeaFieldsState(newIdeaFields);

    updateIdeaFieldsSequence(newIdeaFields);
  };

  const changeIdeaFieldState = (newState: IdeaField[]): void => {
    setIdeaFieldsState(newState);
  };

  useEffect(() => {
    const loadIdeaFields = async (): Promise<any> => {
      const result = campaignId
        ? await getCampaignIdeaFields(campaignId)
        : await getDefaultIdeaFields();
      setIdeaFieldsState(result);
    };
    loadIdeaFields();
  }, [getCampaignIdeaFields, getDefaultIdeaFields, campaignId]);

  return (
    <DragAndDropContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="elements">
          {provided => {
            return (
              <ItemsContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {ideaFieldsState?.map((item, index) => (
                  <RenderToForm
                    ideaField={item}
                    index={index}
                    key={item.id}
                    changeIdeaFieldState={changeIdeaFieldState}
                    campaignId={campaignId}
                    dragable={dragable}
                    creatable={creatable}
                  />
                ))}
                {provided.placeholder}
                {addNewField && (
                  <RenderToForm
                    ideaField={{ ...defaultIdeaField } as IdeaField}
                    index={ideaFieldsState.length}
                    setAddField={setAddNewField}
                    changeIdeaFieldState={changeIdeaFieldState}
                    campaignId={campaignId}
                    isCreate
                    dragable={dragable}
                    creatable={creatable}
                  />
                )}
              </ItemsContainer>
            );
          }}
        </Droppable>
      </DragDropContext>
      {!addNewField && creatable !== false && (
        <ButtonSave type="button" onClick={() => setAddNewField(true)}>
          <FiPlus color={colors.background} size={28} />
          <Value>Adicionar novo campo</Value>
        </ButtonSave>
      )}
    </DragAndDropContainer>
  );
};
