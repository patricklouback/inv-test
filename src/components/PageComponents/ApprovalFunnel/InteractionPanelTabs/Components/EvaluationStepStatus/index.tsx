import { useEffect, useState } from 'react';
import ClockLate from '../../../../../../assets/inventta/clockLate.svg';
import CheckStatus from '../../../../../../assets/inventta/checkStatus.svg';
import ArrowRightLittle from '../../../../../../assets/inventta/ArrowRightLittle.svg';
import { Content, Message } from './styled';

export const EvaluationStepStatus: React.FC<{
  isPending: boolean;
  message: string;
  isDirectApproval?: boolean;
}> = ({ isPending, message, isDirectApproval }): JSX.Element => {
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [icon, setIcon] = useState<JSX.Element>();

  useEffect(() => {
    if (isDirectApproval) {
      setBackgroundColor('#52555614');
      setColor('#525556');
      setIcon(<ArrowRightLittle />);
    } else if (isPending) {
      setBackgroundColor('#ef626214');
      setColor('#EC3137');
      setIcon(<ClockLate />);
    } else {
      setBackgroundColor('#78B53214');
      setColor('#28B446');
      setIcon(<CheckStatus />);
    }
  }, [isPending, isDirectApproval]);

  return (
    <Content backgroudColor={backgroundColor} color={color}>
      {icon}
      <Message>{message}</Message>
    </Content>
  );
};
