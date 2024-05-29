import { Campaign } from '@default-types';
import { useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiFilter2Line, RiLightbulbFlashLine } from 'react-icons/ri';
import {
  Arrow,
  Checkbox,
  DropdownButton,
  DropdownContainer,
  DropdownContent,
  DropdownItem,
  DropdownItemsContainer,
  DropdownTitle,
  Line,
  DropdownContentMenu,
  VisibleCheckbox,
  DropdownItemLabel,
  DropdownTop,
} from './styles';

interface DropdownProps {
  itemsList: string[];
  selectedItems: string[];
  handleSelect: (id: string) => void;
}

export const DropdownType: React.FC<DropdownProps> = ({
  itemsList,
  selectedItems,
  handleSelect,
}) => {
  return (
    <DropdownContainer>
      <DropdownButton>
        Rotas
        <>
          <RiFilter2Line size={20} />
          <Arrow id="arrow-icon">
            <IoMdArrowDropdown size={18} />
          </Arrow>
        </>
      </DropdownButton>

      <DropdownContent>
        <DropdownContentMenu id="content">
          <DropdownTop>
            <DropdownTitle>Rotas</DropdownTitle>
            <Line />
          </DropdownTop>
          <DropdownItemsContainer>
            {itemsList?.length > 0 &&
              itemsList.map(item => {
                return (
                  <DropdownItem onClick={() => handleSelect(item)}>
                    <Checkbox
                      type="checkbox"
                      checked={selectedItems.some(e => e === item)}
                      onChange={() => handleSelect(item)}
                    />
                    <VisibleCheckbox
                      checked={selectedItems.some(e => e === item)}
                    >
                      <ImCheckmark size={16} color="#000" />
                    </VisibleCheckbox>

                    <DropdownItemLabel>
                      {item}
                    </DropdownItemLabel>
                  </DropdownItem>
                );
              })}
          </DropdownItemsContainer>
        </DropdownContentMenu>
      </DropdownContent>
    </DropdownContainer>
  );
};
