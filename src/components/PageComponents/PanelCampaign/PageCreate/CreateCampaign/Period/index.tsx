import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { Input } from '@components/InputText';
import { CampaignContext } from 'contexts/Campaign';
import { useContext, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import { useTheme } from 'styled-components';
import { Item, ErrorText } from './style';

interface PeriodCampaign {
  register?: any;
  errors?: FieldErrors;
}

export function PeriodCampaign({
  register,
  errors,
}: PeriodCampaign): JSX.Element {
  const [stepDate, setStepDate] = useState({ start: 'text', end: 'text' });
  const { campaign } = useContext(CampaignContext);

  const { colors } = useTheme();

  const props = {
    max_width: 240,
    height: 69,
  };

  return (
    <ContentSimpleComponent title="5. Duração">
      <Item>
        <div style={{ margin: '5px 0' }}>
          <Input
            {...props}
            onFocus={() => setStepDate({ ...stepDate, start: 'date' })}
            onBlur={e =>
              e.target.value === '' &&
              setStepDate({ ...stepDate, start: 'text' })
            }
            register={register}
            type={stepDate.start}
            placeholder={
              campaign?.startDate.toString().substring(0, 10) ?? 'Data Início'
            }
            name="startDate"
            datatype="startDate"
            id="startDate"
          />
          {errors && Object.entries(errors).length !== 0 && (
            <ErrorText>
              {Object.entries(errors).map(
                item =>
                  item[0] === 'startDate' && (
                    <>
                      <BiErrorCircle
                        color={colors.notification.error}
                        size={22}
                      />
                      {item[1].message}
                    </>
                  )
              )}
            </ErrorText>
          )}
        </div>
        <div style={{ margin: '5px 0' }}>
          <Input
            {...props}
            onFocus={() => setStepDate({ ...stepDate, end: 'date' })}
            register={register}
            onBlur={e =>
              e.target.value === '' && setStepDate({ ...stepDate, end: 'text' })
            }
            type={stepDate.end}
            placeholder={
              campaign?.endDate.toString().substring(0, 10) ?? 'Data Final'
            }
            name="endDate"
            datatype="startDate"
            id="endDate"
          />
          {errors && Object.entries(errors).length !== 0 && (
            <ErrorText>
              {Object.entries(errors).map(
                item =>
                  item[0] === 'endDate' && (
                    <>
                      <BiErrorCircle
                        color={colors.notification.error}
                        size={22}
                      />
                      {item[1].message}
                    </>
                  )
              )}
            </ErrorText>
          )}
        </div>
      </Item>
    </ContentSimpleComponent>
  );
}
