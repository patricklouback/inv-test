import * as Yup from 'yup';

export const yupValidateLogin = Yup.object()
  .shape({
    email: Yup.string()
      .email('Insira um email válido')
      .required('Email é obrigatório'),
  })
  .required();

export const yupValidateAddUser = Yup.object()
  .shape({
    name: Yup.string().required('Nome é obrigatório'),
    departamentId: Yup.string().optional(),
    areaId: Yup.string().optional(),
    isAdmin: Yup.boolean().optional(),
    isManager: Yup.boolean().optional(),
    email: Yup.string()
      .email('Insira um email válido').optional(),
    registration: Yup.string().optional(),
    password: Yup.string().optional(),
  })
  .required();


  export const yupValidateEditUser = Yup.object()
  .shape({
    name: Yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: Yup.string().email('Insira um email válido'),
    departamentId: Yup.string(),
    areaId: Yup.string(),
  })