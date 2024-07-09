import styled from "styled-components";


interface StyledComponentProps {
  $isOpen: boolean;
}


export const BackButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  cursor: pointer;
  max-width: 80px;

  span {
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 28px 12px 24px;
  gap: 12px;

  max-width: 1224px;
  height: 60px;

  background: #f6f6f8;
  border-radius: 16px;

  margin-bottom: 16px;
  margin-top: 7px;
`;


export const Leftside = styled.div`
  display: flex;
  gap: 12px;
`;


export const LeftsideIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 6px;
  background-color: white;

  /* gap: 7.5px; */

  width: 36px;
  height: 36px;

  background: #ffffff;
  border-radius: 6px;
`;


export const LeftsideTitle = styled.h2`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #2d3748;
  `;

export const SectionBanner = styled.div<StyledComponentProps>`
display: ${props => (props.$isOpen ? 'flex' : 'none')};
align-items: center;
height: 120px;
`;

export const BannerContentWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: start;
justify-content: center;
gap: 8px;
width: 100%;
height: 100%;
padding-left: 3%;
`;

export const BannerWrapperContainer = styled.div`
display: flex;
flex-direction: row;
gap: 2%;
align-items: center;
height: 100%;
max-width: 95%;
`;

export const BannerTitle = styled.div`
  font-weight: 600;
`;

export const BannerSubtitle = styled.div``;

export const Separator = styled.div`
  width: 2px;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.font};
  margin: 0 10px; /* Ajuste a margem conforme necessário */
  border-radius: 10px;
`;

export const GoToLink = styled.span`
  font-weight: 500;
  text-decoration: underline;
  min-width: 110px;
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`;