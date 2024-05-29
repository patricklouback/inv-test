import Button from '@components/Button';
import { AdmContext } from 'contexts/Adm';
import { SetStateAction, useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useTheme } from 'styled-components';
import {
  ContainerModal,
  ContentModal,
  ExitModal,
  BodyModal,
  TextDelete,
  ButtonsContent,
} from './styles';

interface InactiveUsersProps {
  type: string;
  id: string;
  setIsModalInactiveUserOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function InactiveUsers({
  type,
  id,
  setIsModalInactiveUserOpen,
}: InactiveUsersProps): JSX.Element {
  const { colors } = useTheme();
  const { getUsers, deleteUser } = useContext(AdmContext);

  const onDelete = async (status): Promise<void> => {
    try {
      await deleteUser(id, { status });
      await getUsers();
      setIsModalInactiveUserOpen(false);
    } catch {
      console.log('error');
    }
  };

  return (
    <ContainerModal>
      <ContentModal>
        <ExitModal onClick={() => setIsModalInactiveUserOpen(false)}>
          <IoMdClose size={25} />
        </ExitModal>
        <BodyModal>
          <TextDelete>
            Você tem certeza que deseja
            {type === 'updateForInactive' ? ' ativar ' : ' inativar '}
            esse usuário?
          </TextDelete>
          <ButtonsContent>
            <Button
              style={{
                width: '50%',
                backgroundColor: colors.greenHipeLight,
              }}
              onClick={() => {
                onDelete(type === 'updateForInactive' ? 'ACTIVE' : 'INACTIVE');
              }}
            >
              SIM
            </Button>
            <Button
              style={{
                backgroundColor: colors.grey,
                width: '50%',
              }}
              onClick={() => setIsModalInactiveUserOpen(false)}
            >
              CANCELAR
            </Button>
          </ButtonsContent>
        </BodyModal>
      </ContentModal>
    </ContainerModal>
  );
}
