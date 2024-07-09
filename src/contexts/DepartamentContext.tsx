import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { Departament } from 'interfaces/departament';
import {
  DepartamentDefaultValues,
  DepartamentReducer,
} from './reducers/DepartamentReducer';

interface DepartamentPropsData {
  // userRouter.post('/csv', multer().single('file'), userController.importCsvUsers);
  getDepartaments?: () => Promise<void>;
  createDepartament?: (name: string) => Promise<void>;
  departaments: Departament[];
  departament: Departament;
}

export const DepartamentContext = createContext<DepartamentPropsData>(
  {} as DepartamentPropsData
);

export const DepartamentProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    DepartamentReducer,
    DepartamentDefaultValues
  );

  const getDepartaments = useCallback(async () => {
    try {
      const { data } = await api.get('/departments/list');

      dispatch({ type: 'SET_DEPARTAMENTS', departaments: data.departaments });
    } catch (error) {
      toast.info('Error ao buscar os departamentos');
    }
  }, [dispatch]);

  const createDepartament = useCallback(
    async name => {
      try {
        if (name.length > 0) {
          const { data } = await api.post('/departments/department', { name });

          dispatch({ type: 'SET_DEPARTAMENT', departament: data.departament });

          toast.success('Departamento criado com sucesso!');
        } else {
          toast.info('Favor preencher o nome do Departamento que deseja criar');
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // Acessa a mensagem de erro enviada pelo back-end
          toast.error(error.response.data.error.message);
        } else {
          toast.error('Error ao criar o departamento');
        }
      }
    },
    [dispatch]
  );

  const AuthDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getDepartaments,
      createDepartament,
    };
  }, [dataReducer, getDepartaments, createDepartament]);

  return (
    <DepartamentContext.Provider value={AuthDataValue}>
      {children}
    </DepartamentContext.Provider>
  );
};
