import styled from 'styled-components';


export const Container = styled.div<{ $color: string }>`
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