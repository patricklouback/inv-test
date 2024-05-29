import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 3rem;
  border-bottom: 3px solid rgba(141, 172, 224, 0.4);

  @media screen and (max-width: 600px) {
    min-width: auto;
  }
`;

export const ContainerList = styled.div`
  min-height: 355px;
`;

export const BoxButton = styled.div`
  max-width: 264px;
`;

export const ContentLeft = styled.div`
  flex: 1;
  width: 100%;
`;

export const ListCampaing = styled.ul<{ align: boolean }>`
  padding-top: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;

  @media screen and (min-width: 0) {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  @media screen and (min-width: 420px) {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }

  @media screen and (min-width: 620px) {
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
  }
`;

interface ContainerProp {
  img: string;
}

export const ContainerCampaingRank = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  :hover .hover {
    transition: 0.4s ease;
    background: #dfdfdf;
  }
`;

export const ContentCampaingRankDown = styled.div`
  overflow: hidden;
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;

  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 8px;

  @media screen and (max-width: 510px) {
    justify-content: flex-start
  }
`;

export const ContentCampaingRankIdeias = styled.span`
  font-size: 12px;
  @media screen and (max-width: 510px) {
    margin-left: 8px;
  }
`;

export const ContentCampaingRankDownPosition = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  width: 38px;
  height: 38px;
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

  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBlue};
`;

export const ContentCampaingRankText = styled.div`
  padding: 12px 10px;
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.blue};
  }

  h2 {
    margin-top: 2px;
    font-weight: 700;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.font};
    font-size: 14px;
  }

  @media screen and (max-width: 1048px) {
    min-height: 100px;
  }
`;

export const ContentCampaingRank = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.greyLight};

  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const ContentCampaingRankImage = styled.div<ContainerProp>`
  position: relative;
  width: 100%;
  height: 100px;
  background-image: url(${({ img }) => `${img}`});
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
  align-items: center;
`;

export const ContainerEmpity = styled.div`
  height: 355px;
  max-width: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.greyLight};

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;
