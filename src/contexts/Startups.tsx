import { Paginate } from 'interfaces';
import {
  StartupSocialMedia,
  StartupMember,
  Startup,
  StartupLastInvestment,
  StartupInvestmentRounds,
  StartupMarket,
} from 'interfaces/startups';
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
import { StartupNoteType } from 'interfaces/startupNotes';
import {
  StartupsDefaultValues,
  StartupsReducer,
} from './reducers/StartupsReducer';

interface StartupsPropsData {
  startupsList: Startup[];
  favoriteStartups: string[];
  startup: Startup;
  lastInvestmentList: string[];
  markets: string[];
  investmentRounds: number[];
  members: StartupMember[];
  socialMedias: StartupSocialMedia[];
  paginate: Paginate;
  getStartups: (params?: any) => Promise<void>;
  getFavoriteStartups: () => Promise<void>;
  viewStartup: (startupId: string) => Promise<void>;
  favoriteStartupToUser: (startupId: string) => Promise<void>;
  unfavoriteStartupToUser: (startupId: string) => Promise<void>;
  getStartupSocialMedias: (startupId: string) => Promise<void>;
  getStartupMembers: (startupId: string) => Promise<void>;
  setStartup: React.Dispatch<React.SetStateAction<Startup>>;
  createStartupStep: (newStartup: Startup) => void;
  cleanStartupStep: () => void;
  stepCreate: number;
  setStepCreate: React.Dispatch<React.SetStateAction<number>>;
  createStartupFinish: (
    finishedData: Startup['startupMembers']
  ) => Promise<void>;
  uploadCSV: (formData: FormData) => Promise<void>;
  updateStartup: (newStartup: Partial<Startup>) => void;
  getStartupsNotes: () => Promise<void>;
  createStartupNotes: (
    note: Pick<StartupNoteType, 'title' | 'description'>
  ) => Promise<void>;
  notes: StartupNoteType[];
  setNotes: React.Dispatch<React.SetStateAction<StartupNoteType[]>>;
}

export const StartupsContext = createContext<StartupsPropsData>(
  {} as StartupsPropsData
);

