import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  z-index: 9999;

  #itembutton {
    border: none;
    outline: none;
    background: none;
  }
`;

export const Items = styled.li`
  padding: 15px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};

  :last-child {
    border-bottom: 0;
  }

  :first-child {
    border-radius: 8px 8px 0 0;
  }

  display: flex;
  align-items: center;

  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.greyLight};
  }
`;

export const BadgeNotification = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: -20%;
  right: 20%;
  background-color: ${({ theme }) => theme.colors.terceary};
`;

export const IconBellContainer = styled.div`
  position: relative;

  width: 100%;
  align-items: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Drop = styled.ul<{ open: boolean }>`
  position: absolute;
  top: 50px;
  right: -10px;
  width: 290px;

  ::after {
    content: '';
    background: ${({ theme }) => theme.colors.greyLight};
    width: 10px;
    height: 10px;
    position: absolute;
    top: -8px;
    right: 19px;
    border-top: 2px solid ${({ theme }) => theme.colors.borders};
    border-left: 2px solid ${({ theme }) => theme.colors.borders};

    transform: rotate(45deg);
  }

  min-height: 300px;
  max-height: 355px;
  z-index: 99999;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  border-radius: 8px;

  list-style: none;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
`;

export const Icon = styled.div`
  margin-right: 10px;

  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.colors.greenLive};
  min-width: 25px;
  min-height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemImageUser = styled.div<{ images_users: string }>`
  background-image: url(${({ images_users }) => images_users});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 20px;
  width: 20px;
`;

export const Value = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const ViewAll = styled.div`
  a {
    background: ${({ theme }) => theme.colors.greyLight};
    border-radius: 0 0 8px 8px;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.font};
    opacity: 0.8;
    font-weight: 600;
    text-decoration: underline;
    border-top: 2px solid ${({ theme }) => theme.colors.borders};
  }
`;

export const EmpityNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;

  p {
    font-weight: 400;
    letter-spacing: 0.6px;
  }
`;
