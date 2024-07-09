import { ImCheckmark } from 'react-icons/im';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiFilter2Line } from 'react-icons/ri';
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

interface DropdownItens {
  name: string;
  value: string;
}

interface DropdownProps {
  itemsList: DropdownItens[];
  selectedItems: string[];
  handleSelect: (id: string, checked: boolean) => void;
  filterTitle: string;
  border?: string;
}

export const DropdownFilter: React.FC<DropdownProps> = ({
  filterTitle,
  itemsList,
  selectedItems,
  handleSelect,
  border,
}) => {
  return (
    <DropdownContainer>
      <DropdownButton border={border}>
        {filterTitle}
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
            <DropdownTitle>{filterTitle}</DropdownTitle>
            <Line />
          </DropdownTop>
          <DropdownItemsContainer>
            {itemsList?.length > 0 &&
              itemsList.map(item => {
                return (
                  <DropdownItem
                    key={item.value}
                    onClick={() =>
                      handleSelect(
                        item.value,
                        !selectedItems.some(e => e === item.value)
                      )
                    }
                  >
                    <Checkbox
                      type="checkbox"
                      checked={selectedItems.some(e => e === item.value)}
                    />
                    <VisibleCheckbox
                      checked={selectedItems.some(e => e === item.value)}
                    >
                      <ImCheckmark size={16} color="#000" />
                    </VisibleCheckbox>

                    <DropdownItemLabel>
                      {item.name?.length > 35
                        ? `${item.name.substring(0, 35)} ...`
                        : `${item.name}`}
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
