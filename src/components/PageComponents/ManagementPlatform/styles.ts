import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

interface StyledComponentProps {
  $isOpen: boolean;
}

export const C = styled.div`
  margin: 60px 0;
  width: 100%;
`;

export const SectionBanner = styled.div<StyledComponentProps>`
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-between;
  height: 135px;
  width: 100%;
`;

export const TopBannerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
  width: 77%;
  height: 100%;
`;

export const TopAllContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-left: 2%;
  padding-right: 2%;
`;

export const BottomAllContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80%;
  padding-left: 2%;
  padding-right: 2%;
  border: 2px solid ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 16px;
`;

export const BottomBannerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
`;

export const BannerTitle = styled.div`
  font-weight: 600;
`;

export const BannerSubtitle = styled.div`
  width: 95%;
`;

export const CloseButtonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 37px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
  color: ${({ theme }) => theme.colors.fontWhite};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primaryLight[styleSlug]};
  }
`;

export const BottomActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 37px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.terceary[styleSlug]};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.tercearyHover};
  }
  color: ${({theme}) => theme.colors.fontWhite};
`;

export const ListAndContentContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  max-width: 1440px;
  width: 100%;
  overflow: auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const SectionItem = styled.div<{ sectionActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 5px;
  padding: 10px;
  font-weight: 500;
  color: ${({ theme, sectionActive }) =>
    sectionActive ? theme.colors.primaryLight[styleSlug] : theme.colors.font};
  background-color: ${({ theme, sectionActive }) =>
    sectionActive ? theme.colors.primaryShadow : theme.colors.background};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaryLight[styleSlug]};
    background-color: ${({ theme }) => theme.colors.primaryShadow};
  }
`;

export const SectionsList = styled.div`
  display: flex;
  padding: 20px 10px;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 16px;
  height: 140px;
  min-width: 250px;
  gap: 10px;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
`;
