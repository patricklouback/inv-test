import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem !important;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: #2d3748;
  font-weight: 500;
  width: 100%;
`;

export const Select = styled.select`
  width: 100%;
  min-height: 56px;
  padding: 0 1rem;
  color: #2d3748;
  outline: 0;
  border-radius: 8px;
  background: #ffffff;
  border: 2px solid #cfd1dc;
  padding-right: 10px;
`;

export const ErrorText = styled.small<{ position?: boolean }>`
  color: ${props => props.theme.colors.notification.error};
  font-size: 1rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  position: ${({ position }) => (position ? 'absolute' : 'none')};
  bottom: ${({ position }) => (position ? '-25px' : '0')};

  svg {
    margin-right: 10px;
  }
`;
