import React, { Dispatch, SetStateAction, useContext } from 'react';
import { UnderTitleLine } from '@components/Modals/StartupDetail/styles';
import { StartupsContext } from 'contexts/Startups';
import { DropdownMenu, DropdownItem, ColorCircle } from './styles';

type DropdownProps = {
  statusArray: { color: string; text: string; value: string }[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & React.HTMLAttributes<HTMLDivElement>;

const Dropdown = ({ statusArray, setIsOpen, ...props }: DropdownProps) => {
  const { updateStartup } = useContext(StartupsContext);

  const updateStatus = (status: string) => {
    updateStartup({ status });
    setIsOpen(false);
  };

  return (
    <DropdownMenu {...props}>
      {statusArray.map((status, index) => (
        <div key={index}>
          <DropdownItem
            className="truncate"
            onClick={() => updateStatus(status.value)}
            type="button"
          >
            <ColorCircle color={status.color} />
            {status.text}
          </DropdownItem>
          {index !== statusArray.length - 1 && <UnderTitleLine />}
        </div>
      ))}
    </DropdownMenu>
  );
};

export default Dropdown;
