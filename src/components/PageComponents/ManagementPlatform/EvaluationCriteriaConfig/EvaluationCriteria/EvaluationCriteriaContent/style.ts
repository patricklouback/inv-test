import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Content = styled.div<{ width: number }>`
  display: flex;
  width: ${({ width }) => width}%;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-top: 15px;
  gap: 10px;

  & > :nth-child(1) {
    flex: 0 0 2%;
  }

  & > :nth-child(2) {
    flex: 0 0 18%;
  }

  & > :nth-child(3) {
    flex: 0 0 35%;
  }

  & > :nth-child(4) {
    flex: 0 0 25%;
  }

  & > :nth-child(5) {
    flex: 0 0 13%;
  }

  & > :nth-child(6) {
    flex: 0 0 1%;
  }

  & > :nth-child(7) {
    flex: 0 0 1%;
  }
`;

export const Draft = styled.div`
  /* margin-left: 10px; */
  width: 100%;
`;

export const Text = styled.p`
  font-size: 15px;
  margin-left: 8px;
  margin-bottom: 4px;
`;

export const CustomTextArea = styled.textarea`
  font-weight: 500;
  color: ${props => props.theme.colors.font};
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: fit-content;
  min-height: 64px;
  max-height: 64px;

  overflow-y: hidden;

  padding: 10px 10px;
  outline: 0;
  width: 100%;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${props => props.theme.colors.borders};
  font-size: 1rem;

  & + input {
    margin-left: 8px;
  }

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary[styleSlug]};
    max-height: none;
  }
  &::placeholder {
    color: #2d374899;
  }
  resize: none;
`;

export const CustomInput = styled.input`
  font-weight: 500;
  color: ${props => props.theme.colors.font};
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 64px;
  min-height: 64px;

  padding: 0 10px;
  outline: 0;
  width: 100%;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${props => props.theme.colors.borders};
  font-size: 1rem;

  & + input {
    margin-left: 8px;
  }

  &:disabled {
    color: ${props => props.theme.colors.fontGrey};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary[styleSlug]};
  }
  &::placeholder {
    color: #2d374899;
  }
`;

export const Index = styled.div`
  font-size: 18px;
  font-weight: 600;
  width: 10px;
  justify-content: center;
  display: flex;
  margin-top: 28px;
`;

export const Action = styled.div`
  margin-top: 25px;
`;

export const ButtonBackAndSend = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const WarningTitle = styled.div`
  font-family: Montserrat;
  font-size: 26px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const WarningDescription = styled.div`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 20px;
`;
