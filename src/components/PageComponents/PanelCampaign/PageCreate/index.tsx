/* eslint-disable no-restricted-syntax */
import React from 'react';
import { TourCampaignStep2 } from '@components/TourApp/TourCampaign/Step2';
import { Campaign } from '@default-types';
import { AuthContext } from 'contexts/AuthContext';
import { CampaignContext } from 'contexts/Campaign';
import { CampaignUsersContext } from 'contexts/CampaignUsers';
import { NotificationsContext } from 'contexts/Notification';
import { TourId, TourStatus } from 'interfaces/tour';
import { useCallback, useContext, useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { FiPause, FiSend } from 'react-icons/fi';
import { AcessConfig } from './AcessConfig';
import { StepCreate } from './CreateCampaign';
import { IdeaFormConfig } from './IdeaFormConfig';
import { StepsConfig } from './StepStepsConfig';
import { FooterButtons } from './styles';
import { EvaluationCriteriaCampaign } from './EvaluationCriteriaCampaign';

interface NewCampaignProps {
  campaignId?: string;
}

interface CampaignUser {
  userId: string;
  type: string;
  campaignId: string;
}

const UserTypes = {
  MANAGER: 'Gestor',
  EVALUATOR: 'Avaliador - Triagem',
  SUPPORT: 'Avaliador - Suporte',
  AGENT: 'Representante das Áreas',
};

export function NewCampaign({ campaignId }: NewCampaignProps): JSX.Element {
  const { campaign, updateCampaign, getCampaign } = useContext(CampaignContext);
  const { user } = useContext(AuthContext);
  const unviewedCampaignStep2 =
    user?.tours[TourId.CAMPAIGN_STEP_TWO] === TourStatus.UNVIEWED;

  const { getCampaingUsers } = useContext(CampaignUsersContext);
  const { createNotification } = useContext(NotificationsContext);

  const handleCreateUserNotifications = useCallback(
    async (campaignUsers: CampaignUser[], campaign: Campaign) => {
      for await (const u of campaignUsers) {
        const type = UserTypes[u.type];
        await createNotification({
          userIds: [u.userId],
          link: `/campaign/detailed-campaign?campaignId=${campaign?.id}`,
          description: `indicou você como ${type} no direcional ${campaign?.title}`,
          type: 'SEND_CAMPAIGN',
        });
      }
    },
    [createNotification]
  );

  const toggleEvaluationCriteria = useCallback(async () => {
    await updateCampaign(
      {
        usingCriteria: !campaign.usingCriteria,
      },
      !campaign.usingCriteria
        ? 'Critérios de avaliação ativados'
        : 'Critérios de avaliação desativados'
    );
  }, [campaign, updateCampaign]);

  const handlePublishCampaign = useCallback(async () => {
    const published = await updateCampaign({
      status: 'PUBLISHED',
    });
    if (published === 'PUBLISHED') {
      const campaignUsers = await getCampaingUsers(campaign.id);
      await handleCreateUserNotifications(campaignUsers, campaign);

      if (hotjar.initialized()) {
        hotjar.event('publish_campaign');
      } else {
        console.error('hotjar não inicializado corretamente');
      }
    }
  }, [
    campaign,
    getCampaingUsers,
    handleCreateUserNotifications,
    updateCampaign,
  ]);

  const handlePauseCampaign = useCallback(async () => {
    await updateCampaign({
      status: 'WAITING',
    });
  }, [updateCampaign]);

  useEffect(() => {
    async function loadCampaign(): Promise<void> {
      await getCampaign(campaignId);
    }

    if (campaignId) {
      loadCampaign();
    }
  }, [campaignId, getCampaign]);

  return (
    <>
      <StepCreate />

      {campaign?.id && (
        <>
          {unviewedCampaignStep2 && <TourCampaignStep2 />}
          <AcessConfig />
          <EvaluationCriteriaCampaign
            toggleEvaluationCriteria={toggleEvaluationCriteria}
            campaignId={campaign.id}
            isToggleActive={campaign.usingCriteria}
            campaign={campaign}
          />
          <StepsConfig />
          <IdeaFormConfig campaignId={campaign.id} />
          <FooterButtons>
            {campaign?.status === 'PUBLISHED' && (
              <button
                type="button"
                className="pause"
                onClick={handlePauseCampaign}
              >
                <FiPause size={20} />
                Pausar Submissões
              </button>
            )}

            {campaign?.status !== 'PUBLISHED' && (
              <button
                type="button"
                className="send"
                onClick={handlePublishCampaign}
              >
                <FiSend size={20} />
                Publicar Direcional
              </button>
            )}
          </FooterButtons>
        </>
      )}
    </>
  );
}
