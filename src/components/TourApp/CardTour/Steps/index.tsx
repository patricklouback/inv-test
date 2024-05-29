import { SpanSteps } from './style';

interface StepsProps {
  current: number;
  total: number;
}

export function Steps({ current, total }: StepsProps): JSX.Element {
  return (
    <SpanSteps>
      {current} de {total}
    </SpanSteps>
  );
}
