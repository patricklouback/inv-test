import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Container = styled.div`
  width: 100%;
  padding: 50px 0;
`;

export const ListNotifications = styled.ul`
  padding: 15px 0;
  padding-right: 4px;

  max-height: calc(100vh - 353px);
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
  }

  .campaigns-sekeleton {
    height: 76px;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blueBorders};

    &:first-child {
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }

    &:last-child {
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }
`;

export const Items = styled.button<{ read: boolean }>`
  height: 76px;
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 10px;
  align-items: center;
  background: ${props =>
    props.read
      ? ({ theme }) => theme.colors.greyLight
      : ({ theme }) => theme.colors.unreadNotification};
  padding: 0 38px;
  cursor: pointer;
  transition: 0.2s ease-out;

  border: 1px solid ${({ theme }) => theme.colors.blueBorders};

  &:hover {
    background: ${({ theme }) => theme.colors.fontLight};
  }

  &:first-child {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:hover a {
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const BadgeNotification = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.terceary[styleSlug]};
`;

export const ReadMessages = styled.button`
  background-color: transparent;
  border: 0;
  font-weight: 600;
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey};
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80%;
`;

export const Icon = styled.div`
  margin-right: 18px;
`;

export const Title = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: justify;
`;

export const DateContent = styled.span``;

export const InfoAndDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

  &:first-child {
    margin-left: 0px;
  }

  margin-left: -14px;
`;
