import { createContext, useCallback, useMemo, useReducer } from 'react';
import {
  ListenSizeDefaultValues,
  ListenSizeReducer,
} from './reducers/ListenSIzeReducer';

interface ListenSizeProps {
  size: number;
  setSize: (size: number) => void;
}

export const ListenSizeContext = createContext<ListenSizeProps>(
  {} as ListenSizeProps
);

export const ProviderListenSize = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    ListenSizeReducer,
    ListenSizeDefaultValues
  );

  const setSize = useCallback(
    (size: number) => {
      dispatch({ type: 'SET_SIZE', size });
    },
    [dispatch]
  );

  const DataValues = useMemo(() => {
    return {
      ...dataReducer,
      setSize,
    };
  }, [setSize, dataReducer]);

  return (
    <ListenSizeContext.Provider value={DataValues}>
      {children}
    </ListenSizeContext.Provider>
  );
};
