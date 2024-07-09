import { Card, CardFooter } from './styles';

type TitleType =
  | 'DIRECIONAIS ATIVOS'
  | 'DIRECIONAIS SALVOS'
  | 'DIRECIONAIS PAUSADOS'
  | 'DIRECIONAIS FINALIZADOS';

interface CampaignIndicatorCarsProps {
  color: 'green' | 'blue' | 'gray' | 'pink';
  title: TitleType;
  iconPath: string;
  data: number;
}

export const CampaignIndicatorCard = ({
  color,
  title,
  iconPath,
  data,
}: CampaignIndicatorCarsProps): JSX.Element => {
  let className: string;

  switch (title) {
    case 'DIRECIONAIS ATIVOS':
      className = 'campaign-active';
      break;
    case 'DIRECIONAIS SALVOS':
      className = 'campaign-waiting';
      break;
    case 'DIRECIONAIS PAUSADOS':
      className = 'campaign-paused';
      break;
    case 'DIRECIONAIS FINALIZADOS':
      className = 'campaign-done';
      break;
    default:
      className = 'null';
  }

  return (
    <Card color={color}>
      <h2>{title}</h2>
      <CardFooter>
        <img src={iconPath} alt={title} className={className} />
        <span>{data > 9 ? data : `0${data}`}</span>
      </CardFooter>
    </Card>
  );
};
