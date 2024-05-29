import styled from 'styled-components';

export const Line = styled.div`
  width: 174px;
  height: 2px;
  background: #b5b5b5;
  @media screen and (max-width: 890px) {
    width: 100%;
  }
`;

export const Container = styled.p`
  height: 90%;
  @media screen and (max-width: 890px) {
    width: 100%;
    margin-left: 12px;
    margin-right: 12px;
  }
`;

export const LeftSideTitle = styled.div`
  margin-top: 15vh;
  margin-bottom: 11.5vh;
  width: 382px;
  height: 38px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 120%;
  @media screen and (max-width: 890px) {
    text-align: center;
    width: 100%;
    margin-bottom: 6.5vh;
    font-size: 24px;
    line-height: 130%;
  }
`;

export const InputDescription = styled.div`
  width: 392px;
  height: 24px;
  left: 200px;
  top: 315px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 890px) {
    width: 100%;
  }
`;

export const DivisoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 32px;
`;

export const OrContainer = styled.p`
  width: 27px;
  height: 24px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  font-variant: small-caps;
  color: #b5b5b5;
  @media screen and (max-width: 890px) {
    margin-left: 5px;
    margin-right: 5px;
    width: none;
  }
`;
