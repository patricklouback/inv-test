import { Banner } from 'interfaces/banners';
import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  BannersDefaultValues,
  BannersReducer,
} from './reducers/BannersReducer';

interface BannersPropsData {
  bannersList: Banner[];
  banner: Banner;
  loading: boolean;
  getBannersForPage: (page: string, isTrial: boolean) => Promise<void>;
}

export const BannersContext = createContext<BannersPropsData>(
  {} as BannersPropsData
);

export const BannersProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    BannersReducer,
    BannersDefaultValues
  );

  const getBannersForPage = useCallback(
    async (page: string, isTrial: boolean) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(`/banners/list`, {
          params: {
            page,
            isTrial,
          },
        });
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_BANNERS_LIST',
          bannersList: responseData.bannersList,
        });
      } catch (error) {
        console.error('Erro ao buscar banners', error);
        // toast.error('Erro ao buscar banners');
      }
    },
    [dispatch]
  );

  const BannerDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getBannersForPage,
    };
  }, [dataReducer, getBannersForPage]);

  return (
    <BannersContext.Provider value={BannerDataValue}>
      {children}
    </BannersContext.Provider>
  );
};
