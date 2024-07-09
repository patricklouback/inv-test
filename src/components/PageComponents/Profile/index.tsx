import { useContext, useEffect } from 'react';
import { ApresentationCompany } from '@components/Apresentation';

import { FiUser } from 'react-icons/fi';
import { UserContext } from 'contexts/User';
import { PageTitle } from '@components/PageTitle';
import { Container as ContainerPage } from '@components/Container';
import { Content, Container, Line } from './styles';
import { InformationData } from './InformationData';
import { UserEvaluationCriterias } from './UserEvaluationCriterias';

export const ProfilePage: React.FC = (): JSX.Element => {
  const { getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <ContainerPage>
      <Container>
        <PageTitle title="Perfil do usuário" icon={FiUser} />
        <Content>
          <InformationData />
        </Content>
      </Container>
      <Line />
      <UserEvaluationCriterias />
    </ContainerPage>
  );
};
