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
    email: Yup.string()
      .email('Insira um email válido').when('registration', {
        is: (registration) => !registration,
        then: Yup.string().optional(),
        otherwise: Yup.string().optional(),
      }),
    name: Yup.string().required('Nome é obrigatório'),
    departamentId: Yup.string().required('Departamento é obrigatório'),
    areaId: Yup.string().required('Área é obrigatória'),
    registration: Yup.string().optional(),
    password: Yup.string().when('registration', {
        is: (registration) => !!registration,
        then: Yup.string().required('Se houver matrícula a redefinição da senha é obrigatória, apague a matrícula para continuar'),
        otherwise: Yup.string().optional(),
      }),
      isAdmin: Yup.boolean().optional(),
      isManager: Yup.boolean().optional(),
  })
  .required();
