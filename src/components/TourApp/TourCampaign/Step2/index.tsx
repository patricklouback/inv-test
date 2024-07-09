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
  steps: Step[];
  stepIndex: number;
}

export function TourCampaignStep2(): JSX.Element {
  const { viewedTour } = useContext(AuthContext);
  const [{ run, stepIndex, steps }, setState] = useState<State>({
    run: false,
    stepIndex: 0,
    steps: [
      {
        content: (
          <Card
            description="Especifique todos os envolvidos nesse direcional, de acordo com os acessos que precisam."
            size="md"
            title="Defina acessos"
          >
            <WrapperFotter style={{ width: '100%' }}>
              <Steps current={1} total={3} />
              <StepsButton
                aria-label="next"
                $variant="primary"
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
        placement: 'left',
        target: `.icon-config`,
        hideBackButton: true,
        hideFooter: true,
        showSkipButton: false,
      },
      {
        content: (
          <Card
            description="Crie rotas, estágios e atividades para cada direcional ativo. Cada iniciativa submetida dentro desse direcional seguirá uma das rotas definidas."
            size="md"
            title="Defina o processo"
          >
            <WrapperFotter style={{ width: '100%' }}>
              <Steps current={2} total={3} />
              <StepsButton
                aria-label="next"
                $variant="primary"
                onClick={() => {
                  setState(prevState => ({
                    ...prevState,
                    stepIndex: 2,
                  }));
                }}
              >
                Entendi
              </StepsButton>
            </WrapperFotter>
          </Card>
        ),
        placement: 'left',
        target: `.icon-process`,
        hideBackButton: true,
        showSkipButton: false,
        hideFooter: true,
      },
      {
        content: (
          <Card
            description="Ao publicar, os usuários poderão acessar e enviar suas iniciativas para esse direcional."
            size="md"
            title="Publique o direcional"
          >
            <WrapperFotter style={{ width: '100%' }}>
              <Steps current={3} total={3} />
              <StepsButton
                aria-label="next"
                $variant="primary"
                onClick={async () => {
                  await viewedTour(TourId.CAMPAIGN_STEP_TWO);
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
        placement: 'top',
        target: `.send`,
        hideBackButton: true,
        showSkipButton: false,
        hideFooter: true,
      },
    ],
  });

  const handleClickStart = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      run: true,
    }));
  }, [setState]);

  const handleJoyrideCallback = async (data: CallBackProps): Promise<void> => {
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
      stepIndex={stepIndex}
      scrollToFirstStep
      disableOverlay
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
