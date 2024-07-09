import { useContext, useEffect } from 'react';
import { HistoryItensContext } from 'contexts/History';
import {
  Container,
  DateWrapper,
  Description,
  Item,
  ItemDescription,
  RecordInfoWrapper,
  RecordsWrapper,
  Title,
} from './styles';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const Records: React.FC<{ ideaId: string }> = ({ ideaId }) => {
  const { getHistoryItens, historyItens } = useContext(HistoryItensContext);

  useEffect(() => {
    getHistoryItens(ideaId);
  }, [ideaId]);

  return (
    <Container>
      <Description>
        Apenas avaliadores e gestores têm acesso a esse espaço.
      </Description>
      <RecordsWrapper>
        {historyItens.map((record, index) => (
          <Item key={record.title}>
            <DateWrapper>
              <div>{`${
                monthNames[new Date(new Date(record.date)).getMonth()]
              } ${new Date(record.date).getDay()}`}</div>
              <div>{`às ${new Date(record.date).getHours()}:${
                new Date(record.date).getMinutes() < 10
                  ? `0${new Date(record.date).getMinutes()}`
                  : new Date(record.date).getMinutes()
              }`}</div>
            </DateWrapper>
            <RecordInfoWrapper>
              <Title>{record.title}</Title>
              {record.description !== '' && (
                <ItemDescription>{record.description}</ItemDescription>
              )}
            </RecordInfoWrapper>
          </Item>
        ))}
      </RecordsWrapper>
    </Container>
  );
};
