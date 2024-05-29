import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  to {
    opacity: 0.3;
    transform: translate3d(0, -1rem, 0);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;

  .loading {
    display: flex;
    justify-content: center;

    div {
      width: 1rem;
      height: 1rem;
      margin: 2rem 0.3rem;
      background: ${({ theme }) => theme.colors.primaryLight};
      border-radius: 50%;
      animation: 0.9s ${bounce} infinite alternate;

      &:nth-child(2) {
        animation-delay: 0.3s;
      }

      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
  }
`;

export const LayoutContainer = styled.div`
  min-height: calc(100vh - 128px);
`;
