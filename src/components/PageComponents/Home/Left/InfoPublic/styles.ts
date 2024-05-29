import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 510px) {
    display: none;
  }
`;

export const Item = styled.li`
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

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(141, 172, 224, 0.4);
    width: 2px;
    height: 60%;
  }

  div {
    width: 50%;
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

