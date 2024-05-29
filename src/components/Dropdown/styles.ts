import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  display: block;

  z-index: 100;

  #arrow-icon {
    transition: 0.4s ease;
    transform: rotateZ(0deg);
  }

  :hover {
    #content {
      display: flex;
    }

    #arrow-icon {
      transition: 0.4s ease;
      transform: rotateZ(-180deg);
    }
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
`;

export const DropdownContentMenu = styled.div`
  position: relative;
  top: 20px;
  right: 0;

  display: none;
  flex-direction: column;

  padding: 12px 0 12px 0;

  width: 226px;
  max-height: 250px;

  background-color: #fff;

  border: 1px solid #cfd1dc;
  outline: 0;
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  ::before {
    content: '';
    position: absolute;
    top: -11px;
    right: 19px;
    width: 18px;
    height: 18px;
    background-color: white;

    border-top: 1px solid #cfd1dc;
    border-left: 1px solid #cfd1dc;

    transform: rotateZ(45deg);
  }
`;

export const DropdownTop = styled.div`
  position: relative;

  > h2 {
    margin-bottom: 6px;
  }
`;

export const DropdownTitle = styled.h2`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  text-align: center;

  color: rgba(45, 55, 72, 0.8);

  mix-blend-mode: normal;
`;

export const DropdownButton = styled.button`
  border: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 6px 12px;
  gap: 8px;

  max-width: 157px;
  min-height: 36px;

  background: #ffffff;
  border-radius: 10px;
  border: #525556 2px solid;
  color: #525556;
  font-weight: 500;
`;

export const DropdownItemsContainer = styled.div`
  position: relative;

  padding-top: 6px;
  margin-left: 15px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  overflow-y: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
  }
`;

export const DropdownItem = styled.div`
  max-width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

export const DropdownItemLabel = styled.label`
  max-width: 120px;
`;

export const Arrow = styled.div`
  position: absolute;
  bottom: 5px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Line = styled.hr`
  border-top: 2px solid #9d28f0;
  background: #9d28f0;
`;

export const Checkbox = styled.input`
  position: absolute;
  opacity: 1;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const VisibleCheckbox = styled.label<{ checked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border: 1px solid #9d28f0;
  border-radius: 4px;

  svg {
    display: ${({ checked }) => (checked ? 'flex' : 'none')};
  }
`;
