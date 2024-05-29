import styled, { css } from 'styled-components';

export interface ItemProps {
    hasIcon: boolean;
}

export const Item = styled.li<ItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.greyLight};
  width: 100%;
  margin-right: 10px;

  &:last-child {
    margin-left: 10px;
    margin-right: 0;
  }

  height: 178px;
  position: relative;
  border-radius: 8px;

  ${({ hasIcon }) =>
    hasIcon &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(141, 172, 224, 0.4);
        width: 2px;
        height: 60%;
      }
    `}

  div {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 549px) {
    &:last-child {
      margin-left: 0;
      margin-right: 0;
      margin-top: 25px;
    }
  }
`;

export const Value = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  h3 {
    font-size: 70px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue};
  }

  span {
    max-width: 98%;
    line-height: 24px;
    font-weight: 500;
  }
`;