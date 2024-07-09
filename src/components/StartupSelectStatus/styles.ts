import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
`;

export const Content = styled.button`
  display: flex;
  width: 200px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #B5B5B5;
  background-color: transparent;
`;


export const ContainerStatus = styled.div<{ $color: string }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  


  span {
    font-size: 0.9rem;
    font-weight: 500;
  }

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
  }
`;