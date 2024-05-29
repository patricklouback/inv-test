import { Idea } from 'interfaces/idea';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { BsLink45Deg } from 'react-icons/bs';
import { LinkedIdea } from '@components/PageComponents/ApprovalFunnel/Item/Links/LinkedIdea';
import { ListInfoContainer, TitleInfoWrapper, ItemInfo, TitleField, ValueField, WapperListInfo, LinkTitleWrapper, LinkTitle, LinksWrapper } from './styles';

interface ListInfoProps {
  idea: Idea;
  linkedIdeasState: Idea[];
}

export const ListInfo: React.FC<ListInfoProps> = ({ idea, linkedIdeasState }): JSX.Element => {
  return (
    <ListInfoContainer>
      <TitleInfoWrapper>
        <TitleField>Descrição</TitleField>
        <ValueField>
          <ReactMarkdown>{idea?.description}</ReactMarkdown>
        </ValueField>

        <WapperListInfo>
          {idea?.ideaFields.map(item => (
            <ItemInfo key={item.id}>
              <TitleField>{item.title}</TitleField>
              <ValueField>
                {item.type === 'SELECT'
                  ? <ReactMarkdown>{JSON.parse(item.options).find(
                    i => i.value === item?.ideaFieldValues[0]?.value
                  ).name}</ReactMarkdown>
                  : <ReactMarkdown>{item?.ideaFieldValues[0]?.value}</ReactMarkdown>}
              </ValueField>
            </ItemInfo>
          ))}
        </WapperListInfo>
      </TitleInfoWrapper>
      {linkedIdeasState.length > 0 
        ? <LinksWrapper>
            <LinkTitleWrapper>
              <BsLink45Deg size={22}/>
              <LinkTitle>Vínculos</LinkTitle>
            </LinkTitleWrapper>
            {linkedIdeasState.map(linkedIdea => <LinkedIdea linkIsOpen linkedIdea={linkedIdea} hasBorder={false} showCreator={false} openLinked={false} kanbanStep={false}/>)} 
          </LinksWrapper>
        : null
      }
    </ListInfoContainer>
  );
};
