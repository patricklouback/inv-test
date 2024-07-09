/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface DefaultParams {
  type?: 'normal' | 'full' | 'filter';
  $small?: boolean;
  borderBottom?: boolean;
}

export const Container = styled.section<DefaultParams>`
  width: 100%;
  /* overflow: hidden; */
  border-radius: ${({ borderBottom }) =>
    borderBottom ? '16px 16px 0 0' : '16px'};

  ${({ type }) =>
    type === 'full' &&
    css`
      padding: 1px 30px;
      background: ${({ theme }) => theme.colors.greyLight};
    `}
`;

export const HeaderIcon = styled.div`
  border: 0;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px -3px #00000061;
`;

export const HeaderSectionDefault = styled.div<DefaultParams>`
  padding: ${({ $small, type }) => {
    if (!$small) {
      if (type === 'normal') {
        return '12px 24px';
      }

      if (type === 'filter') {
        return '10px 18px';
      }
    }
    if (type === 'filter') {
      return '10px 18px';
    }
    if (type === 'normal') {
      return '10px 18px';
    }

    return '0';
  }};
  width: 100%;
  height: ${({ type, $small }) =>
    !$small ? (type === 'filter' ? '52px' : '62px') : '54px'};
  border-radius: ${({ type }) =>
    type === 'filter' ? '16px 16px 0 0' : '16px'};
  background: ${({ theme }) => theme.colors.greyLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ type }) => (type === 'filter' ? '0' : '10px')};

  div {
    display: flex;
    align-items: center;

    h2 {
      font-size: ${({ $small }) => ($small ? `16px` : `22px`)};
      font-weight: bold;
      margin-left: ${({ $small }) => ($small ? `16px` : `20px`)};
      letter-spacing: 0.4px;
    }

    @media screen and (max-width: 1114px) {
      h2 {
        font-size: ${({ $small }) => ($small ? `15px` : `19px`)};
      }
    }
  }

  ${({ type }) =>
    type === 'filter' &&
    css`
      h2 {
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.4px;
      }
    `}
`;

export const ContentPage = styled.div<DefaultParams>``;

export const Content = styled.a`
  display: flex;
  align-items: center;
  padding: 1rem 0 0.5rem;
  cursor: pointer;
  max-width: 80px;

  span {
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
  }
`;

export const Relative = styled.div<DefaultParams>`
  position: relative;

  ${({ borderBottom, theme }) =>
    borderBottom &&
    css`
      border-bottom: 10px solid ${theme.colors.terceary[styleSlug]};
      border-radius: 8px;
    `}

  ${({ type, theme }) =>
    type === 'filter' &&
    css`
      &::after {
        position: absolute;
        content: '';
        bottom: -10px;
        width: 100%;
        height: 10px;
        left: 0;
        background: ${theme.colors.grey};
        border-radius: 0 0 12px 12px;
      }
    `}
`;

export const ButtonCollapsed = styled.div`
  width: 32px;
  height: 24px;
  background: ${({ theme }) => theme.colors.font};
  border-radius: 6px;
  display: grid;
  place-items: center;
  cursor: pointer;

  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
`;

export const ReturnButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  max-width: 80px;

  background: none;
  border: none;
  padding: 0;

  margin-bottom: 0.5rem;

  span {
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
  }
`;
