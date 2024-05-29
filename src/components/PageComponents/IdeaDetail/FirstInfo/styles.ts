import styled from 'styled-components';

export const WapperFirstInfoIdea = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;

  margin-top: 34px;
`;

export const WapperTextFirst = styled.div`
  width: 100%;
`;

export const ValueTextFirst = styled.p`
  max-width: 850px;
  color: ${({ theme }) => theme.colors.fontLight};
  width: 100%;
  line-height: 21px;
  letter-spacing: 0.4px;

  strong {
    color: ${({ theme }) => theme.colors.font};
    margin-right: 0.5rem;
  }
`;

export const WapperCampaign = styled.div`
  display: flex;
  width: 100%;
`;

export const IdeaAppId = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const TitleTextFirst = styled.h2`
  font-size: 2rem;
  letter-spacing: 0.6px;
  margin-top: 5px;
`;

export const WapperBoxParticip = styled.div`
  max-width: 230px;
  width: 100%;
`;

export const ValueBoxParticip = styled.span`
  font-weight: 500;
  letter-spacing: 0.4px;
`;

export const LIstBBoxParticip = styled.ul`
  margin-top: 10px;
  list-style: none;
  transform: translateX(-5px);
`;

export const ItemBoxParticip = styled.li`
  margin: 8px 0;
`;
