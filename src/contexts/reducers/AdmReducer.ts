import { Paginate } from '@default-types';
import { User } from 'interfaces/user';

interface AuthProps {
  loading: boolean;
  users: User[];
  paginate: Paginate;
}

type AdmActions =
  | { type: 'SET_USERS'; users: User[] }
  | { type: 'SET_PAGINATE'; paginate: Paginate }
  | { type: 'SET_LOADING'; loading: boolean }

export const AdmDefaultValues = {
  users: null,
  loading: false,
  paginate: null,
} as AuthProps;

export const AdmReducer = (state: AuthProps, action: AdmActions): AuthProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_USERS':
      newState.users = action.users;
      break;
    case 'SET_LOADING':
      newState.loading = action.loading;
      break;
    case 'SET_PAGINATE':
      newState.paginate = action.paginate;
      break;
    default:
      break;
  }
  return newState;
};
