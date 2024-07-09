import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface StepItemProps {
  completed: boolean;
}

export const ButtonNextLevel = styled.button`
  background: ${({ theme }) => theme.colors.greenLimao};
  border: none;
  border-radius: 8px;
  height: 52px;

  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 24px;

  font-weight: 500;
  letter-spacing: 0.4px;
  margin-left: 25px;

  svg {
    margin-right: 10px;
  }
`;

export const ButtonNotification = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 0;
  outline: none;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.background};
`;

export const ButtonEdit = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 0;
  outline: none;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.secondaryLight2};
`;

export const WapperDraft = styled.div<{ size?: number }>`
  margin-bottom: 1rem;
  ${({ size }) => {
    if (size <= 521) {
      return css`
        &:first-child {
          margin-top: 20px;
        }
      `;
    }
  }}

  ${({ size }) => {
    if (size <= 521) {
      return css`
        &:last-child {
          justify-content: space-between;
        }
      `;
    }
  }}
      display: flex;
  align-items: center;
`;

export const WapperHeaderItem = styled.div<{ size?: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ size }) => {
    if (size <= 521) {
      return css`
        flex-direction: column-reverse;
        align-items: normal;
      `;
    }
  }}
`;

export const H3Draft1 = styled.h3`
  width: 100%;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.fontLight};
  font-weight: 500;
  letter-spacing: 0.4px;
  line-height: 24px;
`;

export const H2Draft1 = styled.h2`
  margin-top: 16px;
  font-size: 25px;
  line-height: 35px;
`;

export const IdeaAppId = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const ItemTag = styled.li<{ background?: string }>`
  margin: 0.5rem 0 0.2rem;
  background: ${({ background }) => background};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.background};
  height: 26px;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 0.4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(2) {
    margin-left: 14px;
  }
`;

const KanbanColors = {
  WAITING: '#315594',
  IN_REVIEW: '#8B095F',
  EXTERNAL_REVIEW: '#F99335',
  APPROVED: '#67D1C4',
  PAUSED: 'rgba(45, 55, 72, 0.6)',
  INACTIVE: '#B80F0A',
};

export const KanbanStatus = styled.div<{ type: string }>`
  background-color: ${({ type }) => KanbanColors[type]};
  border: none;
  border-radius: 8px;
  height: 52px;

  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 24px;

  font-weight: 500;
  letter-spacing: 0.4px;
  margin-left: 25px;
`;

export const KanbanStatusText = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const WapperDraft1 = styled.div<{ size?: number }>`
  ${({ size }) => {
    if (size <= 1279) {
      return css`
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          padding-right: 0;
        }
        padding: 0 5px;
      `;
    }
  }}

  max-width: 450px;
  width: 100%;
`;

export const ValueStrong = styled.strong`
  font-size: 17px;
`;

export const ValueDraft2 = styled.p`
  margin-top: 16px;
  font-size: 18px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const ListUsers = styled.ul<{ size?: number }>`
  list-style: none;

  max-width: 245px;
  width: 100%;

  ${({ size }) => {
    if (size <= 973) {
      return css`
        max-width: 180px;
      `;
    }
  }}

  ${({ size }) => {
    if (size <= 857) {
      return css`
        margin-top: 30px;
      `;
    }
  }}
`;

export const ItemUser = styled.li`
  margin: 8px 0;
`;

export const WapperDraft2 = styled.div<{ size?: number }>`
  ${({ size }) => {
    if (size <= 1279) {
      return css`
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          padding-right: 0;
        }
        padding: 0 5px;
      `;
    }
  }}

  ${({ size }) => {
    if (size <= 857) {
      return css`
        margin-top: 30px;
      `;
    }
  }}

  max-width: 400px;
  width: 100%;
`;

export const WapperContent = styled.div<{ size?: number }>`
  display: flex;
  justify-content: space-between;

  margin: 24px 0;

  ${({ size }) => {
    if (size <= 857) {
      return css`
        flex-wrap: wrap;
      `;
    }
  }}
`;

export const Item = styled.li<{ length: number; size?: number }>`
  position: relative;

  background: ${({ theme }) => theme.colors.greyLight};

  padding: 32px;
  border-radius: 16px;

  margin: 20px 0;
  color: ${({ theme }) => theme.colors.font};
`;

export const ItemProcessBar = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;

  :last-child {
    flex: unset;

    .gate {
      left: -32px;
    }
  }
`;

export const ProgressBar = styled.ul`
  display: flex;
  width: 100%;
  margin-top: 50px;
  padding: 1rem 16px;

  justify-content: space-between;
`;

export const Gate = styled.div`
  margin: auto 0;
  position: absolute;
  left: -16px;
`;

export const GateTitle = styled.div`
  margin: auto 0;
  position: absolute;
  bottom: 35px;
  left: -40px;
  text-align: center;
  width: 110px;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const FirstGateTitle = styled.div`
  margin: auto 0;
  position: absolute;
  bottom: 35px;
  text-align: left;
  width: 110px;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const LastGateTitle = styled.div`
  margin: auto 0;
  position: absolute;
  bottom: 35px;
  left: -80px;
  text-align: right;
  width: 110px;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const CircleGate = styled.div<{ status?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ status }) =>
    status
      ? css`
          background: ${({ theme }) => theme.colors.greenLive};
        `
      : css`
          background: ${({ theme }) => theme.colors.background};
          border: 2px solid ${({ theme }) => theme.colors.borders};
        `}
`;

export const Line = styled.div<StepItemProps>`
  flex: 1;
  background: ${({ theme, completed }) =>
    completed ? theme.colors.primary[styleSlug] : theme.colors.grey};

  height: 12px;

  margin: 0 2px;
`;

export const ButtonsContainer = styled.div`
  margin-left: 36px;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 1rem;
`;

export const ButtonView = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 0;
  outline: none;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.secondaryLight2};
`;

export const DraftTag = styled.span`
  margin-left: 36px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;

  width: 115px;
  height: 30px;

  background: #df0075;
  border-radius: 20px;

  p {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;

    color: #ffffff;
  }
`;

export const PublishedTag = styled.span`
  margin-left: 36px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;

  width: 115px;
  height: 30px;

  background: #8b095f;
  border-radius: 20px;

  p {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;

    color: #ffffff;
  }
`;

export const PausedTag = styled.span`
  margin-left: 25px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 24px;
  gap: 8px;

  width: 145px;
  height: 52px;

  background: rgba(45, 55, 72, 0.6);
  border-radius: 12px;

  p {
    width: 69px;
    height: 24px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #ffffff;
  }
`;

export const LinksTooltip = styled.div.attrs<{ top?: number; left?: number }>(
  props => ({
    top: props.top ?? 0,
    left: props.left ?? 0
  })
)`
  visibility: hidden;
  margin-left: 17px;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 11111991;
  color: rgba(253, 253, 253, 1);
  background: rgba(109, 109, 109, 1);
  text-align: left;
  font-size: 0.9rem;
  top: ${props => props.top + 10}px;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
  left: ${props => props.left + 160}px;
`;

export const LinksWrapper = styled.div`
  max-width: 100px;
  border-radius: 4px;
  &:hover ${LinksTooltip} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;
