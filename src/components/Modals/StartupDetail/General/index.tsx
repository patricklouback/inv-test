import { lastInvestmentColors } from '@components/PageComponents/StartupRepository/ItemRowComponent';
import { BsGlobe } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import { MdAlternateEmail } from 'react-icons/md';
import { Startup } from 'interfaces/startups';
import { useStartups } from 'hooks';
import {
  StartupInfos,
  GeneralInfoLeft,
  TitleWrapper,
  LeftTitle,
  UnderTitleLine,
  FieldWrapper,
  CardItem,
  ItemTarget,
  GeneralInfoRight,
  Top,
  RightTitle,
  Description,
  Bottom,
  BottomLeft,
  AllFieldsWrapper,
  LinksContainer,
  ContactWrapper,
  ContactTitle,
  Url,
  NA,
  UrlContainer,
  LinkedInUrl,
  BottomRight,
Title,
Value
} from '../styles';

export function GeneralStartupPage({ startup }: { startup: Startup }) {
  const { formatCountry } = useStartups();

  const handleLocation = (state: string, country: string) => {
    return country !== ' '
      ? `${state}, ${formatCountry(country)?.name}`
      : state;
  };

  return (
    <StartupInfos>
      <GeneralInfoLeft>
        <TitleWrapper className="truncate">
          <LeftTitle>Informações gerais</LeftTitle>
          <UnderTitleLine />
        </TitleWrapper>
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
          <Title>Público-alvo</Title>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {startup.target?.map((target, index) => (
              <ItemTarget $index={index} key={index}>
                {target}
              </ItemTarget>
            ))}
          </div>
        </FieldWrapper>
        <FieldWrapper>
          <Title>Localização</Title>
          <Value>
            {handleLocation(startup.state || '', startup.country || '')}
          </Value>
        </FieldWrapper>
        <FieldWrapper>
          <Title>Ano de fundação</Title>
          <Value>{startup.foundationYear}</Value>
        </FieldWrapper>
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
            {startup.startupMembers && startup.startupMembers.length > 0 ? (
              startup.startupMembers.map(member => (
                <AllFieldsWrapper>
                  <FieldWrapper>
                    <Title>Nome</Title>
                    <Value style={{ fontWeight: 600 }}>{member.name}</Value>
                    <Value>{member.role}</Value>
                  </FieldWrapper>
                </AllFieldsWrapper>
              ))
            ) : (
              <NA>Não há dados</NA>
            )}
          </BottomRight>
        </Bottom>
      </GeneralInfoRight>
    </StartupInfos>
  );
}
