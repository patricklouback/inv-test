import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const FooterWrapper = styled.footer`
  width: 100vw;
  display: flex;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.secondaryLight[styleSlug]};
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
      ${theme.colors.primaryLight[styleSlug]} 20.87%,
      ${theme.colors.primary[styleSlug]} 52.62%,
      ${theme.colors.terceary[styleSlug]} 83.37%
    );`};
  }

  div.footer-svg {
    margin-left: 42%;
  }
`;

export const TooltipWrapper = styled.div`
  margin-left: 40%;
`;
