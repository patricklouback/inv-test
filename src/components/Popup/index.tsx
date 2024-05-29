import {
  ButtonsContainer,
  CloseButton,
  Content,
  Line,
  Message,
  MessageContainer,
  PopupContainer,
  SaveButton,
  Title,
  TitleContainer,
} from './styles';

interface PopupProps {
  handleSavePopup: () => void;
  handleCloseWithoutSave: () => void;
}

export const Popup: React.FC<PopupProps> = ({
  handleSavePopup,
  handleCloseWithoutSave,
}) => {
  return (
    <PopupContainer>
      <Content>
        <TitleContainer>
          <Title>Deseja sair sem salvar alterações? </Title>
        </TitleContainer>
        <Line />
        <MessageContainer>
          <Message>
            Você possui alterações em andamento que serão perdidas, caso você
            não salve agora.
          </Message>
        </MessageContainer>

        <ButtonsContainer>
          <CloseButton onClick={handleCloseWithoutSave}>
            <p>Fechar</p>
          </CloseButton>
          <SaveButton onClick={handleSavePopup}>
            <p>Salvar&nbsp;alterações</p>
          </SaveButton>
        </ButtonsContainer>
      </Content>
    </PopupContainer>
  );
};
