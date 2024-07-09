import { SelectHTMLAttributes } from 'react';
import { FiCheck, FiEdit2 } from 'react-icons/fi';
import { EditAndCheckWrapper, IconButton } from './style';

interface EditAndCheckProps extends SelectHTMLAttributes<HTMLSelectElement> {
  isEditing: boolean;
  handleCheck: () => void;
  setIsEditing: (value: boolean) => void;
}

export function EditAndCheck({
  isEditing,
  setIsEditing,
  handleCheck,
}: EditAndCheckProps): JSX.Element {
  return (
    <EditAndCheckWrapper>
      {isEditing ? (
        <IconButton onClick={handleCheck}>
          <FiCheck size={20} />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <FiEdit2 size={20} />
        </IconButton>
      )}
    </EditAndCheckWrapper>
  );
}
