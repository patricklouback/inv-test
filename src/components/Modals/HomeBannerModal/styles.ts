import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

interface IBotMidIcon {
  backgroundImage: string;
}

interface IBotMidBoxNoTrialTop {
  backgroundColor: string;
}

interface IBoxesList {
  index: number;
}

export const FadeLine = styled.div`
  width: 100%;
  height: 3px;

  background: ${({ theme }) => theme.colors.grey_hover};
`;

export const TitleAndSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 50px;
  margin-bottom: 8px;
`;

export const Title = styled.h1``;

export const Subtitle = styled.div``;

export const MiddleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  height: 67%;
  gap: 20px;
`;

export const MiddleContentNoTrial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  gap: 20px;
`;

export const TopMidContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  width: 95%;
  height: 33%;
  padding: 2% 3%;
`;

export const TopMidTitle = styled.h4``;

export const TopMidPhrases = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const PhrasesContainer = styled.div`
  flex: 1;
  height: 90%;
`;

export const RowBoxesContainer = styled.div`
  flex: 1;
  height: 100%;
`;

export const PhrasesList = styled.ul`
  display: flex;
  height: 100%;
`;

export const BoxesList = styled.div<IBoxesList>`
  display: flex;
  gap: 20px;
  height: 100%;
  margin-top: ${({ index }) => (index === 0 ? '20px' : '0px')};
  margin-bottom: ${({ index }) => (index === 1 ? '20px' : '0px')};
  margin-left: 20px;
  margin-right: 20px;
`;

export const PhraseItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  gap: 10px;
`;

export const BotMidContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 57%;
  width: 95%;
`;

export const BotMidTitle = styled.h3``;

export const BotMidBoxes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90%;
  margin-top: 8px;
`;

export const BotMidBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 3px solid ${({ theme }) => theme.colors.grey_hover};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  width: 33%;
  height: 100%;
  margin-top: 10px;
  padding-bottom: 20px;
`;

export const BotMidBoxNoTrial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const BotMidBoxNoTrialTop = styled.div<IBotMidBoxNoTrialTop>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 50%;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 3% 0%;
  gap: 10px;
`;

export const BotMidBoxNoTrialBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  height: 50%;
  width: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const BotMidBoxIcon = styled.div<IBotMidIcon>`
  height: 100%;
  width: 50%;
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(/images/banners/${backgroundImage})` : 'none'};
  background-size: 100% 100%;
  background-position: 'center';
  background-repeat: 'no-repeat';
`;

export const BotMidBoxIconNoTrial = styled.div<IBotMidIcon>`
  height: 55%;
  width: 20%;
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(/images/banners/${backgroundImage})` : 'none'};
  background-size: 100% 100%;
  background-position: 'center';
  background-repeat: 'no-repeat';
`;

export const BotMidBoxTitle = styled.div`
  font-weight: 600;
`;

export const BotMidBoxSubtitle = styled.div`
  width: 97%;
  text-align: center;
  font-size: 14px;
`;

export const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 15%;
  padding-right: 5%;
`;

export const BottomContentNoTrial = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3%;
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 250px;
  height: 60px;
  font-weight: 500;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
  color: ${({ theme }) => theme.colors.fontWhite};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primaryLight[styleSlug]};
  }
`;

export const BotLines = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3%;
  padding-left: 3%;
  gap: 15px;
`;

export const BotLine = styled.div`
  span {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary[styleSlug]};
    margin-left: 5px;
  }

  &:hover {
    cursor: pointer;
  }
`;
