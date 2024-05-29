/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable default-case */
import { Modal } from '@components/Modals/Modal';
import { lastInvestmentColors } from '@components/PageComponents/StartupRepository/ItemRowComponent';
import { Startup } from 'interfaces/startups';
import { BsGlobe } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import { MdAlternateEmail } from 'react-icons/md';
import {
  AllFieldsWrapper,
  Bottom,
  BottomLeft,
  BottomRight,
  CardItem,
  ContactTitle,
  ContactWrapper,
  Description,
  FadeLine,
  FieldWrapper,
  GeneralInfoLeft,
  GeneralInfoRight,
  LeftTitle,
  LinkedInUrl,
  LinksContainer,
  MemberContainer,
  MemberName,
  NA,
  RightTitle,
  StartupInfos,
  StartupName,
  Title,
  TitleWrapper,
  Top,
  UnderTitleLine,
  Url,
  UrlContainer,
  Value,
} from './styles';

interface StartupDetailProps {
  startup: Startup;
  closeModal: () => void;
}

export function StartupDetailModal({
  startup,
  closeModal,
}: StartupDetailProps): JSX.Element {
  return (
    <Modal handle={closeModal} height="auto">
      <StartupName>
        <h1>{startup.name}</h1>
      </StartupName>
      <FadeLine />
      <StartupInfos>
        <GeneralInfoLeft>
          <TitleWrapper>
            <LeftTitle>Infos. Gerais</LeftTitle>
            <UnderTitleLine />
          </TitleWrapper>
          <AllFieldsWrapper>
            <FieldWrapper>
              <Title>Último Investimento</Title>
              <Value>
                {lastInvestmentColors.map(ta => {
                  if (ta?.name === startup?.lastInvestment) {
                    return (
                      <CardItem color={ta.color}>
                        <span>{ta.name}</span>
                      </CardItem>
                    );
                  }
                  return null;
                })}
              </Value>
            </FieldWrapper>
            <FieldWrapper>
              <Title>Segmento</Title>
              <Value>{startup.marketFields}</Value>
            </FieldWrapper>
            <FieldWrapper>
              <Title>Rodadas Investimento</Title>
              <Value>{startup.investmentRounds}</Value>
            </FieldWrapper>
            <FieldWrapper>
              <Title>Localização</Title>
              <Value>{`${startup.city}, ${startup.state}`}</Value>
            </FieldWrapper>
            <FieldWrapper>
              <Title>Ano de fundação</Title>
              <Value>{startup.foundationYear}</Value>
            </FieldWrapper>
          </AllFieldsWrapper>
        </GeneralInfoLeft>
        <GeneralInfoRight>
          <Top>
            <TitleWrapper>
              <RightTitle>Descrição</RightTitle>
              <UnderTitleLine />
            </TitleWrapper>
            <Description>{startup.description}</Description>
          </Top>
          <Bottom>
            <BottomLeft>
              <TitleWrapper>
                <RightTitle>Contato</RightTitle>
                <UnderTitleLine />
              </TitleWrapper>
              <AllFieldsWrapper>
                <LinksContainer>
                  <ContactWrapper>
                    <BsGlobe size={20} />
                    <ContactTitle>Site</ContactTitle>
                  </ContactWrapper>
                  {startup.url !== 'N/A' ? (
                    <Url target="_blank" href={startup.url}>
                      {startup.url}
                    </Url>
                  ) : (
                    <NA>Não há dados</NA>
                  )}
                </LinksContainer>
                <LinksContainer>
                  <ContactWrapper>
                    <MdAlternateEmail size={20} />
                    <ContactTitle>E-mail</ContactTitle>
                  </ContactWrapper>
                  {startup.email !== 'N/A' ? (
                    <Url href={`mailto:${startup.email}`}>{startup.email}</Url>
                  ) : (
                    <NA>Não há dados</NA>
                  )}
                </LinksContainer>
                <LinksContainer>
                  <ContactWrapper>
                    <IoIosPeople size={24} />
                    <ContactTitle>Rede social</ContactTitle>
                  </ContactWrapper>
                  {startup.linkedIn ? (
                    <UrlContainer>
                      <LinkedInUrl
                        onClick={() => window.open(startup.linkedIn, '_blank')}
                      >
                        LinkedIn
                      </LinkedInUrl>
                    </UrlContainer>
                  ) : (
                    <NA>Não há dados</NA>
                  )}
                </LinksContainer>
              </AllFieldsWrapper>
            </BottomLeft>
            <BottomRight>
              <TitleWrapper>
                <RightTitle>Time Principal</RightTitle>
                <UnderTitleLine />
              </TitleWrapper>
              {startup.startupMembers &&
                startup.startupMembers.map(member => (
                  <MemberContainer>
                    <MemberName>{member ?? 'Não há dados'}</MemberName>
                  </MemberContainer>
                ))}
            </BottomRight>
          </Bottom>
        </GeneralInfoRight>
      </StartupInfos>
    </Modal>
  );
}

export function StartupDetail({ ...props }: StartupDetailProps): JSX.Element {
  return <StartupDetailModal {...props} />;
}
