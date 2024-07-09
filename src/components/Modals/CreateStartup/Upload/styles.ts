import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  width: 80%;
  height: 100%;

  .upload {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
    .header-upload {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.5rem;
      color: #2d3748;
    }
  }

  .downloadLink {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    background: transparent;
    cursor: pointer;

    span {
      font-size: 12px;
      font-weight: 500;
      line-height: 1.5rem;
      color: #2d3748;
      text-decoration: underline;
    }
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: #2d3748cc;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;


export const ProgressBar = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 5px;
  background-color: #2d3748;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
`;