import styled from 'styled-components';

interface ContainerProp {
  img?: string;
}

export const Container = styled.article<ContainerProp>`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  background: ${({ theme }) => theme.colors.greyLight};

  border-radius: 24px;
  margin: 20px 0 16px;

  .fade-line {
    width: 100%;
    height: 4px;

    background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight} 20.87%,
      ${theme.colors.primary} 52.62%,
      ${theme.colors.terceary} 83.37%
    );`};
  }
`;

export const CampaingImage = styled.div<ContainerProp>`
  position: relative;
  width: 100%;
  height: 278px;
  background-image: url(${({ img }) => `${img}`});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const CampaingText = styled.div<ContainerProp>`
  padding: 20px 29px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;

  div span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
  }

  div h2 {
    font-weight: bold;
    line-height: 36px;
    font-size: 32px;
    margin-bottom: 8px;
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.fontLight};
    font-size: 14px;
  }
`;
