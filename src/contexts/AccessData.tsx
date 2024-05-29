import React, { createContext, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';



interface AccessDataPropsData {
    accessTimeByMonth: (params?: any) => Promise<any[]>;
}

export const AccessDataContext = createContext<AccessDataPropsData>({} as AccessDataPropsData);

export const ProviderAccessData: React.FC = ({ children }): JSX.Element => {
    const accessTimeByMonth = useCallback(
        async (params?: any) => {
            try {
                const { data } = await api.get('/datareport/access-data', {
                    params,
                });
                return data.accessData;
            } catch (error) {
                toast.info('Erro ao buscar dados de tempo de acesso');
            }
        },
        []
    );

    const AuthDataValue = useMemo(() => {
        return {
            accessTimeByMonth,
        };
    }, [accessTimeByMonth]);

    return (
        <AccessDataContext.Provider value={AuthDataValue}>{children}</AccessDataContext.Provider>
    );
};