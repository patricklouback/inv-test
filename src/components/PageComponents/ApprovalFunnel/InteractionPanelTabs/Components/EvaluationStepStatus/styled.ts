import styled from 'styled-components';

export const Content = styled.div<{ backgroudColor: string, color: string }>`
  display: flex;
  background-color: ${({ backgroudColor }) => backgroudColor};
  height: 24px;
  border-radius: 4px;
  color: ${({ color }) => color};
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
`;

export const Message = styled.div`
  padding-left: 10px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
`;
