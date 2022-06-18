import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';

type PaginationProps = {
  onChangePage: any;
  currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({ onChangePage, currentPage }) => {  // №14 урок
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};
