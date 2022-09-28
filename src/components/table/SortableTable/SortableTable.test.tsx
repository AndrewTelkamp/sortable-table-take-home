import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';

import SortableTable from '.';
import { FetchStatus } from '../../../constants';

const testHeaders = [
  { dataKey: 'first', title: 'First Name' },
  { dataKey: 'middle', title: 'Middle Name' },
  { dataKey: 'last', title: 'Last Name' },
];

const testData = [
  { first: 'Alex', middle: 'Amos', last: 'Anderson' },
  { first: 'Brian', middle: 'Brick', last: 'Bellowitz' },
  { first: 'Charlie', middle: 'Crocodile', last: 'Christopherson' },
  { first: 'Doug', middle: 'Dairy', last: 'Dangles' },
  { first: 'Eric', middle: 'Early', last: 'Edmon' },
  { first: 'Frank', middle: 'Flippity', last: 'Frump' },
  { first: 'Greg', middle: 'Grossly', last: 'Garrison' },
  { first: 'Hank', middle: 'Hansel', last: 'Herried' },
];

const emptyStateText = 'empty state';
const errorStateText = 'error state';
const loadStateText = 'load state';

const defaultProps = {
  caption: 'test caption',
  data: testData,
  emptyState: <p>{emptyStateText}</p>,
  errorState: <p>{errorStateText}</p>,
  fetchStatus: FetchStatus.SUCCESS,
  headers: testHeaders,
  loadState: <p>{loadStateText}</p>,
  onPageChange: jest.fn(),
  onPageSizeChange: jest.fn(),
  onTableHeaderClick: jest.fn(),
  page: 13,
  pageSize: 10,
  pageSizeOptions: [1, 2, 3, 4, 5, 6, 7, 8],
  sortOptions: {
    dataKey: testHeaders[0].dataKey,
    sortDirection: 'descending',
    title: testHeaders[0].title,
  },
  totalPageCount: 99,
};

