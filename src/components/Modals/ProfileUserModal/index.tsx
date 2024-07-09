import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import CirclePendingIcon from '@components/Icons/CirclePending';
import { CheckMark } from '@components/Icons';
import { useProfile } from 'hooks/useProfile';
import { useEffect, useState } from 'react';
import {
  NotificationContainer,
  NotificationContent,
  Exit,
  Container,
  UserImg,
  Username,
  Header,
  ContentHeader,
  HeaderDescription,
  HeaderDescriptionItem,
  Bold,
  Divisor,
  Footer,
  StatusUser,
  FooterDescription,
  Card,
  CardLeft,
  CardRight,
  SubText,
} from './styles';

interface ProfileUserModalProps {
  ideaId: string;
  userId: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ProfileUserModal({
  ideaId,
  userId,
  isOpen,
  onRequestClose,
}: ProfileUserModalProps): JSX.Element {
  const [isActiveParticipation, setIsActiveParticipation] = useState(false);
  const { user, loading } = useProfile(userId, ideaId);

  useEffect(() => {
    if (!loading) {
      setIsActiveParticipation(
        user.participationStatus === 'DEFAULT' ||
          user.participationStatus === 'ACCEPTED'
      );
    }
  }, [user, loading]);

  if (loading) return;

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-profile-user"
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <NotificationContainer>
        <Exit>
          <IoMdClose onClick={onRequestClose} />
        </Exit>
        <NotificationContent>
          <Header>
            <UserImg src={user.image} />
            <ContentHeader>
              <Username>{user.name}</Username>
              <HeaderDescription>
                <HeaderDescriptionItem>
                  <Bold>Área: </Bold>
                  {user.area}
                </HeaderDescriptionItem>
                <HeaderDescriptionItem>
                  <Bold>Departamento: </Bold>
                  {user.department}
                </HeaderDescriptionItem>
                <HeaderDescriptionItem>
                  <Bold>Email: </Bold>
                  {user.email}
                </HeaderDescriptionItem>
              </HeaderDescription>
            </ContentHeader>
          </Header>

          <Divisor />

          <Container>
            <Card>
              <CardLeft>{user.ideaSubmitted}</CardLeft>
              <CardRight>Iniciativas submetidas</CardRight>
            </Card>
            <Card>
              <CardLeft>{user.totalParticipations}</CardLeft>
              <CardRight>Participações ao total</CardRight>
            </Card>
            <Card>
              <CardLeft>{user.ideaInProgress}</CardLeft>
              <CardRight>Iniciativas em progresso</CardRight>
            </Card>
            <Card>
              <CardLeft>
                {Math.round(user.ideaImplementedPercent)}
                <SubText>%</SubText>
              </CardLeft>
              <CardRight>Iniciativas implantadas</CardRight>
            </Card>
          </Container>

          <Divisor />
          <Footer>
            <FooterDescription>Status da participação:</FooterDescription>
            {isActiveParticipation ? (
              <StatusUser active>
                <CheckMark size={14} />
                Ativa
              </StatusUser>
            ) : (
              <StatusUser>
                <CirclePendingIcon />
                Aguardando resposta
              </StatusUser>
            )}
          </Footer>
        </NotificationContent>
      </NotificationContainer>
    </Modal>
  );
}
