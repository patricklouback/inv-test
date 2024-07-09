import { useState } from 'react';
import { api } from '../services/api';

export const useUploadForm = (url: string) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);


  const uploadForm = async (formData: FormData) => {
    setProgress(0);
    setIsSuccess(false);
    try {
      await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const uploadProgress = (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(uploadProgress);
        },
        onDownloadProgress: progressEvent => {
          const downloadProgress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(downloadProgress);
          setIsSuccess(true);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return { uploadForm, isSuccess, progress,setProgress };
};