/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import Button from '@components/Button';
import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { Input } from '@components/InputText';
import { DefaultSection } from '@components/SectionDefault';
import { Textarea } from '@components/Textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateCampaign } from '@validators/campaign';
import { CampaignContext } from 'contexts/Campaign';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { CampaignField } from 'interfaces/campaign';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';
import { RiTrophyLine } from 'react-icons/ri';
import slugify from 'slugify';
import { useTheme } from 'styled-components';
import { DropImageComponent } from '../../../../DropImage';
import { CampaignFieldsToRender } from './CampaignFieldsToRender';
import { ErrorText } from './Period/style';
import { ButtonSave, Container, Form, Item, Row, Value } from './styles';

interface CampaignFieldValue {
  id?: string;
  campaignId?: string;
  value: string;
}
interface CampaignFieldFormProps extends CampaignField {
  name: string;
  campaignFieldValues: CampaignFieldValue[];
}

export const StepCreate = () => {
  const { colors } = useTheme();
  const campaignFieldsText = 'Digite aqui o valor para o campo';
  registerLocale('pt-BR', pt);
  const {
    sendNewCampaign,
    campaign,
    updateCampaign,
    getDefaultCampaignFields,
    getSelectedCampaignFieldsValues,
    campaignFields,
    selectedCampaignFields,
    loading,
  } = useContext(CampaignContext);

  const [data, setData] = useState<{ image: any }>({ image: null });
  const [campaignFieldsForm, setCampaignFieldsForm] = useState<
    CampaignFieldFormProps[]
  >([]);
  const [addNewField, setAddNewField] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(yupValidateCampaign),
  });

  const handleChangeFieldValue = useCallback(
    (name: string, value: string) => {
      setCampaignFieldsForm(state => {
        const editedIndex = state.findIndex(i => i.name === name);

        const newValue = [
          {
            value,
          },
        ];

        state[editedIndex]?.campaignFieldValues?.length > 0
          ? (state[editedIndex].campaignFieldValues[0].value = value)
          : (state[editedIndex].campaignFieldValues = newValue);

        setValue('campaignFields', JSON.stringify([...state]));
        return [...state];
      });
    },
    [setValue]
  );

  const handleCreateCampaignField = useCallback(
    (title: string): void => {
      const newCampaignField: CampaignFieldFormProps = {
        id: null,
        campaignId: null,
        sequence:
          campaignFieldsForm.length > 0
            ? campaignFieldsForm[campaignFieldsForm.length - 1].sequence + 1 ||
              1
            : 1,
        status: 'ACTIVE',
        title,
        name: slugify(title, {
          trim: true,
          replacement: '-',
          lower: true,
        }),
        campaignFieldValues: [
          {
            value: null,
          },
        ],
      };

      const newCampaignFieldsForm: CampaignFieldFormProps[] = [
        ...campaignFieldsForm,
        newCampaignField,
      ];

      setCampaignFieldsForm(newCampaignFieldsForm);

      setAddNewField(false);
    },
    [setCampaignFieldsForm, campaignFieldsForm]
  );

  useEffect(() => {
    if (campaign?.id) {
      getSelectedCampaignFieldsValues(campaign?.id);
      setValue('title', campaign.title);
      setValue('goals', campaign.goals);
      setValue('description', campaign.description);
      setValue('summary', campaign.summary);
      setValue(
        'startDate',
        new Date(campaign.startDate.replace(/-/g, '/').replace(/T.+/, ''))
      );
      setValue(
        'endDate',
        new Date(campaign.endDate.replace(/-/g, '/').replace(/T.+/, ''))
      );
      setValue('campaignFields', selectedCampaignFields);
    } else {
      getDefaultCampaignFields();
    }
  }, [campaign, getDefaultCampaignFields, getSelectedCampaignFieldsValues]);

  useEffect(() => {
    let formattedCampaignFields = [];
    if (campaign?.id) {
      formattedCampaignFields = [...selectedCampaignFields];
    } else if (campaignFields.length > 0) {
      formattedCampaignFields = campaignFields.map(cfs => {
        return {
          ...cfs,
          name: slugify(cfs.title, {
            trim: true,
            replacement: '-',
            lower: true,
          }),
        };
      });
    }
    setCampaignFieldsForm(formattedCampaignFields);
  }, [campaignFields, selectedCampaignFields]);

  return (
    <Container>
      <DefaultSection
        borderBottom
        type="full"
        header={{
          box_icon: <RiTrophyLine color={colors.font} size={20} />,
          title: `${campaign ? 'Editar Direcional' : 'Criar Direcional'}`,
        }}
      >
        <Form
          encType="multipart/form-data"
          onSubmit={
            !campaign?.id
              ? handleSubmit(e =>
                  sendNewCampaign({
                    ...e,
                    image: data.image,
                  })
                )
              : handleSubmit(e => {
                  updateCampaign({
                    ...e,
                    startDate: format(new Date(e.startDate), 'yyyy-MM-dd'),
                    endDate: format(new Date(e.endDate), 'yyyy-MM-dd'),
                    image: data.image,
                  });
                })
          }
        >
          <Row>
            <ContentSimpleComponent title="1. Título">
              <Input
                errors={errors}
                name="title"
                placeholder="Digite aqui o título da direcional"
                defaultValue={campaign?.title}
                {...register('title')}
              />
            </ContentSimpleComponent>
            <ContentSimpleComponent title="2. Resumo">
              <Textarea
                errors={errors}
                name="summary"
                onChange={e => setValue('summary', e.target.value)}
                register={register}
                rows={7}
                placeholder="Digite aqui o resumo da direcional"
                defaultValue={campaign?.summary}
                mark
              />
            </ContentSimpleComponent>
          </Row>
          <Row>
            <ContentSimpleComponent title="3. Descrição">
              <Textarea
                errors={errors}
                onChange={e => setValue('description', e.target.value)}
                name="description"
                register={register}
                rows={6}
                placeholder="Digite aqui a descrição da direcional"
                defaultValue={campaign?.description}
                mark
              />
            </ContentSimpleComponent>
            <ContentSimpleComponent title="4. Objetivos Estratégicos">
              <Textarea
                errors={errors}
                onChange={e => setValue('goals', e.target.value)}
                name="goals"
                register={register}
                rows={6}
                placeholder="Digite aqui o objetivo estratégico da direcional"
                defaultValue={campaign?.goals}
                mark
              />
            </ContentSimpleComponent>
          </Row>
          <Row>
            <ContentSimpleComponent title="5. Duração">
              <Item>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <DatePicker
                        className="datePicker"
                        locale="pt-BR"
                        dateFormat="dd/MM/yyyy"
                        selected={value}
                        placeholderText="Data de ínicio"
                        minDate={new Date()}
                        onChange={onChange}
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
                    </>
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <DatePicker
                        className="datePicker"
                        locale="pt-BR"
                        dateFormat="dd/MM/yyyy"
                        selected={value}
                        placeholderText="Data de fim"
                        minDate={new Date()}
                        onChange={onChange}
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
                    </>
                  )}
                />
              </Item>
            </ContentSimpleComponent>
            <ContentSimpleComponent title="6. Banner">
              <DropImageComponent
                setValue={(name, datas) => setData({ ...data, [name]: datas })}
                defaultValue={campaign?.image}
                name="image"
              />
            </ContentSimpleComponent>
          </Row>
          {campaignFieldsForm.length > 0 &&
            campaignFieldsForm.map((field, i) => {
              return (
                <Row>
                  <ContentSimpleComponent title={`${i + 7}. ${field.title}`}>
                    <Textarea
                      errors={errors}
                      name={field.name}
                      rows={6}
                      defaultValue={
                        field?.campaignFieldValues?.length > 0
                          ? field.campaignFieldValues[0]?.value
                          : ''
                      }
                      onChange={e =>
                        handleChangeFieldValue(field.name, e.target.value)
                      }
                      placeholder={
                        field?.campaignFieldValues?.length > 0
                          ? field.campaignFieldValues[0]?.value
                          : campaignFieldsText
                      }
                      mark
                    />
                  </ContentSimpleComponent>
                </Row>
              );
            })}
          {!campaign?.id && addNewField && (
            <CampaignFieldsToRender
              handleCreateCampaignField={handleCreateCampaignField}
              setAddField={setAddNewField}
            />
          )}
          {!campaign?.id && !addNewField && (
            <ButtonSave type="button" onClick={() => setAddNewField(true)}>
              <FiPlus color={colors.background} size={24} />
              <Value>Adicionar Campo</Value>
            </ButtonSave>
          )}
          {!campaign?.id ? (
            <Button
              max_width={300}
              margin_vertical={20}
              right
              background={colors.blue}
              hover={colors.blue}
              margin_horizontal={0}
              name="createCampaign"
              type="submit"
              disabled={loading}
            >
              Continuar
            </Button>
          ) : (
            <Button
              max_width={300}
              margin_vertical={20}
              right
              background={colors.blue}
              hover={colors.blue}
              margin_horizontal={0}
              name="createCampaign"
              type="submit"
              disabled={loading}
            >
              Atualizar
            </Button>
          )}
        </Form>
      </DefaultSection>
    </Container>
  );
};
