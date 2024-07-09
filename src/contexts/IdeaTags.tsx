/* eslint-disable no-restricted-syntax */
import { FilteredIdeaTags, IdeaTag } from 'interfaces/idea';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import {
  IdeaTagDefaultValues,
  IdeaTagReducer,
} from './reducers/IdeaTagReducer';

interface IdeaTagPropsData {
  allIdeaTags: IdeaTag[];
  filteredIdeaTags: FilteredIdeaTags[];
  loading: boolean;
  updateIdeaTagName: (tagId: string, newName: string) => Promise<void>;
  updateIdeaTagChecked: (ideaTagId: string, checked: boolean) => Promise<void>;
  getIdeaTags: (filteredTags: FilteredIdeaTags[]) => Promise<void>;
  updateFilteredTags: (filteredTags: FilteredIdeaTags[]) => void;
  sortIdea: (ideaTags: IdeaTag[]) => IdeaTag[];
  buildIdeaTagsUsed: (
    ideaTags: IdeaTag[],
    filteredTags: FilteredIdeaTags[]
  ) => void;
  handleTagsItem: (tags: IdeaTag[], filteredTags: FilteredIdeaTags[]) => void;
  dispatch: React.Dispatch<any>;
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

  function buildIdeaTagsUsed(
    ideaTags: IdeaTag[],
    filteredTags: FilteredIdeaTags[]
  ): void {
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
      filteredIdeaTags: usedTags,
    });
  }

  const getIdeaTags = useCallback(async (filteredTags: FilteredIdeaTags[]) => {
    try {
      const { data } = await api.get(`/ideas/ideaTag`);
      buildIdeaTagsUsed(data.ideaTags, filteredTags);
      dispatch({
        type: 'SET_IDEA_TAGS',
        allIdeaTags: sortIdea(data.ideaTags),
      });
    } catch (error) {
      toast.error('Error', error);
    }
  }, []);

  const updateIdeaTagName = useCallback(
    async (tagId: string, newName: string) => {
      try {
        await api.put(`/ideas/tag/${tagId}`, {
          name: newName,
        });
        toast.success('Nome da tag atualizado com sucesso.');
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
      filteredIdeaTags: filteredTags,
    });
  }, []);

  const handleTagsItem = (
    tags: IdeaTag[],
    filteredTags: FilteredIdeaTags[]
  ) => {
    if (tags.length > 0) {
      dispatch({
        type: 'SET_IDEA_TAGS',
        allIdeaTags: sortIdea(tags),
      });
      buildIdeaTagsUsed(tags, filteredTags);
    }
  };

  const IdeaTagDataValue = useMemo(() => {
    return {
      ...dataReducer,
      getIdeaTags,
      updateIdeaTagName,
      updateIdeaTagChecked,
      updateFilteredTags,
      sortIdea,
      buildIdeaTagsUsed,
      handleTagsItem,
      dispatch,
    };
  }, [
    dataReducer,
    getIdeaTags,
    updateIdeaTagName,
    updateIdeaTagChecked,
    updateFilteredTags,
    sortIdea,
    buildIdeaTagsUsed,
    handleTagsItem,
    dispatch,
  ]);

  return (
    <IdeaTagContext.Provider value={IdeaTagDataValue}>
      {children}
    </IdeaTagContext.Provider>
  );
};
