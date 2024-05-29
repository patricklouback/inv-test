import React, { useCallback, useContext, useEffect, useState } from 'react';
import { EvaluationCriteriaCampaignContext } from 'contexts/EvaluationCriteriaCampaign';

import { DefaultSection } from '@components/SectionDefault';
import { RiPencilLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { EvaluationCriteria } from '@components/PageComponents/ManagementPlatform/EvaluationCriteriaConfig/EvaluationCriteria';
import { IEvaluationCriteria } from 'interfaces/evaluationCriteria';
import { Campaign } from '@default-types';
import ButtonLink from '@components/Link';
import { Container } from './style';
import { EvaluationCriteriaTemplateModal } from './EvaluationCriteriaTemplateModal';

export const EvaluationCriteriaCampaign: React.FC<{
  campaignId: string;
  isToggleActive: boolean;
  toggleEvaluationCriteria?: () => Promise<void>;
  campaign: Campaign;
}> = ({
  campaignId,
  isToggleActive,
  toggleEvaluationCriteria,
  campaign,
}): JSX.Element => {
  const { colors } = useTheme();
  const [isOpenImportTemplateModal, setIsOpenImportTemplateModal] =
    useState<boolean>(false);

  const handleClickImportTemplate = useCallback(() => {
    setIsOpenImportTemplateModal(true);
  }, []);

  const handleCloseImportTemplateModal = useCallback(() => {
    setIsOpenImportTemplateModal(false);
  }, []);

  const {
    evaluationCriteriasCampaign,
    getEvaluationCriteriaCampaign,
    updateEvaluationCriteriaCampaign,
    createEvaluationCriteriaCampaign,
    deleteEvaluationCriteriaCampaign,
  } = useContext(EvaluationCriteriaCampaignContext);
  useEffect(() => {
    getEvaluationCriteriaCampaign(campaignId);
  }, []);

  const handleUpdateEvaluationCriteriaCampaign = async (
    evaluationCriteriaId: string,
    dataWithoutCampaign: IEvaluationCriteria
  ): Promise<{ updated: boolean }> => {
    const data = { ...dataWithoutCampaign, campaignId };
    const result = await updateEvaluationCriteriaCampaign(
      evaluationCriteriaId,
      data
    );
    return result;
  };
  const handleCreateEvaluationCriteriaCampaign = async (
    dataWithoutCampaign: IEvaluationCriteria
  ): Promise<{ created: boolean }> => {
    const data = { ...dataWithoutCampaign, campaignId };
    const result = await createEvaluationCriteriaCampaign(data);
    return result;
  };
  const handleDeleteEvaluationCriteriaCampaign = async (
    evaluationCriteriaId: string
  ): Promise<{ deleted: boolean }> => {
    const result = await deleteEvaluationCriteriaCampaign(
      evaluationCriteriaId,
      campaignId
    );
    return result;
  };

  return (
    <Container>
      <EvaluationCriteriaTemplateModal
        isOpen={isOpenImportTemplateModal}
        campaignId={campaign.id}
        onRequestClose={handleCloseImportTemplateModal}
      />
      <DefaultSection
        borderBottom
        type="full"
        header={{
          box_icon: <RiPencilLine color={colors.font} size={20} />,
          title: 'Gerenciamento de critérios',
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
        <EvaluationCriteria
          isToggleActive={isToggleActive}
          toggleEvaluationCriteria={toggleEvaluationCriteria}
          hideHeader
          evaluationCriterias={evaluationCriteriasCampaign}
          updateEvaluationCriteria={handleUpdateEvaluationCriteriaCampaign}
          createEvaluationCriteria={handleCreateEvaluationCriteriaCampaign}
          deleteEvaluationCriteria={handleDeleteEvaluationCriteriaCampaign}
          campaign={campaign}
        />
      </DefaultSection>
    </Container>
  );
};
