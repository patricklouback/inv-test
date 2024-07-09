import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const FooterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  gap: 2rem;
  button {
    height: 56px;
    width: 100%;
    padding: 0 1.5rem;
    border-radius: 1rem;
    max-width: 300px;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.background};

    svg {
      margin-right: 8px;
    }
  }

  button.save {
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }

  button.pause {
    border: 2px solid ${({ theme }) => theme.colors.font};
    background-color: ${({ theme }) => theme.colors.font};
  }
  button.send {
    border: 2px solid ${({ theme }) => theme.colors.terceary[styleSlug]};
    background-color: ${({ theme }) => theme.colors.terceary[styleSlug]};
  }

  @media screen and (max-width: 515px) {
    flex-direction: column;
    max-width: 350px;
    margin: 2rem auto;
  }
`;
