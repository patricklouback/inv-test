import { useCallback, useContext, useEffect, useState } from 'react';
import { StartupsContext } from 'contexts/Startups';
import { Container, Content, RowMap, Title } from './styles';
import {
  ConfigIcon,
  UserOption,
  TeamOutlined,
  CheckMark,
} from '../../../Icons';

export function Sidebar() {
  const { stepCreate } = useContext(StartupsContext);

  const [options, setOptions] = useState([
    {
      id: 1,
      title: 'Informações Gerais',
      label: 'information',
      Icon: ConfigIcon,
      active: true,
      finish: false,
    },
    {
      id: 2,
      title: 'Descrição e contato',
      label: 'description',
      Icon: UserOption,
      active: false,
      finish: false,
    },
    {
      id: 3,
      title: 'Time principal',
      label: 'squad',
      Icon: TeamOutlined,
      active: false,
      finish: false,
    },
  ]);

  const handleFinish = useCallback(
    (step: number) => {
      const newOptions = options.map(option => ({
        ...option,
        finish: option.id < step,
        active: option.id === step,
      }));
      setOptions(newOptions);
    },
    [options, setOptions]
  );

  useEffect(() => {
    handleFinish(stepCreate);
  }, [stepCreate]);

  return (
    <Container>
      <Content>
        {options.map(({ Icon, active, id, title, finish }) => (
          <RowMap key={id} $active={active} disabled={finish}>
            <span>{finish ? <CheckMark /> : <Icon active={active} />}</span>
            <Title $active={active}>{title}</Title>
          </RowMap>
        ))}
      </Content>
    </Container>
  );
}
