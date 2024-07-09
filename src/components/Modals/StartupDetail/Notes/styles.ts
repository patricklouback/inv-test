import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border-radius: 10px;
  gap: 20px;
`;

export const ContentCard = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  gap: 10px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
`;
export const Text = styled.p`
  margin-bottom: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.fontLight};
  font-weight: 500;
  letter-spacing: 0.1px;
  font-size: 16px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;

  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

export const ContentImage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateText = styled.h3`
  font-size: 10px;
  font-weight: 400;
  color: #6d6d6d;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  padding: 25px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #ced4da;
  height: 460px;
  overflow: hidden;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  gap: 30px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
  }
`;

export const ContainerTextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ScrollBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
  overflow-y: auto;
  scrollbar-color: #47009a #f1f1f1;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
`;
