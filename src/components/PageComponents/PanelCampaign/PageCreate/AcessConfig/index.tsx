import { useTheme } from 'styled-components';

import { DefaultSection } from '@components/SectionDefault';

// ICONS
import { FiSettings } from 'react-icons/fi';

import { ListenSizeContext } from 'contexts/ListenSize';
import { useContext } from 'react';
import { Column, ColumnWrapper, Container, Form, Row } from './styles';

// INPUTS
import { ManagerCampaign } from './ManagerCampaign';
import { ScreeningEvaluator } from './ScreeningEvaluator';
import { ParticipatingAreas } from './ParticipatingAreas';
import { AnalyzeEvaluator } from './AnalyzeEvaluator';
import { AreaRepresentative } from './AreaRepresentative';
import { ImplementationEvaluator } from './ImplementationEvaluator';

export const AcessConfig: React.FC = (): JSX.Element => {
  const { colors } = useTheme();

  const { size } = useContext(ListenSizeContext);

  return (
    <Container>
      <DefaultSection
        borderBottom
        type="full"
        header={{
          box_icon: (
            <FiSettings color={colors.font} size={20} className="icon-config" />
          ),
          title: 'Configuração de Acessos',
        }}
      >
        <Form>
          <ColumnWrapper>
            <Column>
              <Row size={size}>
                <ManagerCampaign />
              </Row>
              <Row>
                <AreaRepresentative />
              </Row>
              <Row>
                <ParticipatingAreas />
              </Row>
            </Column>
            <Column>
              <Row>
                <ScreeningEvaluator />
              </Row>
              <Row>
                <AnalyzeEvaluator />
              </Row>
              <Row>
                <ImplementationEvaluator />
              </Row>
            </Column>
          </ColumnWrapper>
        </Form>
      </DefaultSection>
    </Container>
  );
};
