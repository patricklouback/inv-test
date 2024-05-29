import styled from 'styled-components';

export const Container = styled.div<{ status?: string }>`
  width: 100%;
  margin: 8px 0;

  :first-child {
    margin-top: 0;
  }

  padding: 18px 16px;
  position: relative;

  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ::before {
    content: '';
    background: ${({ status }) => status};
    height: 7px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  ::after {
    content: '';
    background: ${({ status }) => status};
    height: 7px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media screen and (max-width: 980px) {
    min-width: 260px;
    width: 100%;

    margin: 0 8px;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Hashtag = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.font};
`;

export const Status = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.font};
  font-weight: bold;

  display: flex;
  justify-content: flex-end;
  span {
    margin-right: 4px;
    margin-left: 4px;
  }
`;

export const BallStatus = styled.div<{ status?: string }>`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${({ status }) => status};
`;

export const Title = styled.h3`
  margin-top: 6px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const ListTag = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
  row-gap: 0;
`;

export const ItemTag = styled.li<{ background?: string }>`
  background: ${({ background }) => background};
  padding: 0.4rem;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.background};
  min-width: 64px;
  height: 26px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.4px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
