import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useTheme } from 'styled-components';
import { Container, ItemStep, Row, Draft, Relative } from './styles';

interface StepProps {
  active: boolean;
  value: string;
}

export const Step: React.FC<StepProps> = ({ active, value }): JSX.Element => {
  const { colors } = useTheme();
  return (
    <Relative>
      <Container active={active}>
        <ItemStep active={active}>{value}</ItemStep>
        <Row active={active} background={colors.primaryLight}>
          <IoIosArrowDown color="#fff" />
        </Row>
      </Container>
      <Draft active={active} />
    </Relative>
  );
};
