import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  RiFilter2Line,
} from 'react-icons/ri';
import { UserContext } from 'contexts/User';
import { IoMdArrowDropdown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt-BR';
import { GlobalIndicatorsProps } from 'interfaces/indicators';
import {
  Arrow,
  ArrowInDate,
  ArrowInDate2,
  Item,
  Balloon,
  ButtonContainer,
  ButtonFilter,
  GraphContainer,
  GraphFilterBar,
  TitleFilterBar,
  ToggleFilters,
  WapperTitleFilter,
  RankingContainer,
  RankingItem,
  LeftSide,
  RankNumber,
  EngagementTitle,
  RightSide,
  IdeasCounterWrapper,
  IdeasCounterTitle,
  IdeasCounterNumber,
  UserNameAndPoints,
  Icon,
  ItemImageUser,
  UserName,
  UserPoints,
} from './styles';

export function EngagementRank({ campaignIds }: GlobalIndicatorsProps): JSX.Element {
  const { engagementRanking, getEngagementRanking } = useContext(UserContext);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [initialDate, setInitialDate] = useState<Date>();
  const [isInitialDateOpen, setIsInitialDateOpen] = useState(false);
  const [finalDate, setFinalDate] = useState<Date>();
  const [isFinalDateOpen, setIsFinalDateOpen] = useState(false);

  const handleOpenFilter = useCallback(() => {
    setIsFilterOpen(state => !state);
  }, []);

  useEffect(() => {
    getEngagementRanking({
      initialDate: initialDate ? JSON.stringify(initialDate) : '',
      finalDate: finalDate ? JSON.stringify(finalDate) : '',
      campaignIds: campaignIds ? JSON.stringify(campaignIds) : '[]',
    });
  }, [getEngagementRanking, initialDate, finalDate, campaignIds]);

  return (
    <GraphContainer>
      <GraphFilterBar>
        <TitleFilterBar>
          <h3>Ranking de interação - top 30</h3>
        </TitleFilterBar>
        <ButtonContainer>
          <ButtonFilter onClick={handleOpenFilter}>
            <RiFilter2Line size={24} />
            <Arrow selected={isFilterOpen}>
              <IoMdArrowDropdown size={22} />
            </Arrow>
          </ButtonFilter>
          {isFilterOpen && (
            <Balloon>
              <ToggleFilters>
                <WapperTitleFilter>
                  <strong>Período de Tempo</strong>
                </WapperTitleFilter>
                <Item>
                  <DatePicker
                    className="datePicker"
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={initialDate}
                    placeholderText="Início"
                    onChange={setInitialDate}
                    onCalendarOpen={() => setIsInitialDateOpen(true)}
                    onCalendarClose={() => setIsInitialDateOpen(false)}
                  />
                  <ArrowInDate selected={isInitialDateOpen}>
                    <IoMdArrowDropdown size={25} />
                  </ArrowInDate>
                </Item>
                <Item>
                  <DatePicker
                    className="datePicker"
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={finalDate}
                    placeholderText="Fim"
                    onChange={setFinalDate}
                    onCalendarOpen={() => setIsFinalDateOpen(true)}
                    onCalendarClose={() => setIsFinalDateOpen(false)}
                  />
                  <ArrowInDate2 selected={isFinalDateOpen}>
                    <IoMdArrowDropdown size={25} />
                  </ArrowInDate2>
                </Item>
              </ToggleFilters>
            </Balloon>
          )}
        </ButtonContainer>
      </GraphFilterBar>
      <RankingContainer>
        {engagementRanking.map(user => (
          <RankingItem>
            <LeftSide>
              <RankNumber>{user.rank}</RankNumber>
              <EngagementTitle>
                <Icon>
                  {user ? <ItemImageUser key= {user.rank} images_users={ user.image || '/images/user.png'}/> : <div>erro</div>}
                </Icon>
                <UserNameAndPoints>
                  <UserName>{user.name}</UserName>
                  <UserPoints>
                    {
                      `${user.points} ${Number(user.points) > 1 ? 'interações' : 'interação'}`
                    }
                  </UserPoints>
                </UserNameAndPoints>
              </EngagementTitle>
            </LeftSide>
            <RightSide>
              <IdeasCounterWrapper>
                <IdeasCounterTitle>iniciativas criadas</IdeasCounterTitle>
                <IdeasCounterNumber>{user.createdIdeas}</IdeasCounterNumber>
              </IdeasCounterWrapper>
              <IdeasCounterWrapper>
                <IdeasCounterTitle>comentários</IdeasCounterTitle>
                <IdeasCounterNumber>{user.comments}</IdeasCounterNumber>
              </IdeasCounterWrapper>
              <IdeasCounterWrapper>
                <IdeasCounterTitle>curtidas</IdeasCounterTitle>
                <IdeasCounterNumber>{user.likes}</IdeasCounterNumber>
              </IdeasCounterWrapper>
            </RightSide>
          </RankingItem>
        ))}
      </RankingContainer>
    </GraphContainer>
  );
}
