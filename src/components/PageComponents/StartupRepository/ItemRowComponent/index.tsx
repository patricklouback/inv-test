import { StartupsContext } from 'contexts/Startups';
import { Startup } from 'interfaces/startups';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import {
  CardItem,
  ItemRow,
  ItemValue,
  ItemValueAudience,
  ItemValueLocation,
  ItemValueMarket,
  ItemValueYear,
  StartupTitle,
} from './styles';

interface ItemRowProps {
  item: Startup;
  handleOpenStartup: (startupId: string) => Promise<void>;
  handleSaveStartup: (startupId: string) => Promise<void>;
  handleUnsaveStartup: (startupId: string) => Promise<void>;
}

export const lastInvestmentColors = [
  {
    name: 'Series A',
    color: '#E5C0FF',
  },
  {
    name: 'Series B',
    color: '#D39AF7',
  },
  {
    name: 'Series C',
    color: '#C778FF',
  },
  {
    name: 'Series D',
    color: '#9C5EC7',
  },
  {
    name: 'Pre-Seed',
    color: '#7F40AD',
  },
  {
    name: 'Seed',
    color: '#67318E',
  },
  {
    name: 'Angel',
    color: '#4F256D',
  },
  {
    name: 'Equity Crowdfunding',
    color: '#4C077D',
  },
  {
    name: 'Product Crowdfunding',
    color: '#330852',
  },
];

export const ItemRowComponent = ({
  item,
  handleOpenStartup,
  handleSaveStartup,
  handleUnsaveStartup,
}: ItemRowProps): JSX.Element => {
  const { getFavoriteStartups, favoriteStartups } = useContext(StartupsContext);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const fetchFavoriteStartups = useCallback(async (): Promise<void> => {
    await getFavoriteStartups();
  }, [getFavoriteStartups]);

  const handleLocation = useCallback((city, state) => {
    return state !== ' ' ? `${city}, ${state}` : city;
  }, []);

  const handleSave = useCallback(
    async startupId => {
      await handleSaveStartup(startupId);
      fetchFavoriteStartups();
      setIsFavorite(true);
    },
    [handleSaveStartup, fetchFavoriteStartups]
  );

  const handleUnsave = useCallback(
    async startupId => {
      await handleUnsaveStartup(startupId);
      fetchFavoriteStartups();
      setIsFavorite(false);
    },
    [handleUnsaveStartup, fetchFavoriteStartups]
  );

  useEffect(() => {
    fetchFavoriteStartups();
  }, [fetchFavoriteStartups]);

  useEffect(() => {
    setIsFavorite(favoriteStartups?.includes(item.id));
  }, [favoriteStartups, item.id]);

  return (
    <ItemRow key={item.id}>
      <StartupTitle className="name">{item.name}</StartupTitle>
      <ItemValue className="moment">
        {lastInvestmentColors.map(ta => {
          if (ta?.name === item?.lastInvestment) {
            return (
              <CardItem color={ta.color}>
                <span>{ta.name}</span>
              </CardItem>
            );
          }
          return null;
        })}
      </ItemValue>
      <ItemValueYear className="foundationYear">
        {item.foundationYear}
      </ItemValueYear>
      <ItemValueMarket className="market">{item.marketFields}</ItemValueMarket>
      <ItemValueAudience className="targetAudience">
        {item.investmentRounds === 0 ? 'Não há dados' : item.investmentRounds}
      </ItemValueAudience>
      <ItemValueLocation>
        {handleLocation(item.city, item.state)}
      </ItemValueLocation>
      <ItemValue>
        <div className="actions">
          <AiOutlineEye
            size={26}
            onClick={() => handleOpenStartup(item.id)}
            style={{ cursor: 'pointer' }}
          />
          {isFavorite ? (
            <RiBookmarkFill
              size={24}
              onClick={() => handleUnsave(item.id)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <RiBookmarkLine
              size={24}
              onClick={() => handleSave(item.id)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      </ItemValue>
    </ItemRow>
  );
};
