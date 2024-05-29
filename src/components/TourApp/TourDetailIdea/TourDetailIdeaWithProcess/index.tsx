import { Card } from '@components/TourApp/CardTour';
import { Steps } from '@components/TourApp/CardTour/Steps';
import { StepsButton } from '@components/TourApp/CardTour/style';
import { WrapperFotter } from '@components/TourApp/style';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useCallback, useContext, useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

export function TourDetailIdeaWithProcess(): JSX.Element {
  const { viewedTour } = useContext(AuthContext);
  const [{ run, stepIndex, steps }, setState] = useState<State>({
    run: false,
    stepIndex: 0,
    steps: [
      {
        content: (
          <Card
            description="Sua iniciativa ganhou um processo. Você precisa cumprir as atividades para avançar nos estágios."
            size="md"
            title="Novo processo!"
            style={{
              width: '25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WrapperFotter style={{ width: '350px' }}>
              <Steps current={1} total={2} />
              <StepsButton
                variant="primary"
                onClick={() => {
                  setState(prevState => ({
                    ...prevState,
                    stepIndex: 1,
                  }));
                }}
              >
                Entendi
              </StepsButton>
            </WrapperFotter>
          </Card>
        ),
        disableBeacon: true,
        placement: 'top',
        target: '.process-idea-page',
        hideBackButton: true,
        showSkipButton: false,
        disableScrolling: true,
        hideFooter: true,
      },
      {
        content: (
          <Card
            description="Quando concluir, anexe os arquivos nos comentários e marque o campo ao lado."
            size="md"
            title="Faça as atividades!"
            style={{
              width: '25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <WrapperFotter style={{ width: '350px' }}>
              <Steps current={2} total={2} />
              <StepsButton
                aria-label="next"
                variant="primary"
                onClick={async () => {
                  await viewedTour(TourId.DETAIL_IDEAS_WITH_PROCESS);
                  setState(prevState => ({
                    ...prevState,
                    run: false,
                  }));
                }}
              >
                Entendi
              </StepsButton>
            </WrapperFotter>
          </Card>
        ),
        disableBeacon: true,
        placement: 'right-start',
        target: '.process-idea-page-2',
        hideBackButton: true,
        showSkipButton: false,
        disableScrolling: true,
        hideFooter: true,
        disableOverlay: true,
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

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showSkipButton
      steps={steps}
      stepIndex={stepIndex}
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
