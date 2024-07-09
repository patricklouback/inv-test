import { User } from 'interfaces/user';

interface UserProps {
  loading: boolean;
  user: User;
  engagementRanking: Array<{
    rank: string;
    name: string;
    image: string;
    points: string;
    createdIdeas: string;
    comments: string;
    likes: string;
  }>;
}

type UserActions =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_USER'; user: User }
  | {
      type: 'SET_ENGAGEMENT_RANKING';
      engagementRanking: Array<{
        rank: string;
        name: string;
        image: string;
        points: string;
        createdIdeas: string;
        comments: string;
        likes: string;
      }>;
    };

export const UserDefaultValues = {
  loading: false,
  user: {},
  engagementRanking: [],
} as UserProps;

export const UserReducer = (
  state: UserProps,
  action: UserActions
): UserProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_LOADING':
      newState.loading = action.loading;
      break;
    case 'SET_USER':
      newState.user = action.user;
      break;
    case 'SET_ENGAGEMENT_RANKING':
      newState.engagementRanking = action.engagementRanking;
      break;
    default:
      break;
  }
  return newState;
};
