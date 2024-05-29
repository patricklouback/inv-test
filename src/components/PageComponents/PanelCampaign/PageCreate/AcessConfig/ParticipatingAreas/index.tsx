/* eslint-disable no-restricted-syntax */
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { CampaignContext } from 'contexts/Campaign';
import { ListenSizeContext } from 'contexts/ListenSize';
import { AreaCampaignSigned } from 'interfaces/areas';
import { useCallback, useContext, useEffect, useState, useReducer, useRef, useMemo, useLayoutEffect } from 'react';
import SelectDropdown from "react-select";
import { AreaContext } from 'contexts/AreaContext';
import { AreaDefaultValues, AreaReducer } from '../../../../../../contexts/reducers/AreaReducer';
import { PreviewUserAddsComponent } from '../PreviewUser';
import { ContainerPreview, ContentItem, Draft, IncludeAreaButton } from '../styles';

export const ParticipatingAreas: React.FC = (): JSX.Element => {
  const { areas } = useContext(AreaContext);
  const [dataReducer, dispatch] = useReducer(AreaReducer, AreaDefaultValues);

  const {
    signNewAreaCampaign,
    getAreaCampaignSigned,
    campaign,
    removeAreaCampaignSigned,
  } = useContext(CampaignContext);

  const [selectedArea, setSelectedArea] = useState<AreaCampaignSigned[]>([]);
  const [selectedAreasIds, setSelectedAreasIds] = useState<string[]>([]);
  const [areaSelectComponent, setAreaSelectComponent] = useState(0);

  const { size } = useContext(ListenSizeContext);

  const areasDropdown = useRef([]);
  
  const optionsForDropdown = useRef([]);
  const arrValidationOptionForDropdown = useRef([]);

  const setValues = useCallback(async () => {
    const data = await getAreaCampaignSigned(campaign.id);
    setSelectedArea(data);
  }, [getAreaCampaignSigned, setSelectedArea, campaign]);

  const onSetSelectedAreasIdsOnCampaign = async (): Promise<void> => {
    const data = await getAreaCampaignSigned(campaign.id)
    const arrOfIdsSignedOnCampaign = [];

    for await (const areaObject of data){
      arrOfIdsSignedOnCampaign.push(areaObject.areaId)
    }
    
    for await (const selectedAreaId of selectedAreasIds) {
      if (!arrOfIdsSignedOnCampaign.includes(selectedAreaId)) {
        await signNewAreaCampaign(campaign.id, selectedAreaId);
      }
    }

    setValues();
  }

  const setHandleDropdown = async (e:any): Promise<void> => {
    setSelectedAreasIds(Array.isArray(e) ? e.map((area) => area.value) : []);
  };

  useEffect(() => {
    if (campaign) {
      setValues();
    }
  }, [campaign, setValues]);

  const onRemoveArea = useCallback(
    async (id: string) => {
      optionsForDropdown.current = [];

      const removedArea = await removeAreaCampaignSigned(id);
      const data = await getAreaCampaignSigned(campaign.id);
      setSelectedArea(data);

      /* optionsForDropdown.current.push({
        value: removedArea.data.campaignArea.areaId,
        label: removedArea.data.campaignArea.area.name
      }) */

      setAreaSelectComponent(Math.random() + 1)
      window.location.reload();
      // return optionsForDropdown;
    },
    [removeAreaCampaignSigned, getAreaCampaignSigned, campaign]
  );
  
  useEffect(() => {
    async function getAreas(): Promise<any> {
      try {
        optionsForDropdown.current = [];
        const { data } = await api.get('/areas/list');
        areasDropdown.current = data.areas;

        for (const selArea of selectedArea) {
          arrValidationOptionForDropdown.current.push(selArea.areaId)
        }

        for (const areaDropdown of areasDropdown.current) {
          if(!arrValidationOptionForDropdown.current.includes(areaDropdown.id)) {
            optionsForDropdown.current.push({
              value: areaDropdown.id,
              label: areaDropdown.name
            })       
          }
        }
        return optionsForDropdown;
      } catch (error) {
        toast.info('Error ao buscar as áreas');
      }
    }
    getAreas();
    setAreaSelectComponent(Math.random());
  }, [areasDropdown, optionsForDropdown, selectedArea]);

  return (
    <Draft size={size}>
      <ContentSimpleComponent
        title="Áreas Participantes"
        styles={{ max_width: 450 }}
      >
        <ContentItem>
          <SelectDropdown 
            options={optionsForDropdown.current} 
            onChange={setHandleDropdown} 
            isMulti
            placeholder = 'Selecione as áreas do Direcional'
            // defaultValue={arrDefaultOptionsDropdown}
            key={areaSelectComponent}
          />
          <IncludeAreaButton />
          <button className='area-btn' type='button' onClick={onSetSelectedAreasIdsOnCampaign}>Incluir áreas selecionadas</button> 
          <ContainerPreview height={380}>
            {selectedArea.map(e => (
              <PreviewUserAddsComponent
                key={e.area.id}
                clickRemove={() => onRemoveArea(e.id)}
                name={e.area.name}
                color={e.area.color}
                type
              />
            ))}
          </ContainerPreview>
        </ContentItem>
      </ContentSimpleComponent>
    </Draft>
  );
};
