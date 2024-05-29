import * as Yup from 'yup';

export const yupValidateComment = Yup.object()
  .shape({
    message: Yup.string().required('Comentário é obrigatório.'),
  })
  .required();
