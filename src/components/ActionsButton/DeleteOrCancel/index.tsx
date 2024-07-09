import { SelectHTMLAttributes } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiX } from 'react-icons/fi';
import { DeleteWrapper, IconButton } from './style';

interface DeleteProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleDeleteItem: () => void;
  handleCancelEdit?: () => void;
  isEditing?: boolean;
}

export function DeleteOrCancel({
  handleDeleteItem,
  isEditing,
  handleCancelEdit,
}: DeleteProps): JSX.Element {
  return (
    <DeleteWrapper>
      {isEditing ? (
        <IconButton onClick={handleCancelEdit}>
          <FiX size={22} />
        </IconButton>
      ) : (
        <IconButton onClick={handleDeleteItem}>
          <RiDeleteBinLine size={20} />
        </IconButton>
      )}
    </DeleteWrapper>
  );
}
