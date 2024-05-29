import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .datePicker {
    min-height: 56px;
    outline: 0;
    width: 70%;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${props => props.theme.colors.borders};
    padding: 0 1rem;

    margin: 5px 0;
  }
`;

export const Form = styled.form<React.FormHTMLAttributes<HTMLFormElement>>`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0 20px;
  gap: 1rem;
  align-items: stretch;

  @media screen and (max-width: 980px) {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  @media screen and (max-width: 570px) {
    flex-direction: column;
    margin: 0;
  }

  > div {
    flex: 1;
  }
`;

export const Item = styled.div`
  height: 152px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 980px) {
    flex-direction: column;
    justify-content: space-between;
    height: auto;
  }

  // @media screen and (max-width: 580px) {
  //   flex-direction: column;
  //   justify-content: space-between;
  //   max-width: 100%;
  // }
`;

export const ButtonSave = styled.button<React.ButtonHTMLAttributes<HTMLButtonElement>>`
  border-radius: 12px;
  width: auto;
  height: 56px;
  border: 0;
  outline: none;
  background: ${({ theme }) => theme.colors.greenHipeLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
  padding: 0 1rem;
`;

export const Value = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  letter-spacing: 0.4px;
`;
