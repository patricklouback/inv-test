import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { Select } from '@components/Select';
import { CampaignContext } from 'contexts/Campaign';
import { ListenSizeContext } from 'contexts/ListenSize';
import { CampaignUser } from 'interfaces/campaign';
import { User } from 'interfaces/user';
import { useCallback, useContext, useEffect, useState } from 'react';
import { RiUser3Line } from 'react-icons/ri';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { PreviewUserAddsComponent } from '../PreviewUser';
import {
  CampaignAreaRepresentativeTypeTip,
  ContainerPreview,
  ContentItem,
  Draft,
  UserTypeTooltip,
} from '../styles';

type CampaignUserOptions = Pick<User, 'id' | 'name'>;

export const AreaRepresentative: React.FC = (): JSX.Element => {
  const {
    getCampaignUsersSigned,
    removeCampaignUser,
    signNewCampaignUser,
    searchCampaignUsers,
    campaign,
  } = useContext(CampaignContext);

  const [selectedRepresentative, setSelectedRepresentative] = useState<
    CampaignUser[]
  >([]);
  const [
    selectedAreaRepresentativeOptions,
    setSelectedAreaRepresentativeOptions,
  ] = useState<CampaignUserOptions[]>([]);

  const onSearchAreaPresentative = useCallback(
    async search => {
      const data = await searchCampaignUsers(search, campaign?.id, 'AGENT');
      setSelectedAreaRepresentativeOptions(data);
    },
    [searchCampaignUsers, campaign?.id]
  );

  const setValues = useCallback(async () => {
    const data = await getCampaignUsersSigned(campaign.id, 'AGENT');
    setSelectedRepresentative(data);
  }, [setSelectedRepresentative, getCampaignUsersSigned, campaign]);

  useEffect(() => {
    if (campaign) {
      setValues();
    }
  }, [campaign, setValues]);

  const selectAreaPresentative = useCallback(
    async ({ value }) => {
      await signNewCampaignUser(value, campaign.id, 'AGENT');
      const data = await getCampaignUsersSigned(campaign.id, 'AGENT');
      setSelectedRepresentative(data);
      setSelectedAreaRepresentativeOptions([]);
    },
    [signNewCampaignUser, getCampaignUsersSigned, campaign]
  );

  const removeAreaRepresentative = useCallback(
    async (value: string) => {
      await removeCampaignUser(value);
      const data = await getCampaignUsersSigned(campaign.id, 'AGENT');
      setSelectedRepresentative(data);
    },
    [removeCampaignUser, getCampaignUsersSigned, campaign]
  );

  const { size } = useContext(ListenSizeContext);

  return (
    <Draft size={size}>
      <ContentSimpleComponent
        title="Representante das Áreas"
        tooltipMessage="Quando solicitado, avalia a viabilidade técnica das iniciativas
              propostas e tem acesso ao funil de aprovação com as iniciativas do
              direcional."
      >
        <ContentItem>
          <Select
            name="evaluator"
            placeholder="Selecione os representantes da área"
            icon={<RiUser3Line size={20} />}
            dataSelect={selectedAreaRepresentativeOptions}
            onChange={onSearchAreaPresentative}
            onClickOption={selectAreaPresentative}
            setClean={setSelectedAreaRepresentativeOptions}
          />
          <ContainerPreview>
            {selectedRepresentative.map(e => (
              <PreviewUserAddsComponent
                key={e.user.id}
                clickRemove={() => removeAreaRepresentative(e.id)}
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
