import styled from 'styled-components';
import { theme } from '@styles/theme/primary';
import { InfoWarningType } from '.';

interface InfoWarningContainerProps {
  type: InfoWarningType;
}

export const InfoWarningContainer = styled.div<InfoWarningContainerProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 20px;
  border: 1px solid
    ${({ type }) => (type === 'INFO' ? theme.colors.blue : theme.colors.yellow)};
  border-left: ${({ type }) => (type === 'INFO' ? '1px' : '5px')} solid
    ${({ type }) => (type === 'INFO' ? theme.colors.blue : theme.colors.yellow)};
  margin-bottom: 20px;
  background-color: ${({ type }) =>
    type === 'INFO' ? theme.colors.backgroundBlue : theme.colors.background};
`;

export const Icon = styled.div``;

export const Text = styled.div``;
