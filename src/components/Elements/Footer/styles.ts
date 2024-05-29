import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  width: 100vw;
  display: flex;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  justify-content: center;
  align-items: center;
  position: relative;

  div.fade-line {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 4px;

    background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight} 20.87%,
      ${theme.colors.primary} 52.62%,
      ${theme.colors.terceary} 83.37%
    );`};
  }

  div.footer-svg {
    margin-left: 42%
  }
`;

export const TooltipWrapper = styled.div`
  margin-left: 40%;
`;
