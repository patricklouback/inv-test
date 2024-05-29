import styled from 'styled-components';

export const Item = styled.div`
  height: 152px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 980px) {
    flex-direction: row;
    max-width: 500px;
    height: auto;
  }

  @media screen and (max-width: 580px) {
    flex-direction: column;
    height: 152px;
    max-width: 100%;
  }
`;

export const ErrorText = styled.small`
  color: ${props => props.theme.colors.notification.error};
  font-size: 1rem;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 14px;

  svg {
    margin-right: 10px;
  }
`;
