import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import TableHeaderCell, { IconColor, SortIcon } from '.';

const defaultProps = {
  dataKey: 'id',
  onClick: jest.fn(),
  title: 'fake title',
};

const tr = document.createElement('tr');

describe('TableHeaderCell', () => {
  beforeEach(() => {
    defaultProps.onClick.mockReset();
  });

  test('renders correctly with default props', () => {
    render(<TableHeaderCell {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });

    const cell = screen.getByRole('columnheader');
    const content = screen.getByText(defaultProps.title);
    const ascendingArrow = screen.queryByTestId('arrowUp');
    const descendingArrow = screen.queryByTestId('arrowDown');

    expect(cell).toBeVisible();
    expect(cell).not.toHaveAttribute('aria-sort');
    expect(cell).toHaveAttribute('colSpan', '1');
    expect(cell).toHaveClass('headerCell');
    expect(cell).toHaveAttribute('rowSpan', '1');
    expect(cell).toHaveAttribute('scope', 'col');

    expect(content).toBeVisible();
    expect(content).toHaveClass('content');

    expect(ascendingArrow).not.toBeInTheDocument();
    expect(descendingArrow).not.toBeInTheDocument();
  });

  test('renders correctly when sort direction ascending', async () => {
    const props = {
      ...defaultProps,
      colSpan: 19,
      rowSpan: 12,
      tabIndex: -1,
    };
    render(<TableHeaderCell {...props} />, {
      container: document.body.appendChild(tr),
    });

    const cell = screen.getByRole('columnheader');
    const sortIcon = screen.getByTestId('sortIcon');

    expect(cell).toHaveAttribute('colSpan', props.colSpan.toString());
    expect(cell).toHaveAttribute('rowSpan', props.rowSpan.toString());

    expect(sortIcon).toBeInTheDocument();
    expect(sortIcon).toHaveAttribute('aria-hidden', 'true');

    await userEvent.tab();
    expect(cell).not.toHaveFocus();
  });

  test('renders correctly when sort direction ascending', () => {
    render(<TableHeaderCell sortDirection='ascending' {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });

    const cell = screen.getByRole('columnheader');
    const sortIcon = screen.getByTestId('sortIcon');

    expect(cell).toBeVisible();
    expect(cell).toHaveAttribute('aria-sort', 'ascending');

    expect(sortIcon).toBeInTheDocument();
    expect(sortIcon).toHaveAttribute('aria-hidden', 'true');
  });

  test('renders correctly when sort direction descending', () => {
    render(<TableHeaderCell sortDirection='descending' {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });

    const cell = screen.getByRole('columnheader');
    const sortIcon = screen.getByTestId('sortIcon');

    expect(cell).toBeVisible();
    expect(cell).toHaveAttribute('aria-sort', 'descending');

    expect(sortIcon).toBeVisible();
    expect(sortIcon).toHaveAttribute('aria-hidden', 'true');
  });

  test('is accessible and handles accessible clicks', async () => {
    render(<TableHeaderCell sortDirection='descending' {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });

    const cell = screen.getByRole('columnheader');

    expect(cell).not.toHaveFocus();
    await userEvent.tab();
    expect(cell).toHaveFocus();

    await userEvent.keyboard('{d}');
    expect(defaultProps.onClick).not.toHaveBeenCalled();

    await userEvent.keyboard('{enter}');
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith({
      dataKey: defaultProps.dataKey,
      direction: 'descending',
      title: defaultProps.title,
    });

    await userEvent.keyboard('{ }');
    expect(defaultProps.onClick).toHaveBeenCalledTimes(2);
    expect(defaultProps.onClick).toHaveBeenCalledWith({
      dataKey: defaultProps.dataKey,
      direction: 'descending',
      title: defaultProps.title,
    });

    await userEvent.click(cell);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(3);
    expect(defaultProps.onClick).toHaveBeenCalledWith({
      dataKey: defaultProps.dataKey,
      direction: 'descending',
      title: defaultProps.title,
    });
  });

  describe('SortIcon', () => {
    test('renders correctly by default', () => {
      render(<SortIcon />);
      const ascendingIcon = screen.queryByText('ArrowUp.svg');
      const descendingIcon = screen.queryByText('ArrowDown.svg');
      const previewIcon = screen.queryByText('Sort.svg');

      expect(ascendingIcon).not.toBeInTheDocument();
      expect(descendingIcon).not.toBeInTheDocument();
      expect(previewIcon).not.toBeInTheDocument();
    });

    test('renders preview correctly', () => {
      render(<SortIcon isPreviewVisible />);
      const ascendingIcon = screen.queryByText('ArrowUp.svg');
      const descendingIcon = screen.queryByText('ArrowDown.svg');
      const previewIcon = screen.queryByText('Sort.svg');

      expect(ascendingIcon).not.toBeInTheDocument();
      expect(descendingIcon).not.toBeInTheDocument();
      expect(previewIcon).toBeVisible();
      expect(previewIcon).toHaveAttribute('fill', IconColor.PREVIEW);
    });

    test('renders ascending correctly', () => {
      render(<SortIcon isPreviewVisible={false} direction='ascending' />);
      const ascendingIcon = screen.queryByText('ArrowUp.svg');
      const descendingIcon = screen.queryByText('ArrowDown.svg');
      const previewIcon = screen.queryByText('Sort.svg');

      expect(ascendingIcon).toBeVisible();
      expect(ascendingIcon).toHaveAttribute('fill', IconColor.SORTED);
      expect(descendingIcon).not.toBeInTheDocument();
      expect(previewIcon).not.toBeInTheDocument();
    });

    test('renders descending correctly', () => {
      render(<SortIcon isPreviewVisible direction='descending' />);
      const ascendingIcon = screen.queryByText('ArrowUp.svg');
      const descendingIcon = screen.queryByText('ArrowDown.svg');
      const previewIcon = screen.queryByText('Sort.svg');

      expect(ascendingIcon).not.toBeInTheDocument();
      expect(descendingIcon).toBeVisible();
      expect(descendingIcon).toHaveAttribute('fill', IconColor.SORTED);
      expect(previewIcon).not.toBeInTheDocument();
    });
  });
});
