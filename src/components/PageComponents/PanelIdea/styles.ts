import styled, { css } from 'styled-components';
import { styleSlug } from 'utils/constants';

export const C = styled.div`
  width: 100%;
  padding: 50px 0;
  position: relative;
`;

export const ContentPage = styled.div`
  padding: 40px 0;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;

  &:first-child {
    margin-top: 0;
  }

  @media (max-width: 580px) {
    flex-direction: column;
  }
`;

export const RowQuestions = styled.div`
  margin: 30px 0;
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const Checks = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 6px 0;

    span {
      margin-left: 10px;
      font-weight: normal;
      font-size: 17px;
      letter-spacing: 0.3px;
    }
  }
`;

export const FooterButtons = styled.div`
  border-top: 3px solid ${({ theme }) => theme.colors.greyLight};
  padding-top: 40px;
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 1rem;
  margin-top: 40px;
  padding: 40px 8px;

  @media (max-width: 800px) {
    flex-direction: column;

    height: 270px;
  }

  button {
    height: 56px;
    padding: 0 1.5rem;
    border-radius: 1rem;
    min-width: 200px;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;

    svg {
      margin-right: 8px;
    }
  }

  button.cancel {
    border: 2px solid ${({ theme }) => theme.colors.notification.error};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.notification.error};
  }
  button.send {
    border: 2px solid ${({ theme }) => theme.colors.lightBlue};
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: ${({ theme }) => theme.colors.background};


    &:disabled{
      background-color: ${({ theme }) => theme.colors.greyDark};
      border: 2px solid ${({ theme }) => theme.colors.greyLight};
      color: ${({ theme }) => theme.colors.grey};
      cursor: not-allowed;
    }

  }
  button.save {
    border: 2px solid ${({ theme }) => theme.colors.terceary[styleSlug]};
    background-color: ${({ theme }) => theme.colors.terceary[styleSlug]};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const ItemIdea = styled.div<{ size?: number }>`
  width: 100%;
  margin: 0 10px;

  ${({ size }) => {
    if (size <= 585) {
      return css`
        width: auto;
      `;
    }
  }}
`;
