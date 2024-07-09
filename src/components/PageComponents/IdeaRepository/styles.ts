import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Content = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PageHeader = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border-radius: 16px;
  padding: 12px 24px;
  display: flex;
  align-items: center;

  > div {
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 0.5rem;
    box-shadow: 0 2px 5px -3px #00000061;

    margin-right: 12px;
  }
`;

export const Container = styled.main`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
  padding: 1rem;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 1rem 0;
  padding-bottom: 30px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};
`;

export const WapperInput = styled.label`
  width: 100%;
  max-width: 360px;
  position: relative;
  #icon {
    position: absolute;
    width: 50px;
    height: 100%;
    border-radius: 8px 0 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 640px) {
    max-width: unset;
  }
`;

export const InputSearch = styled.input`
  padding-left: 50px;
  width: 100%;
  height: 56px;
  outline: none;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.font};
  letter-spacing: 0.8px;
  &:disabled {
    color: ${({ theme }) => theme.colors.borders};
  }
  &::placeholder {
    font-size: 14px;
    letter-spacing: 0.4px;
    color: ${({ theme }) => theme.colors.fontLight};
    font-weight: normal;
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
  }
`;

export const ButtonsActions = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const OthersActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Filters = styled.div`
  display: flex;
  width: 100%;
`;

export const Filter = styled.div`
  flex: 1;
  min-width: 220px;
  position: relative;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 640px) {
    min-width: unset;
    width: 100%;
  }
`;

export const CheckboxContainer = styled.div`
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  gap: 1rem;

  width: 100%;
`;

export const Checkbox = styled.input.attrs({
  type: 'checkbox',
})``;

export const StyledCheckboxContainer = styled.div`
  padding-left: 0.7rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  margin-bottom: 0.3rem;

  cursor: pointer;

  span {
    margin-top: 2px;
    display: inline-block;
  }

  label {
    min-width: 21px;
  }
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
`;

export const VisibleCheckbox = styled.label<{ checked: boolean }>`
  width: 21px;
  height: 21px;
  border-radius: 4px;
  border: 1.4px solid ${({theme}) => theme.colors.primary[styleSlug]};
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    display: ${({ checked }) => (checked ? 'flex' : 'none')};
  }
`;

export const ToggleFilters = styled.div`
  position: absolute;
  top: 120%;

  z-index: 100;

  width: 100%;
  max-height: 200px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borders};
  padding-bottom: 5px;

  overflow-y: auto;

  @media (max-width: 715px) {
    width: 100%;
  }
`;

export const Balloon = styled.div`
  &::after {
    content: '';
    position: absolute;
    left: 20%;
    bottom: -19px;
    z-index: 200;
    width: 10px;
    height: 10px;
    background-color: #fff;
    transform: rotate(45deg);
    border-bottom: 2px solid transparent;
    border-top: 1.8px solid ${({ theme }) => theme.colors.borders};
    border-left: 1.8px solid ${({ theme }) => theme.colors.borders};
    border-right: 2px solid transparent;
  }
`;

export const WapperTitleFilter = styled.div`
  width: 100%;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryLight[styleSlug]};
  margin-bottom: 5px;

  strong {
    font-size: 15px;
    padding: 1rem;
  }
`;

export const ButtonAction = styled.button<{ $backgr?: string }>`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  outline: none;
  margin: 0 8px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $backgr }) => $backgr};
  color: ${({ theme }) => theme.colors.background};
  letter-spacing: 0.5px;
  font-weight: 500;
  span {
    margin-left: 10px;
  }
`;

// TABLE

export const TableContainer = styled.div`
  padding: 0 5px;
  flex: 1;
  width: 100%;
  margin-bottom: 20px;

  border-radius: 16px;

  overflow-y: scroll;
  overflow-x: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary[styleSlug]};
    border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
    border-radius: 4px;
  }

  background: ${({ theme }) => theme.colors.greyLight};
  max-height: 600px;
`;

export const Cntt = styled.table`
  padding-bottom: 20px;
  border: none;
  border-collapse: collapse;

  color: ${({ theme }) => theme.colors.fontLight};
  min-width: 757px;
  width: 100%;
`;

export const TableInfo = styled.thead`
  tr {
    .title {
      width: 190px;
    }
    .type {
      width: 50px;
    }
    .actions {
      width: 50px;
    }
    .creationDate {
      width: 200px;
    }
  }
`;

export const TableUsers = styled.tbody`
  border-top: 1px solid ${({ theme }) => theme.colors.borders};
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
`;

export const ImgUser = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  margin-right: 8px;
`;

export const ItemHeader = styled.th`
  padding: 1rem 0;
  text-align: left;

  @media screen and (max-width: 635px) {
    :last-child {
      text-align: right;
    }
  }
`;

export const Exit = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #2d374833;
  z-index: 999;
`;

export const ModalEditUser = styled.div<{ img?: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 580px;
  height: 490px;
  background: ${({ theme }) => theme.colors.background};
  z-index: 999;
  border-radius: 24px;
  .exit {
    height: 44px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
  }
  .content {
    padding: 0 52px;
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
        height: 53px;
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
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      #green {
        max-width: 140px;
        background: ${({ theme }) => theme.colors.greenHipeLight} !important;
      }
      button {
        margin-top: 20px;
      }
      div {
        display: flex;
        flex-direction: column;
        width: 100%;
        label {
          margin: 6px 0;
          display: flex;
          flex-direction: column;
          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
          span {
            font-weight: 500;
            letter-spacing: 0.4px;
          }
          input,
          select {
            margin-top: 3px;
            width: 100%;
            height: 48px;
            outline: none;
            padding-left: 32px;
            border-radius: 8px;
            border: 2px solid ${({ theme }) => theme.colors.borders};
            font-weight: 600;
            color: ${({ theme }) => theme.colors.font};
            letter-spacing: 0.8px;
            &:disabled {
              color: ${({ theme }) => theme.colors.borders};
            }
            &::placeholder {
              font-size: 14px;
              letter-spacing: 0.4px;
              color: ${({ theme }) => theme.colors.fontLight};
              font-weight: normal;
            }
            &:focus {
              border: 2px solid ${({ theme }) => theme.colors.primary[styleSlug]};
            }
          }
        }
      }
    }
  }
`;

export const BackButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  cursor: pointer;
  max-width: 80px;

  span {
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
  }
`;

export const TotalIdeas = styled.div`
  margin-bottom: 20px;
  padding-left: 20px;
  font-weight: 600;
`;

export const DownloadAndSearchContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const TableBottom = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
