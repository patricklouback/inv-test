import React, { createContext, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';

interface ExcelDataReportPropsData {
  downloadXlsx: () => Promise<void>;
  downloadXlsxDash: () => Promise<void>;
}

export const ExcelDataReportContext = createContext<ExcelDataReportPropsData>({} as ExcelDataReportPropsData);

export const ProviderExcelDataReport: React.FC = ({ children }): JSX.Element => {

  const downloadXlsx = useCallback(
    async () => {
      try {
        const actualDate = new Date();
        
        const { data } = await api.get('/datareport/download-data-report', {responseType: 'blob'});
        
        const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const blob = new Blob([data], { type: fileType });
        
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `ideas-data-${actualDate.getDate()}-${actualDate.getMonth() + 1}-${actualDate.getFullYear()}.xlsx`;
        link.click();

        toast.success('Arquivo xlsx baixado com sucesso');
      } catch (error) {
        toast.info('Erro no download do Arquivo xlsx');
      }
    },
    []
  );

  const downloadXlsxDash = useCallback(
    async () => {
      try {
        const actualDate = new Date();
        
        const { data } = await api.get('/datareport/download-data-report/dashboards', {responseType: 'blob'});
        
        const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const blob = new Blob([data], { type: fileType });
        
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `dashboard-data-${actualDate.getDate()}-${actualDate.getMonth() + 1}-${actualDate.getFullYear()}.xlsx`;
        link.click();

        toast.success('Arquivo xlsx baixado com sucesso');
      } catch (error) {
        toast.info('Erro no download do Arquivo xlsx');
      }
    },
    []
  );
  const AuthDataValue = useMemo(() => {
    return {
      downloadXlsx,
      downloadXlsxDash
    };
  }, [downloadXlsx, downloadXlsxDash]);

  return (
    <ExcelDataReportContext.Provider value={AuthDataValue}>{children}</ExcelDataReportContext.Provider>
  );
};
