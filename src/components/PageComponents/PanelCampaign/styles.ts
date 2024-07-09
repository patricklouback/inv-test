import styled from 'styled-components';

interface StyledComponentProps {
  $isOpen: boolean;
}

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  padding-top: 10px;
`;

export const SectionBanner = styled.div<StyledComponentProps>`
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  height: 112px;
`;

export const BannerWrapperContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;
  align-items: center;
  height: 100%;
  max-width: 95%;
`;

export const BannerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
  width: 75%;
  height: 100%;
  padding-left: 2%;
`;

export const BannerTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.fontWhite};

  @media (max-width: 580px) {
    font-size: 0.6rem;
  }
`;

export const BannerSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.fontWhite};
  @media (max-width: 580px) {
    font-size: 0.5rem;
  }
`;

export const Separator = styled.div`
  width: 2px;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.fontWhite};
  margin: 0 10px; /* Ajuste a margem conforme necessário */
  border-radius: 10px;
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 37px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.grey_hover};
  }

  @media (max-width: 580px) {
    font-size: 0.7rem;
  }
`;

export const CloseButtonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const ContentPage = styled.div`
  display: flex;
  max-width: 100%;
  /* padding: 1rem; */
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

export const ContainerRender = styled.div`
  width: 75%;

  @media (max-width: 980px) {
    width: 100%;
    padding: 1rem;
  }
`;

export const NoCampaignSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px;

  img {
    width: 300px;
    height: 300px;
  }

  .title {
    color: ${({ theme }) => theme.colors.fontDarkGrey};
    text-align: center;
    font-family: 'Montserrat';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    margin-bottom: 20px;
  }

  .subtitle {
    text-align: center;
    font-family: 'Montserrat';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2rem;
  }
`;
