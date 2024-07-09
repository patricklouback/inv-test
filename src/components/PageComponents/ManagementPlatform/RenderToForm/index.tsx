/* eslint-disable no-param-reassign */
import { SelectOption } from '@components/SelectOption';
import { ConfigContext } from 'contexts/ConfigContext';
import slugify from 'slugify';
import { Draggable } from 'react-beautiful-dnd';
import { IdeaField } from 'interfaces/idea';
import { useTheme } from 'styled-components';
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FiCheck, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';
import { styleSlug } from 'utils/constants';
import {
  ToForm,
  DragIndicatorContainer,
  Index,
  Content,
  Draft,
  Text,
  CheckBox,
  Label,
  InputWrapper,
  CustomInput,
  CustomCheckbox,
  IconButton,
  Actions,
  AddOption,
} from './styles';

interface RenderFormCampaignProps {
  ideaField: IdeaField;
  index: number;
  isCreate?: boolean;
  dragable?: boolean;
  creatable?: boolean;
  campaignId?: string;
  setAddField?: React.Dispatch<SetStateAction<boolean>>;
  changeIdeaFieldState?: (newState: IdeaField[]) => void;
}

interface Options {
  name: string;
  value: string;
}

const Options = [
  {
    name: 'Texto Curto',
    value: 'TEXT',
  },
  {
    name: 'Texto Grande',
    value: 'TEXTAREA',
  },
  {
    name: 'Caixa de seleção',
    value: 'SELECT',
  },
];

const ObligatorinessOptions = [
  {
    name: 'Obrigatório',
    value: 'MANDATORY',
  },
  {
    name: 'Opcional',
    value: 'OPTIONAL',
  },
];

