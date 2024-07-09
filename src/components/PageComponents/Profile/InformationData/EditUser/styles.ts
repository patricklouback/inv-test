import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

export const ModalAddUser = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 580px;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
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
    margin-top: 50px;
  }
  div {
    gap: 1.8rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;
