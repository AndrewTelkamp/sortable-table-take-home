import { screen, render } from '@testing-library/react';

import TableRow from '.';

describe('TableRow', () => {
  const tbody = document.createElement('tbody');

  test('renders correctly', () => {
    const childText = 'children';
    render(
      <TableRow>
        <th>{childText}</th>
      </TableRow>,
      {
        container: document.body.appendChild(tbody),
      }
    );

    const row = screen.getByRole('row');
    const children = screen.getByText(childText);

    expect(row).toBeVisible();
    expect(row).toHaveClass('bodyRow');

    expect(children).toBeVisible();
  });
});
