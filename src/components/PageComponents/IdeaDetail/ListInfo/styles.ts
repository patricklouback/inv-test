import styled from 'styled-components';

export const ListInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WapperListInfo = styled.ul`
  list-style: none;
`;

export const ItemInfo = styled.li`
  margin: 30px 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};
  padding-bottom: 30px;

  :last-child {
    border-bottom: 0;
  }
`;

export const TitleField = styled.h2`
  text-transform: uppercase;
  font-size: 20px;
`;

export const ValueField = styled.p`
  margin-top: 15px;
  line-height: 22px;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.font};
  letter-spacing: 0.4px;
  white-space: pre-wrap;
  text-align: justify;
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 235px;
`;

export const LinkTitleWrapper = styled.div`
  display: flex;
  max-width: 220px;
  width: 100%;
  max-width: 180px;
  margin-bottom: 20px;
  margin-top: 20px;
  gap: 10px;
`;

export const LinkTitle = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #2d3748;
`;
