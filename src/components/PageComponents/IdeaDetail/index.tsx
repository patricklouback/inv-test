/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { CardIdeia } from '@components/CardIdea';
import { Container } from '@components/Container';
import { TourDetailIdea } from '@components/TourApp/TourDetailIdea';
import { ApprovalFunnelContext } from 'contexts/ApprovalFunnel';
import { AuthContext } from 'contexts/AuthContext';
import { IdeaContext } from 'contexts/Idea';
import { Idea } from 'interfaces/idea';
import { TourId, TourStatus } from 'interfaces/tour';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { RiFileEditLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { FirstInfo } from './FirstInfo';
import { ListInfo } from './ListInfo';
import { ListSteps } from './ListSteps';
import { FilesDetails } from './ModalPreview';
import { Step2 } from './Step2';
import {
  BackButton,
  ButtonFiles,
  Container as C,
  Description,
  FilesContainer,
  ItemImage,
  Line,
  ListImgsFirstInfo,
  ValueDescription,
  WapperContent,
  WapperContentProcess,
  WapperContentSelected,
  WapperDescription,
  WapperInternContent,
  WapperSteps,
} from './styles';

export const IdeaDetailPage = () => {
  const { colors } = useTheme();
  const { back } = useRouter();
  const { id } = useRouter().query;
  const { user } = useContext(AuthContext);
  const unviewedTourDetailIdea =
    user?.tours[TourId.DETAIL_IDEAS_DEFAULT] === TourStatus.UNVIEWED;
  const { listIdeaLinksForIdeaUser } = useContext(ApprovalFunnelContext);
  const { viewIdea, idea } = useContext(IdeaContext);
  const [stepSelected, setStepSelected] = useState(undefined);
  const [editableStepSelected, setEditableStepSelected] = useState(false);
  const [linkedIdeasState, setLinkedIdeasState] = useState([]);
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const updateTitleStepSelected = (titleStepSelected: any): void => {
    setStepSelected(titleStepSelected);
  };

  const updateEditableState = (editableStep: boolean): void => {
    setEditableStepSelected(editableStep);
  };

  const getType = useCallback((idea: Idea): string => {
    return idea?.processActivity?.name || 'Indefinido';
  }, []);

  const getTypeIcon = useCallback((idea: Idea) => {
    return idea?.processActivity?.name ? (
      <RiFileEditLine color={colors.red} size={20} />
    ) : undefined;
  }, []);

  useEffect(() => {
    if (id) {
      viewIdea(String(id));
    }
  }, [id, viewIdea]);

  useEffect(() => {
    (async () => {
      setLinkedIdeasState(await listIdeaLinksForIdeaUser(String(id)));
    })();
  }, [listIdeaLinksForIdeaUser, id]);

  const execOpenModal = (file: string) => {
    setModal(true);
    setPreview(file);
  };

  return (
    <Container>
      {unviewedTourDetailIdea && <TourDetailIdea />}
      <C>
        <BackButton onClick={() => back()}>
          <BiLeftArrowAlt size={20} />
          <span>Voltar</span>
        </BackButton>

        <WapperContent>
          <WapperDescription>
            <ValueDescription>Descrição da iniciativa</ValueDescription>
          </WapperDescription>
          <Line />
          <WapperInternContent>
            <FilesContainer>
              {idea?.ideaFiles.map((ideaFile, i) => (
                <ButtonFiles
                  key={i}
                  onClick={() => execOpenModal(ideaFile)}
                  type="button"
                >
                  <span>Arquivo {i + 1}</span>
                </ButtonFiles>
              ))}
              {modal && <FilesDetails file={preview} close={setModal} />}
            </FilesContainer>
            {idea && (
              <>
                <CardIdeia value={getType(idea)} icon={getTypeIcon(idea)} />
                <FirstInfo idea={idea} />
                <ListInfo idea={idea} linkedIdeasState={linkedIdeasState} />
              </>
            )}
          </WapperInternContent>

          <ListImgsFirstInfo>
            {idea?.ideaFiles.map((item, index) => (
              <ItemImage className="img" key={index} />
            ))}
          </ListImgsFirstInfo>
        </WapperContent>

        {idea && idea.status === 'PUBLISHED' && (
          <WapperContentProcess>
            <WapperDescription>
              <ValueDescription>Desenvolvimento da iniciativa</ValueDescription>
            </WapperDescription>

            <Line />

            <WapperContentSelected>
              {(idea.kanbanStep === 'SELECT' ||
                idea.kanbanStep === 'IMPLEMENTED') && (
                <ListSteps
                  idea={idea}
                  updateTitleStepSelected={updateTitleStepSelected}
                  updateEditableState={updateEditableState}
                />
              )}
              <Description>
                Esse espaço auxilia no desenvolvimento da iniciativa. O avanço
                nos estágios deve ocorrer à medida que as atividades
                especificadas forem concluídas e validadas.
              </Description>

              <WapperSteps>
                {/* {titleStepSelected && titleStepSelected.ideaStepItems.length > 0 && (
                  <Step1 titleStepSelected={titleStepSelected} />
                )} */}

                <Step2
                  id={id}
                  stepSelected={stepSelected}
                  ideaId={idea?.id}
                  preview={idea?.kanbanStep}
                  steps={idea?.ideaSteps}
                  isCurrentState={editableStepSelected}
                />
              </WapperSteps>
            </WapperContentSelected>
          </WapperContentProcess>
        )}
      </C>
    </Container>
  );
};
