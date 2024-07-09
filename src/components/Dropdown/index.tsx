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
  itemsList: Campaign[];
  selectedItems: string[];
  handleSelect: (id: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  itemsList,
  selectedItems,
  handleSelect,
}) => {
  return (
    <DropdownContainer>
      <DropdownButton>
        Direcional
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
            <DropdownTitle>Direcional</DropdownTitle>
            <Line />
          </DropdownTop>
          <DropdownItemsContainer>
            {itemsList?.length > 0 &&
              itemsList.map(item => {
                return (
                  <DropdownItem
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                  >
                    <Checkbox
                      type="checkbox"
                      checked={selectedItems.some(e => e === item.id)}
                      onChange={() => handleSelect(item.id)}
                    />
                    <VisibleCheckbox
                      checked={selectedItems.some(e => e === item.id)}
                    >
                      <ImCheckmark size={16} color="#000" />
                    </VisibleCheckbox>

                    <DropdownItemLabel>
                      {item.title?.length > 35
                        ? `${item.title.substring(0, 35)} ...`
                        : `${item.title}`}
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
