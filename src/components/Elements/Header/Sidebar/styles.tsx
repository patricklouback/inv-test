import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div<{ $active: boolean }>`
  position: fixed;
  right: ${({ $active }) => ($active ? '0px' : '-100%')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};

  transition: 0.6s ease;
  top: 0;

  background: rgb(0, 0, 0);
  background: -moz-linear-gradient(
    50deg,
    rgba(0, 0, 0, 1) 19%,
    rgba(42, 0, 51, 1) 51%,
    rgba(86, 2, 119, 1) 82%,
    rgba(121, 0, 176, 1) 100%
  );
  background: -webkit-linear-gradient(
    50deg,
    rgba(0, 0, 0, 1) 19%,
    rgba(42, 0, 51, 1) 51%,
    rgba(86, 2, 119, 1) 82%,
    rgba(121, 0, 176, 1) 100%
  );
  background: linear-gradient(
    50deg,
    rgba(0, 0, 0, 1) 19%,
    rgba(42, 0, 51, 1) 51%,
    rgba(86, 2, 119, 1) 82%,
    rgba(121, 0, 176, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#7900b0",GradientType=1);
  z-index: 999999;
  height: 100%;

  max-width: 300px;
  width: 100%;

  h1 {
    color: ${({ theme }) => theme.colors.fontLight};
    text-align: center;
    font-size: 19px;
  }

  display: none;

  @media screen and (max-width: 740px) {
    display: block;
  }

  @media screen and (max-width: 530px) {
    max-width: 80%;
  }
`;

const collapseFrame = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const ListItems = styled.ul<{ $activeCollapse: boolean }>`
  list-style: none;
  width: 100%;
  height: 93%;

  padding: 50px 0 30px;

  transition: 0.3s ease;

  .collapse {
    transform: translateY(-30px);
    display: ${({ $activeCollapse }) => ($activeCollapse ? 'block' : 'none')};

    opacity: 0;
    animation: ${collapseFrame} 0.4s ease forwards;
  }

  .item-menu {
    position: relative;

    .icon {
      position: absolute;
      right: 0;
      top: 6px;

      transform: rotateZ(
        ${({ $activeCollapse }) => ($activeCollapse ? '180deg' : '0deg')}
      );
      transition: 0.5s ease;
    }
  }

  ${({ $activeCollapse }) =>
    $activeCollapse &&
    css`
      .item-collapse {
        margin-top 40px;
      }
      .item-menu {
        transition: 0.4s ease;
        transform: translateY(-13px);
      }

      .handle {
        &:nth-child(2) {
          display: none;
        }
        &:nth-child(4) {
          display: none;
        }
        &:nth-child(5) {
          display: none;
        }
      }
    `}
`;

export const SideItem = styled.li`
  margin-top: 40px;
  padding: 0 30px;

  display: flex;
  flex-direction: column;

  .ittem {
    display: flex;
    align-items: center;
  }

  &:first-child {
    margin-top: 4px;
  }

  span {
    &:first-child {
      font-size: 16px;
    }

    margin-left: 20px;
    font-size: 17px;
    color: ${({ theme }) => theme.colors.greyLight};
    font-weight: bold;
  }
`;

export const User = styled.div<{ $url: string }>`
  height: 70px;
  display: flex;
  align-items: center;

  #image {
    width: 70px;
    height: 70px;
    background-image: url(${({ $url }) => $url || ''});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    border-radius: 50%;
    position: relative;
    border: 2px solid #14df25df;
  }
`;

export const Name = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;

  margin-left: 12px;
  color: ${({ theme }) => theme.colors.background};
  letter-spacing: 0.2px;
`;

// COLLPASE

export const ListCollapse = styled.ul`
  padding-left: 25px;
  margin-top: 5px;
  list-style: none;
`;

export const ItemCollapse = styled.li`
  padding: 11px 8px;
  display: flex;

  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.3px;
`;

export const MenuSide = styled.div`
  display: none;
  width: 50%;
  z-index: 99999999;
  position: relative;

  @media screen and (max-width: 740px) {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }
`;

export const Exit = styled.div`
  position: fixed;
  transition: 0.3s ease;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background: #6464649e;

  z-index: 999;
`;
