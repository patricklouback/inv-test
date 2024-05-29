import styled from 'styled-components';

export const TooltipComponent = styled.div<{textWidth, centralizeText}>`
  visibility: hidden;
  min-width: 210px;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 100;
  color: #fdfdfd;
  background: #6d6d6d;
  text-align: left;
  max-width: 501px;
  top: auto;
  opacity: 0;
  width: ${({textWidth}) => `${textWidth}px` || 'auto'};
  transition: visibility 0s linear 300ms, opacity 300ms;
  transform: ${({centralizeText}) => (centralizeText ? 'translateX(-50%)' : 'auto')};
  /* transform: translateX(-50%); */
`;

export const ToolTipWrapper = styled.div`
  max-width: 100px;
  padding: 2px 8px 4px 8px;
  color: #1050bd;
  border-radius: 4px;
  &:hover ${TooltipComponent} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;
