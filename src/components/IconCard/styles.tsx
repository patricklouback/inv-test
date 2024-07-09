import styled from 'styled-components';

interface ContainerProps {
  $shadow?: boolean;
  $background?: string;
}

export const Container = styled.div<ContainerProps>`
  a,
  button {
    svg {
      margin: 0 !important;
    }
    border: 0;
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    background-color: ${({ $background, theme }) =>
      $background || theme.colors.greyLight};
    align-items: center;
    border-radius: 0.5rem;
    box-shadow: ${({ $shadow }) => !!$shadow && `0 2px 5px -3px #00000061`};
  }
`;
