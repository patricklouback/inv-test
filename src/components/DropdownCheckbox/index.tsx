/* eslint-disable react/no-array-index-key */
import { useMemo, useState } from 'react';
import { DropdownItem, VisibleCheckbox } from '@components/Dropdown/styles';
import {
  StyledCheckboxContainer,
  HiddenCheckbox,
} from '@components/PageComponents/IdeaRepository/styles';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ErrorText, Label } from '@components/NewSelect/styles';
import { BiCheck, BiErrorCircle } from 'react-icons/bi';
import { useTheme } from 'styled-components';
import { useDebounce } from 'hooks/useDebounce';
import {
  Container,
  Select,
  SelectWrapper,
  SelectedOption,
  Content,
} from './styles';

type DropdownCheckboxProps = {
  options?: { name: string; id: number; checked: boolean }[];
  label?: string;
  handleOption: (id: number) => void;
  error?: string;
  selected?: string[]
};

export function DropdownCheckbox({
  options = [],
  label = 'Selecione',
  handleOption,
  error,
  selected,
}: DropdownCheckboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();
  const debounce = useDebounce(isOpen, 500);

  const reverseOptions = useMemo(() => {
    return selected
  }, [selected]);

  return (
    <SelectWrapper
      onMouseLeave={() => {
        if (debounce) {
          setIsOpen(false);
        }
      }}
    >
      <Label>{label}</Label>
      <Container
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        error={!!error}
      >
        <Content>
          {selected ? (
            reverseOptions.map((item, index) => (
              <SelectedOption key={index}>
                <span>{item}</span>
              </SelectedOption>
            ))
          ) : (
            <span>Selecione</span>
          )}
        </Content>
        <MdKeyboardArrowDown size={20} />
      </Container>
      {isOpen && (
        <Select>
          {options.map(({ checked, id, name }) => (
            <DropdownItem key={id}>
              <StyledCheckboxContainer>
                <VisibleCheckbox
                  checked={checked}
                  onChange={() => handleOption(id)}
                >
                  <HiddenCheckbox />
                  <BiCheck size={12} />
                </VisibleCheckbox>
                <span>{name}</span>
              </StyledCheckboxContainer>
            </DropdownItem>
          ))}
        </Select>
      )}
      {error && (
        <ErrorText position>
          <BiErrorCircle color={colors.notification.error} size={22} />
          {error}
        </ErrorText>
      )}
    </SelectWrapper>
  );
}
