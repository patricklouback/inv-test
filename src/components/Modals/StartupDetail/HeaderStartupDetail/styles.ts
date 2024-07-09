import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 50px;
  align-items: center;
  justify-content: space-between;
  
`;

export const ContentMap = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  gap: 3rem;
`;

export const Content = styled.div`
  display: flex;
  position: relative;
`;

export const Text = styled.button<{ $isSelect: boolean }>`
  font-size: 20px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  border: none;
  background: none;
  color: ${({ $isSelect }) => ($isSelect ? '#121212' : '#B5B5B5')};
`;

export const Unline = styled.div<{ $isSelect: boolean }>`
  height: 3px;
  width: 92px;
  position: absolute;
  top: 59px;
  background-color: ${({ $isSelect }) => ($isSelect ? '#121212' : 'transparent')};
`;


export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 50%;
  justify-content: flex-end;
  gap: 1rem;
`;

export const Button = styled.button`
  width: 200px;
  background: #47009A;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #000;
  }
`;