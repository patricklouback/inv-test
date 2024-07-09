/* eslint-disable radix */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Button from '@components/Button';
import { ConfigContext } from 'contexts/ConfigContext';
import { useContext, useState, useCallback } from 'react';
import Collapsible from 'react-collapsible';
import { IoGameControllerOutline } from 'react-icons/io5';
import { useTheme } from 'styled-components';
import { ResetUserRankModal } from '@components/Modals/ManagementPlatform/ScoreSetting/ResetUserRankModal';
import { RenderHeader } from '../RenderHeader';

import {
  Content,
  Section,
  ScoreSetting,
  ConfigItems,
  WapperSelect,
  Peso,
  WapperTextValue,
  Title,
  Value,
  ResetPointsContainer,
  ScoreRow,
} from './styles';

export const SectionScoreSetting: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const [row, setRow] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const {
    editIdeaCommentWeight,
    editIdeaCreationWeight,
    editIdeaCoCreationWeight,
    editIdeaSelectWeight,
    editIdeaImplementWeight,
    idea_co_creation_weight,
    idea_comment_weight,
    idea_creation_weight,
    idea_select_weight,
    idea_implement_weight,
    updatePointsService,
  } = useContext(ConfigContext);

  const handleSubmitIdeaCommentWeight = useCallback(
    async e => {
      await editIdeaCommentWeight(String(e.currentTarget.value));
    },
    [editIdeaCommentWeight]
  );

  const handleSubmitIdeaSelectWeight = useCallback(
    async e => {
      await editIdeaSelectWeight(String(e.currentTarget.value));
    },
    [editIdeaSelectWeight]
  );

  const handleSubmitIdeaImplementWeight = useCallback(
    async e => {
      await editIdeaImplementWeight(String(e.currentTarget.value));
    },
    [editIdeaImplementWeight]
  );

  const handleSubmitIdeaCreationWeight = useCallback(
    async e => {
      await editIdeaCreationWeight(String(e.currentTarget.value));
    },
    [editIdeaCreationWeight]
  );

  const handleSubmitIdeaCoCreationWeight = useCallback(
    async e => {
      await editIdeaCoCreationWeight(String(e.currentTarget.value));
    },
    [editIdeaCoCreationWeight]
  );

  const handleClose = useCallback(() => {
    setIsResetModalOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    updatePointsService();
    setIsResetModalOpen(false);
  }, [updatePointsService]);

  const MAX_POINTS_ARR = [];

  for (let i = 0; i <= 20; i += 1) {
    MAX_POINTS_ARR.push(i.toString());
  }

  return (
    <Section>
      {isResetModalOpen && (
        <ResetUserRankModal
          handleClose={handleClose}
          handleReset={handleReset}
        />
      )}
      <Collapsible
        triggerTagName="div"
        open
        trigger={
          <RenderHeader
            title="Configurações de Pontuação"
            icon={<IoGameControllerOutline color={colors.font} size={14} />}
            stateIcon={row}
          />
        }
        onOpen={() => setRow(true)}
        onClose={() => setRow(false)}
      >
        <Content>
          <ScoreSetting>
            <ScoreRow>
              <ConfigItems>
                <form>
                  <WapperSelect>
                    <Peso>Peso</Peso>
                    <select name="" onChange={handleSubmitIdeaCreationWeight}>
                      {MAX_POINTS_ARR.map(item => {
                        return (
                          <option
                            selected={String(idea_creation_weight) === item}
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </WapperSelect>
                </form>
                <WapperTextValue>
                  <Title>Submissão de Iniciativas</Title>
                  <Value>
                    Contabilizado para o usuário que submeteu iniciativas no
                    sistema.
                  </Value>
                </WapperTextValue>
              </ConfigItems>
              <ConfigItems>
                <form>
                  <WapperSelect>
                    <Peso>Peso</Peso>
                    <select name="" onChange={handleSubmitIdeaCoCreationWeight}>
                      {MAX_POINTS_ARR.map(item => {
                        return (
                          <option
                            selected={String(idea_co_creation_weight) === item}
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </WapperSelect>
                </form>
                <WapperTextValue>
                  <Title>Participação em iniciativas</Title>
                  <Value>
                    Contabilizado para os usuários que estão inseridos na equipe
                    da iniciativa
                  </Value>
                </WapperTextValue>
              </ConfigItems>
              <ConfigItems>
                <form>
                  <WapperSelect>
                    <Peso>Peso</Peso>
                    <select name="" onChange={handleSubmitIdeaCommentWeight}>
                      {MAX_POINTS_ARR.map(item => {
                        return (
                          <option
                            selected={String(idea_comment_weight) === item}
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </WapperSelect>
                </form>
                <WapperTextValue>
                  <Title>Comentários nas iniciativas</Title>
                  <Value>
                    Contabilizado para os usuários que interagem com alguma
                    iniciativa
                  </Value>
                </WapperTextValue>
              </ConfigItems>
            </ScoreRow>
            <ScoreRow>
              <ConfigItems>
                <form>
                  <WapperSelect>
                    <Peso>Peso</Peso>
                    <select name="" onChange={handleSubmitIdeaSelectWeight}>
                      {MAX_POINTS_ARR.map(item => {
                        return (
                          <option
                            selected={String(idea_select_weight) === item}
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </WapperSelect>
                </form>
                <WapperTextValue>
                  <Title>Seleção de Iniciativas</Title>
                  <Value>
                    Contabilizado para os usuários da equipe da iniciativa
                    selecionada
                  </Value>
                </WapperTextValue>
              </ConfigItems>
              <ConfigItems>
                <form>
                  <WapperSelect>
                    <Peso>Peso</Peso>
                    <select name="" onChange={handleSubmitIdeaImplementWeight}>
                      {MAX_POINTS_ARR.map(item => {
                        return (
                          <option
                            selected={String(idea_implement_weight) === item}
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </WapperSelect>
                </form>
                <WapperTextValue>
                  <Title>Iniciativas em Implementação</Title>
                  <Value>
                    Contabilizado para os usuários da equipe da iniciativa em
                    implementação
                  </Value>
                </WapperTextValue>
              </ConfigItems>
              <ConfigItems />
            </ScoreRow>
          </ScoreSetting>
          <ResetPointsContainer>
            <Button onClick={() => setIsResetModalOpen(true)}>
              {/* <img src={graphicIcon} alt="" /> */}
              Redefinir Pontuação
            </Button>
          </ResetPointsContainer>
        </Content>
      </Collapsible>
    </Section>
  );
};
