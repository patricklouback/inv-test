import styled from 'styled-components';

export const Content = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
`;

export const TextAsking = styled.div``;

export const AntSwitch = styled.div<{ state: boolean; disabled: boolean }>`
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => {
    if (props.disabled) {
      return '#ccc';
    }
    if (props.state) {
      return '#2D68FE';
    }
    return '#ccc';
  }};
  position: relative;
  margin-left: 10px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.5' : '1')};

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    top: 50%;
    transform: translate(
      ${props => (props.state ? '20px, -50%' : '2px, -50%')}
    );
    transition: transform 0.3s;
  }
`;

export const SwitchContent = styled.div`
  width: auto;
`;