export const StartupsProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    StartupsReducer,
    StartupsDefaultValues
  );
  const [stepCreate, setStepCreate] = useState(1);
  const [startup, setStartup] = useState<Startup>({
    id: '',
    name: '',
    foundationYear: 2024,
    target: [],
    description: '',
    country: '',
    state: '',
    investmentRounds: 1,
    lastInvestment: 'Pré-seed',
    email: '',
    linkedIn: '',
    url: '',
    startupMembers: [] as StartupMember[],
  });
  const [notes, setNotes] = useState<StartupNoteType[]>([]);

  const getStartups = useCallback(
    async (params?: any) => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        const { data: responseData } = await api.get(`/startups/list`, {
          params,
        });
        dispatch({ type: 'SET_PAGINATE', paginate: responseData.paginate });
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({
          type: 'SET_STARTUPS_LIST',
          startupsList: responseData.startupList,
        });
      } catch (error) {
        toast.error('Erro ao buscar startups');
      }
    },
    [dispatch]
  );

  const getFavoriteStartups = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const { data: responseData } = await api.get(`/startups/favorite`);
      dispatch({ type: 'SET_LOADING', loading: false });
      dispatch({
        type: 'SET_FAVORITE_STARTUPS',
        favoriteStartups: responseData.favoriteStartups,
      });
    } catch (error) {
      toast.error('Erro ao buscar startups favoritas');
    }
  }, [dispatch]);

  const favoriteStartupToUser = useCallback(async (startupId: string) => {
    try {
      await api.post(`/startups/favorite/${startupId}`);
    } catch (error) {
      toast.error('Erro ao favoritar a startup');
    }
  }, []);

  const unfavoriteStartupToUser = useCallback(async (startupId: string) => {
    try {
      await api.post(`/startups/unfavorite/${startupId}`);
    } catch (error) {
      toast.error('Erro ao desfavoritar a startup');
    }
  }, []);

  const viewStartup = useCallback(async (startupId: string) => {
    try {
      const { data: responseData } = await api.get(`/startups/${startupId}`);
      setStartup(responseData.startup);
    } catch (error) {
      toast.error('Erro ao buscar a startup');
    }
  }, []);

  const getStartupSocialMedias = useCallback(
    async (startupId: string) => {
      try {
        const { data: responseData } = await api.get(
          `/startups/social-medias/${startupId}`
        );
        dispatch({
          type: 'SET_SOCIAL_MEDIAS',
          socialMedias: responseData.socialMedias,
        });
      } catch (error) {
        toast.error('Erro ao buscar as mídias sociais da startup');
      }
    },
    [dispatch]
  );

  const getStartupMembers = useCallback(
    async (startupId: string) => {
      try {
        const { data: responseData } = await api.get(
          `/startups/members/${startupId}`
        );
        dispatch({ type: 'SET_MEMBERS', members: responseData.members });
      } catch (error) {
        toast.error('Erro ao buscar os membros da startup');
      }
    },
    [dispatch]
  );

  const getStartupStep = () => {
    const startupStep = localStorage.getItem(`startup-step`);
    const stepCreate = localStorage.getItem(`step-create`);
    if (startupStep) {
      setStepCreate(JSON.parse(stepCreate));
      setStartup(JSON.parse(startupStep));
    }
  };

  const updateStartup = async (newStartup: Partial<Startup>) => {
    try {
      await api.put(`/startups/${startup.id}`, newStartup);
      const findItem = dataReducer.startupsList.find(
        item => item.id === startup.id
      );

      if (findItem) {
        const index = dataReducer.startupsList.indexOf(findItem);
        dataReducer.startupsList[index] = { ...findItem, ...newStartup };
      }
      dispatch({
        type: 'SET_STARTUPS_LIST',
        startupsList: dataReducer.startupsList,
      });
      setStartup({ ...startup, ...newStartup });
    } catch (error) {
      toast.error('Erro ao atualizar a startup');
    }
  };

  useEffect(() => {
    getStartupStep();
  }, []);

  const createStartupStep = useMemo(() => {
    return (newStartup: Startup) => {
      const objectAssign = { ...startup, ...newStartup };

      setStartup(objectAssign);
      setStepCreate(stepCreate + 1);
      localStorage.setItem('startup-step', JSON.stringify({ ...objectAssign }));
      localStorage.setItem('step-create', JSON.stringify(stepCreate + 1));
    };
  }, [startup, setStartup, stepCreate, setStepCreate]);

  const cleanStartupStep = useMemo(() => {
    return () => {
      setStartup({
        id: '',
        name: '',
        foundationYear: 2024,
        target: [],
        description: '',
        country: '',
        state: '',
        investmentRounds: 1,
        lastInvestment: 'Pré-seed',
        email: '',
        linkedIn: '',
        segment: '',
        startupMembers: [] as StartupMember[],
        url: '',
      });
      setStepCreate(1);
      localStorage.removeItem('startup-step');
      localStorage.removeItem('step-create');
    };
  }, [setStartup, setStepCreate]);

  const createStartupFinish = useCallback(
    async (finishedData: Startup['startupMembers']) => {
      try {
        const {data} = await api.post(`/startups/create`, {
          ...startup,
          startupMembers: finishedData,
        });
        const concatList = [data.startup, ...dataReducer.startupsList];
        dispatch({ type: 'SET_STARTUPS_LIST', startupsList: concatList });
      } catch (error) {
        throw new Error('Erro ao criar startup');
      }
    },
    [startup]
  );

  const uploadCSV = useCallback(async (formData: FormData) => {
    try {
      await api.post(`/startups/csv`, formData);
    } catch (error) {
      toast.error('Erro ao fazer upload do arquivo');
    }
  }, []);

  const getStartupsNotes = async () => {
    try {
      const { data: responseData } = await api.get(
        `/startups/notes/${startup.id}`
      );
      setNotes(responseData.notes);
    } catch (error) {
      toast.error('Erro ao buscar startups');
    }
  };

  const createStartupNotes = async (note: StartupNoteType) => {
    try {
      const { data } = await api.post(`/startups/notes`, {
        ...note,
        startupId: startup.id,
      });
      setNotes([...notes, data?.notes]);
    } catch (error) {
      toast.error('Erro ao criar nota');
    }
  };

  const StartupDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getStartups,
      getFavoriteStartups,
      viewStartup,
      favoriteStartupToUser,
      unfavoriteStartupToUser,
      getStartupSocialMedias,
      getStartupMembers,
      startup,
      setStartup,
      createStartupStep,
      cleanStartupStep,
      stepCreate,
      setStepCreate,
      createStartupFinish,
      uploadCSV,
      lastInvestmentList: StartupLastInvestment,
      markets: StartupMarket,
      investmentRounds: StartupInvestmentRounds,
      updateStartup,
      getStartupsNotes,
      notes,
      setNotes,
      createStartupNotes,
    };
  }, [
    dataReducer,
    getStartups,
    getFavoriteStartups,
    viewStartup,
    favoriteStartupToUser,
    unfavoriteStartupToUser,
    getStartupSocialMedias,
    getStartupMembers,
    startup,
    setStartup,
    createStartupStep,
    cleanStartupStep,
    stepCreate,
    setStepCreate,
    createStartupFinish,
    uploadCSV,
    updateStartup,
    getStartupsNotes,
    notes,
    setNotes,
    createStartupNotes,
  ]);

  return (
    <StartupsContext.Provider value={StartupDataValue}>
      {children}
    </StartupsContext.Provider>
  );
};
