import { AuthContext } from 'contexts/AuthContext';
import { IdeaContext } from 'contexts/Idea';
import React, { useContext, useEffect, useState } from 'react';
import { RiFileSettingsLine, RiLightbulbFlashLine } from 'react-icons/ri';
import { InfoCard } from '@components/InfoCard';
import { List, Container } from './styles';

interface CountProps {
  countIdeas: number;
  countImplementedIdeas: number;
}

export function InfoPublic(): JSX.Element {
  const { countIdeas } = useContext(IdeaContext);
  const { token } = useContext(AuthContext);
  const [ideas, setIdeas] = useState<CountProps>();

  useEffect(() => {
    async function getCount(): Promise<void> {
      const result = await countIdeas();
      setIdeas(result);
    }

    if (token) {
      getCount();
    }
  }, [countIdeas, token]);

  return (
    <Container>
      <List>
        <InfoCard  iconComponent={<RiLightbulbFlashLine color="rgba(49, 85, 148, 0.6)" size={100}/>} data={ideas?.countIdeas} title='Iniciativas Criadas'/>
        <InfoCard  iconComponent={<RiFileSettingsLine color="rgba(49, 85, 148, 0.6)" size={100} />} data={ideas?.countImplementedIdeas} title='Projetos em implantação'/>
      </List>
    </Container>
  );
}
