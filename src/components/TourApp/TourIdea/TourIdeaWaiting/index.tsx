import { Card } from '@components/TourApp/CardTour';
import { StepsButton } from '@components/TourApp/CardTour/style';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useCallback, useContext, useEffect, useState } from 'react';
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { KANBAN_STATUS } from 'utils/constants';
import { normalizeString } from 'utils/normalizeString';

interface State {
  run: boolean;
  steps: Step[];
}

const stepsDefault: Step[] = [
  {
    content: (
      <Card
        description="A sua iniciativa entrou no funil do avaliador e está seguindo o fluxo definido."
        size="md"
        title="Verifique o status"
      />
    ),
    locale: {
      next: (
        <StepsButton aria-label="next" $variant="primary">
          Entendi
        </StepsButton>
      ),
    },
    disableBeacon: true,
    placement: 'left',
    target: `.kanban-status-${normalizeString(KANBAN_STATUS.WAITING)}`,
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
  },
  {
    content: (
      <Card
        description="Clique aqui para ver os detalhes e interagir com os avaliadores."
        size="md"
        title="Acesse sua iniciativa"
      />
    ),
    placement: 'right',
    target: `.eye-details-${normalizeString(KANBAN_STATUS.WAITING)}`,
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
    hideCloseButton: false,
  },
];

export function TourIdeaWaiting(): JSX.Element {
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
        await viewedTour(TourId.IDEAS_WAITING);
      }
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
