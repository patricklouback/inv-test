/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import { BackToTop } from '@components/BackToTop';
import { Container } from '@components/Container';
import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { DropFileComponent } from '@components/DropFile';
import { Popup } from '@components/Popup';
import { DefaultSection } from '@components/SectionDefault';
import { Select } from '@components/Select';
import { SelectOption } from '@components/SelectOption';
import { Textarea } from '@components/Textarea';
import { IdeaContext } from 'contexts/Idea';
import { ListenSizeContext } from 'contexts/ListenSize';
import { IdeaField } from 'interfaces/idea';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { hotjar } from 'react-hotjar';
import { FiBookmark, FiUser, FiXCircle } from 'react-icons/fi';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { useTheme } from 'styled-components';
import { PreviewUserAddsComponent } from '../PanelCampaign/PageCreate/AcessConfig/PreviewUser';
import { ContainerPreview } from '../PanelCampaign/PageCreate/AcessConfig/styles';
import {
  C,
  ContentPage,
  FooterButtons,
  ItemIdea,
  Row,
  RowQuestions,
} from './styles';

interface IdeaFieldValue {
  id?: string;
  ideaId?: string;
  value: string;
}
interface IdeaFieldFormProps extends IdeaField {
  name: string;
  ideaFieldValues: IdeaFieldValue[];
}

interface UserOptions {
  id: string;
  name: string;
  image?: string;
}

