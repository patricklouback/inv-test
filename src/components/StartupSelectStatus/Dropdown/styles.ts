import styled from "styled-components";


export const Curve = styled.svg`
  position: absolute;
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
`;

export const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  padding: 0.7rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
    

  &:hover {
    border-radius: 4px;
    background-color: #f0f0f0;
    width: 100%;
  }

`;

export const ColorCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 0.5rem;
`;

export const DropdownMenu = styled.div`
  display:flex;
  flex-direction:column;

  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  position: absolute;
  top: 50px;
  z-index: 1;
`;