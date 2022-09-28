import { memo } from 'react';

import IconButton from '../IconButton';

import type { ChangeEvent } from 'react';

import './styles.css';

interface Props {
  onPageChange: (pageNumber: number) => any;
  onPageSizeChange: (number: number) => any;
  page: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions?: number[];
}

const Pagination = ({
  onPageChange,
  onPageSizeChange,
  page,
  pageCount,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
}: Props) => {
  const handleFirstPageClick = () => {
    if (page !== 1) {
      onPageChange(1);
    }
  };

  const handleLastPageClick = () => {
    if (page !== pageCount) {
      onPageChange(pageCount);
    }
  };

  const handleNextPageClick = () => {
    if (page !== pageCount) {
      onPageChange(page + 1);
    }
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value);
    onPageSizeChange(newPageSize);
  };

  const handlePrevPageClick = () => {
    if (page !== 1) {
      onPageChange(page - 1);
    }
  };

  return (
    <div className='paginationBar'>
      <div className='pageStateSection'>
        <label htmlFor='pageSizeSelect'>Per page:</label>

        <select
          className='pageSize'
          name='pageSizeSelect'
          onChange={handlePageSizeChange}
          value={pageSize}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <IconButton
          ariaLabel='Navigate to first page'
          iconName='firstPage'
          isDisabled={page === 1}
          onClick={handleFirstPageClick}
        />

        <IconButton
          ariaLabel='Navigate to previous page'
          iconName='chevronLeft'
          isDisabled={page === 1}
          onClick={handlePrevPageClick}
        />

        <IconButton
          ariaLabel='Navigate to next page'
          iconName='chevronRight'
          isDisabled={page === pageCount}
          onClick={handleNextPageClick}
        />

        <IconButton
          ariaLabel='Navigate to last page'
          iconName='lastPage'
          isDisabled={page === pageCount}
          onClick={handleLastPageClick}
        />
      </div>
    </div>
  );
};

export default memo(Pagination);
