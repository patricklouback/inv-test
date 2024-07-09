import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface StepProps {
  selected: boolean;
}

interface GateProps {
  completed: boolean;
}

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.greyLight};
  /* margin-top: 24px; */
  padding: 37px 47px;
  border-radius: 0 0 8px 8px;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 10px;
    left: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.greenHipeLight};
    border-radius: 0 0 8px 8px;
  }

  margin-bottom: 35px;
`;

export const TitleProcess = styled.h2`
  font-size: 16px;
  text-transform: uppercase;
`;

export const ListSteps = styled.ul`
  display: flex;
  margin-top: 44px;
  list-style: none;
  margin-bottom: 40px;
  max-width: 791px;
  padding-bottom: 15px;

  justify-content: space-between;

  overflow-x: scroll;
  overflow-y: hidden;

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
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
    border-radius: 5px;
  }

  @media (max-width: 1200px) {
    max-width: 48rem;
  }

  @media (max-width: 1020px) {
    max-width: 42rem;
  }

  @media (max-width: 980px) {
    max-width: 58rem;
  }
`;

export const ItemStepContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ItemStep = styled.button`
  position: relative;
  max-width: 150px;
  width: 100%;
  border: 0;
  background: transparent;
`;

export const Gate = styled.div`
  width: 100%;
  height: 1px;
  border-top: 2px dashed ${({ theme }) => theme.colors.grey};
  position: relative;
  min-width: 80px;

  span {
    text-align: center;
    font-size: 0.8rem;
    width: auto;
    position: absolute;
    top: -35px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
`;

export const Circle = styled.div<GateProps>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme, completed }) =>
    completed ? theme.colors.greenLive : theme.colors.background};
  border: 2px solid
    ${({ theme, completed }) =>
      completed ? theme.colors.greenLive : theme.colors.grey};

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -14px;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

export const RhombusHistoryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -11px;
  margin-left: 0;
  left: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: #67d1c4;
  border-color: #1d8177;
  border-width: 3px;
  border-radius: 17%;
  border-style: solid;
  border-width: 2px;
  transform: rotate(45.5deg);

  span {
    text-align: center;
    width: auto;
    position: absolute;
    top: -37px;
    margin: 0 auto;
    /* left: -74; */
    right: 0;
    transform: rotate(-45.5deg);
  }
`;

export const WapperDraft = styled.div`
  display: flex;
  align-items: center;
  transform: translateY(-1px);
  margin-left: 2px;
`;

export const DraftLine = styled.div`
  background: ${({ theme }) => theme.colors.font};
  width: 7px;
  height: 2px;
`;

export const HistoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RhombusHistoryComponent = styled.button`
  width: 95px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.primary[styleSlug]};
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.primary[styleSlug]};
  border-radius: 8px;
  background-color: transparent;
`;

export const IconCollapse = styled.div<StepProps>`
  position: absolute;

  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.primary[styleSlug] : theme.colors.font};
  border-radius: 6px;
  bottom: -3px;

  ${({ selected }) =>
    selected &&
    css`
      svg {
        transition: transform 0.2s;
        transform: rotate(180deg);
      }
    `}

  left: 36%;
`;

export const Value = styled.span`
  display: flex;
  width: 90%;
  height: 90px;
  padding-left: 5px;
  align-items: center;
  position: absolute;
  z-index: 999;

  font-size: 0.75rem;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.4px;

  left: 0;
  top: 0;
  justify-content: center;
`;

export const ContentSteps = styled.div`
  margin-bottom: 40px;
`;

export const Header = styled.header``;

export const Title = styled.div`
  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.colors.primary[styleSlug]};
  color: ${({ theme }) => theme.colors.background};

  display: flex;
  align-items: center;
  padding-left: 24px;
  border-radius: 16px 16px 0 0;
`;

export const StepI = styled.span`
  font-weight: bold;
  margin-right: 15px;
`;
export const ValueStep = styled.span`
  font-weight: 100;
`;

export const Activity = styled.div`
  height: 52px;
  background: ${({ theme }) => theme.colors.background};
  padding-left: 24px;
  margin-bottom: 15px;

  display: flex;
  align-items: center;
  border-radius: 0 0 16px 16px;

  #icon {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.grey};
  }
`;

export const ValueActivity = styled.span`
  font-size: 17px;
  margin-left: 10px;
`;

export const ListActivity = styled.ul`
  list-style: none;

  padding-left: 25px;
`;

export const ItemActivity = styled.li`
  margin: 9px 0;

  label {
    display: flex;
    align-items: center;
  }

  &:first-child {
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

export const KanbanActions = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-end;

  button {
    width: auto;
    font-weight: 500;

    &:first-child {
      background-color: ${({ theme }) => theme.colors.font};
    }

    .next-level {
      background-color: ${({ theme }) => theme.colors.greenLimao};
    }
  }
`;
