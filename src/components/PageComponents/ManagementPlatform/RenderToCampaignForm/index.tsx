/* eslint-disable no-param-reassign */
import { ConfigContext } from 'contexts/ConfigContext';
import slugify from 'slugify';
import { Draggable } from 'react-beautiful-dnd';
import { CampaignField } from 'interfaces/campaign';
import { useTheme } from 'styled-components';
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FiCheck, FiEdit2, FiTrash } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';
import { styleSlug } from 'utils/constants';
import {
  ToForm,
  DragIndicatorContainer,
  Index,
  Content,
  Draft,
  Text,
  InputWrapper,
  CustomInput,
  IconButton,
  Actions,
} from './styles';

interface RenderFormCampaignProps {
  campaignField: CampaignField;
  index: number;
  isCreate?: boolean;
  setAddField?: React.Dispatch<SetStateAction<boolean>>;
  changeCampaignFieldState?: (newState: CampaignField[]) => void;
}

export const RenderToCampaignForm: React.FC<RenderFormCampaignProps> = ({
  campaignField,
  index,
  isCreate = false,
  changeCampaignFieldState,
  setAddField,
}): JSX.Element => {
  const { colors } = useTheme();
  const [isEditable, setIsEditable] = useState(false);
  const [campaignFieldBase, setCampaignFieldBase] = useState<CampaignField>();
  const {
    deleteCampaignField,
    getDefaultCampaignFields,
    updateCampaignField,
    createCampaignField,
  } = useContext(ConfigContext);

  const handleChangeCampaignFieldState = useCallback(
    (newState: CampaignField[]): void => {
      changeCampaignFieldState(newState);
    },
    [changeCampaignFieldState]
  );

  const handleDeleteItem = useCallback(async () => {
    if (isCreate) {
      setAddField(false);
    }
    await deleteCampaignField(campaignField.id);
    const result = await getDefaultCampaignFields();
    handleChangeCampaignFieldState(result);
  }, [
    campaignField.id,
    deleteCampaignField,
    getDefaultCampaignFields,
    isCreate,
    setAddField,
    handleChangeCampaignFieldState,
  ]);

  const handleEditCampaignBase = useCallback(event => {
    const { name, value } = event.target;

    setCampaignFieldBase(state => ({ ...state, [name]: value }));
  }, []);

  const handleUpdateCampaignField = useCallback(async () => {
    await updateCampaignField(campaignField.id, {
      ...campaignFieldBase,
    });
    setIsEditable(false);
    const result = await getDefaultCampaignFields();
    handleChangeCampaignFieldState(result);
  }, [
    updateCampaignField,
    getDefaultCampaignFields,
    handleChangeCampaignFieldState,
    campaignFieldBase,
    campaignField.id,
  ]);

  const handleCreateCampaignField = useCallback(async () => {
    await createCampaignField({
      ...campaignFieldBase,
      name: slugify(campaignFieldBase.title, {
        lower: true,
        trim: true,
        replacement: '-',
      }),
    });
    setAddField(false);
    setIsEditable(false);
    const result = await getDefaultCampaignFields();
    handleChangeCampaignFieldState(result);
  }, [
    createCampaignField,
    setAddField,
    getDefaultCampaignFields,
    handleChangeCampaignFieldState,
    campaignFieldBase,
  ]);

  useEffect(() => {
    setCampaignFieldBase(campaignField);

    if (isCreate) {
      setIsEditable(true);
    }
  }, [campaignField, isCreate]);
  return (
    <Draggable draggableId={campaignField.id} index={index}>
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
                    value={campaignFieldBase?.title}
                    name="title"
                    onChange={handleEditCampaignBase}
                    placeholder="Título"
                    type="text"
                    disabled={!isEditable}
                  />
                </Draft>
                <Actions>
                  {isEditable ? (
                    <IconButton
                      onClick={
                        isCreate
                          ? handleCreateCampaignField
                          : handleUpdateCampaignField
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
              </Content>
            </ToForm>
          </InputWrapper>
        );
      }}
    </Draggable>
  );
};
