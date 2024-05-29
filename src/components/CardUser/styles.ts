import styled from 'styled-components';

interface AreaUserProps {
  areaColor?: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const Image = styled.div<{ img?: string }>`
  height: 36px;
  min-width: 36px;

  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.4);

  background-image: url(${({ img }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px;
  box-shadow: 0 2px 5px -3px #00000061;
`;

export const NameUser = styled.span`
  font-weight: 500 !important;
  margin-bottom: 0 !important;
  font-size: 14px;
  letter-spacing: 0.3px;
  text-align: start;
  padding-left: 10px;

  transition: ease 0.5s;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const AreaUser = styled.span<AreaUserProps>`
  font-weight: 500 !important;
  margin-bottom: 0 !important;
  font-size: 14px;
  letter-spacing: 0.3px;
  text-align: start;
  padding-left: 10px;

  transition: ease 0.5s;
  color: ${(props) => props.areaColor};
`;

export const NameAndAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;