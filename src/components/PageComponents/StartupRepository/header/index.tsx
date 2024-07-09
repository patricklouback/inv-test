import { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { MdFilterListAlt } from 'react-icons/md';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { StartupsContext } from 'contexts/Startups';
import Button from '@components/Button';
import { useDebounce } from 'hooks/useDebounce';
import { styleSlug } from 'utils/constants';
import { UploadIcon } from '@components/Icons';
import {
  Header,
  DownloadAndSearchContainer,
  WapperInput,
  InputSearch,
  ButtonsActions,
  Filter,
  ButtonAction,
  Balloon,
  ToggleFilters,
  WapperTitleFilter,
  StyledCheckboxContainer,
  HiddenCheckbox,
  VisibleCheckbox,
} from '../styles';
import {
  ButtonDownload,
  ButtonDownloadText,
  ContainerButtons,
  ContainerSearch,
} from './styles';

type FilterOptionOpen =
  | 'LAST_INVESTMENTS'
  | 'MARKET'
  | 'INVESTMENT_ROUNDS'
  | 'ACTION'
  | undefined;

export type ActionOption = 'SAVED' | 'UNSAVED';

interface IActionOption {
  id: string;
  name: string;
  value: ActionOption;
}

interface HeaderStartupsProps {
  setOpenModalStartup: (value: 'none' | 'create' | 'upload') => void;
}

export function HeaderStartups({ setOpenModalStartup }: HeaderStartupsProps) {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [isOpenFilter, setIsOpenFilter] = useState<FilterOptionOpen>();
  const [selectLastInvestments, setSelectLastInvestments] = useState([]);
  const [selectMarket, setSelectMarket] = useState([]);
  const [selectInvestmentRounds, setSelectInvestmentRounds] = useState([]);
  const [selectAction, setSelectAction] = useState<ActionOption[]>([]);
  const searchDebounce = useDebounce(search, 300);

  const { lastInvestmentList, markets, investmentRounds, getStartups } =
    useContext(StartupsContext);

  const actions: IActionOption[] = [
    {
      id: '0',
      name: 'Favoritas',
      value: 'SAVED',
    },
    {
      id: '1',
      name: 'Não Favoritas',
      value: 'UNSAVED',
    },
  ];

  const handleOpenFilter = useCallback(
    (selectedFilter: FilterOptionOpen) => {
      if (selectedFilter === isOpenFilter) {
        setIsOpenFilter(undefined);
      } else {
        setIsOpenFilter(selectedFilter);
      }
    },
    [isOpenFilter]
  );

  const handleselectLastInvestments = useCallback(
    (moment: string) => {
      const existsMoment = selectLastInvestments.findIndex(e => e === moment);

      if (existsMoment !== -1) {
        setSelectLastInvestments(state => {
          return state.filter((aux, i) => existsMoment !== i);
        });
      } else {
        setSelectLastInvestments(state => [...state, moment]);
      }
    },
    [selectLastInvestments]
  );

  const handleSelectMarket = useCallback(
    (marketId: string) => {
      const existsMarket = selectMarket.findIndex(e => e === marketId);
      if (existsMarket !== -1) {
        setSelectMarket(state => {
          return state.filter((aux, i) => existsMarket !== i);
        });
      } else {
        setSelectMarket(state => [...state, marketId]);
      }
    },
    [selectMarket]
  );

  const handleselectInvestmentRounds = useCallback(
    (investmentRounds: number) => {
      const existsInvestmentRounds = selectInvestmentRounds.findIndex(
        e => e === investmentRounds
      );

      if (existsInvestmentRounds !== -1) {
        setSelectInvestmentRounds(state => {
          return state.filter((aux, i) => existsInvestmentRounds !== i);
        });
      } else {
        setSelectInvestmentRounds(state => [...state, investmentRounds]);
      }
    },
    [selectInvestmentRounds]
  );

  const handleSelectAction = useCallback(
    (action: ActionOption) => {
      const existsAction = selectAction.findIndex(e => e === action);

      if (existsAction !== -1) {
        setSelectAction(state => {
          return state.filter((aux, i) => existsAction !== i);
        });
      } else {
        setSelectAction(state => [...state, action]);
      }
    },
    [selectAction]
  );

  useEffect(() => {
    getStartups({
      investmentRounds:
        selectInvestmentRounds.length > 0
          ? JSON.stringify(selectInvestmentRounds)
          : '',
      marketFields: selectMarket.length > 0 ? JSON.stringify(selectMarket) : '',
      lastInvestment:
        selectLastInvestments.length > 0
          ? JSON.stringify(selectLastInvestments)
          : '',
      saved: selectAction.length > 0 ? JSON.stringify(selectAction) : [],
      search: searchDebounce !== '' ? searchDebounce : undefined,
    });
  }, [
    getStartups,
    selectInvestmentRounds,
    searchDebounce,
    selectMarket,
    selectLastInvestments,
    selectAction,
  ]);

  return (
    <Header>
      <DownloadAndSearchContainer>
        <ContainerSearch>
          <WapperInput>
            <div id="icon">
              <RiLightbulbFlashLine color={colors.font} size={20} />
            </div>
            <InputSearch
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </WapperInput>
          <ContainerButtons>
            <Button onClick={() => setOpenModalStartup('create')}>
              Adicionar Startup
            </Button>
            <ButtonDownload
              onClick={() => setOpenModalStartup('upload')}
              className="download-material"
            >
              <UploadIcon color={colors.primary[styleSlug]} />
              <ButtonDownloadText>
                <span>Upload de startups</span>
              </ButtonDownloadText>
            </ButtonDownload>
          </ContainerButtons>
        </ContainerSearch>
      </DownloadAndSearchContainer>
      <ButtonsActions>
        <Filter>
          <ButtonAction
            $backgr={colors.font}
            onClick={() => handleOpenFilter('LAST_INVESTMENTS')}
          >
            <MdFilterListAlt />
            <AiFillCaretDown size={12} />
            <span>Último Investimento</span>
          </ButtonAction>
          {isOpenFilter === 'LAST_INVESTMENTS' && (
            <Balloon>
              <ToggleFilters>
                <WapperTitleFilter>
                  <strong>Último Investimento</strong>
                </WapperTitleFilter>
                {lastInvestmentList?.map(lastInvestment => (
                  <StyledCheckboxContainer
                    key={lastInvestment}
                    onClick={() => handleselectLastInvestments(lastInvestment)}
                  >
                    <HiddenCheckbox
                      checked={selectLastInvestments.some(
                        e => e === lastInvestment
                      )}
                      onChange={() =>
                        handleselectLastInvestments(lastInvestment)
                      }
                    />
                    <VisibleCheckbox
                      checked={selectLastInvestments.some(
                        e => e === lastInvestment
                      )}
                    >
                      <ImCheckmark size={12} />
                    </VisibleCheckbox>
                    <span>{lastInvestment}</span>
                  </StyledCheckboxContainer>
                ))}
              </ToggleFilters>
            </Balloon>
          )}
        </Filter>
        <Filter>
          <ButtonAction
            $backgr={colors.font}
            onClick={() => handleOpenFilter('MARKET')}
          >
            <MdFilterListAlt />
            <AiFillCaretDown size={12} />
            <span>Segmento</span>
          </ButtonAction>
          {isOpenFilter === 'MARKET' && (
            <Balloon>
              <ToggleFilters>
                <WapperTitleFilter>
                  <strong>Segmento</strong>
                </WapperTitleFilter>
                {markets.map(market => (
                  <StyledCheckboxContainer
                    key={market}
                    onClick={() => handleSelectMarket(market)}
                  >
                    <HiddenCheckbox
                      checked={selectMarket.some(e => e === market)}
                      onChange={() => handleSelectMarket(market)}
                    />
                    <VisibleCheckbox
                      checked={selectMarket.some(e => e === market)}
                    >
                      <ImCheckmark size={12} />
                    </VisibleCheckbox>
                    <span>{market}</span>
                  </StyledCheckboxContainer>
                ))}
              </ToggleFilters>
            </Balloon>
          )}
        </Filter>
        <Filter>
          <ButtonAction
            $backgr={colors.font}
            onClick={() => handleOpenFilter('INVESTMENT_ROUNDS')}
          >
            <MdFilterListAlt />
            <AiFillCaretDown size={12} />
            <span>Rodadas de investimento</span>
          </ButtonAction>
          {isOpenFilter === 'INVESTMENT_ROUNDS' && (
            <Balloon>
              <ToggleFilters>
                <WapperTitleFilter>
                  <strong>Rodadas de investimento</strong>
                </WapperTitleFilter>
                {investmentRounds.map(ir => (
                  <StyledCheckboxContainer
                    key={ir}
                    onClick={() => handleselectInvestmentRounds(ir)}
                  >
                    <HiddenCheckbox
                      checked={selectInvestmentRounds.some(e => e === ir)}
                      onChange={() => handleselectInvestmentRounds(ir)}
                    />
                    <VisibleCheckbox
                      checked={selectInvestmentRounds.some(e => e === ir)}
                    >
                      <ImCheckmark size={12} />
                    </VisibleCheckbox>
                    <span>{ir}</span>
                  </StyledCheckboxContainer>
                ))}
              </ToggleFilters>
            </Balloon>
          )}
        </Filter>
        <Filter>
          <ButtonAction
            $backgr={colors.font}
            onClick={() => handleOpenFilter('ACTION')}
          >
            <MdFilterListAlt />
            <AiFillCaretDown size={12} />
            <span>Ação</span>
          </ButtonAction>
          {isOpenFilter === 'ACTION' && (
            <Balloon>
              <ToggleFilters>
                <WapperTitleFilter>
                  <strong>Ação</strong>
                </WapperTitleFilter>
                {actions.map(action => (
                  <StyledCheckboxContainer
                    key={action.id}
                    onClick={() => handleSelectAction(action.value)}
                  >
                    <HiddenCheckbox
                      checked={selectAction.some(e => e === action.value)}
                      onChange={() => handleSelectAction(action.value)}
                    />
                    <VisibleCheckbox
                      checked={selectAction.some(e => e === action.value)}
                    >
                      <ImCheckmark size={12} />
                    </VisibleCheckbox>
                    <span>{action.name}</span>
                  </StyledCheckboxContainer>
                ))}
              </ToggleFilters>
            </Balloon>
          )}
        </Filter>
      </ButtonsActions>
    </Header>
  );
}
