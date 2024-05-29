/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PaginationItem } from './PaginationItem';
import { Box, BoxContent } from './styles';

interface PaginationProps {
  lastPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, i) => {
      return from + i + 1;
    })
    .filter(page => page > 0);
}

export function Pagination({
  lastPage,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <>
      {lastPage > 1 && (
        <Box>
          <BoxContent>
            {currentPage > 1 + siblingsCount && (
              <>
                <PaginationItem onPageChange={onPageChange} number={1} />
                {currentPage > 2 + siblingsCount && <p>...</p>}
              </>
            )}

            {previousPages.length > 0 &&
              previousPages.map(page => (
                <PaginationItem
                  onPageChange={onPageChange}
                  key={page}
                  number={page}
                />
              ))}

            <PaginationItem
              onPageChange={onPageChange}
              number={currentPage}
              isCurrent
            />

            {nextPages.length > 0 &&
              nextPages.map(page => (
                <PaginationItem
                  onPageChange={onPageChange}
                  key={page}
                  number={page}
                />
              ))}

            {currentPage + siblingsCount < lastPage && (
              <>
                {currentPage + 1 + siblingsCount < lastPage && <p>...</p>}
                <PaginationItem onPageChange={onPageChange} number={lastPage} />
              </>
            )}
          </BoxContent>
        </Box>
      )}
    </>
  );
}
