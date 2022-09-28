import { screen, render } from '@testing-library/react';

import TableHeaderRow from '.';

describe('TableHeaderRow', () => {
  const thead = document.createElement('thead');

  test('renders correctly', () => {
    const childText = 'children text';
    render(
      <TableHeaderRow>
        <th>{childText}</th>
      </TableHeaderRow>,
      {
        container: document.body.appendChild(thead),
      }
    );

    const row = screen.getByRole('row');
    const children = screen.getByText(childText);

    expect(row).toBeVisible();
    expect(row).toHaveClass('headerRow');

    expect(children).toBeVisible();
  });
});
