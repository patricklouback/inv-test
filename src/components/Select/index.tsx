import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Options } from './options';
import {
  Container,
  Input,
  Icon,
  BoxInput,
  Clean,
  IconArrowRight,
} from './styles';

interface SelectProps {
  icon?: JSX.Element;
  placeholder?: string;
  dataSelect?: any;
  onChange?: (name: string) => void;
  name: string;
  onClickOption?: (params?: {
    value?: string;
    campaignId?: string;
    areaId?: string;
  }) => void;
  setClean?: (value: []) => void;
  disable?: boolean;
  arrowDown?: JSX.Element;
  onClickSelect?: () => void;
}

export const Select: React.FC<SelectProps> = ({
  icon,
  placeholder,
  dataSelect,
  onChange,
  name,
  onClickOption,
  setClean,
  disable,
  arrowDown,
  onClickSelect,
}): JSX.Element => {
  // const SelectRef = useRef(null);

  const [searchValue, setSearchValue] = useState('');

  return (
    <Container>
      <BoxInput disable={disable} onClick={onClickSelect && onClickSelect}>
        <Input
          disabled={disable}
          autoComplete="off"
          name={name}
          // ref={SelectRef}
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          isIcon={!!icon}
        />
        <Icon>{icon}</Icon>
        {!searchValue && arrowDown && (
          <IconArrowRight>{arrowDown}</IconArrowRight>
        )}
        {searchValue && (
          <Clean
            onClick={() => {
              setSearchValue('');
              setClean([]);
            }}
          >
            <IoMdClose size={20} />
          </Clean>
        )}
      </BoxInput>
      {dataSelect?.length !== 0 && searchValue && (
        <Options
          onClickOption={onClickOption}
          cleanInput={() => setSearchValue('')}
          dataSelect={dataSelect && dataSelect}
        />
      )}
    </Container>
  );
};
