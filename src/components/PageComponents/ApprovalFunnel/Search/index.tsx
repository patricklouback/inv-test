import { useContext, useEffect, useState, useCallback } from 'react';
import { Dropdown } from '@components/Dropdown';
import { DropdownHasUpdate } from '@components/DropdownHasUpdate';
import { DropdownTagFilter } from '@components/DropdownTagFilter';
import { DropdownType } from '@components/DropdownType';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTheme } from 'styled-components';
import { IdeaTagContext } from 'contexts/IdeaTags';
import { CampaignContext } from 'contexts/Campaign';
import { IdeaChangeContext } from 'contexts/IdeaChanges';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { BannersContext } from 'contexts/Banners';
import { ProcessActivityContext } from 'contexts/ProcessActivity';
import { useFunnel } from 'hooks';
import { slug } from 'utils/constants';
import { debounce } from 'lodash';
import { FiltersType } from 'interfaces/filters';
import {
  Leftside,
  InputSearch,
  SectionSubHeader,
  WapperInput,
  Rightside,
} from './styles';

interface SearchHeaderFunilProps {
  search: string;
  setSearch: (value: string) => void;
  filters: FiltersType
}

export function SearchHeaderFunil({
  search,
  setSearch,
  filters,
}: SearchHeaderFunilProps) {
  const { colors } = useTheme();
  const { filteredIdeaTags, updateFilteredTags } = useContext(IdeaTagContext);
  const { ideaChangesForUser, getAllIdeaChangesForUser } =
    useContext(IdeaChangeContext);
  const { isTrial, ideasUpdateStatusOptions } = useFunnel(slug);
  const { campaignsInfo } = useContext(CampaignContext);
  const {
    getKanbanIdeas,
    getKanbanSteps,
    handleSelectCampaign,
    selectedCampaignsIds,
    handleSelectIdeaType,
    selectedIdeaTypes,
  } = useContext(ApprovalFunnelContext);
  const { getAllProcessActivitiesName } = useContext(ProcessActivityContext);
  const { getBannersForPage } = useContext(BannersContext);
  const [processActivitiesName, setProcessActivitiesName] = useState([]);
  const [selectedIdeaUpdateStatusIds, setSelectedIdeaUpdateStatusIds] =
    useState<string[]>([]);
  const [ideaChangesForUserState, setIdeaChangesForUserState] = useState([]);

  const handleSelectTag = (toggleTag: any) => {
    const usedTags = [...filteredIdeaTags];
    const tagIndex = usedTags.findIndex(tag => tag.id === toggleTag.id);
    if (tagIndex !== -1) {
      usedTags[tagIndex].checked = !usedTags[tagIndex].checked;
      updateFilteredTags(usedTags);
    }
  };

  const handleSelectIdeasUpdateStatus = (id: string) => {
    if(!selectedIdeaUpdateStatusIds) setSelectedIdeaUpdateStatusIds([]);

    if (selectedIdeaUpdateStatusIds.includes(id.toString())) {
      setSelectedIdeaUpdateStatusIds(state =>
        state.filter(ideaId => ideaId !== id.toString())
      );
    } else {
      setSelectedIdeaUpdateStatusIds(state => [...state, id.toString()]);
    }
  };

  const debouncedGetKanbanIdeas = useCallback(
    debounce((params) => {
      getKanbanIdeas(params);
    }, 300),
    [getKanbanIdeas]
  );

  useEffect(() => {
    (async (): Promise<void> => {
      debouncedGetKanbanIdeas({
        params1: selectedCampaignsIds,
        params2: selectedIdeaUpdateStatusIds,
        params3: selectedIdeaTypes,
        params4: search,
      });
      setIdeaChangesForUserState(await getAllIdeaChangesForUser());
    })();
  }, [search, selectedCampaignsIds, selectedIdeaUpdateStatusIds, selectedIdeaTypes, debouncedGetKanbanIdeas]);

  useEffect(() => {
    (async (): Promise<void> => {
      setProcessActivitiesName(await getAllProcessActivitiesName());
      await getKanbanSteps();
      await getBannersForPage('APPROVAL_FUNNEL', isTrial);
    })();
  }, [getAllProcessActivitiesName, getKanbanSteps, getBannersForPage, isTrial]);


  return (
    <SectionSubHeader>
      <Leftside>
        <WapperInput>
          <div id="icon">
            <AiOutlineSearch color={colors.font} size={20} />
          </div>
          <InputSearch
            placeholder="Buscar por título, ID ou palavra-chave"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </WapperInput>
      </Leftside>
      <Rightside>
        <DropdownTagFilter
          itemsList={filteredIdeaTags}
          handleSelect={handleSelectTag}
        />
        <DropdownType
          itemsList={processActivitiesName}
          handleSelect={handleSelectIdeaType}
          selectedItems={selectedIdeaTypes}
        />
        <DropdownHasUpdate
          itemsList={filters.idea}
          handleSelect={handleSelectIdeasUpdateStatus}
          selectedItems={selectedIdeaUpdateStatusIds}
        />
        <Dropdown
          itemsList={campaignsInfo}
          handleSelect={handleSelectCampaign}
          selectedItems={selectedCampaignsIds}
        />
      </Rightside>
    </SectionSubHeader>
  );
}
