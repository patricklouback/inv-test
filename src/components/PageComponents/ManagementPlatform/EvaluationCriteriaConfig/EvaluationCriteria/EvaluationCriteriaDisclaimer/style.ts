import styled from 'styled-components';

export const Part1 = styled.div`
  font-weight: normal;
`;

export const Part2 = styled.div`
  margin-top: 5px;
  font-weight: bold;
`;

export const Content = styled.div<{ marginTop: string }>`
  margin-top: ${({ marginTop }) => marginTop}px;
  margin-left: 20px;
  margin-bottom: 40px;
`;
