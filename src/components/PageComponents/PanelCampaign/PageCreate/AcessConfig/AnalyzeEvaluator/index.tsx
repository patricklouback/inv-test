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

const EVALUATOR_ANALYZE_KEY = 'EVALUATOR_ANALYZE';

export const AnalyzeEvaluator: React.FC = (): JSX.Element => {
  const {
    removeCampaignUser,
    getCampaignUsersSigned,
    signNewCampaignUser,
    searchCampaignUsers,
    campaign,
  } = useContext(CampaignContext);

  const [selectedSuports, setSelectedSuports] = useState<CampaignUser[]>([]);
  const [selectSuportOptions, setSelectedSuportOptions] = useState<
    CampaignUserOptions[]
  >([]);

  const onSearchSuports = useCallback(
    async search => {
      const data = await searchCampaignUsers(
        search,
        campaign?.id,
        EVALUATOR_ANALYZE_KEY
      );
      setSelectedSuportOptions(data);
    },
    [searchCampaignUsers, campaign?.id]
  );

  const setValues = useCallback(async () => {
    const data = await getCampaignUsersSigned(
      campaign.id,
      EVALUATOR_ANALYZE_KEY
    );
    setSelectedSuports(data);
  }, [setSelectedSuports, getCampaignUsersSigned, campaign]);

  useEffect(() => {
    if (campaign) {
      setValues();
    }
  }, [campaign, setValues]);

  const selectUserSuport = useCallback(
    async ({ value }) => {
      await signNewCampaignUser(value, campaign.id, EVALUATOR_ANALYZE_KEY);
      const data = await getCampaignUsersSigned(
        campaign.id,
        EVALUATOR_ANALYZE_KEY
      );
      setSelectedSuports(data);
      setSelectedSuportOptions([]);
    },
    [signNewCampaignUser, getCampaignUsersSigned, campaign]
  );

  const removeUserSuport = useCallback(
    async (value: string) => {
      await removeCampaignUser(value);
      const data = await getCampaignUsersSigned(
        campaign.id,
        EVALUATOR_ANALYZE_KEY
      );
      setSelectedSuports(data);
    },
    [removeCampaignUser, getCampaignUsersSigned, campaign]
  );

  const { size } = useContext(ListenSizeContext);

  return (
    <Draft size={size}>
      <ContentSimpleComponent
        title="Avaliador - Análise"
        tooltipMessage="Tem acesso ao funil de aprovação com as inciativas deste direcional que estão na coluna Análise."
      >
        <ContentItem>
          <Select
            name="suport"
            placeholder="Digite o nome do avaliador suporte"
            icon={<RiUser3Line size={20} />}
            dataSelect={selectSuportOptions}
            onChange={onSearchSuports}
            onClickOption={selectUserSuport}
            setClean={setSelectedSuportOptions}
          />
          <ContainerPreview>
            {selectedSuports.map(e => (
              <PreviewUserAddsComponent
                key={e.user.id}
                clickRemove={() => removeUserSuport(e.id)}
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
