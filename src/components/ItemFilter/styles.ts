import styled from 'styled-components';

export const ItemContainer = styled.div`
  position: relative;
  min-height: 30px;
`;

export const ContainerInput = styled.div`
  position: relative;
  z-index: 10;
  max-width: 140px;
  display: flex;
  cursor: pointer;

  input {
    cursor: pointer;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    caret-color: transparent;

    font-size: 14px;
    font-weight: 500;
    @media screen and (max-width: 510px) {
      width: auto;
    }
  }
`;

export const BoxIcons = styled.div`
  position: absolute;
  right: 9px;
  display: flex;
  flex-direction: row-reverse;

  svg:nth-child(2) {
    transform: translateX(3px);
  }
`;

export const ItemBox = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  top: calc(30px + 8px);
  z-index: 10;

  right: 14px;
  transform: rotateZ(45deg);
`;

export const Options = styled.div`
  position: absolute;
  top: calc(30px + 16px);

  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  width: 100vh;
  border-radius: 8px;
  max-width: 192px;
  right: 0;

  z-index: 20;

  &::before {
    content: '';
    z-index: 20px;
    position: absolute;
    top: -2px;
    right: 12px;
    width: 18px;
    height: 2px;
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const List = styled.ul`
  list-style: none;
  width: 100%;
`;

export const Item = styled.li`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};
  padding: 18px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.greyLight};
  }

  :last-child {
    border-bottom: 0;
    border-radius: 0 0 7px 7px;
  }

  :nth-child(1) {
    border-radius: 7px 7px 0 0;
  }
`;

export const Exit = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 18;
`;
