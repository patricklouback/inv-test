import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const PopupContainer = styled.div`
  width: 100%;
  max-width: 680px;
  min-height: 350px;

  position: fixed;
  top: 20vh;
  left: 27vw;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;

  background-color: white;
  border-radius: 32px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const Content = styled.div`
  max-width: 624px;
`;

export const TitleContainer = styled.div`
  max-width: 513px;
  min-height: 24px;

  margin-bottom: 28px;
`;

export const Title = styled.h1`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 24px;

  color: #3c3c3c;
`;

export const Line = styled.hr`
  width: 100%;
  max-width: 624px;
  height: 0px;

  border: 1px solid #e7e7e7;
  margin-bottom: 32px;
`;

export const MessageContainer = styled.div`
  max-width: 624px;
  min-height: 64px;

  margin-bottom: 50px;
`;

export const Message = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;

  color: #3c3c3c;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 44px;
`;

export const CloseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;

  width: 100%;
  max-width: 290px;
  min-height: 56px;

  background: #ffffff;

  border: 2px solid ${({theme}) => theme.colors.primary[styleSlug]};
  border-radius: 12px;

  p {
    max-width: 72px;
    min-height: 20px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;

    color: ${({theme}) => theme.colors.primary[styleSlug]};
  }

  &:hover {
    background: ${({theme}) => theme.colors.primary[styleSlug]};
    border: 0;

    p {
      color: #fff;
    }
  }
`;

export const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  max-width: 290px;
  width: 100%;
  min-height: 58px;

  background: ${({theme}) => theme.colors.primary[styleSlug]};
  border-radius: 12px;
  border: 0;

  p {
    max-width: 179px;
    min-height: 48px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 48px;

    text-align: center;

    color: #ffffff;
  }

  &:hover {
    background: #ffffff;
    border: 1px solid ${({theme}) => theme.colors.primary[styleSlug]};

    p {
      color: ${({theme}) => theme.colors.primary[styleSlug]};
    }
  }
`;
