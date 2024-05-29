import { BiCheck } from 'react-icons/bi';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
  transform: translateY(4px);
`;
const Draft = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Line = styled.div`
  width: 3px;
  height: 2px;
  margin: 1px;
  background: ${({ theme }) => theme.colors.font};
`;
const WapperChecked = styled.div`
  position: relative;
`;
const ValueGate = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 45px;
  font-size: 0.8rem;
  font-weight: 600;

  transform: translateY(-25px) translateX(-2px);
`;
const ItemChecked = styled.div<{ complete?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  ${({ theme, complete }) =>
    complete &&
    css`
      background: ${theme.colors.greenLive};
    `}

  ${({ theme, complete }) =>
    !complete &&
    css`
      background: ${theme.colors.background};
      border: 2px solid ${theme.colors.borders};
    `}

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface GateProps {
  index?: number;
  complete?: boolean;
  last?: boolean;
}

export const Gate: React.FC<GateProps> = ({
  index,
  complete,
  last,
}): JSX.Element => {
  return (
    <Container>
      <Draft>
        <Line />
        <Line />
        <Line />
        <Line />
      </Draft>
      <WapperChecked>
        <ValueGate>Gate {index + 1}</ValueGate>
        <ItemChecked complete={complete}>
          {complete && <BiCheck size={23} color="#fff" />}
        </ItemChecked>
      </WapperChecked>
      {!last && (
        <Draft>
          <Line />
          <Line />
          <Line />
          <Line />
        </Draft>
      )}
    </Container>
  );
};
