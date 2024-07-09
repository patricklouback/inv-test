import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const TextDropFile = styled.div`
  padding: 0 60px;
  text-align: center;
`;

export const AreaDrop = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  font-size: 1rem;
  height: 164px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AreaText = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    span {
      letter-spacing: 0.5px;
      box-sizing: 0;
      text-align: center;
      line-height: 16px;

      max-width: 140px;
      font-weight: normal;
      color: ${({ theme }) => theme.colors.fontLight};
    }

    span:nth-child(4) {
      max-width: 154px;
    }

    button {
      border: none;
      background: none;
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.fontLight};
      font-size: 12px;
      margin-right: 5px;
    }
  }
`;

export const PreviewImage = styled.div<{ preview: string }>`
  background-image: url(${({ preview }) => preview});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 200px;
  height: 130px;
`;

export const PreviewFile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  p {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: 600;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const FilePreviewContainer = styled.div``;

export const RemoveFileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 3px;
`;
