/* eslint-disable @typescript-eslint/no-empty-function */
import { LoginForm, LoginWithoutAuthForm, SendCodeForm } from 'interfaces';
import { ITour, TourId, TourStatus } from 'interfaces/tour';
import { ChangePassword, User, UserUpdate } from 'interfaces/user';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { getIsEmail } from 'utils/isEmail';
import { getCookie, setCookie, removeCookie } from 'utils/storage';
import { AuthDefaultValues, AuthReducer } from './reducers/AuthReducer';

interface AuthPropsData {
  loginAfterMicrosoftAuthenticate?: (params: SendCodeForm) => Promise<void>;
  sendEmailToAuthenticate?: (params: SendCodeForm) => Promise<void>;
  authLogin?: (params: LoginForm) => Promise<void>;
  changePassword?: (params: ChangePassword) => Promise<void>;
  authLoginWithoutAuthentication?: (
    params: LoginWithoutAuthForm
  ) => Promise<void>;
  logout: () => void;
  updateMe: (params: UserUpdate) => Promise<void>;
  acceptTerms: () => Promise<void>;
  getAcceptedTerms: () => Promise<void>;
  viewedTour: (tourId: TourId) => Promise<void>;
  resetTour: () => Promise<void>;
  viewAllTour: () => Promise<void>;
  token: string;
  emailState: string;
  loginStep: boolean;
  user: User;
  loading: boolean;
  code: string;
  acceptedTerms: string;
}

export const AuthContext = createContext<AuthPropsData>({} as AuthPropsData);

