import { Button } from "../Button/Button"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  return (
    <div data-testid="pagination" className="flex items-center gap-2">
      {/* Previous Button */}
      <Button
        disabled={currentPage <= 1}
        onClick={() => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
        }}
      >
        Previous
      </Button>

      {/* Left Ellipsis */}
      {currentPage > 2 && (
        <Button disabled data-testid="ellipsis-left">...</Button>
      )}

      {/* Page Numbers */}
      {currentPage === 1 ? (
        <>
          <Button disabled data-testid="page-current">{currentPage}</Button>
          {currentPage + 1 <= totalPages && (
            <Button onClick={() => setCurrentPage(currentPage + 1)} data-testid="page-next-1">{currentPage + 1}</Button>
          )}
          {currentPage + 2 <= totalPages && (
            <Button onClick={() => setCurrentPage(currentPage + 2)} data-testid="page-next-2">{currentPage + 2}</Button>
          )}
        </>
      ) : currentPage === totalPages ? (
        <>
          {currentPage - 2 > 0 && (
            <Button onClick={() => setCurrentPage(currentPage - 2)} data-testid="page-prev-2">{currentPage - 2}</Button>
          )}
          {currentPage - 1 > 0 && (
            <Button onClick={() => setCurrentPage(currentPage - 1)} data-testid="page-prev-1">{currentPage - 1}</Button>
          )}
          <Button disabled data-testid="page-current">{currentPage}</Button>
        </>
      ) : (
        <>
          {currentPage - 1 > 0 && (
            <Button onClick={() => setCurrentPage(currentPage - 1)} data-testid="page-prev">{currentPage - 1}</Button>
          )}
          <Button disabled data-testid="page-current">{currentPage}</Button>
          {currentPage + 1 <= totalPages && (
            <Button onClick={() => setCurrentPage(currentPage + 1)} data-testid="page-next">{currentPage + 1}</Button>
          )}
        </>
      )}

      {/* Right Ellipsis */}
      {currentPage < totalPages - 1 && (
        <Button disabled data-testid="ellipsis-right">...</Button>
      )}

      {/* Next Button */}
      <Button
        disabled={currentPage >= totalPages}
        onClick={() => {
          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        }}
      >
        Next
      </Button>
    </div>
  )
}
