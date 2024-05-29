import Button from '@components/Button';
import { Textarea } from '@components/Textarea';
import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupValidateComment } from '@validators/comment';
import { Idea } from 'interfaces/idea';
import { IdeaCommentContext } from 'contexts/IdeaComments';
import { IdeaCommentForm, ModalTitle } from './styles';

interface IdeaCommentProps {
  isOpen: boolean;
  idea: Idea;
  onClose: () => void;
}

export function IdeaCommentModal({
  isOpen,
  idea,
  onClose,
}: IdeaCommentProps): JSX.Element {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupValidateComment),
  });

  const { createIdeaComment } = useContext(IdeaCommentContext);

  const clearModal = useCallback(() => {
    setValue('message', '');
  }, [setValue]);

  const handleCloseModal = useCallback(() => {
    clearModal();
    onClose();
  }, [clearModal, onClose]);

  const handleSubmitComment = useCallback(
    async form => {
      const formData = new FormData();

      formData.append('message', form.message);
      formData.append('ideaId', idea.id);

      await createIdeaComment(formData);

      handleCloseModal();
    },
    [createIdeaComment, handleCloseModal, idea]
  );

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
    >
      <IdeaCommentForm onSubmit={handleSubmit(handleSubmitComment)}>
        <ModalTitle>Envie seu comentário</ModalTitle>
        <div>
          <Textarea
            name="message"
            errors={errors}
            register={register}
            placeholder="Comentário..."
          />
        </div>
        <Button type="submit">Enviar</Button>
      </IdeaCommentForm>
    </Modal>
  );
}
