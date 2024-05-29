import { ContentSimpleComponent } from '@components/ContainerTitleSimple';
import { DepartamentContext } from 'contexts/DepartamentContext';
import { AreaContext } from 'contexts/AreaContext';
import { useCallback, useContext, useState } from 'react';
import Collapsible from 'react-collapsible';

import { ImTree } from "react-icons/im";
import { useTheme } from 'styled-components';
import { RenderHeader } from '../RenderHeader';
import {
  Section,
  Content,
  General,
  AreaAndDept,
  TextInput,
  ButtonCreate,
  Send,
  ColorInput,
  FormContainer,
  ColorInputContainer,
  AreaContainer,
  AreaTextInput,
} from './styles';

export const SectionAreasAndDepts: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const { createDepartament } = useContext(DepartamentContext)
  const { createArea } = useContext(AreaContext)
  const [row, setRow] = useState(true);
  const [departamentNameState, setDepartamentNameState] = useState('');
  const [areaNameState, setAreaNameState] = useState('');
  const [areaColorState, setAreaColorState] = useState(colors.primary);

  const onSubmitNewDepartament = useCallback(
    async e => {
      e.preventDefault();
      await createDepartament(departamentNameState);
      setDepartamentNameState('');
    },
    [createDepartament, departamentNameState]
  )

  const onSubmitNewArea = useCallback(
    async e => {
      e.preventDefault();
      await createArea(areaNameState, areaColorState);
      setAreaNameState('');
      setAreaColorState(colors.primary);
    },
    [createArea, areaNameState, areaColorState, colors.primary]
  )

  return (
    <Section>
      <Collapsible
        triggerTagName="div"
        open
        trigger={
          <RenderHeader
            title="Criação de novas Áreas e Departamentos"
            icon={<ImTree color={colors.font} size={14} />}
            stateIcon={row}
          />
        }
        onOpen={() => setRow(true)}
        onClose={() => setRow(false)}
      >
        <Content>
          <General>
            <AreaAndDept>
              <FormContainer onSubmit={onSubmitNewDepartament}>
                <ContentSimpleComponent title="Novo Departamento">
                  <TextInput
                    type='text'
                    placeholder='Nome do novo departamento'
                    value={departamentNameState}
                    onChange={e => setDepartamentNameState(e.target.value)}
                  />
                </ContentSimpleComponent>
                <ButtonCreate type="submit">
                  <Send>Criar</Send>
                </ButtonCreate>
              </FormContainer>
              <FormContainer onSubmit={onSubmitNewArea}>
                <AreaContainer>
                  <ContentSimpleComponent title="Nova Área">
                    <AreaTextInput
                      type='text'
                      placeholder='Nome da nova área'
                      value={areaNameState}
                      onChange={e => setAreaNameState(e.target.value)}
                    />
                  </ContentSimpleComponent>
                  <ColorInputContainer>
                    <ContentSimpleComponent title="Escolha a cor">
                      <ColorInput
                        type='color'
                        id='color-input'
                        value={areaColorState}
                        onChange={e => setAreaColorState(e.target.value)}
                      />
                    </ContentSimpleComponent>
                  </ColorInputContainer>
                </AreaContainer>
                <ButtonCreate type="submit">
                  <Send>Criar</Send>
                </ButtonCreate>
              </FormContainer>
            </AreaAndDept>
          </General>
        </Content>
      </Collapsible>
    </Section>
  );
};
