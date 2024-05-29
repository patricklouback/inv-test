import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const PageTitle = styled.div`
  margin-top: 20px;
  width: 392px;
  height: 38px;
  font-family: Montserrat;
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: left;
`;

export const FiltersWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const FilterSearch = styled.div`
  display: flex;
  width: 495px;
  height: 36px;
  border-radius: 8px;
  border: 1.4px solid #b5b5b5;
  padding-left: 20px;
  align-items: center;
`;

export const InputFilterSearch = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  color: #b5b5b5;
  background: none;
  &::placeholder {
    color: #b5b5b5;
  }
  &:focus {
    color: #000000;
  }
  margin-left: 10px;
`;

export const FilterButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const FilterButton = styled.div`
  width: 118px;
  padding: 6px 12px 6px 12px;
  border-radius: 8px;
  border: 1px solid #b5b5b5;
  height: 36px;
  cursor: pointer;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* margin-top: 20px; */
`;
function getBorderRadius(isFirst?: boolean, isLast?: boolean): string {
  if (isFirst) return '10px 0 0 0';
  if (isLast) return '0 10px 0 0';
  return '0';
}

export const TableHeader = styled.th<{ isFirst?: boolean; isLast?: boolean }>`
  height: 60px;
  border-bottom: 1px solid #dddddd;
  padding: 8px 8px 8px 18px;
  text-align: left;
  background: #e7e7e7;
  border-radius: ${props => getBorderRadius(props.isFirst, props.isLast)};
  width: 16%;
`;

export const TableCell = styled.td`
  width: 16%;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  padding: 8px 8px 8px 18px;
  height: 60px;
  text-align: left;
`;

export const TableRow = styled.tr`
  /* &:nth-child(even) {
    background-color: #f2f2f2;
  } */
  border: none;
`;

export const AccessLink = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding-right: 20px;
`;

export const TableContainer = styled.div`
  height: 420px;
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

export const TableBody = styled.tbody``;

export const TableWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 80px;
`;

export const Drop = styled.ul<{ open: boolean }>`
  position: relative;
  display: block;
  top: 25px;
  right: 62px;
  width: 170px;

  ::after {
    content: '';
    background: ${({ theme }) => theme.colors.greyLight};
    width: 10px;
    height: 10px;
    position: absolute;
    top: -8px;
    right: 19px;
    border-top: 2px solid ${({ theme }) => theme.colors.borders};
    border-left: 2px solid ${({ theme }) => theme.colors.borders};

    transform: rotate(45deg);
  }

  z-index: 99999;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.borders};
  border-radius: 8px;

  list-style: none;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
`;

export const FilterOrderOption = styled.div`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
`;
