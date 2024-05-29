import styled, { css } from 'styled-components';

export const ScrollableList = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 15px;
  max-width: 1100px;
  
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    height: 5px;
    border-radius: 5px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
  }
`;

export const WapperListSteps = styled.div`
  justify-content: center;
  /* width: 100%; */
  margin-top: 40px;
  list-style: none;
  display: flex;
`;

export const ItemStepp = styled.li`
  cursor: pointer;

  position: relative;
  display: flex;
`;

export const ValueStep = styled.span`
  width: 131px;
  height: 88px;
  font-size: 0.85rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-left: 10px;
  font-weight: 600;
  letter-spacing: 0.4px;
  position: absolute;
`;

export const WapperRotate = styled.div<{ status?: boolean }>`
  position: absolute;
  bottom: -5px;
  left: 50px;
  transform: rotateZ(180deg);

  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.font};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: 0.4s ease;

  ${({ status }) =>
    status &&
    css`
      transform: rotateZ(0deg);
      background: ${({ theme }) => theme.colors.primaryLight};
    `}
`;

export const WapperDraft = styled.div`
  display: flex;
  align-items: center;
  transform: translateY(-3px);
`;

export const DraftLine = styled.div`
  background: ${({ theme }) => theme.colors.font};
  width: 3px;
  height: 2px;
  margin: 0 2px;
`;

export const WapperGate = styled.div`
  margin: 0 3px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const GateValue = styled.span`
  position: absolute;
  top: -28px;
  left: -7px;
  width: 54px;
  text-align: center;
`;

export const WapperCircle = styled.div<{ status?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ status, theme }) =>
    status
      ? css`
          background: ${theme.colors.greenLive};
        `
      : css`
          background: ${theme.colors.background};
          border: 2px solid ${theme.colors.borders};
        `}
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

export const StepActivities = styled.div`
  width: 100%;
  max-width: 700px;
`;

export const Header = styled.div`
  width: 100%;
  height: 52px;
  background: #48009b;
  color: #ffffff;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding-left: 24px;
  border-radius: 16px 16px 0 0;

  strong {
    font-weight: bold;
    margin-right: 15px;
  }
`;

export const SubHeader = styled.div`
  height: 52px;
  background: #ffffff;
  padding-left: 24px;
  margin-bottom: 15px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 0 0 16px 16px;
`;

export const SubTitle = styled.span`
  font-size: 17px;
  margin-left: 10px;
`;

export const Icon = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #b5b5b5;
`;

export const ActivitiesList = styled.ul`
  list-style: none;
`;

export const Activity = styled.li<{ done?: boolean }>`
  margin-left: 60px;

  text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
`;

export const ItemActivity = styled.li`
  margin: 9px 0;

  label {
    display: flex;
    align-items: center;
  }

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }

  span {
    margin-left: 15px;
    word-break: break-word;
  }

  input {
    width: 20px;
    height: 20px;
  }
`;

export const HistoryWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RhombusHistoryComponent = styled.button`
  width: 100%;
  padding: 8px 16px 8px 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  background-color: transparent;
`;
