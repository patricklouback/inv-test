import { Card } from '@components/TourApp/CardTour';
import { StepsButton } from '@components/TourApp/CardTour/style';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useCallback, useContext, useEffect, useState } from 'react';
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { normalizeString } from 'utils/normalizeString';

interface State {
  run: boolean;
  steps: Step[];
}

const stepsDefault: Step[] = [
  {
    content: (
      <Card
        description="Crie uma nova rota possível para o desenvolvimento das iniciativas."
        size="md"
        title="Criar nova rota"
      />
    ),
    locale: {
      next: (
        <StepsButton aria-label="next" variant="primary">
          Entendi
        </StepsButton>
      ),
    },
    placement: 'top',
    target: `.add-new-new-route`,
    hideBackButton: true,
    showSkipButton: false,
    disableBeacon: true,
  },
  {
    content: (
      <Card
        description="Através dos estágios, você define o fluxo de trabalho para essa rota."
        size="sm"
        title="Criar estágio"
      />
    ),
    locale: {
      next: (
        <StepsButton aria-label="next" variant="primary">
          Entendi
        </StepsButton>
      ),
    },
    placement: 'right-start',
    target: `.add-new-new-step`,
    hideBackButton: true,
    showSkipButton: false,
  },
  {
    content: (
      <Card
        description="Clique aqui para continuar com o tour. 😁"
        size="md"
        title="Clique aqui"
      />
    ),
    placement: 'right',
    target: `.button-${normalizeString('Plano de Implementação')}`,
    hideBackButton: true,
    hideCloseButton: true,
    hideFooter: true,
    showSkipButton: false,
    disableOverlay: false,
    disableCloseOnEsc: true,
    disableOverlayClose: true,
    spotlightClicks: true,
  },
  {
    content: (
      <Card
        description="Adicione atividades que precisam ser cumpridas em cada estágio."
        size="sm"
        title="Adicione atividades!"
      />
    ),
    placement: 'right-start',
    target: `#remove`,
    hideBackButton: true,
    showSkipButton: false,
    disableOverlayClose: false,
    hideCloseButton: false,
  },
];

export function TourManagementPlatform(): JSX.Element {
  const { viewedTour } = useContext(AuthContext);
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: stepsDefault,
  });

  const handleClickStart = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      run: true,
    }));
  }, [setState]);

  const handleJoyrideCallback = async (data: CallBackProps): Promise<void> => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState(prevState => ({
        ...prevState,
        run: false,
      }));

      if (type === EVENTS.TOUR_END) {
        await viewedTour(TourId.MANAGEMENT_PLATFORM);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(handleClickStart, 1000);
    return () => clearTimeout(timeout);
  }, [handleClickStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      const remove = document.querySelector(`#remove`);
      if (remove) {
        stepsDefault[2] = {
          content: (
            <Card
              description="Ótimo! Agora siga para o próximo passo! 😁"
              size="sm"
              title="Siga para o próximo"
            />
          ),
          locale: {
            next: (
              <StepsButton aria-label="next" variant="primary">
                Seguir
              </StepsButton>
            ),
          },
          placement: 'right',
          target: `.button-${normalizeString('Plano de Implementação')}`,
          hideBackButton: true,
          showSkipButton: false,
          disableOverlay: false,
          disableCloseOnEsc: true,
          disableOverlayClose: true,
          spotlightClicks: true,
        };

        setState(prevState => ({
          ...prevState,
          steps: stepsDefault,
        }));

        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setState]);

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      disableOverlay
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
