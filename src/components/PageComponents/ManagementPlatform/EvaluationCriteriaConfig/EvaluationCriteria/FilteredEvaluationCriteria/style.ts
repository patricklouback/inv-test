import styled from 'styled-components';

export const Content = styled.div<{ marginTop: number }>`
  margin-top: ${({ marginTop }) => `${marginTop}px`};
`;
