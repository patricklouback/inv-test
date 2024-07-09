import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const ContainerInputs = styled.div`
  margin-top: 40px;
`;

export const TitleInputs = styled.p`
  margin-bottom: 5px;
  letter-spacing: 0.5px;
`;
export const Strong = styled.strong``;

export const Form = styled.form``;

export const WapperInput = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  max-width: 480px;
  width: 100%;
  height: 64px;

  border: 0;
  outline: none;
  border-radius: 8px;

  margin: 8px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${props => props.theme.colors.borders};
  padding-left: 24px;

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary[styleSlug]};
  }
`;

export const ButtonDelete = styled.button`
  margin-left: 10px;

  background: transparent;
  border: none;
  outline: none;

  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonAdd = styled.button`
  background: transparent;
  border: none;
  outline: none;

  margin-top: 10px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.fontLight};

  transition: 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.font};
  }
`;

export const ValueButton = styled.p`
  margin-left: 5px;
`;

export const Item = styled.div`
  height: 152px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22%;

  .datePicker {
    min-height: 56px;
    outline: 0;
    width: 70%;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${props => props.theme.colors.borders};
    padding: 0 1rem;

    margin: 3rem 1.8rem;
  }

  @media screen and (max-width: 980px) {
    flex-direction: column;
    justify-content: space-between;
    height: auto;
  }
`;
