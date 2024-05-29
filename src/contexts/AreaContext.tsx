import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { Area, EngagementAreaPoints } from 'interfaces/areas';
import { AreaDefaultValues, AreaReducer } from './reducers/AreaReducer';

interface GraphParams {
  initialDate?: string;
  finalDate?: string;
  campaignIds?: string;
}

interface AreaPropsData {
  // userRouter.post('/csv', multer().single('file'), userController.importCsvUsers);
  getAreas?: () => Promise<void>;
  areas: Area[];
  getEngagementAreaPoints: (
    params?: GraphParams
  ) => Promise<EngagementAreaPoints[]>;
  createArea?: (name: string, color: string) => Promise<void>;
  getAreasContribution: ( params?: GraphParams ) => Promise<any>;
}

export const AreaContext = createContext<AreaPropsData>({} as AreaPropsData);

export const AreaProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(AreaReducer, AreaDefaultValues);

  const getAreas = useCallback(async () => {
    try {
      const { data } = await api.get('/areas/list');

      dispatch({ type: 'SET_AREAS', areas: data.areas });
    } catch (error) {
      toast.info('Error ao buscar as áreas');
    }
  }, [dispatch]);

  const getEngagementAreaPoints = useCallback(async (params = {}) => {
    try {
      const { data } = await api.get('/areas/points', { params });

      return data.areaPointsByMonth;
    } catch (error) {
      toast.info('Error ao buscar as áreas');
      return [];
    }
  }, []);

  const createArea = useCallback(async (name, color) => {
    try {
      if(name.length > 0) {
        const {
          data: { area },
        } = await api.post('/areas/area', { name, color } );
        dispatch({ type: 'SET_AREA', area });
        toast.success('Área criada com sucesso!')
      } else {
        toast.info('Favor preencher o nome da Área que deseja criar')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Acessa a mensagem de erro enviada pelo back-end
        toast.error(error.response.data.error.message);
      } else {
        toast.error('Error ao criar a área');
      }
    }
  }, [dispatch]);

  const getAreasContribution = useCallback(async (params = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true })
      const { data } = await api.get(`/areas/contribution`, { params })
      dispatch({ type: 'SET_LOADING', loading: false })
      return data.areasContribution;
    } catch (error) {
      toast.error('Erro ao buscar contribuição das áreas');
    }
  }, [dispatch])

  const AuthDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getAreas,
      getEngagementAreaPoints,
      createArea,
      getAreasContribution
    };
  }, [dataReducer, getAreas, getEngagementAreaPoints, createArea, getAreasContribution]);

  return (
    <AreaContext.Provider value={AuthDataValue}>
      {children}
    </AreaContext.Provider>
  );
};
