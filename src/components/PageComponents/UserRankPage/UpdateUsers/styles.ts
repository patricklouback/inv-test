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
        width: 95px;
        height: 95px;
        border-radius: 8px;
        background-image: url('https://via.placeholder.com/100');
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
