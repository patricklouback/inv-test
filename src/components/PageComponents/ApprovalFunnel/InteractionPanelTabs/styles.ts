import styled from 'styled-components';

export const Button = styled.button<{ selected: boolean }>`
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  width: 100%;
  border: none;
  border-bottom: ${props => (props.selected ? '2px solid black' : 'none')};
  height: 56px;
  background: none;
  font-family: Montserrat;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
  color: ${props => (props.selected ? props.theme.colors.font : '#B5B5B5')};
  transition: font-weight 0.1s ease-in-out;
`;

export const TabsWrapper = styled.div`
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 10px 10px 0 0;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
