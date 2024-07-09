import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

export const C = styled.div`
  margin: 60px 0;
`;

export const Header = styled.header<{ size?: number }>`
  display: flex;
  align-items: center;
  margin: 30px 0;
  padding-bottom: 30px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};

  ${({ size }) => {
    if (size <= 1135) {
      return css`
        justify-content: space-between;
      `;
    }
  }}
`;

export const WapperInput = styled.label`
  width: 100%;
  max-width: 283px;
  margin-right: 20px;
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

export const ButtonsActions = styled.div<{ size?: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 226px));
  gap: 1rem;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(auto, 226px));
    justify-content: center;
    row-gap: 1rem;
  }
`;

export const Filters = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 1rem;
`;

export const OthersActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ButtonAction = styled.button<{ $backgr?: string; size?: number }>`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  outline: none;
  max-width: 226px;

  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $backgr }) => $backgr};
  color: ${({ theme }) => theme.colors.background};
  letter-spacing: 0.5px;
  font-weight: 500;

  span {
    text-shadow: 0.1em 0.1em 0.1em rgba(0, 0, 0, 0.25);
  }
  &:hover {
    filter: brightness(0.95);
  }
`;

export const Filter = styled.div<{ size?: number }>`
  width: 100%;
  position: relative;
  height: 56px;
  border: none;
  border-radius: 8px;
  outline: none;
  max-width: 226px;
`;

export const CheckboxContainer = styled.label`
  display: flex;
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: start;
  font-size: 14px;

  gap: 10px;

  width: 100%;
`;

export const Checkbox = styled.input.attrs({
  type: 'checkbox',
})``;

export const ToggleFilters = styled.div`
  position: absolute;
  top: 105%;
  z-index: 100;
  width: 100%;
  min-height: 70px;
  max-height: 150px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borders};
  padding-bottom: 5px;
  overflow-y: auto;

  @media screen and (max-width: 1000px) {
    max-width: 226px;
  }
`;

export const ButtonDownload = styled.button<{ disabled?: boolean }>`
  background: white;
  display: flex;
  color: ${({theme}) => theme.colors.primary[styleSlug]};
  height: 56px;
  border-color: #b5b5b5;
  border-radius: 10px;
  border-style: solid;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const ButtonDownloadText = styled.div`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.01px;
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
    padding: 5px;
  }
`;

// TABLE

export const TableContainer = styled.div`
  width: 100%;

  /* overflow-x: scroll; */
  overflow-y: scroll;
  max-height: 600px;

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
`;

export const Cntt = styled.table`
  padding-bottom: 20px;
  border: none;
  border-collapse: collapse;

  color: ${({ theme }) => theme.colors.fontLight};
  min-width: 757px;
  width: 100%;
`;

export const TableInfo = styled.thead``;

export const TableUsers = styled.tbody`
  border-top: 1px solid ${({ theme }) => theme.colors.borders};
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

export const ItemRow = styled.tr`
  border: none;
`;

export const ItemValue = styled.td`
  padding: 0.5rem 0;
  border: none;

  text-align: left;
  svg {
    margin-right: 12px;
  }

  @media screen and (max-width: 635px) {
    svg {
      margin-right: 0px;
    }
    :last-child {
      text-align: right;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
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

export const TotalUsers = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 30px;
  font-weight: 600;
`;
