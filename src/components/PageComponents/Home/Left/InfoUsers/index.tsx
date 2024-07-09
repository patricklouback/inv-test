import ButtonLink from '@components/Link';
import { useTheme } from 'styled-components';
import { RiMedalFill } from 'react-icons/ri';
import {
  Content,
  Imagem,
  Item,
  ItemCard,
  ListCard,
  Name,
  List,
  CardQnt,
  Container,
  Rank,
} from './styles';

type InfoUsersParams = {
  data: Array<{
    image: string;
    name: string;
    totalIdeas: string;
    totalCollaborations: string;
    id: number;
  }>;
};

export const InfoUsers: React.FC<InfoUsersParams> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <Container>
      <ListCard>
        {data.map((item, i) => {
          return (
            <ItemCard key={item.id}>
              <Imagem $img={item.image || '/images/user.png'} />
              <Content>
                <Rank>{i + 1}˚</Rank>
                <Name>{item.name}</Name>
                <List>
                  <Item>
                    <CardQnt>{item.totalIdeas}</CardQnt>
                    <span>Iniciativas criadas</span>
                  </Item>
                  <Item>
                    <CardQnt>{item.totalCollaborations}</CardQnt>
                    <span>Colaborações</span>
                  </Item>
                </List>
              </Content>
            </ItemCard>
          );
        })}
      </ListCard>

      <ButtonLink
        max={260}
        center
        hover={colors.fontLight}
        link="/user-rank"
        value="Ranking completo"
        background={colors.font}
        color={colors.background}
        Icon={<RiMedalFill color={colors.background} size={20} />}
      />
    </Container>
  );
};
