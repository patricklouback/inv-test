import { FiCheck, FiX } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { CampaignStep, CampaignStepItem } from 'interfaces/campaign';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CampaignContext } from 'contexts/Campaign';
import {
  ButtonAdd,
  ButtonDelete,
  ContainerInputs,
  Form,
  Input,
  Strong,
  TitleInputs,
  ValueButton,
  WapperInput,
  Item,
} from './style';

interface CampaignStepSelected extends CampaignStep {
  index?: number;
}

interface ActivityProps {
    campaingStep: CampaignStepSelected;
    editable?: boolean;
}

const initialCampaignStepState = {
    id: '',
    campaignId: '',
    title: '',
    description: '',
    sequence: 0,
    campaignStepItems: []
  };

export const Activity: React.FC<ActivityProps> = ({
    campaingStep,
    editable = true,
}): JSX.Element => {
  const [stepsItemsSelected, setStepItemsSelected] = useState<
    CampaignStepItem[]
  >([]);
  const [stepItemEditedId, setStepItemEditedId] = useState('');
  const [limitDate, setLimitDate] = useState<Date>();
  const [valueChanged, setValueChanged] = useState('');
  const [newStepItem, setNewStepItem] = useState(false);
  const [campaignStepSelected, setCampaignStepSelected] =
  useState<CampaignStepSelected>(initialCampaignStepState);

  const {
    addNewStepItem,
    getCampaignStepItems,
    removeStepItem,
    updateStepItem
  } = useContext(CampaignContext);

  const handleListCampaignStepItems = useCallback(
    async (campaignStepId: string) => {
      const campaignStepItems = await getCampaignStepItems(campaignStepId);
        setStepItemsSelected(campaignStepItems);
    },
    [getCampaignStepItems]
  );
  
  const handleSelectStep = useCallback(
    (cs: CampaignStepSelected) => {
      if (cs.id === '') {
        setCampaignStepSelected(initialCampaignStepState);
      } else {
        setCampaignStepSelected(cs);
        handleListCampaignStepItems(cs.id);
      }
    },
    [handleListCampaignStepItems]
  );

  useEffect(() => {
    handleSelectStep(campaingStep);
  }, [handleSelectStep, campaingStep])

  const handleEditStepItem = useCallback(
    (stepItemEdited: CampaignStepItem) => {
      setStepItemEditedId(stepItemEdited.id);
        setValueChanged(stepItemEdited.title);
    },
    []
  );

  const handleRemoveStepItem = useCallback(
    async (
      campaignStepItemId: string,
      campaignStepId: string
    ) => {
      await removeStepItem(campaignStepItemId);

      await handleListCampaignStepItems(campaignStepId);
    },
    [removeStepItem, handleListCampaignStepItems]
  );

  const handleUpdateStepItem = useCallback(
    async () => {
      await updateStepItem(stepItemEditedId, valueChanged, limitDate);

      await handleListCampaignStepItems(campaignStepSelected.id);

      setNewStepItem(false);
      setValueChanged('');
      setStepItemEditedId('');
      setLimitDate(null);
    },
    [
      updateStepItem,
      handleListCampaignStepItems,
      stepItemEditedId,
      valueChanged,
      campaignStepSelected?.id,
      limitDate
    ]
  );

  const handleAddNewStep = useCallback(
    async (campaignStepId: string) => {
      await addNewStepItem(campaignStepId, valueChanged, limitDate);

      await handleListCampaignStepItems(campaignStepId);
      setNewStepItem(false);
      setValueChanged('');
      setStepItemEditedId('');
      setLimitDate(null);
    },
    [
      addNewStepItem,
      handleListCampaignStepItems,
      valueChanged,
      limitDate,
    ]
  );

  const handleActiveNewStepProject = useCallback(() => {
    setNewStepItem(true);
    setValueChanged('');
    setStepItemEditedId('');
    
  }, []);

  return (
    <div>
      {campaignStepSelected.id !== '' && (
        <ContainerInputs>
          <TitleInputs>
            Atividades - <Strong>{campaignStepSelected?.title}</Strong>
          </TitleInputs>

          <Form>
            {stepsItemsSelected?.length > 0 &&
              stepsItemsSelected.map(csi => (
                <WapperInput>
                  <Input
                    placeholder={csi.title}
                    style={{ marginTop: 5, marginBottom: 5 }}
                    disabled={csi.id !== stepItemEditedId}
                    value={
                      csi.id === stepItemEditedId
                        ? valueChanged
                        : csi.title
                    }
                    onChange={event =>
                      setValueChanged(event.target.value)
                    }
                    type="text"
                  />
                  <Item>
                    <DatePicker
                      disabled={csi.id !== stepItemEditedId}
                      className="datePicker"
                      locale={pt}
                      dateFormat="dd/MM/yyyy"
                      selected={limitDate}
                      minDate={new Date()}
                      placeholderText={
                        csi.limitDate 
                          ? `Limite: ${format(new Date(csi.limitDate), 'dd/MM/yyyy')}` 
                          : 'Sem Limite'
                      }
                      onChange={setLimitDate}
                    />
                  </Item>
                  {editable && (
                    <>
                      <ButtonDelete
                        type="button"
                        onClick={() =>
                          csi.id === stepItemEditedId
                            ? handleUpdateStepItem()
                            : handleEditStepItem(csi)
                        }
                      >
                        {csi.id === stepItemEditedId ? (
                          <FiCheck id="check" size={24} />
                        ) : (
                          <MdOutlineModeEdit id="edit" size={24} />
                        )}
                      </ButtonDelete>
                      <ButtonDelete
                        type="button"
                        onClick={() =>
                          handleRemoveStepItem(
                            csi.id,
                            campaignStepSelected.id,
                          )
                        }
                      >
                        <FiX id="remove" size={24} />
                      </ButtonDelete>
                    </>
                  )}
                </WapperInput>
              ))}
            {newStepItem && (
              <WapperInput>
                <Input
                  placeholder="Atividade"
                  style={{ marginTop: 5, marginBottom: 5 }}
                  value={valueChanged}
                  onChange={event => setValueChanged(event.target.value)}
                />
                <Item>
                  <DatePicker 
                    className="datePicker"
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={limitDate}
                    placeholderText="Data Limite"
                    onChange={setLimitDate}
                  />
                </Item>
                <ButtonDelete
                  type="button"
                  onClick={() =>
                    handleAddNewStep(campaignStepSelected.id)
                  }
                >
                  <FiCheck id="check" size={24} />
                </ButtonDelete>
              </WapperInput>
            )}
            {editable && (
              <ButtonAdd
                onClick={() => handleActiveNewStepProject()}
                type="button"
              >
                <IoIosAdd size={22} />
                <ValueButton>Adicionar atividade</ValueButton>
              </ButtonAdd>
            )}
          </Form>
        </ContainerInputs>
      )}
    </div>
  );
};
