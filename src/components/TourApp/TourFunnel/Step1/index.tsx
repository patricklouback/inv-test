import { Card } from '@components/TourApp/CardTour';
import { StepsButton } from '@components/TourApp/CardTour/style';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useCallback, useContext, useEffect, useState } from 'react';
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';

interface State {
  run: boolean;
  steps: Step[];
}

const stepsDefault: Step[] = [
  {
    content: (
      <Card
        description="Clique na iniciativa para prosseguir com o tour."
        size="md"
        title="Em Triagem."
      />
    ),
    placement: 'right',
    target: `.funnel-step-0 .funnel-item`,
    hideFooter: true,
    disableBeacon: true,
    hideBackButton: true,
    hideCloseButton: true,
    showSkipButton: false,
    spotlightClicks: true,
    disableOverlay: false,
    disableCloseOnEsc: true,
    disableOverlayClose: true,
  },
  {
    content: (
      <Card
        description="Clique aqui e veja todas as opções de avaliação disponíveis."
        size="md"
        title="Analise a iniciativa"
      />
    ),
    placement: 'right-start',
    target: `.funnel-actions-acoes`,
    hideBackButton: true,
    hideCloseButton: false,
    hideFooter: true,
    showSkipButton: false,
  },
];

export function TourFunnelStepOne(): JSX.Element {
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
        await viewedTour(TourId.FUNNEL_STEP_ONE);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(handleClickStart, 1000);
    return () => clearTimeout(timeout);
  }, [handleClickStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      const buttonActions = document.querySelector(`.funnel-actions-acoes`);
      if (buttonActions) {
        stepsDefault[0] = {
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
          target: `.funnel-step-0 .funnel-item`,
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
      disableScrolling
      run={run}
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
