import { useEffect, useState } from 'react';

import Pagination from '../../Pagination';
import Table from '../Table';
import TableCell from '../TableCell';
import TableHeaderCell from '../TableHeaderCell';
import TableHeaderRow from '../TableHeaderRow';
import TableRow from '../TableRow';
import { FetchStatus } from '../../../constants';

import type { SortArgs } from '../TableHeaderCell';

interface Header {
  dataKey: string;
  title: string;
}

interface Props {
  caption: string;
  data: any[];
  emptyState: JSX.Element;
  errorState: JSX.Element;
  fetchStatus: FetchStatus;
  headers: Header[];
  loadState: JSX.Element;
  onPageChange: (page: number) => any;
  onPageSizeChange: (size: number) => any;
  onTableHeaderClick: (args: SortArgs) => any;
  page: number;
  pageSize: number;
  pageSizeOptions?: number[];
  sortOptions: SortArgs;
  totalPageCount: number;
}

const SortableTable = ({
  caption,
  data,
  emptyState,
  errorState,
  fetchStatus,
  headers,
  loadState,
  onPageChange,
  onPageSizeChange,
  onTableHeaderClick,
  page,
  pageSize,
  pageSizeOptions,
  sortOptions,
  totalPageCount,
}: Props) => {
  const [cellKeys, setCellKeys] = useState<string[]>([]);

  useEffect(() => {
    const cellKeys: string[] = headers.map((header) => header.dataKey);
    setCellKeys(cellKeys);
  }, []);

  return (
    <>
      <Table caption={caption}>
        <thead style={{ width: '100%' }}>
          <TableHeaderRow>
            {headers.map((header) => (
              <TableHeaderCell
                dataKey={header.dataKey}
                key={header.title}
                onClick={onTableHeaderClick}
                sortDirection={
                  (sortOptions.title === header.title &&
                    sortOptions.direction) ||
                  undefined
                }
                title={header.title}
              />
            ))}
          </TableHeaderRow>
        </thead>

        <tbody>
          {/* @ts-ignore */}
          <UIState
            colSpan={headers.length}
            errorState={errorState}
            emptyState={emptyState}
            loadState={loadState}
            fetchStatus={fetchStatus}
            isData={!!data.length}
          >
            {data.map((row, rowIndex) => (
              <TableRow key={`$row${rowIndex}`}>
                {cellKeys.map((name, cellIndex) => {
                  return (
                    <TableCell
                      key={`row${rowIndex}cell${cellIndex}`}
                      value={row[name]}
                    />
                  );
                })}
              </TableRow>
            ))}
          </UIState>
        </tbody>
      </Table>

      <Pagination
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={pageSizeOptions}
        pageCount={totalPageCount}
      />
    </>
  );
};

interface UIStateProps {
  children: React.ReactNode | React.ReactNode[];
  colSpan: number;
  emptyState: JSX.Element;
  errorState: JSX.Element;
  fetchStatus: FetchStatus;
  isData: boolean;
  loadState: JSX.Element;
}

const UIState = ({
  children,
  colSpan,
  emptyState,
  errorState,
  fetchStatus,
  isData,
  loadState,
}: UIStateProps) => {
  if (fetchStatus === FetchStatus.FETCHING) {
    return (
      <tr>
        <td colSpan={colSpan}>{loadState}</td>
      </tr>
    );
  }

  if (fetchStatus === FetchStatus.FAIL) {
    return (
      <tr>
        <td colSpan={colSpan}>{errorState}</td>
      </tr>
    );
  }

  if (fetchStatus === FetchStatus.SUCCESS && !isData) {
    return (
      <tr>
        <td colSpan={colSpan}>{emptyState}</td>
      </tr>
    );
  }

  return children;
};

export default SortableTable;
