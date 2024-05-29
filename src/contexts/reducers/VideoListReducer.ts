import { allVideos } from 'interfaces/videos';

interface VideoListProps {
  allVideos: allVideos[];
}

type VideoListActions = { type: 'SET_ALL_VIDEOS'; allVideos: allVideos[] };

export const VideoListDefaultValues = {
  allVideos: [],
} as VideoListProps;

export const VideoListReducer = (
  state: VideoListProps,
  action: VideoListActions
): VideoListProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_ALL_VIDEOS':
      newState.allVideos = action.allVideos;
      break;
    default:
      break;
  }
  return newState;
};
