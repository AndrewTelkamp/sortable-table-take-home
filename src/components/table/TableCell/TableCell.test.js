import { render, screen } from '@testing-library/react';

import { TableCell } from '.';

describe('Table', () => {
  const tr = document.createElement('tr');

  test('renders correctly with default props', () => {
    const testValue = 'bbq ribs';
    render(<TableCell value={testValue} />, {
      container: document.body.appendChild(tr),
    });

    const cell = screen.getByText(testValue);

    expect(cell).toBeVisible();
    expect(cell).toHaveAttribute('colSpan', '1');
    expect(cell).toHaveAttribute('role', 'cell');
    expect(cell).toHaveAttribute('rowSpan', '1');
    expect(cell).toHaveStyle({ 'font-weight': 500 });
  });

  test('renders correctly with provided props', () => {
    const props = {
      colSpan: 13,
      fontWeight: '700',
      rowSpan: 6,
      value: 'bbq brisket',
    };
    render(<TableCell {...props} />, {
      container: document.body.appendChild(tr),
    });

    const cell = screen.getByText(props.value);

    expect(cell).toBeVisible();
    expect(cell).toHaveAttribute('colSpan', props.colSpan.toString());
    expect(cell).toHaveAttribute('role', 'cell');
    expect(cell).toHaveAttribute('rowSpan', props.rowSpan.toString());
    expect(cell).toHaveStyle({ 'font-weight': props.fontWeight });
  });
});
