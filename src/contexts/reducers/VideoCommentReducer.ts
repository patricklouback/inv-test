import { videoComments } from 'interfaces/comments';

interface VideoCommentsProps {
  comments: videoComments[];
}

type VideoCommentsActions = {
  type: 'SET_ALL_COMMENTS';
  comments: videoComments[];
};

export const VideoCommentsDefaultValues = {
  comments: [],
} as VideoCommentsProps;

export const VideoCommentsReducer = (
  state: VideoCommentsProps,
  action: VideoCommentsActions
): VideoCommentsProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_ALL_COMMENTS':
      newState.comments = action.comments;
      break;
    default:
      break;
  }
  return newState;
};
