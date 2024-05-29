/* eslint-disable no-restricted-syntax */
import { FilteredIdeaTags, IdeaTag } from 'interfaces/idea';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  IdeaTagDefaultValues,
  IdeaTagReducer
} from './reducers/IdeaTagReducer';

interface IdeaTagPropsData {
  allIdeaTags: IdeaTag[];
  filteredIdeaTags: FilteredIdeaTags[];
  loading: boolean;
  updateIdeaTagName: (tagId: string, newName: string) => Promise<void>;
  updateIdeaTagChecked: (ideaTagId: string, checked: boolean) => Promise<void>;
  getIdeaTags: (filteredTags: FilteredIdeaTags[]) => void;
  updateFilteredTags: (filteredTags: FilteredIdeaTags[]) => void;
}

export const IdeaTagContext = createContext<IdeaTagPropsData>(
  {} as IdeaTagPropsData
);

export const IdeaTagProvider: React.FC = ({ children }): JSX.Element => {
  const [dataReducer, dispatch] = useReducer(
    IdeaTagReducer,
    IdeaTagDefaultValues
  );

  function sortIdea(ideaTags: IdeaTag[]): IdeaTag[] {
    return ideaTags.sort((a, b) => {
      const x = a.tag.id.toUpperCase();
      const y = b.tag.id.toUpperCase();
      if (x === y) {
        return 0;
      }
      return x > y ? 1 : -1;
    });
  }

  function buildIdeaTagsUsed(ideaTags, filteredTags): void {
    const usedTags = [];
    ideaTags
      .filter(ideaTag => ideaTag.checked)
      .forEach(ideaTag => {
        if (
          usedTags.filter(usedTag => usedTag.id === ideaTag.tagId).length === 0
        ) {
          const { tag } = ideaTag;
          tag.checked =
            filteredTags.filter(usedTag => usedTag.id === ideaTag.tagId)
              .length === 0
              ? false
              : filteredTags.filter(usedTag => usedTag.id === ideaTag.tagId)[0]
                  .checked;
          usedTags.push(tag);
        }
      });
    dispatch({
      type: 'SET_FILTERED_IDEA_TAGS',
      filteredIdeaTags: usedTags
    });
  }

  const getIdeaTags = useCallback(async (filteredTags: FilteredIdeaTags[]) => {
    try {
      const { data } = await api.get(`/ideas/ideaTag`);
      buildIdeaTagsUsed(data.ideaTags, filteredTags);
      dispatch({
        type: 'SET_IDEA_TAGS',
        allIdeaTags: sortIdea(data.ideaTags)
      });
    } catch (error) {
      toast.error('Error', error);
    }
  }, []);

  const updateIdeaTagName = useCallback(
    async (tagId: string, newName: string) => {
      try {
        await api.put(`/idea/tag/${tagId}/${newName}`);
      } catch (error) {
        toast.error('Erro ao atualizar o nome da tag.');
      }
    },
    []
  );

  const updateIdeaTagChecked = useCallback(
    async (tagId: string, checked: boolean) => {
      try {
        await api.put(`/ideas/ideaTag/${tagId}/${checked}`);
      } catch (error) {
        toast.error('Erro ao atualizar o estado da tag.');
      }
    },
    []
  );

  const updateFilteredTags = useCallback((filteredTags: FilteredIdeaTags[]) => {
    dispatch({
      type: 'SET_FILTERED_IDEA_TAGS',
      filteredIdeaTags: filteredTags
    });
  }, []);

  const IdeaTagDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getIdeaTags,
      updateIdeaTagName,
      updateIdeaTagChecked,
      updateFilteredTags
    };
  }, [
    dataReducer,
    getIdeaTags,
    updateIdeaTagName,
    updateIdeaTagChecked,
    updateFilteredTags
  ]);

  return (
    <IdeaTagContext.Provider value={IdeaTagDataValue}>
      {children}
    </IdeaTagContext.Provider>
  );
};
