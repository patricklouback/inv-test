/* eslint-disable import/no-mutable-exports */
export const STATUS = {
  PUBLISHED: 'Publicado',
  INACTIVE: 'Inativo',
  WAITING: 'Aguardando',
};

export const KANBAN_STATUS = {
  PAUSED: 'Pausada',
  IN_REVIEW: 'Em revisão',
  WAITING: 'Em andamento',
  APPROVED: 'Aprovado',
  EXTERNAL_REVIEW: 'Análise técnica',
  INACTIVE: 'Recusada',
  DRAFT: 'Rascunho',
};

export const REGEX_URL = process.env.NODE_ENV === 'development' ? /http:\/\/(.*?)\.avantti/ : /https:\/\/(.*?)\.avantti/;

export let slug = null;
export let styleSlug = null;

if (typeof window !== 'undefined') {
  slug = localStorage.getItem('slug');
  styleSlug = slug === 'accamargo' ? 'accamargo' : 'default';
}

export const images = {
  login: {
    default: '/background_login.jpg',
    accamargo: '/background_login_acc.png',
  },
};
