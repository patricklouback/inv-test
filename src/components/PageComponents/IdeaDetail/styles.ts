import styled from 'styled-components';
import { styleSlug } from 'utils/constants';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .fade-line {
    &:first-child {
      top: 0;
    }

    position: relative;
    bottom: 0;
    width: 100%;
    height: 4px;
    margin-top: 4px;

    background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight[styleSlug]} 20.87%,
      ${theme.colors.primary[styleSlug]} 52.62%,
      ${theme.colors.terceary[styleSlug]} 83.37%
    );`};
  }
`;

export const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.font};
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.font};
    font-size: 24px;
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 24px;
  padding: 20px;
  max-width: auto;
  height: 70%;
  width: 70%;
  display: flex;
  flex-direction: column;

  iframe {
    margin-top: 20px;
    border: none;
  }
`;

export const FooterModal = styled.div`
  display: flex;
  margin-top: 20px;

  a {
    background: ${({ theme }) => theme.colors.primary[styleSlug]};
    color: #fff;
    padding: 10px 20px;
    border-radius: 24px;
    cursor: pointer;
    text-decoration: none;
  }
`;

export const WapperBackTo = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.font};

  display: flex;
  align-items: center;
  font-weight: bold;

  cursor: pointer;

  svg {
    margin-right: 4px;
  }
`;

export const Container = styled.div`
  padding: 50px 0;
`;

export const ButtonFiles = styled.button`
  margin-bottom: 2rem;
  border: none;

  span {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
`;

export const WapperStep2 = styled.div`
  margin-left: 15px;
  width: 100%;
`;

export const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.fontLight};
  letter-spacing: 0.4px;
  line-height: 24px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const WapperSteps = styled.div`
  display: flex;
`;

export const WapperContentSelected = styled.div`
  padding: 0 68px;
`;

export const WapperContentProcess = styled.div`
  margin-top: 40px !important;
  padding: 0 0 50px 0;

  border-radius: 24px;
  background: ${({ theme }) => theme.colors.greyLight};
`;

export const ListImgsFirstInfo = styled.ul`
  list-style: none;
`;

export const ItemImage = styled.li<{ image?: string }>`
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 213px;
  height: 156px;

  margin: 0 calc(11.83 / 2);

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const NameArchive = styled.div`
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.font};
  margin: 12px 0;
`;

export const WapperDescription = styled.div`
  height: auto;
  display: flex;
  align-items: center;

  padding: 20px 46px;
  line-height: 24px;
`;

export const ValueDescription = styled.p`
  text-transform: uppercase;
  font-weight: bold;
`;

export const Line = styled.div`
  width: 100%;
  height: 4px;

  background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight[styleSlug]} 20.87%,
      ${theme.colors.primary[styleSlug]} 52.62%,
      ${theme.colors.terceary[styleSlug]} 83.37%
    );`};
`;

export const WapperInternContent = styled.div`
  padding: 40px 46px;
`;

export const FilesContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const WapperContent = styled.div`
  margin-top: 10px;

  border-radius: 24px;
  background: ${({ theme }) => theme.colors.greyLight};
`;

export const BackButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  cursor: pointer;
  max-width: 80px;

  span {
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
  }
`;
