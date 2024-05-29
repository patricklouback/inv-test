import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { DropFileComponent } from '@components/DropFile';
import { Textarea } from '@components/Textarea';
import { ConfigContext } from 'contexts/ConfigContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { BiSave } from 'react-icons/bi';
import { RiFilePaperLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { RenderHeader } from '../RenderHeader';
import {
  Section,
  Content,
  General,
  DropFile,
  ButtonSave,
  Value,
  Slogam,
  DropAndSlogan,
} from './styles';

export const SectionCustomizeInterface: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { editOrganizationSlogan, editLogoOrganization, slogan, company_terms } =
    useContext(ConfigContext);
  const [row, setRow] = useState(true);
  const [sloganState, setSlogan] = useState('');
  const [file, setFile] = useState({
    name: '',
    fileData: undefined,
  });

  const onSubmitSlogan = useCallback(
    async e => {
      e.preventDefault();
      await editOrganizationSlogan(sloganState);
    },
    [editOrganizationSlogan, sloganState]
  );

  const onSubmitImage = useCallback(
    async e => {
      e.preventDefault();
      const formData = new FormData();

      formData.append('file', file.fileData);
      editLogoOrganization(formData);
    },
    [editLogoOrganization, file]
  );

  useEffect(() => {
    setSlogan(slogan);
  }, [slogan, company_terms]);

  const handleFilesChange = (files: File[]): void => {
    setFile({ name: files[0]?.name, fileData: files[0] })
  };

  return (
    <Section>
      <Collapsible
        triggerTagName="div"
        open
        trigger={
          <RenderHeader
            title="Personalizar Interface"
            icon={<RiFilePaperLine color={colors.font} size={14} />}
            stateIcon={row}
          />
        }
        onOpen={() => setRow(true)}
        onClose={() => setRow(false)}
      >
        <Content>
          <General>
            <DropAndSlogan>
              <DropFile>
                <form onSubmit={onSubmitImage}>
                  <ContentSimpleComponent title="Logo da Organização">
                    <DropFileComponent
                      name="logo"
                      // setValue={(name, file) => setFile({ name, fileData: file })}
                      onFilesChange={handleFilesChange}
                      maxFiles={1}
                    />
                  </ContentSimpleComponent>
                  <ButtonSave type="submit">
                    <BiSave color={colors.background} size={28} />
                    <Value>Salvar</Value>
                  </ButtonSave>
                </form>
              </DropFile>
              <Slogam>
                <form onSubmit={onSubmitSlogan}>
                  <ContentSimpleComponent title="Slogan da Organização">
                    <Textarea
                      value={sloganState}
                      onChange={e => setSlogan(e.target.value)}
                      rows={7}
                    />
                  </ContentSimpleComponent>
                  <ButtonSave type="submit">
                    <BiSave color={colors.background} size={28} />
                    <Value>Salvar</Value>
                  </ButtonSave>
                </form>
              </Slogam>
            </DropAndSlogan>
          </General>
        </Content>
      </Collapsible>
    </Section>
  );
};
