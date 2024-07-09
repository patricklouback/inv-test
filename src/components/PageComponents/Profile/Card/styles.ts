import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;

  padding: 15px;
  text-align: end;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  &:nth-child(1) {
    background: linear-gradient(
      58.21deg,
      rgba(223, 0, 117, 0.62) 14.44%,
      rgba(254, 193, 75, 0.74) 90.96%
    );
  }
  &:nth-child(2) {
    background: linear-gradient(
      58.21deg,
      rgba(22, 180, 169, 0.77) 14.44%,
      rgba(120, 181, 50, 0.49) 90.96%
    );
  }

  &:nth-child(3) {
    background: linear-gradient(58.21deg, #a3b2cd 14.44%, #7ed1ff 90.96%);
  }

  &:nth-child(4) {
    background: linear-gradient(
      58.21deg,
      rgba(180, 83, 239, 0.77) 14.44%,
      rgba(52, 50, 181, 0.49) 90.96%
    );
  }
`;

export const WapperIcon = styled.div``;

export const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Title = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  color: #fff;
`;

export const Value = styled.span`
  font-size: 45px;
  font-weight: bolder;
  color: #fff;
  letter-spacing: 0.8px;
`;
