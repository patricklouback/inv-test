import styled from 'styled-components';

interface LinkedIdeaCardProps {
  isOpen: boolean;
  hasBorder: boolean;
}

export const Gap = styled.div<LinkedIdeaCardProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  height: 5px;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border-left-width: ${({ hasBorder }) => (hasBorder ? '5px' : '0')};
  border-left-style: ${({ hasBorder }) => (hasBorder ? 'solid' : '')};
  border-left-color: ${({ theme }) => theme.colors.greenHipeLight};
`;

export const LinkedIdeaCard = styled.div<LinkedIdeaCardProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  margin-top: 0;
  padding: 10px;
  min-height: 70px;
  background-color: ${({ theme }) => theme.colors.background};
  border-left-width: ${({ hasBorder }) => (hasBorder ? '5px' : '0')};
  border-left-style: ${({ hasBorder }) => (hasBorder ? 'solid' : '')};
  border-left-color: ${({ theme }) => theme.colors.greenHipeLight};
  cursor: pointer;
`;

export const ContentParticipants = styled.div`
  max-width: 200px;
`;

export const ListParticipants = styled.ul`
  list-style: none;

  transform: translateX(-4px);
`;

export const ItemParticipants = styled.li`
  margin: 5px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
