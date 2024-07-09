import styled from 'styled-components';

interface StyledComponentProps {
  $isOpen: boolean;
}

export const WapperDataInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const WapperImage = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // max-width: 16rem;
  max-width: 100%;

  img {
    border-radius: 8px;

    object-fit: contain;
  }

  @media (min-width: 900px) {
    margin-top: unset;
    justify-content: flex-start;
  }
`;

export const InputSendImg = styled.input``;

export const ButtonEdit = styled.button`
  width: 100%;
  border: 0;
  background: ${({ theme }) => theme.colors.grey};
  padding: 0.5rem 2rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  gap: 0.5rem;

  @media (min-width: 900px) {
    padding: 0.5rem 1rem;
    white-space: nowrap;
  }
`;

export const WapperEditImage = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

export const WapperActionsButtonImage = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
`;

export const ButtonActionImage = styled.button`
  background: ${({ theme }) => theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.grey_hover};
  border-radius: 8px;
  padding: 4px 8px;
  transition: 0.2s;
  font-size: small;
  &:hover {
    background: ${({ theme }) => theme.colors.grey_hover};
  }
`;

export const WapperDataInformation = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1rem;

  @media (min-width: 900px) {
    margin-left: 2.5rem;
  }
`;

export const ButtonEditData = styled.button`
  background-color: transparent;
  border: 0;
  padding: 1rem 2rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  font-size: 1rem;
  gap: 0.5rem;

  @media (min-width: 900px) {
    max-width: 200px;
  }
`;

export const Name = styled.h3`
  margin: 0 auto;
  font-size: 2rem;

  @media (min-width: 900px) {
    margin: 0 0 2rem;
  }
`;

export const WapperOutherInformations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ItemOutherInformations = styled.span`
  font-size: 1.3rem;
  width: 100%;
`;

export const Exit = styled.div``;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 14rem);
  grid-gap: 1rem;
  grid-auto-rows: 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const UserImage = styled.div<{ $img?: string }>`
  height: 300px;
  width: 300px;
  background-image: url(${({ $img }) => $img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const SectionBanner = styled.div<StyledComponentProps>`
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  width: 98%;
  height: 60px;
`;
export const AllContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-left: 2%;
  padding-right: 2%;
`;

export const BannerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 100%;
`;

export const BannerTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.fontWhite};
`;

export const KnowPlans = styled.span`
  margin-left: 8px;
  font-weight: 300;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.fontWhite};
  &:hover {
    cursor: pointer;
    font-weight: 500;
  }
`;

export const BannerSubtitle = styled.div``;

export const CloseButtonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
