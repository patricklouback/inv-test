import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.greyLight};
  border-radius: 24px 24px 8px 8px;
  position: relative;

  ::after {
    content: '';
    position: absolute;
    border-radius: 0 0 8px 8px;
    width: 100%;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.greenHipeLight};
    bottom: 0;
    left: 0;
  }
`;

export const WapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

export const ButtonSend = styled.button`
  background: ${({ theme }) => theme.colors.greenHipeLight};
  transition: 0.2s ease;

  :hover {
    background: ${({ theme }) => theme.colors.greenLimao};
  }

  border: 0;
  outline: none;
  max-width: 130px;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  letter-spacing: 0.7px;
  color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
`;

export const Exit = styled.div`
  height: 65px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 25px;

  svg {
    cursor: pointer;
  }
`;

export const Exit2 = styled.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;

  svg {
    cursor: pointer;
  }
`;

export const Line = styled.div`
  &:first-child {
    top: 0;
  }

  width: 100%;
  height: 4px;

  background: ${({ theme }) => `linear-gradient(
      90deg,
      ${theme.colors.primaryLight} 20.87%,
      ${theme.colors.primary} 52.62%,
      ${theme.colors.terceary} 83.37%
    );`};
`;

export const Content = styled.div`
  padding: 27px 46px;
`;

export const Tags = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const Tag = styled.button<{ background?: string; click?: boolean }>`
  position: relative;

  margin: 0 5px;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }

  background: ${({ background }) => background || ''};

  cursor: ${({ click }) => click && 'pointer'};

  border: 0;
  background: none;
`;
export const FirtInformation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const InfoContainer = styled.div`
  max-width: 550px;
`;

export const InfoTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const IdeaAppId = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fontLight};
`;

export const Hashtag = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const TextHashtag = styled.span`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.fontLight};
  font-size: 17px;
  line-height: 22px;
`;

export const InfoBottom = styled.div`
  margin-top: 20px;
`;

export const MainTitle = styled.h2`
  font-size: 24px;
  letter-spacing: 0.7px;
`;

export const Participants = styled.div`
  max-width: 220px;
  width: 100%;
  max-width: 180px;
  margin-bottom: 10px;
`;

export const ListParticipants = styled.ul`
  list-style: none;

  transform: translateX(-4px);
`;

export const ItemParticipants = styled.li`
  margin: 5px 0;

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

export const ContentParticipants = styled.div``;

export const TitleParticipants = styled.h3`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 8px;
`;

export const ListDescriptionIdea = styled.div`
  margin-top: 50px;
`;

export const ItemDescription = styled.div`
  margin: 25px 0;
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

export const TitleDescription = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const ParagraphIdea = styled.p`
  color: ${({ theme }) => theme.colors.font};
  line-height: 24px;
  letter-spacing: 0.4px;
`;

export const ImagesIdea = styled.ul`
  display: flex;
  margin-top: 30px;
  list-style: none;
`;

export const ItemImg = styled.li`
  margin: 0 8px;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`;

export const Img = styled.div<{ src?: string }>`
  max-width: 220px;
  max-height: 170px;

  background-image: url(${({ src }) => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

//

export const DropList = styled.ul`
  list-style: none;
  position: absolute;
  top: 0;
  right: -210px;

  z-index: 99;

  width: 200px;
  height: auto;

  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.borders};
`;

export const ItemDroped = styled.li`
  justify-content: space-between;
  :first-child {
    position: relative;

    :hover #frag {
      background: ${({ theme }) => theme.colors.greyLight};
    }

    #frag {
      position: absolute;
      width: 10px;
      height: 10px;
      background: ${({ theme }) => theme.colors.background};

      border-top: 2px solid ${({ theme }) => theme.colors.borders};
      border-left: 2px solid ${({ theme }) => theme.colors.borders};

      left: -7px;
      transform: rotate(-45deg);
    }
  }

  color: ${({ theme }) => theme.colors.fontLight};
  font-size: 14px;

  display: flex;
  align-items: center !important;
  text-align: start !important;

  min-height: 60px;
  padding: 0 22px;

  border-bottom: 2px solid ${({ theme }) => theme.colors.borders};

  :first-child {
    border-radius: 8px 8px 0 0;
  }

  :last-child {
    border-bottom: 0;
    border-radius: 0 0 8px 8px;
  }

  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.greyLight};
    color: ${({ theme }) => theme.colors.fontDarkGrey};
    font-weight: 600;
  }
`;

export const ContainerModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;

  top: 0;
  left: 0;
  z-index: 9999;

  #exit {
    background: #00000099;

    width: 100%;
    height: 100vh;
  }
`;

export const ContentModal = styled.div`
  position: absolute;
  top: 50%;
  bottom: 50%;

  right: 50%;
  left: 50%;

  max-width: 440px;
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.colors.background};

  transform: translate(-50%, -50%);

  border-radius: 8px;

  box-shadow: 4px 4px 6px #3d3d3d75;

  h2 {
    text-align: center;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.font};
  }
`;

export const Form = styled.form`
  padding: 0 60px;
  width: 100%;

  select {
    margin-bottom: 10px;
    width: 100%;
  }
`;

export const IdeaDescription = styled.div`
  margin-top: 40px;
  white-space: pre-wrap;
  text-align: justify;
`;

export const ButtonFiles = styled.button`
  margin: 2rem 0 1rem;
  border: none;
  a {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
`;

export const TagTitleWrapper = styled.div`
  display: flex;
  max-width: 220px;
  width: 100%;
  max-width: 180px;
  margin-bottom: 20px;
  margin-top: 20px;
  gap: 10px;
`;
export const TagTitle = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #2d3748;
`;

export const TicketTag = styled.div`
  margin-top: 3px;
`;

export const TagsWrapper = styled.div<{hoverBackgroundColor: boolean}>`
  display: flex;
  max-width: 220px;
  width: 100%;
  gap: 8px;
  align-items: flex-start;
  flex-wrap: wrap;
  border-radius: 8px;
  padding-top: 12px;
  padding-left: 8px;
  :hover {
    background-color: ${ props => props.hoverBackgroundColor ? '#fdfdfd' : 'none'};
  }
`;

export const TagNameWrapper = styled.div<{ backgroundColor: string }>`
  margin-bottom: 4px;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 1px;
  padding-bottom: 1px;
  border-radius: 4px;
  display: flex;
  white-space: nowrap;
  background-color: ${props => props.backgroundColor};
  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 load;
`;

export const TagName = styled.div<{color: string}>`
  flex-basis: 80%;
  white-space: nowrap;
  color: ${props => props.color};
  font-weight: 700;
  font-size: 12px;
  line-height: 21px;
`;

export const ColumnRigth = styled.div`
  margin-left: 20px;
`;

export const DeleteTag = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export const DeleteTagWrapper = styled.div`
  margin-left: 9px;
  display: flex;
  align-items: center;
  gap: 5px;
  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 1s ease-out 0s 1 load;
`;

export const TagsComponent = styled.div`
  
`;

export const EmptyTags = styled.div`
  display: flex;
  padding: 6px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  color: #2D374899;
  background-color: #fdfdfd;
  :hover {
    cursor: pointer;
  }
`
export const FilesContainer = styled.div`
  display: flex;
  gap: 10px;
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
