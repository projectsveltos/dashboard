import { FC, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { appConfig } from "@/config/app";

export const usePagination = (
  totalElements: number,
  page: number = 1,
  onChangePage: (page: number) => void,
  itemsPerPage: number = appConfig.defaultSize,
  visiblePages: number = 3,
): [FC] => {
  const totalPages = Math.ceil(totalElements / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(page);
  const setPage = (page: number) => {
    setCurrentPage(page);
    onChangePage(page);
  };
  const PaginationUI: FC = () => {
    const halfVisiblePages = Math.floor(visiblePages / 2);
    const firstVisiblePage = Math.max(1, currentPage - halfVisiblePages);
    const lastVisiblePage = Math.min(
      Math.ceil(totalPages / visiblePages),
      firstVisiblePage + visiblePages - 1,
    );
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            onClick={() => setPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    const ellipsisPrev = startPage > 1 && totalPages > visiblePages && (
      <PaginationItem>
        <PaginationEllipsis onClick={() => setPage(startPage - visiblePages)} />
      </PaginationItem>
    );
    const ellipsisNext = endPage < totalPages && totalPages > visiblePages && (
      <PaginationItem>
        <PaginationEllipsis onClick={() => setPage(endPage + 1)} />
      </PaginationItem>
    );

    const firstPage = (
      <PaginationItem key={1}>
        <PaginationLink isActive={currentPage === 1} onClick={() => setPage(1)}>
          {1}
        </PaginationLink>
      </PaginationItem>
    );
    const lastPage = (
      <PaginationItem key={totalPages}>
        <PaginationLink
          isActive={totalPages === currentPage}
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                currentPage === 1 ? null : setPage(currentPage - 1)
              }
              isActive={!isFirstPage}
            />
          </PaginationItem>
          {!isFirstPage && startPage >= 2 && firstPage}
          {ellipsisPrev}
          {pages}
          {ellipsisNext}
          {!isLastPage && endPage < totalPages && lastPage}
          <PaginationItem>
            <PaginationNext
              onClick={() => (isLastPage ? null : setPage(currentPage + 1))}
              isActive={
                !isLastPage && currentPage !== totalPages && totalPages !== 1
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return [PaginationUI];
};
