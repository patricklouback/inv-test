import { ImCheckmark } from 'react-icons/im';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiFilter2Line } from 'react-icons/ri';
import { getTextWidth, getStringWith3Dots } from 'utils/wordLengthCounter';
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
  DropdownTop,
  TagName,
  EmptyTags,
} from './styles';

interface DropdownProps {
  itemsList: any[];
  handleSelect: (id: string) => void;
}

export const DropdownTagFilter: React.FC<DropdownProps> = ({
  itemsList,
  handleSelect,
}) => {
  const MAX_TAG_WIDTH = 100;
  const buildTagName = (name: string): string => {
    return getTextWidth(name, '400 12px bold Montserrat') > MAX_TAG_WIDTH
      ? getStringWith3Dots(name, MAX_TAG_WIDTH,'400 12px bold Montserrat')
      : name;
  };
  return (
    <DropdownContainer>
      <DropdownButton>
        Etiqueta
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
            <DropdownTitle>Etiqueta</DropdownTitle>
            <Line />
          </DropdownTop>
          <DropdownItemsContainer>
            {itemsList?.length === 0 ? 
              <EmptyTags>Não há etiquetas selecionadas</EmptyTags> :
              itemsList.map(item => {
                return (
                  <DropdownItem>
                    <Checkbox
                      type="checkbox"
                      checked={item.checked}
                      onClick={() => handleSelect(item)}
                    />
                    <VisibleCheckbox
                      onClick={() => handleSelect(item)}
                      checked={item.checked}
                    >
                      <ImCheckmark size={16} color="#000" />
                    </VisibleCheckbox>

                      <TagName backgroundColor={item.color} textColor={item.textColor}>
                        {buildTagName(item.name)}
                      </TagName>
                  </DropdownItem>
                );
              })}
          </DropdownItemsContainer>
        </DropdownContentMenu>
      </DropdownContent>
    </DropdownContainer>
  );
};
