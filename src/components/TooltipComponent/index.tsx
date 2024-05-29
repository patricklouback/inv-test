import parse from 'html-react-parser';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { ToolTipWrapper, TooltipComponent } from './styles';

interface TooltipProps {
  text: string;
  size?: number;
  textWidth?: number;
  centralizeText?: boolean;
}

export const ToolTip: React.FC<TooltipProps> = ({
  text,
  size,
  textWidth,
  centralizeText,
}): JSX.Element => {
  return (
    <ToolTipWrapper>
      <AiOutlineQuestionCircle color="black" size={size || 16} />
      <TooltipComponent centralizeText={centralizeText} textWidth={textWidth}>
        {text.split('\n').map((line, i) => {
          return (
            <span key={line}>
              {parse(line)}
              <br />
            </span>
          );
        })}
      </TooltipComponent>
    </ToolTipWrapper>
  );
};
