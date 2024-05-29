import styled from 'styled-components';
import { IstylesContainerSimples } from '.';

export const Container = styled.div<IstylesContainerSimples>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ max_width }) => `${max_width}px`};

  margin-left: ${({ margin_left }) => `${margin_left}px`};
  margin-right: ${({ margin_right }) => `${margin_right}px`};
  margin-top: ${({ margin_top }) => `${margin_top}px`};
  margin-bottom: ${({ margin_bottom }) => `${margin_bottom}px`};

  span {
    font-weight: bold;
    margin-bottom: 6px;
  }

  @media screen and (max-width: 980px) {
    span {
      margin-bottom: 16px;
    }

    max-width: 100% !important;
    margin: 10px 0;
  }

  @media screen and (max-width: 570px) {
    margin: 5px 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
`;

export const Description = styled.span`
  display: flex;
  font-weight: 100;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.fontLight};
  height: 1rem;
`;
