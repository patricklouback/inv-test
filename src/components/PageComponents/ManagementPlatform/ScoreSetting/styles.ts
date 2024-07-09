import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Section = styled.section``;

export const Content = styled.div`
  padding: 20px 0;
`;

export const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
`;

export const ScoreSetting = styled.div``;

export const ConfigItems = styled.div`
  max-width: 320px;
  width: 100%;

  display: flex;
  align-items: flex-end;
`;

export const WapperSelect = styled.div`
  max-width: 100px;
  width: 100%;

  display: flex;
  flex-direction: column;

  select {
    outline: none;
    width: 100px;
    height: 61px;
    border: 0;
    background: transparent;
    border-radius: 8px;
    padding-left: 30px;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 18px;
    background-position: right 16px center;

    border: 2px solid ${props => props.theme.colors.borders};

    &:disabled {
      color: ${props => props.theme.colors.borders};
    }
    &:focus {
      border: 2px solid ${props => props.theme.colors.primary[styleSlug]};
    }
  }
`;

export const Peso = styled.span`
  margin-bottom: 4px;
  text-align: center;

  font-weight: 600;
`;

export const WapperTextValue = styled.div`
  max-width: 210px;
  width: 100%;
  transform: translateY(-6px);
  margin-left: 10px;
`;

export const Title = styled.p`
  font-weight: 600;
  margin-bottom: 2px;
  font-size: 15px;
`;

export const Value = styled.p`
  font-size: 14px;
  letter-spacing: 0.4px;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const ResetPointsContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;

  button {
    max-width: 400px;
  }
`;
