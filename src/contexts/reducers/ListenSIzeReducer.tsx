interface ListenSizeProps {
  size: number;
}

type ListenSizeActions = {
  type: 'SET_SIZE';
  size: number;
};

export const ListenSizeDefaultValues = {
  size: 0,
};

export const ListenSizeReducer = (
  state: ListenSizeProps,
  action: ListenSizeActions
): ListenSizeProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_SIZE':
      newState.size = action.size;
      break;

    default:
      break;
  }

  return newState;
};
