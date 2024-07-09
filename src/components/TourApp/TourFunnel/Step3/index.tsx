import { Card } from '@components/TourApp/CardTour';
import { StepsButton } from '@components/TourApp/CardTour/style';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useCallback, useContext, useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface State {
  run: boolean;
  steps: Step[];
  stepIndex: number;
}

export function TourFunnelStepThree(): JSX.Element {
  const { viewedTour } = useContext(AuthContext);
  const [{ run, stepIndex, steps }, setState] = useState<State>({
    run: false,
    stepIndex: 0,
    steps: [
      {
        content: (
          <Card
            description="Clique na iniciativa para prosseguir com o tour."
            size="md"
            title="Selecionada."
          />
        ),
        placement: 'right',
        target: `.funnel-step-2 .funnel-item`,
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
            description="A iniciativa ganhou um processo. Agora, você precisa verificar as atividades enviadas."
            size="md"
            title="Novo processo!"
          />
        ),
        locale: {
          next: (
            <StepsButton
              aria-label="next"
              $variant="primary"
              onClick={() => {
                setState(prevState => ({
                  ...prevState,
                  stepIndex: prevState.stepIndex + 1,
                }));
              }}
            >
              Entendi
            </StepsButton>
          ),
        },
        placement: 'top',
        target: `.process-funnel`,
        hideBackButton: true,
        showSkipButton: false,
        disableOverlay: false,
      },
      {
        content: (
          <Card
            description="Quando as atividades forem concluídas, avance com a iniciativa para o próximo estágio."
            size="md"
            title="Aprove de fase"
          >
            <StepsButton
              aria-label="next"
              $variant="primary"
              style={{ alignSelf: 'center', marginTop: '5%' }}
              onClick={async () => {
                await viewedTour(TourId.FUNNEL_STEP_THREE);
                setState(prevState => ({
                  ...prevState,
                  run: false,
                }));
              }}
            >
              Entendi
            </StepsButton>
          </Card>
        ),
        placement: 'left',
        target: `.next-level`,
        hideBackButton: true,
        hideFooter: true,
        showSkipButton: false,
        disableOverlay: false,
        disableScrolling: false,
      },
    ],
  });

  const handleClickStart = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      run: true,
    }));
  }, [setState]);

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState(prevState => ({
        ...prevState,
        run: false,
      }));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(handleClickStart, 1000);
    return () => clearTimeout(timeout);
  }, [handleClickStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      const buttonActions = document.querySelector(`.process-funnel`);
      if (buttonActions) {
        setState(prevState => ({
          ...prevState,
          stepIndex: 1,
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
      stepIndex={stepIndex}
      scrollToFirstStep
      disableScrolling
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
