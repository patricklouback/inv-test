import { Paginate } from 'interfaces';
import { User, UserDelete, UserUpdate } from 'interfaces/user';
import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { AdmDefaultValues, AdmReducer } from './reducers/AdmReducer';

interface UsersLoadParams {
  limit?: number;
  offset?: number;
  search?: string;
  page?: number;
  orderColumn?: 'createdAt' | 'name' | 'email' | 'registration';
  orderOrientation?: 'asc' | 'desc';
  departamentIds?: string;
  areaIds?: string;
}

export interface ICreateUserDTO {
  name: string;
  email?: string;
  areaId: string;
  departamentId: string;
  registration?: string;
  password?: string;
  isAdmin?: boolean;
  isManager?: boolean;
}

interface AdmPropsData {
  // userRouter.post('/csv', multer().single('file'), userController.importCsvUsers);
  importCSV: (file: any) => Promise<void>;
  createUser?: (data: ICreateUserDTO) => Promise<void>;
  editUser?: (id: string, params: UserUpdate) => Promise<void>;
  deleteUser?: (id: string, params: UserDelete) => Promise<void>;
  getUsers?: (params?: UsersLoadParams) => Promise<void>;
  users: User[];
  loading: boolean;
  paginate: Paginate;
  downloadReport: () => Promise<void>;
}

export const AdmContext = createContext<AdmPropsData>({} as AdmPropsData);

export const ProviderAdm: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(AdmReducer, AdmDefaultValues);

  const getUsers = useCallback(
    async (params = {}) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.get('/users/list', {
          params,
        });

        dispatch({ type: 'SET_USERS', users: data.users });
        dispatch({ type: 'SET_PAGINATE', paginate: data.paginate });
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Error ao buscar usúarios');
      }
    },
    [dispatch]
  );

  const editUser = useCallback(
    async (id: string, params: UserUpdate) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.put(`/users/user/${id}`, params);
        await getUsers();
        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Erro ao editar usúario');
      }
    },
    [dispatch, getUsers]
  );

  const deleteUser = useCallback(
    async (id: string, params: UserDelete) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        await api.put(`/users/user/${id}`, params);

        dispatch({ type: 'SET_LOADING', loading: false });
      } catch (error) {
        toast.info('Erro ao inativar usúario');
      }
    },
    [dispatch]
  );

  const importCSV = useCallback(
    async (file: File) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await api.post('/users/csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        await getUsers();
        if (data.uploadUsersResult.length > 0) {
          dispatch({ type: 'SET_LOADING', loading: false });
          toast.warning(
            `Os usuários ${data.uploadUsersResult} não foram criados por não possuírem e-mail válido. Revise o arquivo e repita o procedimento`,
            { autoClose: false }
          );
        } else {
          dispatch({ type: 'SET_LOADING', loading: false });
          toast.success('Usuários importados com sucesso!');
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Erro ao importar usúarios'
        );
      }
    },
    [dispatch, getUsers]
  );

  const downloadReport = useCallback(async () => {
    try {
      const response = await api.get('/users/sessions/generate-report', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Erro ao gerar relatório');
    }
  }, []);

  const createUser = useCallback(async (data: User) => {
    try {
      await api.post('/users/user', data);
      toast.success('Usuário adicionado com sucesso!');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Erro ao adicionar usúarios'
      );
    }
  }, []);

  const AuthDataValue = useMemo(() => {
    return {
      ...dataReducer,
      importCSV,
      createUser,
      editUser,
      deleteUser,
      getUsers,
      downloadReport,
    };
  }, [
    dataReducer,
    importCSV,
    createUser,
    editUser,
    getUsers,
    deleteUser,
    downloadReport,
  ]);

  return (
    <AdmContext.Provider value={AuthDataValue}>{children}</AdmContext.Provider>
  );
};
