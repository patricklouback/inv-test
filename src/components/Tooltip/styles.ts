import styled from 'styled-components';

export const TooltipContent = styled.div.attrs<
  { top: number; left: number; backgroundColor: string },
  { top: number; left: number; backgroundColor: string }
>(props => {
  return {
    top: props.top || 0,
    left: props.left || 0,
    backgroundColor: props.backgroundColor || 'rgba(109, 109, 109, 1)',
  };
})`
  visibility: hidden;
  margin-left: 17px;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 11111991;
  color: rgba(253, 253, 253, 1);
  background: ${props => props.backgroundColor};
  text-align: left;
  max-width: 501px;
  top: ${props => props.top}px;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
  left: ${props => props.left}px;
`;

export const TooltipContainer = styled.div`
  max-width: 100px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  &:hover ${TooltipContent} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;
