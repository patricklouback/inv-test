import { User } from 'interfaces/user';

interface AuthProps {
  loading: boolean;
  /* email: string; */
  token: string;
  loginStep: boolean;
  user: User;
  code: string;
  emailState: string;
  acceptedTerms: string;
}

type AuthActions =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_EMAIL'; emailState: string }
  /* | { type: 'SET_EMAIL'; email: string } */
  | { type: 'SET_TOKEN'; token: string }
  | { type: 'SET_USER'; user: User }
  | { type: 'SET_LOGIN_STEP'; loginStep: boolean }
  | { type: 'SET_CODE'; code: string }
  | { type: 'SET_ACCEPTED_TERMS'; acceptedTerms: string };

export const AuthDefaultValues = {
  loginStep: false,
  loading: false,
  acceptedTerms: null,
} as AuthProps;

export const AuthReducer = (
  state: AuthProps,
  action: AuthActions
): AuthProps => {
  const newState = { ...state };

  switch (action.type) {
    /* case 'SET_EMAIL':
      newState.email = action.email;
      break; */
    case 'SET_EMAIL':
      newState.emailState = action.emailState;
      break;
    case 'SET_LOGIN_STEP':
      newState.loginStep = action.loginStep;
      break;
    case 'SET_LOADING':
      newState.loading = action.loading;
      break;
    case 'SET_TOKEN':
      newState.token = action.token;
      break;
    case 'SET_USER':
      newState.user = action.user;
      break;
    case 'SET_CODE':
      newState.code = action.code;
      break;
    case 'SET_ACCEPTED_TERMS':
      newState.acceptedTerms = action.acceptedTerms;
      break;
    default:
      break;
  }
  return newState;
};