export const RenderToForm: React.FC<RenderFormCampaignProps> = ({
  ideaField,
  index,
  isCreate = false,
  dragable = true,
  creatable = true,
  campaignId,
  changeIdeaFieldState,
  setAddField,
}): JSX.Element => {
  const { colors } = useTheme();
  const [isEditable, setIsEditable] = useState(false);
  const [optionEditable, setOptionEditable] = useState('');
  const [ideaFieldBase, setIdeaFieldBase] = useState<IdeaField>();
  const [ideaFieldOptions, setIdeaFieldOptions] = useState(
    /* <Options[]> */ []
  );
  const {
    deleteIdeaField,
    getDefaultIdeaFields,
    getCampaignIdeaFields,
    updateIdeaField,
    createIdeaField,
    createIdeaFieldForCampaign,
  } = useContext(ConfigContext);

  const handleChangeideaFieldState = useCallback(
    (newState: IdeaField[]): void => {
      changeIdeaFieldState(newState);
    },
    [changeIdeaFieldState]
  );

  const handleDeleteItem = useCallback(async () => {
    if (isCreate) {
      setAddField(false);
    }

    if (campaignId) {
      await deleteIdeaField(ideaField.id);

      const result = await getCampaignIdeaFields(campaignId);

      handleChangeideaFieldState(result);
    } else {
      await deleteIdeaField(ideaField.id);

      const result = await getDefaultIdeaFields();

      handleChangeideaFieldState(result);
    }
  }, [
    ideaField.id,
    deleteIdeaField,
    getDefaultIdeaFields,
    getCampaignIdeaFields,
    isCreate,
    setAddField,
    handleChangeideaFieldState,
    campaignId,
  ]);

  const handleEditIdeaBase = useCallback(event => {
    const { name, value } = event.target;

    setIdeaFieldBase(state => ({ ...state, [name]: value }));
  }, []);

  const handleChangeOption = useCallback((value, name) => {
    setIdeaFieldOptions(state => {
      const index = state.findIndex(e => e.value === value);
      if (index !== -1) {
        state[index].name = name;
      }

      return [...state];
    });
  }, []);

  const handleAddNewOption = useCallback(() => {
    setIdeaFieldOptions(state => [
      ...state,
      { name: 'Nova Opção', value: String(new Date().getTime()) },
    ]);
  }, []);

  const habdleDeleteIdeaOption = useCallback((value: string) => {
    setIdeaFieldOptions(state => [...state.filter(s => s.value !== value)]);
  }, []);

  const handleUpdateIdeaField = useCallback(async () => {
    const formatIdeaFieldOptions = ideaFieldOptions.map(item => ({
      name: item.name,
      value: slugify(item.value, {
        lower: true,
        trim: true,
        replacement: '-',
      }),
    }));

    await updateIdeaField(ideaField.id, {
      ...ideaFieldBase,
      options: JSON.stringify(formatIdeaFieldOptions),
    });

    setIsEditable(false);

    const result = !campaignId
      ? await getDefaultIdeaFields()
      : await getCampaignIdeaFields(campaignId);

    handleChangeideaFieldState(result);
  }, [
    updateIdeaField,
    getDefaultIdeaFields,
    getCampaignIdeaFields,
    handleChangeideaFieldState,
    ideaFieldBase,
    ideaFieldOptions,
    ideaField.id,
    campaignId,
  ]);

  const handleCreateIdeaField = useCallback(async () => {
    const formatIdeaFieldOptions = ideaFieldOptions.map(item => ({
      name: item.name,
      value: slugify(item.value, {
        lower: true,
        trim: true,
        replacement: '-',
      }),
    }));

    if (campaignId) {
      await createIdeaFieldForCampaign(
        {
          ...ideaFieldBase,
          name: slugify(ideaFieldBase.title, {
            lower: true,
            trim: true,
            replacement: '-',
          }),
          options: JSON.stringify(formatIdeaFieldOptions),
        },
        campaignId
      );

      setAddField(false);
      setIsEditable(false);

      const result = await getCampaignIdeaFields(campaignId);

      handleChangeideaFieldState(result);
    } else {
      await createIdeaField({
        ...ideaFieldBase,
        name: slugify(ideaFieldBase.title, {
          lower: true,
          trim: true,
          replacement: '-',
        }),
        options: JSON.stringify(formatIdeaFieldOptions),
      });

      setAddField(false);
      setIsEditable(false);

      const result = await getDefaultIdeaFields();

      handleChangeideaFieldState(result);
    }
  }, [
    createIdeaField,
    createIdeaFieldForCampaign,
    setAddField,
    getDefaultIdeaFields,
    getCampaignIdeaFields,
    handleChangeideaFieldState,
    ideaFieldBase,
    ideaFieldOptions,
    campaignId,
  ]);

  useEffect(() => {
    setIdeaFieldBase(ideaField);
    if (ideaField.options) {
      const ideaOptions = JSON.parse(ideaField.options);

      setIdeaFieldOptions(ideaOptions);
    }

    if (isCreate) {
      setIsEditable(true);
    }
  }, [ideaField, isCreate]);
  return (
    <Draggable
      draggableId={ideaField.id}
      index={index}
      isDragDisabled={!dragable}
    >
      {provided => {
        return (
          <InputWrapper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <ToForm>
              <DragIndicatorContainer>
                <MdDragIndicator size={35} color={colors.primary[styleSlug]} />
              </DragIndicatorContainer>
              <Index>{index + 1}.</Index>
              <Content>
                <Draft>
                  <Text>Nome</Text>
                  <CustomInput
                    value={ideaFieldBase?.title}
                    name="title"
                    onChange={handleEditIdeaBase}
                    placeholder="Título"
                    type="text"
                    disabled={!isEditable}
                  />
                </Draft>
                <Draft className="description">
                  <Text>Descrição</Text>
                  <CustomInput
                    name="description"
                    value={ideaFieldBase?.description}
                    placeholder="Descrição"
                    onChange={handleEditIdeaBase}
                    type="text"
                    disabled={!isEditable}
                  />
                </Draft>
                <Draft className="format">
                  <Text>Formato</Text>
                  <SelectOption
                    name="type"
                    onChange={handleEditIdeaBase}
                    disabled={!isEditable}
                    options={Options}
                    value={ideaFieldBase?.type}
                  />
                </Draft>
                <Draft>
                  <Text>Obrigatoriedade</Text>
                  <SelectOption
                    name="obligatoriness"
                    onChange={handleEditIdeaBase}
                    disabled={!isEditable}
                    options={ObligatorinessOptions}
                    value={ideaFieldBase?.obligatoriness}
                  />
                </Draft>
                {creatable !== false && (
                  <Actions>
                    {isEditable ? (
                      <IconButton
                        onClick={
                          isCreate
                            ? handleCreateIdeaField
                            : handleUpdateIdeaField
                        }
                      >
                        <FiCheck size={20} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => setIsEditable(true)}>
                        <FiEdit2 size={20} />
                      </IconButton>
                    )}
                    <IconButton onClick={handleDeleteItem}>
                      <FiTrash size={20} />
                    </IconButton>
                  </Actions>
                )}
              </Content>
            </ToForm>
            {ideaFieldBase?.type === 'SELECT' && (
              <Draft>
                <Text>Opções</Text>
                {ideaFieldOptions.map(e => (
                  <CheckBox key={e.value}>
                    <Label>
                      <CustomCheckbox
                        type="checkbox"
                        disabled={!isEditable}
                        name={e.value}
                      />
                      {optionEditable === e.value ? (
                        <>
                          <input
                            value={e.name}
                            onChange={event =>
                              handleChangeOption(e.value, event.target.value)
                            }
                            style={{
                              marginLeft: '8px',
                            }}
                          />
                          <IconButton
                            style={{ width: '32px', height: '32px' }}
                            onClick={() => setOptionEditable('')}
                          >
                            <FiCheck size={20} />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <Text>{e.name}</Text>
                          {isEditable && (
                            <>
                              <IconButton
                                style={{ width: '32px', height: '32px' }}
                                onClick={() => setOptionEditable(e.value)}
                              >
                                <FiEdit2 size={20} />
                              </IconButton>
                              <IconButton
                                style={{ width: '32px', height: '32px' }}
                                onClick={() => habdleDeleteIdeaOption(e.value)}
                              >
                                <FiTrash size={20} />
                              </IconButton>
                            </>
                          )}
                        </>
                      )}
                    </Label>
                  </CheckBox>
                ))}
                {isEditable && (
                  <AddOption type="button" onClick={handleAddNewOption}>
                    <FiPlus /> Adicionar novo
                  </AddOption>
                )}
              </Draft>
            )}
          </InputWrapper>
        );
      }}
    </Draggable>
  );
};
