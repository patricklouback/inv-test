import { useTheme } from 'styled-components';

import { InfoWarning } from '@components/InfoWarning';
import { IdeaFieldDragAndDrop } from '@components/IdeaFieldDragAndDrop';
import { DefaultSection } from '@components/SectionDefault';
import ButtonLink from '@components/Link';
import { IdeaFieldsTemplate } from '@components/Modals/IdeaFieldsTemplateModal';

// ICONS
import { RiLightbulbFlashLine } from 'react-icons/ri';

import { useCallback, useContext, useState } from 'react';
import { ListenSizeContext } from 'contexts/ListenSize';
import { Container, Form, Row, Warning } from './styles';

type IdeaFormConfigProps = {
  campaignId: string;
};

export const IdeaFormConfig = ({
  campaignId,
}: IdeaFormConfigProps): JSX.Element => {
  const { colors } = useTheme();
  const { size } = useContext(ListenSizeContext);

  const [isOpenImportTemplateModal, setIsOpenImportTemplateModal] =
    useState<boolean>(false);

  const handleClickImportTemplate = useCallback(() => {
    setIsOpenImportTemplateModal(true);
  }, []);

  const handleCloseImportTemplateModal = useCallback(() => {
    setIsOpenImportTemplateModal(false);
  }, []);

  return (
    <Container>
      <IdeaFieldsTemplate
        isOpen={isOpenImportTemplateModal}
        campaignId={campaignId}
        onRequestClose={handleCloseImportTemplateModal}
      />
      <DefaultSection
        borderBottom
        type="full"
        header={{
          box_icon: <RiLightbulbFlashLine color={colors.font} size={20} />,
          title: 'Formulário de Iniciativas',
          item_right: (
            <ButtonLink
              value="Importar Template"
              background={colors.background}
              max={200}
              height={40}
              borderRadius={8}
              borderStyle="solid"
              borderColor={colors.borders}
              borderWidth={2}
              hover={colors.backgroundGrey}
              hoverWeigth={500}
              onClick={handleClickImportTemplate}
            />
          ),
        }}
      >
        <Form>
          <InfoWarning
            type="INFO"
            text="Para haver submissão de uma iniciativa é preciso preencher este formulário. As alterações afetam apenas as futuras iniciativas, sem impacto retroativo. "
          />
          <Warning>
            <strong>
              Atenção: não cadastrar campos título, descrição e resumo.
            </strong>
          </Warning>
          <Row size={size}>
            <IdeaFieldDragAndDrop campaignId={campaignId} />
          </Row>
        </Form>
      </DefaultSection>
    </Container>
  );
};
