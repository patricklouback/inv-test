import styled from 'styled-components';

export const EditAndCheckWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* :hover {
    background: ${({ theme }) => theme.colors.grey_hover};
    border-radius: 50%;
  } */
`;
