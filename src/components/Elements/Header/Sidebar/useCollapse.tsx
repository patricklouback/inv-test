import { Dispatch, SetStateAction } from 'react';

interface useCollapseProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const useCollapse: React.FC<useCollapseProps> = ({
  state,
  setState,
}): any => {
  setState(!state);
};
