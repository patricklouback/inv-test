import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { Textarea } from '@components/Textarea';
import { ConfigContext } from 'contexts/ConfigContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { BiSave } from 'react-icons/bi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useTheme } from 'styled-components';
import { RenderHeader } from '../RenderHeader';
import {
  Section,
  Content,
  General,
  ButtonSave,
  Value,
  UseTerms,
  UseTermsContainer,
} from './styles';

export const SectionTermsOfUse: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { editCompanyTerms, company_terms } = useContext(ConfigContext);
  const [row, setRow] = useState(true);
  const [companyTermsState, setCompanyTermsState] = useState('');

  const onSubmitCompanyTerms = useCallback(
    async e => {
      e.preventDefault();
      await editCompanyTerms(companyTermsState);
    },
    [editCompanyTerms, companyTermsState]
  );

  useEffect(() => {
    setCompanyTermsState(company_terms);
  }, [company_terms]);

  return (
    <Section>
      <Collapsible
        triggerTagName="div"
        open
        trigger={
          <RenderHeader
            title="Termos de uso da organização"
            icon={<IoDocumentTextOutline color={colors.font} size={14} />}
            stateIcon={row}
          />
        }
        onOpen={() => setRow(true)}
        onClose={() => setRow(false)}
      >
        <Content>
          <General>
            <UseTermsContainer>
              <UseTerms>
                <form onSubmit={onSubmitCompanyTerms}>
                  <ContentSimpleComponent title="Termos de Uso da Organização - Adicione em formato HTML">
                    <Textarea
                      value={companyTermsState}
                      defaultValue={companyTermsState}
                      onChange={e => setCompanyTermsState(e.target.value)}
                      rows={10}
                    />
                  </ContentSimpleComponent>
                  <ButtonSave type="submit">
                    <BiSave color={colors.background} size={28} />
                    <Value>Salvar</Value>
                  </ButtonSave>
                </form>
              </UseTerms>
            </UseTermsContainer>
          </General>
        </Content>
      </Collapsible>
    </Section>
  );
};