describe('SortableTable', () => {
  beforeEach(() => {
    defaultProps.onPageChange.mockReset();
    defaultProps.onPageSizeChange.mockReset();
    defaultProps.onTableHeaderClick.mockReset();
  });

  test('renders headers correctly', () => {
    render(<SortableTable {...defaultProps} />);
    const headers = screen.queryAllByRole('columnheader');
    expect(headers.length).toBe(testHeaders.length);

    testHeaders.forEach((header) => {
      expect(screen.queryByText(header.title)).toBeVisible();
    });
  });

  test('headers can be navigated via keyboard', async () => {
    render(<SortableTable {...defaultProps} />);
    const headers = screen.queryAllByRole('columnheader');

    expect(headers[0]).not.toHaveFocus();
    expect(headers[1]).not.toHaveFocus();
    expect(headers[2]).not.toHaveFocus();

    await userEvent.tab();
    expect(headers[0]).toHaveFocus();

    await userEvent.tab();
    expect(headers[1]).toHaveFocus();

    await userEvent.tab();
    expect(headers[2]).toHaveFocus();

    await userEvent.tab();
    expect(headers[2]).not.toHaveFocus();
  });

  test('header clicks handled correctly', async () => {
    render(<SortableTable {...defaultProps} />);
    const tableHeaders = screen.queryAllByRole('columnheader');

    await userEvent.click(tableHeaders[0]);
    expect(defaultProps.onTableHeaderClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onTableHeaderClick).toHaveBeenCalledWith({
      dataKey: testHeaders[0].dataKey,
      direction: undefined,
      title: testHeaders[0].title,
    });

    await userEvent.tab();
    expect(tableHeaders[1]).toHaveFocus();

    await userEvent.keyboard('{enter}');
    expect(defaultProps.onTableHeaderClick).toHaveBeenCalledTimes(2);
    expect(defaultProps.onTableHeaderClick).toHaveBeenCalledWith({
      dataKey: testHeaders[1].dataKey,
      direction: undefined,
      title: testHeaders[1].title,
    });

    await userEvent.tab();
    expect(tableHeaders[2]).toHaveFocus();

    await userEvent.keyboard('{ }');
    expect(defaultProps.onTableHeaderClick).toHaveBeenCalledTimes(3);
    expect(defaultProps.onTableHeaderClick).toHaveBeenCalledWith({
      dataKey: testHeaders[2].dataKey,
      direction: undefined,
      title: testHeaders[2].title,
    });
  });

  test('renders data rows correctly', () => {
    const props = { ...defaultProps };
    render(<SortableTable {...props} />);
    expect(screen.queryAllByRole('row')).toHaveLength(testData.length + 1);

    testData.forEach((row) => {
      const rowKeys = Object.keys(row);
      rowKeys.forEach((key) => {
        // @ts-ignore
        expect(screen.queryByText(row[key])).toBeVisible();
      });
    });
  });

  test('renders load state when fetch status is fetching', () => {
    const props = { ...defaultProps, fetchStatus: FetchStatus.FETCHING };
    render(<SortableTable {...props} />);

    expect(screen.queryByText(emptyStateText)).not.toBeInTheDocument();
    expect(screen.queryByText(errorStateText)).not.toBeInTheDocument();
    expect(screen.queryByText(loadStateText)).toBeVisible();
  });

  test('renders error state when fetch status is fail', () => {
    const props = { ...defaultProps, fetchStatus: FetchStatus.FAIL };
    render(<SortableTable {...props} />);

    expect(screen.queryByText(emptyStateText)).not.toBeInTheDocument();
    expect(screen.queryByText(errorStateText)).toBeVisible();
    expect(screen.queryByText(loadStateText)).not.toBeInTheDocument();
  });

  test('renders empty state when provided data from a successful request', () => {
    const props = {
      ...defaultProps,
      data: [],
      fetchStatus: FetchStatus.SUCCESS,
    };
    render(<SortableTable {...props} />);

    expect(screen.queryByText(emptyStateText)).toBeVisible();
    expect(screen.queryByText(errorStateText)).not.toBeInTheDocument();
    expect(screen.queryByText(loadStateText)).not.toBeInTheDocument();
  });

  test('provides pageSize options correctly', () => {
    render(<SortableTable {...defaultProps} />);
    const options: HTMLOptionElement[] = screen.queryAllByRole('option');
    expect(options).toHaveLength(defaultProps.pageSizeOptions.length);

    options.forEach((opt, index) => {
      expect(opt.value).toBe(defaultProps.pageSizeOptions[index].toString());
    });
  });

  test('handles pageSizeChanges correctly', async () => {
    render(<SortableTable {...defaultProps} />);
    const selectInput = screen.getByRole('combobox');

    fireEvent.change(selectInput, { target: { value: '11' } });

    expect(defaultProps.onPageSizeChange).toHaveBeenCalled();
  });

  test('handles first page button click correctly', async () => {
    const props = { ...defaultProps };
    render(<SortableTable {...props} />);

    const firstPageButton = screen.getByLabelText('Navigate to first page');

    await userEvent.click(firstPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  test('handles prev page button click correctly', async () => {
    const props = { ...defaultProps };
    render(<SortableTable {...props} />);

    const firstPageButton = screen.getByLabelText('Navigate to previous page');

    await userEvent.click(firstPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      defaultProps.page - 1
    );
  });

  test('handles next page button click correctly', async () => {
    const props = { ...defaultProps };
    render(<SortableTable {...props} />);

    const firstPageButton = screen.getByLabelText('Navigate to next page');

    await userEvent.click(firstPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      defaultProps.page + 1
    );
  });

  test('handles last page button click correctly', async () => {
    const props = { ...defaultProps };
    render(<SortableTable {...props} />);

    const firstPageButton = screen.getByLabelText('Navigate to last page');

    await userEvent.click(firstPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      defaultProps.totalPageCount
    );
  });
});
