import { allVideos } from 'interfaces/videos';
import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  VideoListDefaultValues,
  VideoListReducer,
} from './reducers/VideoListReducer';

interface VideoListPropsData {
  getAllVideos: () => Promise<allVideos[]>;
  updateVideoWatchedStatus: (videoId: number, watched: boolean) => void;
  updateLikes: (videoId: number, likes: number) => void;
  updateUserLike: (videoId: number, liked: boolean) => void;
  allVideos: allVideos[];
}

export const VideoListContext = createContext<VideoListPropsData>(
  {} as VideoListPropsData
);

export const VideoListProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    VideoListReducer,
    VideoListDefaultValues
  );

  const getAllVideos = useCallback(async () => {
    try {
      const { data } = await api.get('/users/allUserVideos');
      dispatch({ type: 'SET_ALL_VIDEOS', allVideos: data });
      return data;
    } catch (error) {
      toast.info('Erro ao buscar quais vídeos foram assistidos.');
    }
  }, [dispatch]);

  const updateVideoWatchedStatus = useCallback(
    async (videoId, watched) => {
      try {
        await api.put('/users/updateWatched', {
          params: {
            videoId,
            watched,
          },
        });
      } catch (error) {
        toast.info('Erro ao informar que o vídeo foi assitido');
      }
    },
    [dispatch]
  );

  const updateLikes = useCallback(
    async (videoId, likes) => {
      try {
        await api.put('/users/updateLikes', {
          params: {
            videoId,
            likes,
          },
        });
      } catch (error) {
        toast.info('Erro ao curtir, tente novamente mais tarde');
      }
    },
    [dispatch]
  );

  const updateUserLike = useCallback(
    async (videoId, liked) => {
      try {
        await api.put('/users/updateUserLike', {
          params: {
            videoId,
            liked,
          },
        });
      } catch (error) {
        toast.info('Erro ao curtir, tente novamente mais tarde');
      }
    },
    [dispatch]
  );

  const VideoListValue = useMemo(() => {
    return {
      ...dataReducer,
      getAllVideos,
      updateVideoWatchedStatus,
      updateLikes,
      updateUserLike,
    };
  }, [
    dataReducer,
    getAllVideos,
    updateVideoWatchedStatus,
    updateLikes,
    updateUserLike,
  ]);

  return (
    <VideoListContext.Provider value={VideoListValue}>
      {children}
    </VideoListContext.Provider>
  );
};
