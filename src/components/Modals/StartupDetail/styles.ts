import ReactMarkdown from 'react-markdown';
import styled, { css } from 'styled-components';

export const StartupName = styled.div`
  padding: 10px 50px;
  min-height: 80px;
  display: flex;
  align-items: center;
  h1 {
    font-size: 2.2rem;
    font-weight: bold;
  }
`;

export const FadeLine = styled.div`
  margin: 8px 0;
  width: 100%;
  height: 3px;

  background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight} 20.87%,
      ${theme.colors.primary} 52.62%,
      ${theme.colors.terceary} 83.37%
    );`};
`;

export const StartupInfos = styled.div`
  display: flex;
  padding: 1% 4%;
  justify-content: space-between;
  gap: 20px;
  height: 82%;
`;

export const GeneralInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  padding: 25px;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border-radius: 10px;
`;

export const GeneralInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 800px;
  padding: 25px;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border-radius: 10px;
  height: 100%;
`;

export const LeftTitle = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
`;

export const RightTitle = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
`;

export const UnderTitleLine = styled.div`
  margin: 8px 0;
  width: 100%;
  height: 2px;
  align-self: center;

  background: ${({ theme }) => theme.colors.lineGrey};
`;

export const AllFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  height: 100%;
  overflow-y: 'auto';

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 7%;
  margin-bottom: 7%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-weight: 600;
`;

export const Value = styled.div``;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
`;

export const Description = styled(ReactMarkdown)`
  max-height: 50%;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-right: 10px;
  white-space: pre-wrap;
  overflow-y: auto;
  text-align: justify;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  height: 55%;
`;

export const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 45%;
  gap: 10px;
  height: 100%;
`;

export const BottomRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  gap: 10px;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  max-height: 25%;
`;

export const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const ContactTitle = styled.div``;

export const UrlContainer = styled.div`
  display: flex;
  flex-direction: column;

  /* overflow-y: scroll;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
  } */
`;

export const Url = styled.a`
  margin-top: 3%;
  margin-bottom: 3%;
`;

export const LinkedInUrl = styled.div`
  margin-top: 3%;
  margin-bottom: 3%;
  padding: 5px;

  width: 45%;

  background-color: #0077b5;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;

  text-align: center;

  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;

export const NA = styled.p`
  margin-top: 5%;
  margin-bottom: 5%;
`;

export const MemberContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const MemberName = styled.div`
  font-weight: 600;
`;

export const MemberPosition = styled.div`
  margin-top: 10px;
`;

export const CardItem = styled.div<{ color?: string }>`
  background: ${({ color }) => color};

  width: 70%;
  border-radius: 10px;
  height: 30px;

  span {
    margin: 0 auto;
    letter-spacing: 0.4px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 21px;

    text-align: center;

    color: #ffffff;
  }

  display: grid;
  place-items: center;

  color: #fff;
`;
