import { InfoWarning } from '@components/InfoWarning';
import ButtonLink from '@components/Link';
import { DefaultSection } from '@components/SectionDefault';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';

import { ProcessActivityTemplate } from '@components/Modals/ProcessActivityTemplateModal';
import { SectionProcessActivity } from '@components/PageComponents/ManagementPlatform/ProcessActivity';
import { CampaignContext } from 'contexts/Campaign';
import { Container } from './syles';

export const StepsConfig: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { campaign } = useContext(CampaignContext);

  const [isOpenImportTemplateModal, setIsOpenImportTemplateModal] =
    useState<boolean>(false);
  const [reRenderComponent, setReRenderComponent] = useState<boolean>(false);

  const handleClickImportTemplate = useCallback(() => {
    setIsOpenImportTemplateModal(true);
  }, []);

  const handleCloseImportTemplateModal = useCallback(() => {
    setIsOpenImportTemplateModal(false);
  }, []);

  const handleImportProcessActivities = useCallback(() => {
    setReRenderComponent(true);
  }, []);

  useEffect(() => {
    if (reRenderComponent) {
      setReRenderComponent(false);
    }
  }, [reRenderComponent]);

  return (
    <Container>
      <ProcessActivityTemplate
        isOpen={isOpenImportTemplateModal}
        campaignId={campaign.id}
        onRequestClose={handleCloseImportTemplateModal}
        onImportProcessActivities={handleImportProcessActivities}
      />
      <DefaultSection
        borderBottom
        type="full"
        header={{
          box_icon: (
            <RiLightbulbFlashLine
              color={colors.font}
              size={20}
              className="icon-process"
            />
          ),
          title: 'Processo Desenvolvimento Iniciativas',
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
        <>
          <InfoWarning
            type="INFO"
            text="O fluxo de trabalho de uma iniciativa depende da rota escolhida pelo avaliador / gestor. Alterações afetam apenas as futuras iniciativas, sem impacto retroativo."
          />
          <SectionProcessActivity
            hideHeader
            // hideCreateNewProcess
            campaignId={campaign.id}
            reRenderComponent={reRenderComponent}
            setReRenderComponent={handleImportProcessActivities}
          />
        </>
      </DefaultSection>
    </Container>
  );
};
