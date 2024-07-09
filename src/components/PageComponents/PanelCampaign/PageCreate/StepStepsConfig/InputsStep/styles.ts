import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;
`;

export const Input = styled.input`
  width: 480px;
  height: 65px;
  margin: 10px 0;
  padding-left: 20px;
`;

export const AddButton = styled.button`
  margin-top: 23px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grey};

  font-size: 14px;
  transition: 0.4s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.font};
  }

  svg {
    margin-right: 10px;
  }
`;

export const ButtonAction = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  margin-left: 8px;
  &:hover #edit {
    color: ${({ theme }) => theme.colors.blue};
  }

  &:hover #x {
    color: ${({ theme }) => theme.colors.red};
  }

  &:hover #check {
    color: ${({ theme }) => theme.colors.greenLive};
  }

  svg {
    transition: 0.3s ease;
    color: ${({ theme }) => theme.colors.borders};
  }
`;
