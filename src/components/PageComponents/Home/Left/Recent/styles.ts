import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

interface ContainerProp {
  $img: string;
}

export const Container = styled.div`
  padding: 50px 0;
  border-bottom: 3px solid rgba(141, 172, 224, 0.4);
`;

export const BoxButton = styled.div`
  max-width: 264px;
`;

export const ContentLeft = styled.div`
  flex: 1;
  width: 100%;
`;

export const ListRecentCampaign = styled.ul`
  margin-top: 6px;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  justify-items: center;
  margin-bottom: 2rem;

  @media screen and (min-width: 0) {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 510px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 620px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const RecentCampaignCard = styled.li`
  width: 100%;
  max-height: 290px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.colors.greyLight};
  cursor: pointer;
  &:hover .hover {
    transition: 0.4s ease;
    background: #dfdfdf;
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
`;

export const CampaignCardImg = styled.div<ContainerProp>`
  position: relative;
  width: 100%;
  height: 120px;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  background-image: url(${({ $img }) => $img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBlue};
`;

export const Iteem = styled.li`
  max-width: 184px;
  width: 100%;
  @media screen and (max-width: 1048px) {
    max-width: 260px;
    height: auto;
  }
`;

export const CardButton = styled.button`
  width: 100%;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.colors.greyLight};
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`;

export const ContainerCampaingRank = styled.button`
  width: 100%;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.colors.greyLight};

  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`;

export const ContentCampaingRankDown = styled.div`
  overflow: hidden;
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 8px;
`;

export const ContentCampaingRankIdeias = styled.span`
  font-size: 12px;
`;

export const ContentCampaingRankText = styled.div`
  padding: 12px 10px;
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.blue};
  }

  p {
    font-size: 0.8rem;
  }

  h2 {
    margin-top: 2px;
    font-weight: 700;
    line-height: 19px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.font};
    margin-bottom: 0.2rem;
  }

  @media screen and (max-width: 1048px) {
    min-height: 100px;
  }
`;

export const ContentCampaingRank = styled.div`
  width: 100%;
  height: calc(111px + 100px);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.greyLight};

  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const ContentCampaingRankImage = styled.div<ContainerProp>`
  position: relative;
  width: 100%;
  height: 100px;
  background-image: url(${({ $img }) => $img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBlue};

  @media screen and (max-width: 1048px) {
    height: 140px;
  }
`;

export const ContentCampaingRankDownQnt = styled.span`
  width: 32px;
  height: 22px;
  left: 46px;
  top: 8px;
  color: ${({ theme }) => theme.colors.primary[styleSlug]};
  background: #ffffff;
  border-radius: 6px;

  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
