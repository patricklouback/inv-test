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
        description="Navegue pela trilha completa e aplique os aprendizados na sua iniciativa."
        size="sm"
        title="Explore as aulas"
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
    target: '.video-0',
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
    disableBeacon: true,
  },
  {
    content: (
      <Card
        description="Baixe o material, assista o vídeo e coloque os aprendizados em prática!"
        size="sm"
        title="Coloque em prática!"
      />
    ),
    placement: 'top',
    target: `.download-material`,
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
    hideCloseButton: false,
  },
];

export function TourKnowledgeTrail(): JSX.Element {
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
        await viewedTour(TourId.KNOWLEDGE_TRAIL);
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
