import { Card } from '@components/TourApp/CardTour';
import { StepsButton } from '@components/TourApp/CardTour/style';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useCallback, useContext, useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { KANBAN_STATUS } from 'utils/constants';
import { normalizeString } from 'utils/normalizeString';

interface State {
  run: boolean;
  steps: Step[];
}

export function TourIdeaApproved(): JSX.Element {
  const { viewedTour } = useContext(AuthContext);
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: [
      {
        content: (
          <Card
            description="A sua iniciativa foi selecionada para ser desenvolvida. Clique para iniciar!"
            size="md"
            title="Iniciativa escolhida!"
          >
            <StepsButton
              aria-label="next"
              $variant="primary"
              style={{ alignSelf: 'center', marginTop: '5%' }}
              onClick={async () => {
                await viewedTour(TourId.IDEAS_APPROVED);
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
        placement: 'right',
        target: `.eye-details-${normalizeString(KANBAN_STATUS.APPROVED)}`,
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
        options: {
          zIndex: 10000,
          width: 'auto',
        },
      }}
    />
  );
}
