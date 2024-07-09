import { Card } from '@components/TourApp/CardTour';
import { StepsButton } from '@components/TourApp/CardTour/style';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useCallback, useContext, useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface State {
  run: boolean;
  steps: Step[];
}

export function TourDetailIdea(): JSX.Element {
  const { viewedTour } = useContext(AuthContext);
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: [
      {
        content: (
          <Card
            description="Esse espaço é restrito entre a equipe e os avaliadores. Mande mensagens específicas ou anexe novos arquivos."
            size="md"
            title="Interaja com os avaliadores!"
            style={{
              width: '35rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StepsButton
              aria-label="next"
              $variant="primary"
              style={{ alignSelf: 'center' }}
              onClick={async () => {
                await viewedTour(TourId.DETAIL_IDEAS_DEFAULT);
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
        disableBeacon: true,
        placement: 'top',
        target: '.comment',
        hideBackButton: true,
        showSkipButton: false,
        disableScrolling: true,
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
