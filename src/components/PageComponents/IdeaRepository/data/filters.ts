import { StatusOption } from '..';

export const type_idea = [
  {
    id: '1',
    name: 'QUICK_WIN',
    value: 'Quick Win',
  },
  {
    id: '2',
    name: 'PROJECT',
    value: 'Projeto',
  },
];

export const step_idea = [
  {
    id: '1',
    name: 'SCREENING',
    value: 'Triagem',
  },
  {
    id: '2',
    name: 'ANALYZE',
    value: 'Analisar',
  },
  {
    id: '3',
    name: 'SELECT',
    value: 'Selecionar',
  },
  {
    id: '4',
    name: 'IMPLEMENTED',
    value: 'Implementada',
  },
];

export const status_campaign = [
  {
    id: '1',
    name: 'WAITING',
    value: 'Pausadas',
  },
  {
    id: '2',
    name: 'PUBLISHED',
    value: 'Ativas',
  },
  {
    id: '3',
    name: 'FINISHED',
    value: 'Finalizadas',
  },
];

interface StatusIdeaOption {
  name: string;
  value: StatusOption;
}

export const status_idea: StatusIdeaOption[] = [
  {
    value: 'EXTERNAL_REVIEW',
    name: 'Análise técnica',
  },
  {
    value: 'IN_PROGRESS',
    name: 'Em andamento',
  },
  {
    value: 'IN_REVIEW',
    name: 'Em revisão',
  },
  {
    value: 'PAUSED',
    name: 'Pausada',
  },
  {
    value: 'INACTIVE',
    name: 'Recusada',
  },
  /* {
    value: 'DRAFT',
    name: 'Rascunho',
  }, */
];
