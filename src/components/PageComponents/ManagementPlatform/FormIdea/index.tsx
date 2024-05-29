/* eslint-disable jsx-a11y/label-has-associated-control */
import { IdeaFieldDragAndDrop } from '@components/IdeaFieldDragAndDrop';
import { InfoWarning } from '@components/InfoWarning';
import { useState } from 'react';
import Collapsible from 'react-collapsible';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { RenderHeader } from '../RenderHeader';
import { Content, FormIdea, Section, Warning } from './styles';

export const SectionFormIdea: React.FC = (): JSX.Element => {
  const { colors } = useTheme();

  const [row, setRow] = useState(true);

  return (
    <Section>
      <Collapsible
        className="general"
        triggerTagName="div"
        open
        trigger={
          <RenderHeader
            title="Template de formulário de Iniciativas"
            icon={<RiLightbulbFlashLine color={colors.font} size={14} />}
            stateIcon={row}
          />
        }
        onOpen={() => setRow(true)}
        onClose={() => setRow(false)}
      >
        <Content>
          <FormIdea>
            <InfoWarning
              type="INFO"
              text="Os formulários dos direcionais de inovação são utilizados no momento de submissão das iniciativas. "
            />
            <Warning>
              <strong>
                Os campos Título e Descrição são padrão do sistema e não
                precisam ser adicionados.
              </strong>
            </Warning>
            <IdeaFieldDragAndDrop />
          </FormIdea>
        </Content>
      </Collapsible>
    </Section>
  );
};
