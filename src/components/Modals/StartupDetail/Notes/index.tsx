import Image from 'next/image';
import { Textarea } from '@components/Textarea';
import { Input } from '@components/InputText';
import { Label } from '@components/InputText/styles';
import { useContext, useEffect } from 'react';
import { StartupsContext } from 'contexts/Startups';
import { separateDateToDayMonthYear } from 'utils/date';
import { useForm } from 'react-hook-form';
import { StartupNoteType } from 'interfaces/startupNotes';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { StartupInfos, UnderTitleLine } from '../styles';
import {
  Content,
  Left,
  Button,
  ContentCard,
  HeaderTitle,
  DateText,
  Title,
  ContentImage,
  ScrollBar,
  Right,
  ContainerTextArea,
  Form,
  Text,
} from './styles';

type CardProps = {
  title: string;
  description: string;
  createdAt?: string;
  user?: {
    id: string;
    name: string;
    image: string;
  };
};

function Card({ title, description, createdAt, user }: CardProps) {
  return (
    <ContentCard>
      <HeaderTitle>
        <Title>{title}</Title>
        <DateText>{separateDateToDayMonthYear(createdAt)}</DateText>
      </HeaderTitle>
      <Text>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Text>
      <ContentImage>
        <Image
          src={user.image || '/images/user.png'}
          alt="User"
          width={30}
          height={30}
          style={{ borderRadius: '50%' }}
        />
        <Title>{user.name}</Title>
      </ContentImage>
    </ContentCard>
  );
}

export function NotesStartupPage() {
  const { getStartupsNotes, createStartupNotes, notes } =
    useContext(StartupsContext);

  useEffect(() => {
    getStartupsNotes();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Pick<StartupNoteType, 'title' | 'description'>) => {
    createStartupNotes(data);
    toast.success('Nota criada com sucesso!');
  };

  return (
    <StartupInfos>
      <Content>
        <Left>
          <div>
            <h4>Anotações</h4>
          </div>
          <UnderTitleLine />
          <ScrollBar>
            {notes.length ? (
              notes.map(({ description, id, title, user, createdAt }) => (
                <Card
                  key={id}
                  title={title}
                  description={description}
                  createdAt={createdAt}
                  user={user}
                />
              ))
            ) : (
              <div>
                <h4>Nenhuma anotação encontrada.</h4>
              </div>
            )}
          </ScrollBar>
        </Left>
        <Right>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2>Escreva uma nota</h2>
            <Input
              name="title"
              label="Título"
              placeholder="Digite aqui o título da sua anotação"
              {...register('title', { required: 'Campo obrigatório' })}
              error={errors.title?.message as string}
            />
            <ContainerTextArea>
              <Label>Descrição</Label>
              <Textarea
                name="description"
                rows={10}
                placeholder="Digite aqui a descrição da sua anotação"
                onChange={e => setValue('description', e.target.value)}
                mark
                register={register}
              />
            </ContainerTextArea>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <Button
                style={{
                  width: '40%',
                }}
                type="submit"
              >
                Adicionar nota
              </Button>
            </div>
          </Form>
        </Right>
      </Content>
    </StartupInfos>
  );
}
