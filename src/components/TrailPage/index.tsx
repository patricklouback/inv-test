import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useTheme } from 'styled-components';
import { Container } from './styles';

interface ItemTrailParams {
  data: [string, string];
}

export const ItemTrailComponent: React.FC<ItemTrailParams> = ({
  data,
}): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Container>
      <span>{data[0]}</span>
      {data[1] !== null && (
        <>
          <BiChevronRight size={22} color={colors.terceary} />
          <h1>{data[1]}</h1>
        </>
      )}
    </Container>
  );
};
