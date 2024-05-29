import styled from 'styled-components';

export const ContainerModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #6d6d6ddf;
`;

export const ExitModal = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const ContentModal = styled.div`
  background-color: #fff;
  max-height: 320px;
  max-width: 480px;
  margin: 0 auto;
  flex-direction: column;
  border-radius: 24px;
  display: flex;
  padding: 2rem;
  gap: 1rem;
`;

export const BodyModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;

export const TextDelete = styled.p`
  font-weight: 600;
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.font};
`;

export const ButtonsContent = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;
