import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 105px;
  p {
    letter-spacing: 0.7px;
    color: ${({ theme }) => theme.colors.fontLight};
    margin-bottom: 15px;
    line-height: 24px;
  }
  .download {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: auto;
    margin-bottom: 54px;
    &:hover {
      color: ${({ theme }) => theme.colors.fontLight};
    }
    span {
      margin-left: 6px;
      text-decoration: underline;
      font-size: 15px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    #green {
      margin-top: 20px;
      background: ${({ theme }) => theme.colors.greenHipeLight};
    }
  }
`;

export const ButtonAction = styled.button`
  &:nth-child(3) {
    background: ${({ theme }) => theme.colors.greenHipeLight};
  }
  &:nth-child(4) {
    background: ${({ theme }) => theme.colors.greenHipeLight};
  }
  max-width: 226px;
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  outline: none;
  margin: 0 8px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.font};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.5px;
  span {
    margin-left: 10px;
  }
  .filter {
    width: 26px;
    height: 21px;
    position: relative;
    svg:last-child {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    svg:first-child {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
    }
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.font};
    cursor: not-allowed;

    svg {
      animation: rotateInfinitely 1.5s linear infinite;
    }

    @keyframes rotateInfinitely {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

export const Download = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  width: auto;
  margin-bottom: 54px;
  &:hover {
    color: ${({ theme }) => theme.colors.fontLight};
  }
  span {
    margin-left: 6px;
    text-decoration: underline;
    font-size: 15px;
  }
`;
