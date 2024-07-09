import * as Yup from 'yup';

export const yupValidateCreateStartup = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório.'),
  foundationYear: Yup.number().required('Ano é obrigatório.'),
  marketFields: Yup.string().required('Segmento é obrigatório.'),
  country: Yup.string().required('País é obrigatório.'),
  state: Yup.string().required('Estado é obrigatório.'),
  investmentRounds: Yup.string().required(
    'Rodadas de investimento é obrigatório.'
  ),
  lastInvestment: Yup.string().required('Último investimento é obrigatório.'),
  target: Yup.array().required('Público-alvo é obrigatório.'),
});

export const yupValidateCreateStartupStep2 = Yup.object().shape({
  description: Yup.string(),
  email: Yup.string().required('Email é obrigatório.'),
  site: Yup.string(),
  linkedIn: Yup.string(),
});

export const yupValidateCreateStartupStep3 = Yup.object().shape({
  startupMembers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório.'),
      role: Yup.string().required('Cargo é obrigatório.'),
    })
  ),
});

export type ValidateCreateStartupStep3 = Yup.InferType<
  typeof yupValidateCreateStartupStep3
>;