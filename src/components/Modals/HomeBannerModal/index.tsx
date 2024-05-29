/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable default-case */
import { Modal } from '@components/Modals/Modal';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import {
  ActionButtonContainer,
  ActionButtonWrapper,
  BotLine,
  BotLines,
  BotMidBox,
  BotMidBoxIcon,
  BotMidBoxIconNoTrial,
  BotMidBoxNoTrial,
  BotMidBoxNoTrialBottom,
  BotMidBoxNoTrialTop,
  BotMidBoxSubtitle,
  BotMidBoxTitle,
  BotMidBoxes,
  BotMidContent,
  BotMidTitle,
  BottomContent,
  BottomContentNoTrial,
  BoxesList,
  FadeLine,
  MiddleContent,
  MiddleContentNoTrial,
  PhraseItem,
  PhrasesContainer,
  RowBoxesContainer,
  Subtitle,
  Title,
  TitleAndSubtitle,
  TopMidContent,
  TopMidPhrases,
  TopMidTitle,
} from './styles';

interface HomeBannerModalProps {
  isTrial: boolean;
  onRequestClose: () => void;
}

interface Box {
  icon: string;
  title: string;
  subtitle: string;
  backgroundColor?: string;
}

interface ColumnProps {
  phrases: string[];
}

export function HomeBannerModal({
  isTrial,
  onRequestClose,
}: HomeBannerModalProps): JSX.Element {
  const { colors } = useTheme();

  const midBoxesTrial: Box[] = [
    {
      icon: 'mentoriasconsultores.png',
      title: 'Mentorias com consultores',
      subtitle:
        'Especialidade da Inventta aliada a um suporte completo durante toda a jornada. Não te deixamos sozinho com um software.',
    },
    {
      icon: 'contratacao.png',
      title: 'Contratação transparente',
      subtitle:
        'Planos flexíveis, sem exclusividade ou custos extras. Assine pelo tempo que quiser e cancele quando quiser.',
    },
    {
      icon: 'expertise.png',
      title: 'Expertise Inventta',
      subtitle:
        'Conte com quem faz a inovação acontecer há 20 anos, atendendo grandes empresas em diversos segmentos de mercado.',
    },
  ];

  const midBoxesNoTrial: Box[] = [
    {
      icon: 'workshop.png',
      title: 'Workshops',
      subtitle:
        'Eventos mão na massa e palestras para sensibilizar e capacitar em temas de estratégia, inovação e gestão.',
      backgroundColor: colors.bannerPurple,
    },
    {
      icon: 'execucao.png',
      title: 'Gestão de squads',
      subtitle:
        'Consultores Inventta se tornam PMO da iniciativa com a Squad da Cia, conduzindo atividades de controle.',
      backgroundColor: colors.bannerGreen,
    },
    {
      icon: 'mentorias2.png',
      title: 'Mentorias',
      subtitle:
        'Suporte de consultores Inventta ao time de inovação ou no desenvolvimento das ideias e projetos.',
      backgroundColor: colors.bannerPurple,
    },
    {
      icon: 'workshop.png',
      title: 'Intraempreendedorismo',
      subtitle:
        'Suporte na condução de um programa, envolvendo avaliação de ideias, priorização e orientação para ideadores.',
      backgroundColor: colors.bannerGreen,
    },
    {
      icon: 'execucao.png',
      title: 'Execução de projetos',
      subtitle:
        'Condução no desenvolvimento de validações, desenho de modelos de negócio e handover de projetos.',
      backgroundColor: colors.bannerPurple,
    },
    {
      icon: 'mentorias2.png',
      title: 'Scouting de parceiros',
      subtitle:
        'Mapeamento de potenciais parceiros para co-desenvolvimento de projetos de inovação.',
      backgroundColor: colors.bannerGreen,
    },
  ];

  const phrasesArray: string[] = [
    'Gerencia iniciativas',
    'Engaja e capacita o time',
    'Fomenta a colaboração',
    'Impulsiona projetos',
    'Monitora resultados',
    'Coleta ideias',
  ];

  const columns: string[][] = [[], [], []];

  if (isTrial) {
    phrasesArray.forEach((phrase, index) => {
      const columnIndex = index % columns.length;
      columns[columnIndex].push(phrase);
    });
  }

  const chunkArray = (arr, chunkSize): Box[][] => {
    return Array.from(
      { length: Math.ceil(arr.length / chunkSize) },
      (_, index) => arr.slice(index * chunkSize, (index + 1) * chunkSize)
    );
  };

  const groupedBoxes = chunkArray(midBoxesNoTrial, 3);

  function actionButton(isTrial: boolean): Window {
    if (isTrial) {
      return window.open('https://www.labinventta.com.br/price.php', '_blank');
    }
    return window.open(
      'https://outlook.office365.com/owa/calendar/ConheceroLabi@inventta.net/bookings/',
      '_blank'
    );
  }

  function onClickLink(url: string): Window {
    return window.open(url, '_blank');
  }

  const handleKeyDown = (event, url): void => {
    if (event.key === 'Enter') {
      onClickLink(url);
    }
  };

  const buttonText = (isTrial: boolean): string => {
    let text;

    switch (isTrial) {
      case true:
        text = 'Conhecer planos';
        break;
      case false:
        text = 'Fale com nossa equipe de vendas';
        break;
      default:
        text = null;
        break;
    }

    return text;
  };

  return (
    <Modal handle={onRequestClose}>
      {isTrial ? (
        <>
          <TitleAndSubtitle>
            <Title>Conheça o Software</Title>
            <Subtitle>
              Avantt.i mede, gerencia e implementa suas iniciativas de inovação.
            </Subtitle>
          </TitleAndSubtitle>
          <FadeLine />
          <MiddleContent>
            <TopMidContent>
              <TopMidTitle>Com o Avantt.i você</TopMidTitle>
              <TopMidPhrases>
                {columns.map((column, index) => (
                  <PhrasesContainer key={index}>
                    <ul>
                      {column.map((phrase, index) => (
                        <PhraseItem key={index}>
                          <FaRegCheckCircle size={20} />
                          {phrase}
                        </PhraseItem>
                      ))}
                    </ul>
                  </PhrasesContainer>
                ))}
              </TopMidPhrases>
            </TopMidContent>
            <BotMidContent>
              <BotMidTitle>O que nos diferencia ?</BotMidTitle>
              <BotMidBoxes>
                {midBoxesTrial.map((box, index) => (
                  <BotMidBox key={index}>
                    <BotMidBoxIcon backgroundImage={box.icon} />
                    <BotMidBoxTitle>{box.title}</BotMidBoxTitle>
                    <BotMidBoxSubtitle>{box.subtitle}</BotMidBoxSubtitle>
                  </BotMidBox>
                ))}
              </BotMidBoxes>
            </BotMidContent>
          </MiddleContent>
          <FadeLine />
          <BottomContent>
            <ActionButtonWrapper onClick={() => actionButton(isTrial)}>
              {buttonText(isTrial)}
            </ActionButtonWrapper>
          </BottomContent>
        </>
      ) : (
        <>
          <TitleAndSubtitle>
            <Title>Serviços adicionais do Avantt.i</Title>
            <Subtitle>
              Todos os nossos serviços são conduzidos pelos especialistas do
              Time Inventta.
            </Subtitle>
          </TitleAndSubtitle>
          <FadeLine />
          <MiddleContentNoTrial>
            {groupedBoxes?.map((row, rowIndex) => (
              <BoxesList key={rowIndex} index={rowIndex}>
                {row.map((box, columnIndex) => (
                  <RowBoxesContainer key={columnIndex}>
                    <BotMidBoxNoTrial>
                      <BotMidBoxNoTrialTop
                        backgroundColor={box.backgroundColor}
                      >
                        <BotMidBoxIconNoTrial backgroundImage={box.icon} />
                        <BotMidBoxTitle>{box.title}</BotMidBoxTitle>
                      </BotMidBoxNoTrialTop>
                      <BotMidBoxNoTrialBottom>
                        <BotMidBoxSubtitle>{box.subtitle}</BotMidBoxSubtitle>
                      </BotMidBoxNoTrialBottom>
                    </BotMidBoxNoTrial>
                  </RowBoxesContainer>
                ))}
              </BoxesList>
            ))}
          </MiddleContentNoTrial>
          <FadeLine />
          <BottomContentNoTrial>
            <BotLines>
              <BotLine>
                <p>
                  Precisa de ajuda para escolher um serviço adicional?
                  <span
                    onClick={() =>
                      onClickLink(
                        'https://outlook.office365.com/owa/calendar/ConheceroLabi@inventta.net/bookings/'
                      )
                    }
                    onKeyDown={() => handleKeyDown('enter', '')}
                    role="button"
                    tabIndex={0}
                  >
                    Marque uma conversa
                  </span>
                </p>
              </BotLine>
              <BotLine>
                <p>
                  Quer saber mais detalhes?
                  <span
                    onClick={() => onClickLink('Servicos_adicionais.pdf')}
                    onKeyDown={() =>
                      handleKeyDown('enter', 'Servicos_adicionais.pdf')
                    }
                    role="button"
                    tabIndex={0}
                  >
                    Veja todos os serviços
                  </span>
                </p>
              </BotLine>
            </BotLines>
            <ActionButtonContainer>
              <ActionButtonWrapper onClick={() => actionButton(isTrial)}>
                {buttonText(isTrial)}
              </ActionButtonWrapper>
            </ActionButtonContainer>
          </BottomContentNoTrial>
        </>
      )}
    </Modal>
  );
}

export function HomeBanner({ ...props }: HomeBannerModalProps): JSX.Element {
  return <HomeBannerModal {...props} />;
}
