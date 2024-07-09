import styled from 'styled-components';

export const GraphAndTitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  align-self: center;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.greyLight};
  padding: 0 20px;
`;

export const GraphFilterBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.7rem;
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 1rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const TitleFilterBar = styled.div`
  width: auto;
  height: 35px;
  display: flex;
  align-items: center;
  gap: 1rem;
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
`;

interface ExplanationTooltipTextProps {
  top?: number;
  left?: number;
}

export const ExplanationTooltipText = styled.div.attrs<ExplanationTooltipTextProps>(props => {
  return { top: props.top || 0, left: props.left || 0 };
})<ExplanationTooltipTextProps>`
  visibility: hidden;
  min-width: 350px;
  margin-left: 17px;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 11111991;
  color: rgba(253, 253, 253, 1);
  background: rgba(109, 109, 109, 1);
  text-align: left;
  max-width: 501px;
  top: auto;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
  left: ${props => props.left + 17}px;
`;

export const ExplanationTooltip = styled.div`
  position: absolute;
  left: 89%;
  max-width: 100px;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  &:hover ${ExplanationTooltipText} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;
