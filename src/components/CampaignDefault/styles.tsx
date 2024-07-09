import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface ContainerProp {
  $img?: string;
  description?: boolean;
  size?: number;
  imgFilter?: boolean;
}

export const Container = styled.div<ContainerProp>`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 1rem;
  &:hover {
    transition: 0.4s ease;
    background: ${({ theme }) => theme.colors.grey_hover};
  }
`;

export const CampaingImage = styled.div<ContainerProp>`
  position: relative;
  width: 100%;
  height: 248px;
  margin-bottom: 0;
  &::before {
    filter: ${({ imgFilter }) => (imgFilter ? 'grayscale(100%)' : 'none')};
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ $img }) => $img});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight[styleSlug]} 20.87%,
      ${theme.colors.primary[styleSlug]} 52.62%,
      ${theme.colors.primaryLight[styleSlug]} 83.37%
    );`};
`;

export const ButtonLink = styled.button`
  position: absolute;
  top: 43%;
  left: 50%;
  border: 0;
  background: ${({ theme }) => theme.colors.primaryLight[styleSlug]};
  color: #fff;
  display: flex;
  width: 160px;
  font-weight: 600;
  font-size: 1rem;
  height: 56px;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-radius: 12px;
  transition: ease-in-out 0.6s;
  cursor: pointer;
  transform: translateX(-50%);
  &:hover {
    background: ${({ theme }) => theme.colors.primary[styleSlug]};
  }
`;

export const ButtonLinkDisabled = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  border: 0;
  background: ${({ theme }) => theme.colors.buttonDisabled};
  opacity: 100%;
  color: #fff;
  display: flex;
  width: 120px;
  font-weight: 600;
  font-size: 1rem;
  height: 56px;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-radius: 12px;
  transform: translateX(-50%);
  filter: none !important;
`;

export const CampaingText = styled.div<ContainerProp>`
  padding: 20px 29px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.font};
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.blue};
  }
  h2 {
    font-weight: bold;
    line-height: ${({ description }) => (description ? `21px` : `30px`)};
    font-size: ${({ description }) => (description ? `19px` : ` 24px`)};
    margin-top: ${({ description }) => (description ? `5px` : ` 0px`)};
  }
  ${({ size }) => {
    if (size <= 1100) {
      return css`
        h2 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `;
    }
  }}
  @media screen and (max-width: 1090px) {
    h2 {
      line-height: ${({ description }) => (description ? `24px` : `24px`)};
      font-size: 18px;
    }
  }
  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.fontLight};
    font-size: 14px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  ${({ size }) => {
    if (size <= 1100) {
      return css`
        p {
          -webkit-line-clamp: 2;
          line-clamp: 2;
        }
      `;
    }
  }}
`;

export const Tag = styled.div`
  background-color: rgba(82, 85, 86, 0.15);
  width: 210px;
  padding: 4px;
  font-size: 14px;
  border-radius: 4px;
  text-align: center;
  margin-top: 6px;
`;
