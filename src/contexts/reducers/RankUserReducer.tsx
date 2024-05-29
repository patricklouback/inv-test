import { Paginate } from 'interfaces/paginate';
import { User, UserRanked } from 'interfaces/user';

interface RankUserProps {
  users: User[];
  usersRanked: UserRanked[];
  loading: boolean;
  paginate: Paginate;
}

type RankUserActions =
  | { type: 'SET_USERS'; users: User[] }
  | { type: 'SET_USERS_RANKED'; usersRanked: UserRanked[] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_PAGINATE'; paginate: Paginate };

export const RankUserDefaultValues = {
  users: null,
  loading: false,
  usersRanked: null,
  paginate: null,
};

export const RankUserReducer = (
  state: RankUserProps,
  action: RankUserActions
): RankUserProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_USERS':
      newState.users = action.users;
      break;

    case 'SET_LOADING':
      newState.loading = action.loading;
      break;

    case 'SET_USERS_RANKED':
      newState.usersRanked = action.usersRanked;
      break;

    case 'SET_PAGINATE':
      newState.paginate = action.paginate;
      break;

    default:
      break;
  }

  return newState;
};
