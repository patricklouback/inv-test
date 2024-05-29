import { Card } from '@components/TourApp/CardTour';
import { StartButton, StepsButton } from '@components/TourApp/CardTour/style';
import imgTour from 'assets/inventta/img-tour.png';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useContext, useEffect, useState } from 'react';
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from 'react-joyride';

interface State {
  run: boolean;
  steps: Step[];
}

const stepsDefault: Step[] = [
  {
    content: (
      <Card
        description="Estamos empolgados para te acompanhar na utilização das funcionalidades que o Avantt.i oferece. Queremos te garantir uma boa experiência desde o primeiro momento."
        imageUrl={imgTour}
        size="lg"
        title="Seja bem vindo ao Avantt.i!"
      />
    ),
    locale: {
      next: (
        <StartButton aria-label="next" variant="primary">
          Vamos lá!
        </StartButton>
      ),
      skip: (
        <StartButton aria-label="skip" variant="secondary">
          Ver depois
        </StartButton>
      ),
    },
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <Card
        description="Compartilhe as suas ideias e dê o primeiro passo para que se tornem realidade."
        size="md"
        title="Envie uma iniciativa"
      />
    ),
    locale: {
      next: (
        <StepsButton aria-label="next" variant="primary">
          Entendi
        </StepsButton>
      ),
    },
    placement: 'right',
    target: '.react-multi-carousel-item--active .carrossel-0',
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
  },
  {
    content: (
      <Card
        description="Clique aqui e veja todos os recursos que disponibilizamos para você."
        size="sm"
        title="Acesse o menu"
      />
    ),
    placement: 'left-start',
    target: '.menuHeader',
    disableOverlay: true,
    hideBackButton: true,
    showSkipButton: false,
    hideCloseButton: false,
  },
];

const stepAdmin: Step = {
  content: (
    <Card
      description="Personalize de acordo com os processos da sua empresa."
      size="sm"
      title="Configuração do Avantt.i"
    />
  ),
  locale: {
    close: (
      <StepsButton aria-label="close" variant="primary">
        Ok!
      </StepsButton>
    ),
  },
  placement: 'bottom',
  target: '.configAdmin',
  disableOverlay: true,
  hideBackButton: true,
  showSkipButton: false,
  hideCloseButton: false,
};

export function TourHome(): JSX.Element {
  const { user, viewedTour, viewAllTour } = useContext(AuthContext);
  const [{ run, steps }, setState] = useState<State>({
    run: true,
    steps: stepsDefault,
  });

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      const element = document.querySelector(
        `.react-multi-carousel-item--active .carrossel-0`
      );
      count += 1;

      if (!element) {
        if (count > 1) {
          stepsDefault[1] = {
            content: (
              <Card
                description="Compartilhe as suas ideias e dê o primeiro passo para que se tornem realidade."
                size="md"
                title="Envie uma iniciativa"
              />
            ),
            locale: {
              next: (
                <StepsButton aria-label="next" variant="primary">
                  Entendi
                </StepsButton>
              ),
            },
            placement: 'right',
            target: '.react-multi-carousel-item .carrossel-0',
            hideBackButton: true,
            showSkipButton: false,
            disableScrolling: true,
          };

          if (user?.isAdmin) {
            const lastStepDefault: Step = {
              content: (
                <Card
                  description="Clique aqui e veja todos os recursos que disponibilizamos para você."
                  size="sm"
                  title="Acesse o menu"
                />
              ),
              locale: {
                next: (
                  <StepsButton aria-label="next" variant="primary">
                    Entendi.
                  </StepsButton>
                ),
              },
              placement: 'left-start',
              target: '.menuHeader',
              disableOverlay: true,
              hideBackButton: true,
              showSkipButton: false,
            };

            setState(prevState => ({
              ...prevState,
              steps: [
                stepsDefault[0],
                stepsDefault[1],
                lastStepDefault,
                stepAdmin,
              ],
            }));
          }

          clearInterval(interval);
        }
      } else if (user?.isAdmin) {
        const lastStepDefault: Step = {
          content: (
            <Card
              description="Clique aqui e veja todos os recursos que disponibilizamos para você."
              size="sm"
              title="Acesse o menu"
            />
          ),
          locale: {
            next: (
              <StepsButton aria-label="next" variant="primary">
                Entendi.
              </StepsButton>
            ),
          },
          placement: 'left-start',
          target: '.menuHeader',
          disableOverlay: true,
          hideBackButton: true,
          showSkipButton: false,
        };

        setState(prevState => ({
          ...prevState,
          steps: [stepsDefault[0], stepsDefault[1], lastStepDefault, stepAdmin],
        }));
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setState, user?.isAdmin]);

  const handleJoyrideCallback = async (data: CallBackProps): Promise<void> => {
    const { status, type, action } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState(prevState => ({
        ...prevState,
        run: false,
      }));

      if (type === EVENTS.TOUR_END) {
        if (action === ACTIONS.SKIP) {
          await viewAllTour();
          return undefined;
        }
        await viewedTour(TourId.HOME);
      }
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showSkipButton
      steps={steps}
      styles={{
        tooltipContent: { display: 'flex', padding: 0 },
        tooltip: {
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: 8,
          borderRadius: 16,
          paddingTop: 16,
        },
        buttonNext: {
          backgroundColor: 'transparent',
          border: 0,
          cursor: 'pointer',
          outline: 'none',
        },
        options: {
          zIndex: 10000,
          width: 'auto',
        },
      }}
    />
  );
}
