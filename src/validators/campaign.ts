import * as Yup from 'yup';

export const yupValidateCampaign = Yup.object()
  .shape({
    title: Yup.string()
      .max(250, 'Tamanho máximo de 250 caracteres')
      .required('Título é obrigatório'),
    goals: Yup.string().required('As metas são obrigatórias'),
    startDate: Yup.string().required('Data Início é obrigatórias'),
    endDate: Yup.string().required('Data Final é obrigatórias'),
    description: Yup.string().required('Descrição é obrigatória'),
    summary: Yup.string()
      .max(160, 'Tamanho máximo de 160 caracteres')
      .required('Resumo é obrigatório')
  })
  .required();
