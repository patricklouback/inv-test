import styled, { keyframes } from 'styled-components';

export const Container = styled.div<{
  status?: string;
  open: boolean;
  linkIsOpen: boolean;
}>`
  min-height: ${({ open }) => (open ? '266px' : 'calc(116px + 27px)')};
  width: 100%;
  min-width: 260px;
  margin: ${({ linkIsOpen }) => (linkIsOpen ? '0' : '8px 0')};
  transition: 0.2s ease;

  user-select: none;
  cursor: pointer;

  :first-child {
    margin-top: 0;
  }

  padding: 18px 16px 27px;
  position: relative;

  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ::before {
    content: '';
    background: ${({ status }) => status};
    height: 24px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  ::after {
    content: '';
    background: ${({ status }) => status};
    height: 7px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media screen and (max-width: 980px) {
    min-width: 260px;
    min-height: 9rem;
    width: 100%;

    margin: 0 8px;
  }

  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 load;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  max-width: 90%;
`;

export const ListTag = styled.ul`
  display: flex;
  gap: 42px;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
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

  :nth-child(2) {
    margin-left: 14px;
  }
`;

export const View = styled.div<{ type?: boolean }>`
  min-width: 32px;
  margin-left: 5px;
  height: 28px;
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 4px;

  transform: translate(10px, -3px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Collapse = styled.div<{ open: boolean }>`
  width: 100%;
  height: 24px;
  position: absolute;
  bottom: 0;
  left: 0;

  transition: ease 0.2s;

  cursor: pointer;
  :hover {
    background: #0000008b;

    svg {
      color: #fff;
    }
  }

  svg {
    transition: ease 1.4s;
    transform: ${({ open }) => (open ? 'rotateZ(180deg)' : 'rotateZ(0deg)')};
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

const frameDescription = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Description = styled.p<{ open: boolean }>`
  display: ${({ open }) => !open && 'none'};
  margin-top: 12px;
  margin-bottom: 8px;
  animation: ${frameDescription} ease forwards 1s;
`;

export const Content = styled.div`
  min-height: 110px;
  max-width: 245px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const KanbanColors = {
  WAITING: '#315594',
  IN_REVIEW: '#8B095F',
  EXTERNAL_REVIEW: '#F99335',
  APPROVED: '#67D1C4',
  PAUSED: 'rgba(45, 55, 72, 0.6)',
};

export const KanbanStatus = styled.div<{ type: string }>`
  display: flex;
  color: ${({ type }) => KanbanColors[type]};
  border-color: ${({ type }) => KanbanColors[type]};
  border: 1px solid;
  padding-left: 0.5rem;
  padding-right: 0.8rem;
  height: 20px;
  width: fit-content;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const KanbanStatusText = styled.span`
  /* color: #fff; */
  font-size: 12px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* margin-bottom: 20px; */
`;

export const ProgressBarWithCircle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

interface DefaultParams {
  checked: boolean;
}

export const Step = styled.div<DefaultParams>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4px;
  background-color: ${({ checked, theme }) =>
    checked ? theme.colors.primary : '#E7E7E7'};
`;

export const CircleCheck = styled.span<DefaultParams>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => (checked ? '#4CAF50' : '#E7E7E7')};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ checked }) => (checked ? '#4CAF50' : '#FFFF')};
  ::after {
    content: '';
    width: 2px;
    height: 5px;
    margin-left: 4px;
    margin-right: 4px;
    border-right: 2px solid #ffff;
    border-bottom: 2px solid #ffff;
    transform: rotate(45deg);
  }
`;
export const IdeaAppId = styled.div`
  margin-top: 10px;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.fontGrey};
`;

export const OptionsButton = styled.button`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.background};
  border: none;

  :hover {
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
    border-radius: 2px;
  }
`;

export const OptionsAvailable = styled.div.attrs<
  {
    top: number;
  },
  {
    top: number;
  }
>(props => {
  return {
    top: props.top,
  };
})`
  position: fixed;
  z-index: 99;
  width: 134px;
  top: ${props => props.top + 27}px;
`;

export const OptionItem = styled.button`
  display: flex;
  width: 134px;
  height: 32px;
  padding: 11px 13px 10px 13px;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  box-shadow: 2px 4px 5px 0px rgba(0, 0, 0, 0.1);
  border: 2px solid ${({ theme }) => theme.colors.backgroundGrey};
  background-color: ${({ theme }) => theme.colors.background};
  :hover {
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
  }
  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 0.5s ease-out 0s 1 load;
`;

export const AllOptionsWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
`;

export const OptionsWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const OptionAndSubOptionWrapper = styled.div`
  display: flex;
`;

export const SelectedTags = styled.div`
  display: flex;
  max-width: 245px;
`;

export const VisibleTagsWrapper = styled.div`
  flex-basis: 85%;
  max-width: 215px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

export const TagName = styled.div<{ backgroundColor: string; color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 4px;
  padding-left: 6px;
  padding-right: 6px;
  padding-bottom: 1px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: bold;
  font-size: 12px;
  height: 20px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 load;
`;

export const Circle = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #f2f2f2;
  color: #525556;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SeeMoreComponent = styled.div`
  flex-basis: 15%;
  width: 24px;
  height: 24px;
  margin-top: 8px;
  padding-left: 10px;
`;

export const Dot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 41px;
  padding-bottom: 5.3px;
`;

export const LinksTooltip = styled.div.attrs<
  { top: number; left: number },
  { top: number; left: number }
>(props => {
  return { top: props.top || 0, left: props.left || 0 };
})`
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
  top: ${props => props.top + 120}px;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
  left: ${props => props.left + 25}px;
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

export const Separator = styled.div<{ height?: string }>`
  width: 100%;
  height: ${({ height }) => height || '1px'};
  background-color: #e7e7e7;
  margin-top: 12px;
  margin-bottom: 12px;
`;
