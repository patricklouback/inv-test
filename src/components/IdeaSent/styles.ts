import styled from 'styled-components';

interface ContainerProps {
  isAlternative?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  /* max-width: 536px; */
  margin-right: 20px;
  border-radius: 16px;
  padding: 24px;
  /* height: 330px; */
  margin: 16px 0;

  &:first-child {
    margin-top: 0;
  }

  background: ${({ theme, isAlternative }) =>
    isAlternative ? theme.colors.background : theme.colors.greyLight};

  @media screen and (max-width: 1048px) {
    max-width: 100%;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 13px;
`;

export const Title = styled.h2`
  font-size: 22px;
`;

export const BoxPosition = styled.div`
  min-width: 45px;
  display: flex;
  justify-content: flex-end;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    background: ${({ theme }) => theme.colors.borders};
    width: 2px;
    left: 0;
    height: 26px;
  }
`;

export const Position = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0.5px;
`;

export const Tag = styled.span<{ background?: string }>`
  background: ${({ theme, background }) =>
    !background ? theme.colors.greyLight : theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  width: 145px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  letter-spacing: 0.5px;
  border-radius: 8px;
`;

export const Text = styled.p`
  margin-bottom: 12px;
  line-height: 24px;
  height: 74px;
  color: ${({ theme }) => theme.colors.fontLight};
  font-weight: 500;
  letter-spacing: 0.1px;
  font-size: 16px;

  margin-top: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Box = styled.div`
  margin-bottom: 18px;
  display: flex;
  align-items: center;
`;

export const ListImagesUsers = styled.ul`
  display: flex;
  list-style: none;
  margin-right: 20px;
`;

export const ItemImageUser = styled.div<{ images_users: string }>`
  border-radius: 8px;
  overflow: hidden;
  background-image: url(${({ images_users }) => images_users});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-top: 5px;

  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.background};

  :first-child {
    margin-left: 0px;
  }

  margin-left: -14px;
`;

export const ValuesUsers = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.fontLight};
  line-height: 21px;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  gap: 2rem;
  @media screen and (max-width: 420px) {
    height: 90px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }

  @media screen and (min-width: 601px) {
    width: 89%;
    bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const BoxAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const LikeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45px;
`;

export const CampaingTitle = styled.div`
  display: inline-block;
  background: rgba(16, 80, 189, 0.05);
  width: auto;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  margin-right: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const CampaingStatusFinished = styled.div`
  display: inline-block;
  background: rgba(82, 85, 86, 0.15);
  width: auto;
  padding: 4px 8px 4px 8px;
  color: rgba(82, 85, 86, 1);
  border-radius: 4px;
`;

export const CampaingStatusActived = styled.div`
  display: inline-block;
  background: rgba(6, 218, 15, 0.05);
  width: auto;
  padding: 4px 8px 4px 8px;
  color: rgba(25, 150, 30, 1);
  border-radius: 4px;
  font-weight: 500;
`;
