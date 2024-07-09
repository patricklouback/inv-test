import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

interface ItemStepProps {
  $active?: boolean;
}

export const Relative = styled.div`
  position: relative;
  width: 192px;
  height: 90px;
`;

export const Container = styled.div<{ $active?: boolean }>`
  position: relative;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.terceary[styleSlug] : theme.colors.background};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.font : theme.colors.font};
  width: 158px;
  height: 96px;
  flex: 1;

  border-radius: 16px;
  box-shadow: -3px 4px 4px rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 32px;
  z-index: 10;
`;

export const Draft = styled.div<{ $active?: boolean }>`
  position: absolute;
  width: 76px;
  height: 76px;
  right: 10px;
  top: 10px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.terceary[styleSlug] : theme.colors.background};

  box-shadow: 2px 0px 3px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  z-index: 8;

  transform: rotateZ(45deg);
`;

const WrapperItemStepModifier = {
  true: () => css`
    color: ${({ theme }) => theme.colors.fontWhite};
  `,
  false: () => css`
    color: ${({ theme }) => theme.colors.font};
  `,
};

export const ItemStep = styled.span<ItemStepProps>`
  ${({ $active }) => css`
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    ${WrapperItemStepModifier[$active.toString()]}
    line-height: 20px;
    letter-spacing: 0.4px;
    z-index: 9999;
  `};
`;

export const Row = styled.div<{ $background: string; $active: boolean }>`
  position: absolute;
  bottom: -10px;

  background: ${({ theme, $active }) =>
    $active ? theme.colors.primaryLight[styleSlug] : theme.colors.font};
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s ease;
  transform: ${({ $active }) => !$active && `rotateZ(180deg)`};
`;
