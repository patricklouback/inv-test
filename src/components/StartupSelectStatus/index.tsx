import { useState } from 'react';
import { HumanizeStatusStartups } from '@components/PageComponents/StartupRepository/HumanizeStatusStartups';
import { useDebounce } from 'hooks/useDebounce';
import { Container, Content } from './styles';
import Dropdown from './Dropdown';

type StartupSelectStatusProps = {
  status: string;
};

export function StartupSelectStatus({
  status = 'NO_CONTACT',
}: StartupSelectStatusProps) {
  const [isOpen, setIsOpen] = useState(false);
  const debounce = useDebounce(isOpen, 200);

  const statusArray = [
    { text: 'Sem contato', color: '#A3B2CD', value: 'NO_CONTACT' },
    {
      text: 'Convite de conexão',
      color: '#DF0075',
      value: 'CONNECTION_INVITE',
    },
    {
      text: 'Convite para desafio',
      color: '#8B095F',
      value: 'CHALLENGE_INVITE',
    },
    {
      text: 'Proposta em revisão',
      color: '#F99335',
      value: 'PROPOSAL_UNDER_REVIEW',
    },
    { text: 'Em negociação', color: '#9D28F0', value: 'NEGOTIATION' },
    { text: 'Contrato assinado', color: '#525556', value: 'CONTRACT_SIGNED' },
    { text: 'Em andamento', color: '#315594', value: 'IN_PROGRESS' },
    {
      text: 'Parceria concluída',
      color: '#28B446',
      value: 'PARTNERSHIP_CONCLUDED',
    },
    { text: 'Desinteressado', color: '#EC3137', value: 'DISINTERESTED' },
  ];

  return (
    <Container>
      <Content onClick={() => setIsOpen(!isOpen)}>
        <HumanizeStatusStartups status={status} />
      </Content>
      {isOpen && (
        <Dropdown
          statusArray={statusArray}
          setIsOpen={setIsOpen}
          onMouseLeave={() => {
            if (debounce) {
              setIsOpen(false);
            }
          }}
        />
      )}
    </Container>
  );
}
