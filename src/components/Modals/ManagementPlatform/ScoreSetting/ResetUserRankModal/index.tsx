import {
  ButtonsContainer,
  CloseButton,
  Content,
  Line,
  Message,
  MessageContainer,
  PopupContainer,
  ResetButton,
  Title,
  TitleContainer,
} from './styles';

interface ResetUserRankModalProps {
  handleReset: () => void;
  handleClose: () => void;
}

export const ResetUserRankModal: React.FC<ResetUserRankModalProps> = ({
  handleReset,
  handleClose,
}) => {
  return (
    <PopupContainer>
      <Content>
        <TitleContainer>
          <Title>Deseja resetar a pontuação?</Title>
        </TitleContainer>
        <Line />
        <MessageContainer>
          <Message>
            Após essa ação, a pontuação é zerada e você não poderá restaurar os
            pontos atuais.
          </Message>
        </MessageContainer>

        <ButtonsContainer>
          <CloseButton onClick={handleClose}>
            <p>Fechar</p>
          </CloseButton>
          <ResetButton onClick={handleReset}>
            <p>Resetar&nbsp;pontuação</p>
          </ResetButton>
        </ButtonsContainer>
      </Content>
    </PopupContainer>
  );
};