export const PanelIdeaPage: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { push, query, back } = useRouter();

  const {
    selectedIdea,
    selectedIdeaFields,
    ideaFields,
    createIdea,
    getAvailableIdeaUsers,
    setSelectedIdea,
    updateIdeaComplete,
    getIdeaFieldsForIdeaForm,
    loading
  } = useContext(IdeaContext);

  const { size } = useContext(ListenSizeContext);
  const [ideaUsers, setIdeaUsers] = useState<UserOptions[]>([]);
  const [ideaFieldsForm, setIdeaFieldsForm] = useState<IdeaFieldFormProps[]>(
    []
  );

  const [availableIdeaUsers, setAvailableIdeaUsers] = useState<UserOptions[]>(
    []
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { register, handleSubmit, setValue, getValues, reset } = useForm();

  const handleFilesChange = (files: File[]): any => {
    setUploadedFiles(files);
    setValue('files', files[0]);
  };

  const handleSave = useCallback(
    async (formData: FormData) => {
      if (!selectedIdea) {
        const createdIdea = await createIdea(formData);
        setSelectedIdea(createdIdea);
      }

      if (selectedIdea) {
        const idea = await updateIdeaComplete(selectedIdea.id, formData);
        setSelectedIdea(idea);
      }
    },
    [createIdea, selectedIdea, setSelectedIdea, updateIdeaComplete]
  );

  const handlePublish = useCallback(
    async (formData: FormData) => {
      if (!selectedIdea) {
        const ideaCreated = await createIdea(formData);

        if (ideaCreated) {
          reset();
        }

        if (hotjar.initialized()) {
          hotjar.event('idea_form_send');
        } else {
          console.error('hotjar não inicializado corretamente');
        }
      }

      if (selectedIdea) {
        const ideaUpdated = await updateIdeaComplete(selectedIdea.id, formData);
        ideaUpdated ? push('/idea') : null;
      }

      setSelectedIdea(null);
    },
    [createIdea, selectedIdea, setSelectedIdea, updateIdeaComplete, push, reset]
  );

  const submitForm = useCallback(
    async values => {
      // setLoading(true);
      // Get all fields values inside a formData (both: Save and Publishe actions)
      const formData = new FormData();

      for (const key in values) {
        if (key === 'field') {
          formData.append(key, values[key][1]);
        } else {
          formData.append(key, values[key]);
        }
      }

      if (!String(query.campaignId)) {
        toast.error('Nenhum direcional selecionado');
        return;
      }

      for (const ideaField of ideaFieldsForm) {
        if (
          ideaField.obligatoriness === 'MANDATORY' &&
          ideaField.ideaFieldValues?.length > 0
        ) {
          for (const ifv of ideaField.ideaFieldValues) {
            if (ifv.value === null || ifv.value === '') {
              toast.error(
                'Há campos obrigatórios não preenchidos. Favor preencher.'
              );
              return;
            }
          }
        }
        if (
          ideaField.obligatoriness === 'MANDATORY' &&
          ideaField.ideaFieldValues === undefined
        ) {
          toast.error(
            'Há campos obrigatórios não preenchidos. Favor preencher. 2'
          );
          return;
        }
        if (
          ideaField.obligatoriness === 'OPTIONAL' &&
          ideaField.ideaFieldValues === undefined
        ) {
          ideaField.ideaFieldValues = [{ value: '' }];
        }
      }

      formData.append('campaignId', String(query.campaignId));
      formData.append('ideaFields', JSON.stringify(ideaFieldsForm));
      formData.append('ideaUsers', JSON.stringify(ideaUsers.map(u => u.id)));

      if (!uploadedFiles) {
        for (const f of uploadedFiles) {
          formData.append('files', f);
        }
      }

      // This if to give users points when idea was saved and not published at first time
      if (selectedIdea) {
        formData.append('previousStatus', selectedIdea.status);
      }

      // Call Save action on SaveButtonClick
      const isSaveAction = getValues('status') === 'DRAFT';
      if (isSaveAction) await handleSave(formData);

      // Call Publish action on PublishButtonClick
      const isPublishAction = getValues('status') === 'PUBLISHED';
      if (isPublishAction) {
        formData.append('kanbanStatus', 'WAITING');
        await handlePublish(formData);
      }
      // setLoading(false);
    },
    [
      query.campaignId,
      ideaFieldsForm,
      ideaUsers,
      uploadedFiles,
      selectedIdea,
      getValues,
      handleSave,
      handlePublish,
    ]
  );

  const handleChangeFieldValue = useCallback((id: string, value: string) => {
    setIdeaFieldsForm(state => {
      const editedIndex = state.findIndex(i => i.id === id);

      const newValue = [
        {
          value,
        },
      ];

      state[editedIndex]?.ideaFieldValues?.length > 0
        ? (state[editedIndex].ideaFieldValues[0].value = value)
        : (state[editedIndex].ideaFieldValues = newValue);
      return [...state];
    });
  }, []);

  const handleSearchUsers = useCallback(
    async (search: string) => {
      const users = await getAvailableIdeaUsers(search);

      const serialized = users
        .map(e => {
          if (ideaUsers.find(user => user.id === e.id)) {
            return undefined;
          }
          return e;
        })
        .filter(Boolean);

      setAvailableIdeaUsers(serialized);
    },
    [getAvailableIdeaUsers, ideaUsers]
  );

  const setClean = useCallback(() => {
    setAvailableIdeaUsers(availableIdeaUsers);
  }, [setAvailableIdeaUsers, availableIdeaUsers]);

  const handleAddUser = useCallback(
    (userId: string) => {
      const newArrayItems = [
        ...ideaUsers,
        availableIdeaUsers.find(u => u.id === userId),
      ];

      setIdeaUsers(newArrayItems);
    },
    [ideaUsers, availableIdeaUsers]
  );

  const handleRemoveIdeaUser = useCallback(
    (userId: string) => {
      const newArrayItems = ideaUsers.filter(element => element.id !== userId);

      setIdeaUsers(newArrayItems);
    },
    [ideaUsers]
  );

  const resetFormValues = useCallback(() => {
    setValue('title', '');
    setValue('description', '');
    setValue('files', undefined);
  }, [setValue]);

  const handleTogglePopup = useCallback(() => {
    setIsPopupOpen(state => !state);
  }, []);

  const handleCloseWithoutSave = useCallback(() => {
    resetFormValues();
    setSelectedIdea(null);
    setIsPopupOpen(false);
    back();
  }, [back, resetFormValues, setSelectedIdea]);

  const handleSavePopup = useCallback(async () => {
    const formData = new FormData();

    const values = getValues();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    if (!String(query.campaignId)) {
      toast.error('Nenhuma direcional selecionada');
      return;
    }

    formData.append('campaignId', String(query.campaignId));
    formData.append('ideaFields', JSON.stringify(ideaFieldsForm));
    formData.append('ideaUsers', JSON.stringify(ideaUsers.map(u => u.id)));

    formData.set('status', 'DRAFT');

    await handleSave(formData);
    setIsPopupOpen(false);
    push('/home');
  }, [
    getValues,
    handleSave,
    ideaFieldsForm,
    ideaUsers,
    push,
    query?.campaignId,
  ]);

  useEffect(() => {
    getIdeaFieldsForIdeaForm(String(query.campaignId));
  }, [getIdeaFieldsForIdeaForm, query.campaignId]);

  useEffect(() => {
    if (!query.campaignId) {
      push('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.campaignId]);

  useEffect(() => {
    let formattedIdeaFields = [];
    if (selectedIdeaFields.length > 0) {
      formattedIdeaFields = [...selectedIdeaFields];
    } else {
      formattedIdeaFields = ideaFields.map(ifs => {
        return {
          ...ifs,
          name: slugify(ifs.title, {
            trim: true,
            replacement: '-',
            lower: true,
          }),
        };
      });
    }
    setIdeaFieldsForm(formattedIdeaFields);
  }, [ideaFields, selectedIdeaFields]);

  useEffect(() => {
    if (selectedIdea) {
      const { title, description, ideaUsers } = selectedIdea;
      setValue('title', title);
      setValue('description', description);

      if (ideaUsers?.length > 0) {
        const ideaUsersCollaborators = ideaUsers?.filter(
          iu => iu.type === 'COLLABORATOR'
        );

        const ideaUsersList: UserOptions[] = ideaUsersCollaborators?.map(
          ideaUsersCollaborator => ({
            id: ideaUsersCollaborator.userId,
            name: ideaUsersCollaborator.user.name,
            image: ideaUsersCollaborator.user.image,
          })
        );

        setIdeaUsers(ideaUsersList);
      }
    }
  }, [selectedIdea, setValue]);

  return (
    <Container>
      <C>
        <DefaultSection
          type="normal"
          header={{
            title: selectedIdea
              ? 'Edição da Iniciativa'
              : 'Criação da Iniciativa',
            box_icon: <RiLightbulbFlashLine color={colors.font} size={20} />,
          }}
          back={back}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <ContentPage>
              <Row>
                <ItemIdea size={size}>
                  <ContentSimpleComponent
                    title="Nome da iniciativa (Obrigatório)"
                    description="Crie um nome ilustrativo e objetivo para a sua iniciativa"
                  >
                    <Textarea
                      register={register}
                      name="title"
                      rows={2}
                      placeholder="Digite aqui o nome da sua iniciativa"
                    />
                  </ContentSimpleComponent>
                </ItemIdea>
                <ItemIdea size={size}>
                  <ContentSimpleComponent
                    title="Outros participantes da iniciativa"
                    description="Pessoas envolvidas na criação ou execução"
                  >
                    <>
                      <Select
                        name="users"
                        placeholder="Digite o nome do participante"
                        icon={<FiUser size={18} color="#8A8A8A" />}
                        onChange={handleSearchUsers}
                        dataSelect={availableIdeaUsers}
                        onClickOption={({ value }) => handleAddUser(value)}
                        setClean={() => setClean()}
                      />
                      <ContainerPreview>
                        {ideaUsers?.map(user => (
                          <PreviewUserAddsComponent
                            key={user.id}
                            clickRemove={() => handleRemoveIdeaUser(user.id)}
                            name={user.name}
                            image={
                              user.image
                                ? user.image
                                : 'https://via.placeholder.com/50'
                            }
                          />
                        ))}
                      </ContainerPreview>
                    </>
                  </ContentSimpleComponent>
                </ItemIdea>
              </Row>
              <Row>
                <ItemIdea size={size}>
                  <ContentSimpleComponent
                    title="Descrição da Iniciativa (Obrigatório)"
                    description="Descreva o objetivo e funcionamento da iniciativa."
                  >
                    <Textarea
                      register={register}
                      name="description"
                      rows={8}
                      value={getValues('description')}
                      placeholder="Digite aqui a descrição da sua iniciativa"
                      onChange={e => setValue('description', e.target.value)}
                      mark
                    />
                  </ContentSimpleComponent>
                </ItemIdea>
              </Row>
              <RowQuestions>
                {ideaFieldsForm.length > 0 &&
                  ideaFieldsForm.map(ideaField => {
                    return (
                      <ItemIdea size={size} key={ideaField.id}>
                        <ContentSimpleComponent
                          title={`${ideaField.title} ${
                            ideaField.obligatoriness === 'MANDATORY'
                              ? '(Obrigatório)'
                              : '(Opcional)'
                          }`}
                          description={ideaField.description}
                        >
                          {(() => {
                            switch (ideaField.type) {
                              case 'SELECT':
                                return (
                                  <SelectOption
                                    name={ideaField.name}
                                    options={[
                                      {
                                        name: 'Selecione',
                                        value: '',
                                      },
                                      ...(typeof JSON.parse(
                                        ideaField.options
                                      ) === 'string'
                                        ? JSON.parse(
                                            JSON.parse(ideaField.options)
                                          )
                                        : JSON.parse(ideaField.options)),
                                    ]}
                                    value={
                                      ideaField?.ideaFieldValues?.length > 0
                                        ? ideaField.ideaFieldValues[0]?.value
                                        : undefined
                                    }
                                    onChange={event =>
                                      handleChangeFieldValue(
                                        ideaField.id,
                                        event.target.value
                                      )
                                    }
                                  />
                                );
                              case 'TEXTAREA':
                              case 'TEXT':
                                return (
                                  <Textarea
                                    name={ideaField.name}
                                    rows={12}
                                    value={
                                      ideaField?.ideaFieldValues?.length > 0
                                        ? ideaField.ideaFieldValues[0]?.value
                                        : ''
                                    }
                                    onChange={event =>
                                      handleChangeFieldValue(
                                        ideaField.id,
                                        event.target.value
                                      )
                                    }
                                    mark
                                  />
                                );
                              default:
                                break;
                            }
                          })()}
                        </ContentSimpleComponent>
                      </ItemIdea>
                    );
                  })}
                <ItemIdea>
                  <ContentSimpleComponent
                    title="Arquivos"
                    description="Há algum documento que ajude a demonstrar essa iniciativa? Adicione o material aqui."
                  >
                    <DropFileComponent
                      name="files"
                      register={register}
                      onFilesChange={handleFilesChange}
                      maxFiles={3}
                    />
                  </ContentSimpleComponent>
                </ItemIdea>
              </RowQuestions>

              <FooterButtons>
                <button
                  className="cancel"
                  type="button"
                  onClick={handleTogglePopup}
                >
                  <FiXCircle size={20} />
                  Fechar sem salvar
                </button>
                {!selectedIdea && (
                  <button
                    type="submit"
                    className="save"
                    onClick={() => setValue('status', 'DRAFT')}
                  >
                    <FiBookmark size={20} />
                    Salvar Rascunho
                  </button>
                )}
                {selectedIdea?.status === 'DRAFT' && (
                  <button
                    type="submit"
                    className="save"
                    onClick={() => setValue('status', 'DRAFT')}
                  >
                    <FiBookmark size={20} />
                    Salvar Rascunho
                  </button>
                )}
                <button
                  type="submit"
                  className="send"
                  disabled={loading}
                  onClick={() => setValue('status', 'PUBLISHED')}
                >
                  {selectedIdea?.status === 'PUBLISHED'
                    ? 'Salvar alterações'
                    : 'Submeter iniciativa'}
                </button>
              </FooterButtons>
            </ContentPage>
          </form>
          <BackToTop />
        </DefaultSection>
        {isPopupOpen && (
          <Popup
            handleSavePopup={handleSavePopup}
            handleCloseWithoutSave={handleCloseWithoutSave}
          />
        )}
      </C>
    </Container>
  );
};
