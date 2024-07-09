import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Containerr = styled.div`
  display: flex;
  width: 100%;
  background-color: #f6f6f8;
  border-radius: 16px;
`;

export const ContentPagee = styled.div`
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  background-color: #f6f6f8;
  width: 877px;
  height: 666x;
  /* margin-top: 1rem; */
  border-radius: 16px;

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

export const VideoContent = styled.div`
  /* width: 877px; */
  /* height: 666x; */
  margin-left: 24px;
  background-color: #f6f6f8;
`;

export const BaseBoardSide = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
`;

export const BaseBoard = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 14px;
`;

export const ShareIcon = styled.div`
  display: flex;
  margin-top: 48px;
  &:hover {
    cursor: pointer;
  }
`;

export const LikeButtonIcon = styled.div`
  width: 25px;
  height: 25px;
`;

export const NumberOfLikes = styled.div`
  margin-left: 6px;
  margin-top: 4px;
`;

export const Video = styled.div`
  margin-top: 35px;
`;

export const ButtonNext = styled.button`
  background: white;
  color: ${({theme}) => theme.colors.primary[styleSlug]};
  height: 56px;
  border-color: #b5b5b5;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-style: solid;
  width: 58px;
  margin-left: -10px;
  font-size: 16px;

  display: block;
  position: relative;
  &::before {
    content: '';
  }
  &::after {
    position: absolute;
    content: '';
    top: 76%;
    left: 42%;
    transform: scaleX(-1) rotate(225deg);
    width: 16px;
    height: 16px;
    border-top: 4px solid ${({theme}) => theme.colors.primary[styleSlug]};
    border-right: 4px solid ${({theme}) => theme.colors.primary[styleSlug]};
    transform-origin: left top;
  }
`;

export const ButtonPreview = styled.button`
  background: white;
  color: ${({theme}) => theme.colors.primary[styleSlug]};
  height: 56px;
  border-color: #b5b5b5;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-style: solid;
  width: 58px;
  // padding: 0 2rem;
  font-size: 16px;

  display: block;
  position: relative;
  &::before {
    content: '';
  }
  &::after {
    position: absolute;
    content: '';
    top: 25%;
    left: 59%;
    transform: scaleX(-1) rotate(45deg);
    width: 16px;
    height: 16px;
    border-top: 4px solid ${({theme}) => theme.colors.primary[styleSlug]};
    border-right: 4px solid ${({theme}) => theme.colors.primary[styleSlug]};
    transform-origin: left top;
  }
`;

export const ButtonDownload = styled.button`
  background: white;
  display: flex;
  color: ${({theme}) => theme.colors.primary[styleSlug]};
  height: 56px;
  border-color: #b5b5b5;
  border-radius: 10px;
  border-style: solid;
  width: 255px;
  // padding: 0 2rem;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonDownloadText = styled.div`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.01px;
`;

export const ButtonConcluded = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
`;

export const ShareAndLike = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const DefaultSection = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  gap: 20px;
  border-radius: 16px;
  padding: 18px;
  background-color: #F6F6F8;
  padding-top: 7px;
  margin-top: 23px;
  margin-left: 24px;
  height: 37px;
`;
