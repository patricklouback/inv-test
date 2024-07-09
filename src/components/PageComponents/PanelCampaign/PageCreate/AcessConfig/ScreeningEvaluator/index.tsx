import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { Select } from '@components/Select';
import { CampaignContext } from 'contexts/Campaign';
import { ListenSizeContext } from 'contexts/ListenSize';
import { CampaignUser } from 'interfaces/campaign';
import { User } from 'interfaces/user';
import { useCallback, useContext, useEffect, useState } from 'react';
import { RiUser3Line } from 'react-icons/ri';
import { PreviewUserAddsComponent } from '../PreviewUser';
import { ContainerPreview, ContentItem, Draft } from '../styles';

type CampaignUserOptions = Pick<User, 'id' | 'name'>;

const EVALUATOR_SCREENING_KEY = 'EVALUATOR_SCREENING';

export const ScreeningEvaluator: React.FC = (): JSX.Element => {
  const {
    removeCampaignUser,
    getCampaignUsersSigned,
    signNewCampaignUser,
    searchCampaignUsers,
    campaign,
  } = useContext(CampaignContext);

  const [selectedEvaluators, setSelectedEvaluators] = useState<CampaignUser[]>(
    []
  );
  const [selectEvaluatorOptions, setSelectedEvaluatorOptions] = useState<
    CampaignUserOptions[]
  >([]);

  const { size } = useContext(ListenSizeContext);

  const onSearchEvaluators = useCallback(
    async search => {
      const data = await searchCampaignUsers(
        search,
        campaign?.id,
        EVALUATOR_SCREENING_KEY
      );
      setSelectedEvaluatorOptions(data);
    },
    [searchCampaignUsers, campaign?.id]
  );

  const setValues = useCallback(async () => {
    const data = await getCampaignUsersSigned(
      campaign.id,
      EVALUATOR_SCREENING_KEY
    );
    setSelectedEvaluators(data);
  }, [setSelectedEvaluators, getCampaignUsersSigned, campaign]);

  useEffect(() => {
    if (campaign) {
      setValues();
    }
  }, [campaign, setValues]);

  const selectUserEvaluator = useCallback(
    async ({ value }) => {
      await signNewCampaignUser(value, campaign.id, EVALUATOR_SCREENING_KEY);
      const data = await getCampaignUsersSigned(
        campaign.id,
        EVALUATOR_SCREENING_KEY
      );
      setSelectedEvaluators(data);
      setSelectedEvaluatorOptions([]);
    },
    [signNewCampaignUser, getCampaignUsersSigned, campaign]
  );

  const removeUserEvaluator = useCallback(
    async (value: string) => {
      await removeCampaignUser(value);
      const data = await getCampaignUsersSigned(
        campaign.id,
        EVALUATOR_SCREENING_KEY
      );
      setSelectedEvaluators(data);
    },
    [removeCampaignUser, getCampaignUsersSigned, campaign]
  );

  return (
    <Draft size={size}>
      <ContentSimpleComponent
        title="Avaliador - Triagem"
        tooltipMessage="Tem acesso ao funil de aprovação com as inciativas deste direcional que estão na coluna Triagem."
      >
        <ContentItem>
          <Select
            name="evaluator"
            placeholder="Digite o nome do avaliador"
            icon={<RiUser3Line size={20} />}
            dataSelect={selectEvaluatorOptions}
            onChange={onSearchEvaluators}
            onClickOption={selectUserEvaluator}
            setClean={setSelectedEvaluatorOptions}
          />
          <ContainerPreview>
            {selectedEvaluators.map(e => (
              <PreviewUserAddsComponent
                key={e.user.id}
                clickRemove={() => removeUserEvaluator(e.id)}
                name={e.user.name}
                image={e.user.image}
                areaName={e.user?.area.name}
                areaColor={e.user?.area.color}
              />
            ))}
          </ContainerPreview>
        </ContentItem>
      </ContentSimpleComponent>
    </Draft>
  );
};
