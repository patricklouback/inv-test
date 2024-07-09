import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Container = styled.div`
  height: 68px;
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e7e7e7;
  border-radius: 8px 8px 0 0;
`;

export const ActionOrStatus = styled.div`
  margin-right: 20px;
`;

export const EvaluateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 99px;
  height: 34px;
  border-radius: 8px;
  gap: 8px;
  background: ${({theme}) => theme.colors.primary[styleSlug]};
  color: ${({ theme }) => theme.colors.fontWhite};
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  border: none;
`;

export const User = styled.div`
  margin-left: 20px;
`;

export const EvaluationStepFinishedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const PartialRate = styled.div`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: right;
`;
