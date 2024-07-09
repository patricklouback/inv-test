import styled from 'styled-components';

export const Result = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  white-space: nowrap;
`;

export const PointsResult = styled.strong`
  font-family: Montserrat;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const EvaluationResultContainer = styled.div<{
  isForCardIdea?: boolean;
}>`
  height: 45px;
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: row-reverse;
  border: ${({ isForCardIdea }) =>
    isForCardIdea ? 'none' : '1px solid #e7e7e7'};
  border-radius: 0 0 8px 8px;
`;

export const EvaluationResultBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  align-items: center;
`;

export const EvaluationResultBoxCardIdea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-left: 4px;
`;

export const TooltipContainer = styled.div`
  margin-top: 4px;
`;

export const Content = styled.div`
  width: 100%;
`;
