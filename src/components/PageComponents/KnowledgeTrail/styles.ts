import styled from 'styled-components';

interface StyledComponentProps {
  $isOpen: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 40px 0;
`;

export const ContentPage = styled.div`
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  margin-top: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .ittem {
    min-width: 240px;
    width: 100%;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const DefaultSection = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  gap: 20px;
  width: 1273px;
  margin-left: -27px;
  height: 60px;
  border-radius: 16px;
  padding: 18px;
  background-color: #F6F6F8;
`;

export const SectionBanner = styled.div<StyledComponentProps>`
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  height: 104px;
`;
export const AllContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-left: 14%;
  padding-right: 7%;
`;

export const BannerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
  width: 75%;
  height: 100%;
  padding-left: 5%;
`;

export const BannerTitle = styled.div`
  font-weight: 600;
`;

export const BannerSubtitle = styled.div``;

export const CloseButtonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
