interface Funnel {
  isTrial: boolean;
  ideasUpdateStatusOptions: { title: string; id: number }[];
}

export function useFunnel(slug: string) {
  const isTrial = slug === 'trial';

  const ideasUpdateStatusOptions = [
    {
      title: 'Com atualizações',
      id: 1,
    },
  ];

  return { isTrial, ideasUpdateStatusOptions } as Funnel;
}
