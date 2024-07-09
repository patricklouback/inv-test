import {
  WarningTagContainer,
  WarningTagMiddle,
  WarningTagText,
} from './styles';

interface WarningTagProps {
  text: string;
  size: string;
  margin: string;
}

export function WarningTag({
  text,
  size,
  margin,
}: WarningTagProps): JSX.Element {
  return (
    <WarningTagContainer margin={margin}>
      <WarningTagMiddle>
        <WarningTagText size={size}>{text}</WarningTagText>
      </WarningTagMiddle>
    </WarningTagContainer>
  );
}
