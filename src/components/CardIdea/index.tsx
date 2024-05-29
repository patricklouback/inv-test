import { CardIconComponent } from '@components/IconCard';
import { ProcessActivityContext } from 'contexts/ProcessActivity';
import React, { useContext, useEffect, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { normalizeString } from 'utils/normalizeString';
import {
  AddProcessActivity,
  ButtonWrapper,
  Container,
  DeleteProcessActivity,
  EditableValue,
  Value,
} from './style';

interface CardIdeaProps {
  icon?: JSX.Element;
  backgroundIcon?: string;
  value: string;
  background?: string;
  useMargin?: boolean;
  editable?: boolean;
  isCreating?: boolean;
  id?: string;
  closeCreating?: () => void;
  campaignId?: string;
  paddingLeft?: boolean;
  handleImportProcessActivities?: () => void;
}

export const CardIdeia: React.FC<CardIdeaProps> = ({
  value,
  icon,
  background,
  backgroundIcon,
  useMargin,
  editable,
  isCreating,
  id,
  closeCreating,
  campaignId,
  paddingLeft,
  handleImportProcessActivities,
}): JSX.Element => {
  const [isEditing, setIsEditing] = useState(isCreating);
  const { createProcessActivity, editProcessActivity, deleteProcessActivity } =
    useContext(ProcessActivityContext);
  const [name, setName] = useState(value || '');
  const handleCreateProcessActivity = async (): Promise<void> => {
    if (name !== '') {
      await createProcessActivity(name, campaignId);
      setIsEditing(false);
      closeCreating();
      handleImportProcessActivities();
    } else {
      toast.error(`O nome tem que conter pelo menos 1 caracter`, {
        autoClose: 7000,
      });
    }
  };

  const handleUpdateProcessActivity = async (): Promise<void> => {
    if (name !== '') {
      await editProcessActivity(name, id, campaignId);
      setIsEditing(false);
      handleImportProcessActivities();
    } else {
      toast.error(`O nome tem que conter pelo menos 1 caracter`, {
        autoClose: 7000,
      });
    }
  };

  const handleDeleteProcessActivity = async (): Promise<void> => {
    await deleteProcessActivity(id, campaignId);
    handleImportProcessActivities();
  };
  const cancelEdit = (): void => {
    setIsEditing(false);
    if (isCreating) {
      closeCreating();
    }
  };

  const handleKeyDown = (event): void => {
    if (event.key === 'Enter') {
      if (isCreating) {
        handleCreateProcessActivity();
      } else {
        handleUpdateProcessActivity();
      }
    }
    if (event.key === 'Escape') {
      cancelEdit();
    }
  };

  useEffect(() => {
    setName(value || '');
  }, [value]);

  return (
    <div className={`funnel-actions-${normalizeString(value)}`}>
      {editable && (
        <ButtonWrapper width={name.length * 10}>
          <DeleteProcessActivity backgroundColor="none">
            {isEditing ? (
              <FiX size={22} onClick={cancelEdit} />
            ) : (
              <RiDeleteBinLine
                size={22}
                onClick={() => handleDeleteProcessActivity()}
              />
            )}
          </DeleteProcessActivity>
          <AddProcessActivity backgroundColor="none" isCreating={isCreating}>
            {isEditing ? (
              <FiCheck
                aria-disabled
                size={20}
                onClick={() =>
                  isCreating
                    ? handleCreateProcessActivity()
                    : handleUpdateProcessActivity()
                }
              />
            ) : (
              <MdOutlineModeEdit
                id="edit"
                size={20}
                onClick={() => setIsEditing(true)}
              />
            )}
          </AddProcessActivity>
        </ButtonWrapper>
      )}
      <Container width={name.length * 10} background={background}>
        {icon !== undefined ? (
          <CardIconComponent background={backgroundIcon} shadow={false}>
            {icon}
          </CardIconComponent>
        ) : (
          <div />
        )}
        {editable && isEditing ? (
          <EditableValue
            autoFocus
            defaultValue={name}
            useMargin={useMargin}
            onChange={event => setName(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Value useMargin={useMargin} paddingLeft={paddingLeft}>
            {name}
          </Value>
        )}
      </Container>
    </div>
  );
};
