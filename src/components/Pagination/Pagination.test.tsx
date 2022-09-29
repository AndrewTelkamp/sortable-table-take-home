import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import Pagination from '.';

enum Label {
  FIRST_BTN = 'Navigate to first page',
  LAST_BTN = 'Navigate to last page',
  NEXT_BTN = 'Navigate to next page',
  PREV_BTN = 'Navigate to previous page',
}

const defaultProps = {
  onPageChange: jest.fn(),
  onPageSizeChange: jest.fn(),
  page: 7,
  pageCount: 100,
};

describe('Pagination', () => {
  beforeEach(() => {
    defaultProps.onPageChange.mockReset();
    defaultProps.onPageSizeChange.mockReset();
  });

  test('renders correctly with default props', () => {
    render(<Pagination {...defaultProps} />);

    const pageSizeSelectLabel = screen.getByText('Per page:');
    const pageSizeSelect = screen.getByRole('combobox');
    const pageSizeOptions = screen.getAllByRole('option');
    const firstPageButton = screen.getByLabelText(Label.FIRST_BTN);
    const prevPageButton = screen.getByLabelText(Label.PREV_BTN);
    const nextPageButton = screen.getByLabelText(Label.NEXT_BTN);
    const lastPageButton = screen.getByLabelText(Label.LAST_BTN);

    expect(pageSizeSelectLabel).toBeInTheDocument();
    expect(pageSizeSelectLabel).toHaveAttribute('for', 'pageSizeSelect');

    expect(pageSizeSelect).toBeVisible();
    expect(pageSizeSelect).toHaveValue('10');

    expect(pageSizeOptions).toHaveLength(4);

    expect(firstPageButton).toBeVisible();
    expect(prevPageButton).toBeVisible();
    expect(nextPageButton).toBeVisible();
    expect(lastPageButton).toBeVisible();
  });

  test('renders correctly when provided custom pageSize and pageSizeOptions', () => {
    const props = {
      ...defaultProps,
      pageSize: 6,
      pageSizeOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    render(<Pagination {...props} />);

    const pageSizeSelect = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');

    expect(pageSizeSelect).toHaveValue(props.pageSize.toString());
    expect(options).toHaveLength(props.pageSizeOptions.length);
  });

  test('handles firstPage button click correctly', async () => {
    render(<Pagination {...defaultProps} />);
    const firstPageButton = screen.getByLabelText(Label.FIRST_BTN);

    await userEvent.click(firstPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  test('handles prevPage button click correctly', async () => {
    render(<Pagination {...defaultProps} />);
    const prevPageButton = screen.getByLabelText(Label.PREV_BTN);

    await userEvent.click(prevPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      defaultProps.page - 1
    );
  });

  test('disables firstPage and prevPage button when current page is 1', async () => {
    const props = { ...defaultProps, page: 1 };
    render(<Pagination {...props} />);
    const firstPageButton = screen.getByLabelText(Label.FIRST_BTN);
    const prevPageButton = screen.getByLabelText(Label.PREV_BTN);

    expect(firstPageButton).toBeDisabled();
    expect(prevPageButton).toBeDisabled();

    await userEvent.click(firstPageButton);
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();

    await userEvent.click(prevPageButton);
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  test('handles nextPage button click correctly', async () => {
    render(<Pagination {...defaultProps} />);
    const nextPageButton = screen.getByLabelText(Label.NEXT_BTN);

    await userEvent.click(nextPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      defaultProps.page + 1
    );
  });

  test('handles lastPage button click correctly', async () => {
    render(<Pagination {...defaultProps} />);
    const lastPageButton = screen.getByLabelText(Label.LAST_BTN);

    await userEvent.click(lastPageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      defaultProps.pageCount
    );
  });
});