export const ProviderAuth: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(AuthReducer, AuthDefaultValues);

  const { push } = useRouter();

  const [emailState, setEmailState] = useState('');

  useEffect(() => {
    const item = localStorage.getItem('emailLogin');
    setEmailState(item);
  }, [emailState]);

  async function login(email: any, code: any): Promise<any> {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.post('/users/sessions/verify', {
        authenticationCode: code.toString(),
        email,
      });

      dispatch({ type: 'SET_TOKEN', token: data.token });
      dispatch({ type: 'SET_USER', user: data.user });

      setCookie('authentication', data.token);

      Object.assign(api.defaults.headers, {
        Authorization: `Bearer ${data.token}`,
      });

      toast.success('Entrando...');
      await push('/home');
      dispatch({ type: 'SET_LOGIN_STEP', loginStep: false });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error');
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }

  async function loginOnAppAfterMicrosoft(email: any): Promise<any> {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data } = await api.post('/users/sessions/without-code', {
        email,
      });

      dispatch({ type: 'SET_TOKEN', token: data.token });
      dispatch({ type: 'SET_USER', user: data.user });
      setCookie('authentication', data.token);

      Object.assign(api.defaults.headers, {
        Authorization: `Bearer ${data.token}`,
      });

      toast.success('Entrando...');
      await push('/home');
      dispatch({ type: 'SET_LOGIN_STEP', loginStep: false });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error');
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }

  const loginAfterMicrosoftAuthenticate = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      dispatch({ type: 'SET_EMAIL', emailState });
      loginOnAppAfterMicrosoft(
        emailState || localStorage.getItem('emailLogin')
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error');
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }, []);

  const sendEmailToAuthenticate = useCallback(
    async ({ email }: SendCodeForm) => {
      try {
        const isEmail = getIsEmail(email);

        dispatch({ type: 'SET_LOADING', loading: true });
        await api.post('/users/sessions', {
          email: isEmail ? email : undefined,
          registration: isEmail ? undefined : email,
        });

        localStorage.setItem('emailLogin', email);
        dispatch({ type: 'SET_EMAIL', emailState });
        dispatch({ type: 'SET_LOGIN_STEP', loginStep: true });
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Error');
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [dispatch]
  );

  const authLogin = useCallback(
    async ({ authenticationCode }: LoginForm) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const email = localStorage.getItem('emailLogin');
        const isEmail = getIsEmail(email);

        const { data } = await api.post('/users/sessions/verify', {
          authenticationCode: isEmail ? authenticationCode : undefined,
          email: isEmail ? email : undefined,
          registration: isEmail ? undefined : email,
          password: isEmail ? undefined : authenticationCode,
        });

        const hasFirstAcess =
          data.user.firstAccess !== null && data.user.firstAccess !== undefined;

        dispatch({ type: 'SET_TOKEN', token: data.token });
        dispatch({ type: 'SET_USER', user: data.user });

        if (!isEmail && !hasFirstAcess) {
          await push('/change-password');
        } else {
          setCookie('authentication', data.token);

          Object.assign(api.defaults.headers, {
            Authorization: `Bearer ${data.token}`,
          });

          toast.success('Entrando...');
          await push('/');
        }
        dispatch({ type: 'SET_LOGIN_STEP', loginStep: false });
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Error');
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [dispatch, dataReducer, push]
  );

  const changePassword = useCallback(
    async ({ oldPassword, newPassword }: ChangePassword) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });

        const registration = localStorage.getItem('emailLogin');

        await api.post('/users/change-password', {
          registration,
          oldPassword,
          newPassword,
        });

        setCookie('authentication', dataReducer.token);

        Object.assign(api.defaults.headers, {
          Authorization: `Bearer ${dataReducer.token}`,
        });

        toast.success('Entrando...');
        await push('/home');

        dispatch({ type: 'SET_LOGIN_STEP', loginStep: false });
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Error');
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [dispatch, dataReducer, push]
  );

  const authLoginWithoutAuthentication = useCallback(
    async ({ email }: LoginWithoutAuthForm) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data } = await api.post('/users/sessions/verify', {
          email,
        });

        dispatch({ type: 'SET_TOKEN', token: data.token });
        dispatch({ type: 'SET_USER', user: data.user });

        setCookie('authentication', data.token);
        Object.assign(api.defaults.headers, {
          Authorization: `Bearer ${data.token}`,
        });

        toast.success('Entrando...');
        await push('/home');
        dispatch({ type: 'SET_LOGIN_STEP', loginStep: false });
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Error');
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [dispatch, push]
  );

  const updateMe = useCallback(
    async (editForm: UserUpdate) => {
      try {
        const { data } = await api.put('/users/me', editForm);
        dispatch({ type: 'SET_USER', user: data.user });

        toast.success('Editado sucesso');
      } catch (err) {
        console.error(err?.response?.data?.message);
        // toast.error(err?.response?.data?.message || 'Error');
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    await api.post('/users/sessions/end-access');

    localStorage.removeItem('emailLogin');
    removeCookie('authentication');
    dispatch({ type: 'SET_TOKEN', token: undefined });
    dispatch({ type: 'SET_USER', user: undefined });
    Object.assign(api.defaults.headers, {
      Authorization: '',
    });

    // push('api/auth/signout/azureb2c');
    push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyToken = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });

      const token = getCookie('authentication');

      if (token) {
        const { data } = await api.post('/users/sessions/verify-token', {
          token,
        });
        dispatch({ type: 'SET_TOKEN', token: data.token });
        dispatch({ type: 'SET_USER', user: data.user });

        Object.assign(api.defaults.headers, {
          Authorization: `Bearer ${data.token}`,
        });
      } else {
        push('/login');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error');
      logout();
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAcceptedTerms = useCallback(async () => {
    try {
      const { data } = await api.get('/users/sessions/get-accept-terms');
      dispatch({ type: 'SET_ACCEPTED_TERMS', acceptedTerms: data });
    } catch (err) {
      console.error(err?.response?.data?.message);
      // toast.error(err?.response?.data?.message || 'Erro ao aceitar termos');
    }
  }, [dispatch]);

  const acceptTerms = useCallback(async () => {
    try {
      await api.put('/users/sessions/accept-terms');
      getAcceptedTerms();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Erro ao aceitar termos');
    }
  }, [getAcceptedTerms]);

  const viewedTour = useCallback(
    async (tourId: TourId) => {
      try {
        const { token } = dataReducer;

        if (token) {
          await api.put(
            `/users/tours/${dataReducer.user.id}/${tourId}/viewed`,
            {
              token,
            }
          );
        }

        const newTours: ITour = {
          ...dataReducer.user.tours,
          [tourId]: TourStatus.VIEWED,
        };

        const user = {
          ...dataReducer.user,
          tours: newTours,
        };

        dispatch({ type: 'SET_USER', user });
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Não foi possível atualizar o status do tour.'
        );
      }
    },
    [dataReducer]
  );

  const resetTour = useCallback(async () => {
    try {
      const { token } = dataReducer;

      if (token) {
        await api.put(`/users/tours/${dataReducer.user.id}/reset`, {
          token,
        });
      }

      const newTours: ITour = {
        [TourId.HOME]: TourStatus.UNVIEWED,
        [TourId.MENU_LIST]: TourStatus.UNVIEWED,
        [TourId.KNOWLEDGE_TRAIL]: TourStatus.UNVIEWED,
        [TourId.IDEAS_WAITING]: TourStatus.UNVIEWED,
        [TourId.IDEAS_REVIEW]: TourStatus.UNVIEWED,
        [TourId.IDEAS_APPROVED]: TourStatus.UNVIEWED,
        [TourId.IDEAS_EXTERNAL_REVIEW]: TourStatus.UNVIEWED,
        [TourId.DETAIL_IDEAS_DEFAULT]: TourStatus.UNVIEWED,
        [TourId.DETAIL_IDEAS_WITH_PROCESS]: TourStatus.UNVIEWED,
        [TourId.MANAGEMENT_PLATFORM]: TourStatus.UNVIEWED,
        [TourId.FUNNEL_STEP_ONE]: TourStatus.UNVIEWED,
        [TourId.FUNNEL_STEP_TWO]: TourStatus.UNVIEWED,
        [TourId.FUNNEL_STEP_THREE]: TourStatus.UNVIEWED,
        [TourId.CAMPAIGN_STEP_ONE]: TourStatus.UNVIEWED,
        [TourId.CAMPAIGN_STEP_TWO]: TourStatus.UNVIEWED,
      };

      const user = {
        ...dataReducer.user,
        tours: newTours,
      };
      toast.success('Tour do Avantt.i reiniciado com sucesso!');
      dispatch({ type: 'SET_USER', user });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Não foi possível realizar o reset do Tour.'
      );
    }
  }, [dataReducer]);

  const viewAllTour = useCallback(async () => {
    try {
      const { token } = dataReducer;

      if (token) {
        await api.put(`/users/tours/${dataReducer.user.id}/viewedAll`, {
          token,
        });
      }

      const newTours: ITour = {
        [TourId.HOME]: TourStatus.VIEWED,
        [TourId.MENU_LIST]: TourStatus.VIEWED,
        [TourId.KNOWLEDGE_TRAIL]: TourStatus.VIEWED,
        [TourId.IDEAS_WAITING]: TourStatus.VIEWED,
        [TourId.IDEAS_REVIEW]: TourStatus.VIEWED,
        [TourId.IDEAS_APPROVED]: TourStatus.VIEWED,
        [TourId.IDEAS_EXTERNAL_REVIEW]: TourStatus.VIEWED,
        [TourId.DETAIL_IDEAS_DEFAULT]: TourStatus.VIEWED,
        [TourId.DETAIL_IDEAS_WITH_PROCESS]: TourStatus.VIEWED,
        [TourId.MANAGEMENT_PLATFORM]: TourStatus.VIEWED,
        [TourId.FUNNEL_STEP_ONE]: TourStatus.VIEWED,
        [TourId.FUNNEL_STEP_TWO]: TourStatus.VIEWED,
        [TourId.FUNNEL_STEP_THREE]: TourStatus.VIEWED,
        [TourId.CAMPAIGN_STEP_ONE]: TourStatus.VIEWED,
        [TourId.CAMPAIGN_STEP_TWO]: TourStatus.VIEWED,
      };

      const user = {
        ...dataReducer.user,
        tours: newTours,
      };
      dispatch({ type: 'SET_USER', user });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Não foi possível realizar o reset do Tour.'
      );
    }
  }, [dataReducer]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const AuthDataValue: AuthPropsData = useMemo(() => {
    return {
      ...dataReducer,
      authLogin,
      changePassword,
      loginAfterMicrosoftAuthenticate,
      sendEmailToAuthenticate,
      authLoginWithoutAuthentication,
      logout,
      updateMe,
      acceptTerms,
      getAcceptedTerms,
      viewedTour,
      resetTour,
      viewAllTour,
    };
  }, [
    dataReducer,
    authLogin,
    changePassword,
    loginAfterMicrosoftAuthenticate,
    sendEmailToAuthenticate,
    authLoginWithoutAuthentication,
    logout,
    updateMe,
    acceptTerms,
    getAcceptedTerms,
    viewedTour,
    resetTour,
    viewAllTour,
  ]);

  return (
    <AuthContext.Provider value={AuthDataValue}>
      {children}
    </AuthContext.Provider>
  );
};
