import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { Input } from '@components/InputText';
import { CampaignStepItem } from 'interfaces/campaign';
import React from 'react';
import { FiCheck, FiPlus, FiX } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { AddButton, Container, ButtonAction } from './styles';

interface InputsStep {
  campaignStepSelected: any;
  handleAddNew: () => any;
  stepSelected: string;
  stepItemsSelected: CampaignStepItem[];
  newStepItem: boolean;
  stepItemEditedId: string;
  handleActiveNewStepQuick: any;
  value: string;
  setValueQuickChanged: any;
  handleEditStepItem: any;
  handleRemoveStepItem: any;
  handleUpdateStepItem: any;
  type: string;
}

export const InputsStep: React.FC<InputsStep> = ({
  handleAddNew,
  stepSelected,
  stepItemsSelected,
  handleActiveNewStepQuick,
  newStepItem,
  setValueQuickChanged,
  value,
  handleEditStepItem,
  handleRemoveStepItem,
  handleUpdateStepItem,
  stepItemEditedId,
  campaignStepSelected,
  type,
}): JSX.Element => {
  return (
    <Container>
      {stepSelected && (
        <ContentSimpleComponent title={`Atividades - ${stepSelected}`}>
          <>
            {stepItemsSelected?.map((item, index) => {
              const selected = item.id === stepItemEditedId;
              return (
                <div
                  style={{
                    marginTop: 4,
                    minWidth: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Input
                    style={{ marginTop: 5, marginBottom: 5 }}
                    disabled={!selected}
                    max_width={480}
                    value={selected ? value : item.title}
                    onChange={event => setValueQuickChanged(event.target.value)}
                    type="text"
                    placeholder={`Atividade ${index + 1}`}
                  />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <ButtonAction
                      type="button"
                      onClick={() =>
                        handleRemoveStepItem(
                          item.id,
                          campaignStepSelected.id,
                          type
                        )
                      }
                    >
                      <FiX id="x" size={24} />
                    </ButtonAction>
                    <ButtonAction
                      type="button"
                      style={{ marginLeft: '0' }}
                      onClick={() =>
                        selected
                          ? handleUpdateStepItem(type)
                          : handleEditStepItem(item, type)
                      }
                    >
                      {selected ? (
                        <FiCheck id="check" size={24} />
                      ) : (
                        <MdOutlineModeEdit id="edit" size={24} />
                      )}
                    </ButtonAction>
                  </div>
                </div>
              );
            })}
            {newStepItem && (
              <div
                style={{
                  marginTop: 4,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Input
                  style={{ marginTop: 5, marginBottom: 5 }}
                  max_width={480}
                  onChange={event => setValueQuickChanged(event.target.value)}
                  value={value}
                  type="text"
                  placeholder={`Atividade `}
                />
                <ButtonAction type="button" onClick={handleAddNew}>
                  <FiCheck id="check" size={30} />
                </ButtonAction>
              </div>
            )}
          </>
        </ContentSimpleComponent>
      )}
      {stepSelected && (
        <AddButton type="button" onClick={handleActiveNewStepQuick}>
          <FiPlus size={20} /> Adicionar atividade
        </AddButton>
      )}
    </Container>
  );
};
