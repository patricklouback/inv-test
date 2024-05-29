import styled from 'styled-components';

interface LabelParams {
  max_Width?: number;
  max_heigth?: number;
  margin_left?: number;
  margin_right?: number;
  margin_top?: number;
  margin_bottom?: number;
}

export const Label = styled.label<LabelParams>`
  display: flex;
  flex-direction: column;
  width: 100%;

  max-width: ${({ max_Width }) => `${max_Width}px` || `100%`};
  margin-left: ${({ margin_left }) => `${margin_left}px`};
  margin-right: ${({ margin_right }) => `${margin_right}px`};
  margin-top: ${({ margin_top }) => `${margin_top}px`};
  margin-bottom: ${({ margin_bottom }) => `${margin_bottom}px`};
`;

export const Item = styled.textarea`
  border: none;
  overflow: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.font};

  padding: 17px 13px;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-size: 1rem;
  &::placeholder {
    color: ${({ theme }) => theme.colors.fontLight};
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.disabled};
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  width: 100%;
`;

export const Container = styled.label`
  position: relative;
  min-width: 100%;


  .actions {
    border-bottom: 0;

    background: ${({ theme }) => theme.colors.font};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 15px;
    height: 30px;
    padding-bottom: 0;

    border-radius: 4px;

    button {
      border: none;
      color: #fff;
      background: none;
    }
  }

  .textarea {
    width: 100%;
    border: none;
    overflow: auto;
    outline: none;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.font};
    margin-top: 4px;

    padding: 42px 13px 17px;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;

    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.borders};
    font-size: 1rem;
    &::placeholder {
      color: ${({ theme }) => theme.colors.fontLight};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.disabled};
    }
    &:focus {
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ErrorText = styled.small`
  color: ${props => props.theme.colors.notification.error};
  font-size: 1rem;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 14px;

  svg {
    margin-right: 10px;
  }
`;
