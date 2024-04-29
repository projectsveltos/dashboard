import { FC, useState } from "react";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface PaginationState {
  currentPage: number;
  setPage: (page: number) => void;
}

interface PaginationUIProps {
  currentPage: number;
  setPage: (page: number) => void;
}

export const usePagination = (
  totalItems: number,
  visiblePages: number = 5
): [FC<PaginationUIProps>, PaginationState] => {
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(totalItems / visiblePages);
  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const PaginationUI: FC<PaginationUIProps> = () => {
    const halfVisiblePages = Math.floor(visiblePages / 2);
    const firstVisiblePage = Math.max(1, currentPage - halfVisiblePages);
    const lastVisiblePage = Math.min(
      Math.ceil(totalItems / visiblePages),
      firstVisiblePage + visiblePages - 1
    );

    const handleEllipsisClick = (next: boolean) => {
      const newPage = next ? lastVisiblePage + 1 : firstVisiblePage - 1;
      setPage(newPage);
    };

    const pages = [];
    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            onClick={() => setPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    const ellipsisPrev = firstVisiblePage > 1 && (
      <PaginationItem key="ellipsisPrev" className={"hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"}>
        <PaginationEllipsis onClick={() => handleEllipsisClick(false)} />
      </PaginationItem>
    );

    const ellipsisNext =
      lastVisiblePage < Math.ceil(totalItems / visiblePages) && (
        <PaginationItem key="ellipsisNext" className={"hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"}>
          <PaginationEllipsis onClick={() => handleEllipsisClick(true)} />
        </PaginationItem>
      );

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem  >
            <PaginationPrevious
              onClick={() =>currentPage === 1?null: setPage(currentPage - 1)}
              isActive={!isFirstPage}
            />
          </PaginationItem>
          {ellipsisPrev}
          {pages}
          {ellipsisNext}
          <PaginationItem>
            <PaginationNext
              onClick={() => isLastPage?null: setPage(currentPage + 1)}
              isActive={!isLastPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return [PaginationUI, { currentPage, setPage }];
}