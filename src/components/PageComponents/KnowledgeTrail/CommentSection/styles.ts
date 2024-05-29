import styled from 'styled-components';

export const Content = styled.div.attrs<{ height: number }, { height: number }>(
  props => {
    return { height: props.height || 682 };
  }
)`
  width: 1256px;
  // height: ${props => props.height}px;
  padding-bottom: 31px;
  padding-left: 32px;
  padding-right: 32px;
  margin-left: 21px;
  background-color: #f6f6f8;
  border-radius: 16px;
  margin-bottom: 32px;
`;

export const Title = styled.div`
  margin-top: 36px;
`;
