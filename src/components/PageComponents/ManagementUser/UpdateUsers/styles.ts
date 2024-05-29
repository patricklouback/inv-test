import styled from 'styled-components';

export const ModalUpdate = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 580px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 999;
  padding: 2rem;
  border-radius: 24px;
  .exit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  #green {
    background: ${({ theme }) => theme.colors.greenHipeLight} !important;
  }
  .content {
    margin-bottom: 1rem;
    .info-user {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .img {
        margin-right: 20px;
        display: flex;
        width: 95px;
        height: 95px;
        border-radius: 8px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span {
          letter-spacing: 0.4px;
          color: ${({ theme }) => theme.colors.font};
        }
        p {
          color: ${({ theme }) => theme.colors.font};
          font-weight: 500;
          font-size: 25px;
          letter-spacing: 0.4px;
        }
      }
    }
  }
`;

export const UserImage = styled.img`
  border-radius: 8px;
`;

export const ButtonAction = styled.button`
  max-width: 226px;
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  outline: none;
  margin: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.font};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const Label = styled.p`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 1rem;
`;

export const Select = styled.select`
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.borders};
  border-radius: 8px;
  padding: 0 20px;

  width: 100%;
  height: 56px;
  outline: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.font};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 20px;
  }
  div {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const UserType = styled.div`
  display: flex;
  flex-direction: column !important;
  justify-content: flex-start;
  margin-top: 0.5rem;
`;

export const UserTypeTooltip = styled.div.attrs<{ top: number, left: number }, { top: number, left: number }>(
  props => {
    return { top: props.top || 0, left: props.left || 0 };
  }
)`
  visibility: hidden;
  min-width: 350px;
  margin-left: 17px;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 11111991;
  color: rgba(253, 253, 253, 1);
  background: rgba(109, 109, 109, 1);
  text-align: left;
  max-width: 501px;
  top: auto;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
  left: ${props => props.left + 17}px;
`;

export const AdminTypeTip = styled.div`
  position: absolute;
  left: 190px;
  bottom: 141px;
  max-width: 100px;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  &:hover ${UserTypeTooltip} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const ManagerTypeTip = styled.div`
  position: absolute;
  left: 136px;
  bottom: 106px;
  max-width: 100px;
  padding: 4px 8px 4px 8px;
  color: rgba(16, 80, 189, 1);
  border-radius: 4px;
  &:hover ${UserTypeTooltip} {
    visibility: visible;
    opacity: 0.95;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ManagerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row !important;
`;

export const CheckboxInput = styled.input`
  width: 20px;
`;