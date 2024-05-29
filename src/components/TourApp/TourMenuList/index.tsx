import { Card } from '@components/TourApp/CardTour';
import { StepsButton } from '@components/TourApp/CardTour/style';
import { AuthContext } from 'contexts/AuthContext';
import { TourId } from 'interfaces/tour';
import { useContext, useEffect, useState } from 'react';
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
        description="Acesse conteúdos para te auxiliar no progresso das iniciativas!"
        size="sm"
        title="Trilha de inovação"
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
    target: `.menuItem-${normalizeString('Trilha de conhecimento')}`,
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
    disableBeacon: true,
  },
  {
    content: (
      <Card
        description="Acompanhe o progresso das iniciativas que você participa."
        size="sm"
        title="Iniciativas enviadas"
      />
    ),
    locale: {
      next: (
        <StepsButton aria-label="next" variant="primary">
          Entendi
        </StepsButton>
      ),
      close: (
        <StepsButton aria-label="close" variant="primary">
          Close
        </StepsButton>
      ),
    },
    placement: 'right-start',
    target: `.menuItem-${normalizeString('Minhas iniciativas')}`,
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
    hideCloseButton: false,
  },
];

const stepsAdmin: Step[] = [
  {
    content: (
      <Card
        description="Crie direcionais para  receber as iniciativas."
        size="sm"
        title="Painel de gestão"
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
    target: `.menuItem-${normalizeString('Painel de gestão')}`,
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
    disableBeacon: true,
  },
  {
    content: (
      <Card
        description="Realize o gerenciamento completo das iniciativas que foram submetidas."
        size="sm"
        title="Funil Kanban"
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
    target: `.menuItem-${normalizeString('Funil Kanban')}`,
    hideBackButton: true,
    showSkipButton: false,
    disableScrolling: true,
  },
];

export function TourMenuList(): JSX.Element {
  const { user, viewedTour } = useContext(AuthContext);
  const [{ run, steps }, setState] = useState<State>({
    run: true,
    steps: stepsDefault,
  });

  useEffect(() => {
    if (user?.isManager || user?.isAdmin) {
      const stepsDefaultMapped = [...stepsDefault];
      stepsDefaultMapped[0] = {
        content: (
          <Card
            description="Acesse conteúdos rápidos para auxiliar você e seu time na jornada de inovação."
            size="sm"
            title="Trilha de inovação"
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
        target: `.menuItem-${normalizeString('Trilha de conhecimento')}`,
        hideBackButton: true,
        showSkipButton: false,
        disableScrolling: true,
        disableBeacon: false,
      };

      setState(prevState => ({
        ...prevState,
        steps: [...stepsAdmin, ...stepsDefaultMapped],
      }));
    }
  }, [setState, user]);

  const handleJoyrideCallback = async (data: CallBackProps): Promise<void> => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState(prevState => ({
        ...prevState,
        run: false,
      }));

      if (type === EVENTS.TOUR_END) {
        await viewedTour(TourId.MENU_LIST);
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
