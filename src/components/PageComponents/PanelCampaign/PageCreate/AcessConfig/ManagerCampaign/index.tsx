import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { Select } from '@components/Select';
import { CampaignContext } from 'contexts/Campaign';
import { ListenSizeContext } from 'contexts/ListenSize';
import { CampaignUser } from 'interfaces/campaign';
import { User } from 'interfaces/user';
import { debounce } from 'lodash';
import { useCallback, useContext, useEffect, useState } from 'react';
import { RiUser3Line } from 'react-icons/ri';
import { PreviewUserAddsComponent } from '../PreviewUser';
import { ContainerPreview, ContentItem, Draft } from '../styles';

type CampaignUserOptions = Pick<User, 'id' | 'name'>;

export const ManagerCampaign: React.FC = (): JSX.Element => {
  const [selectedManagers, setSelectedManagers] = useState<CampaignUser[]>([]);
  const [selectManagerOptions, setSelectedManagerOptions] = useState<
    CampaignUserOptions[]
  >([]);

  const {
    removeCampaignUser,
    getCampaignUsersSigned,
    signNewCampaignUser,
    searchCampaignUsers,
    campaign,
  } = useContext(CampaignContext);

  const { size } = useContext(ListenSizeContext);

  const onSearchManagers = useCallback(
    async search => {
      const data = await searchCampaignUsers(search, campaign?.id, 'MANAGER');
      setSelectedManagerOptions(data);
    },
    [searchCampaignUsers, campaign?.id]
  );

  const setValues = useCallback(async () => {
    const data = await getCampaignUsersSigned(campaign.id, 'MANAGER');
    setSelectedManagers(data);
  }, [setSelectedManagers, getCampaignUsersSigned, campaign]);

  useEffect(() => {
    if (campaign) {
      setValues();
    }
  }, [campaign, setValues]);

  const selectUserManager = useCallback(
    async ({ value }) => {
      await signNewCampaignUser(value, campaign.id, 'MANAGER');
      const data = await getCampaignUsersSigned(campaign.id, 'MANAGER');
      setSelectedManagers(data);
      setSelectedManagerOptions([]);
    },
    [signNewCampaignUser, getCampaignUsersSigned, campaign]
  );

  const removeUserManager = useCallback(
    async (value: string) => {
      await removeCampaignUser(value);
      const data = await getCampaignUsersSigned(campaign.id, 'MANAGER');
      setSelectedManagers(data);
    },
    [removeCampaignUser, getCampaignUsersSigned, campaign]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchQueryChange = useCallback(
    debounce((search: string) => onSearchManagers(search), 300),
    []
  );

  return (
    <Draft size={size}>
      <ContentSimpleComponent
        title="Responsável pelo Direcional"
        tooltipMessage="Tem acesso ao funil de aprovação com apenas com as iniciativas deste direcional."
        styles={{ max_width: 450 }}
      >
        <ContentItem>
          <Select
            name="manager"
            placeholder="Digite o nome do responsável"
            icon={<RiUser3Line size={20} />}
            dataSelect={selectManagerOptions}
            onChange={handleSearchQueryChange}
            onClickOption={selectUserManager}
            setClean={setSelectedManagerOptions}
          />
          <ContainerPreview>
            {selectedManagers.map((e: any) => (
              <PreviewUserAddsComponent
                key={e.user?.id}
                clickRemove={() => removeUserManager(e.id)}
                name={e.user?.name}
                image={e.user?.image}
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
