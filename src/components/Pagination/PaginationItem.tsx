/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button } from './styles';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  number,
  onPageChange,
  isCurrent = false,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button style={{ backgroundColor: 'rgba(141, 172, 224, 0.2)' }}>
        {number}
      </Button>
    );
  }

  return <Button onClick={() => onPageChange(number)}>{number}</Button>;
}
