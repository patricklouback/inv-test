import styled from 'styled-components';

interface ContainerProp {
  img: string;
}

export const ContainerCampaingRank = styled.button`
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  background: ${({ theme }) => theme.colors.background};
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

export const ContentCampaingRankDownPosition = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  width: 38px;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 1px 0 7px #2c2c2cca;
  margin-right: 10px;
`;

export const CampaingTopImage = styled.div<ContainerProp>`
  position: relative;
  width: 100%;
  height: 100px;
  background-image: url(${({ img }) => `${img}`});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryLight};
`;

export const ContentCampaingRankText = styled.div`
  padding: 12px 10px;
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.blue};
  }

  h2 {
    margin-top: 2px;
    font-weight: bold;
    line-height: 19px;
    font-size: 14px;
  }

  @media screen and (max-width: 1048px) {
    min-height: 100px;
  }
`;

export const ContentCampaingRank = styled.div`
  max-width: 184px;
  width: 100%;
  height: calc(111px + 100px);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.greyLight};

  border-radius: 8px;
  margin-bottom: 1rem;

  @media screen and (max-width: 1048px) {
    max-width: 260px;
    height: auto;
  }
`;

export const ContentCampaingRankImage = styled.div<ContainerProp>`
  position: relative;
  width: 100%;
  height: 100px;
  background-image: url(${({ img }) => `${img}`});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryLight};

  @media screen and (max-width: 1048px) {
    height: 140px;
  }
`;

export const ContentCampaingRankDownQnt = styled.span`
  width: 32px;
  height: 22px;
  left: 46px;
  top: 8px;
  color: ${({ theme }) => theme.colors.primary};
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
