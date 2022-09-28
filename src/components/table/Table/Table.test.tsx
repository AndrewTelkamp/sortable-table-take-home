import { render, screen } from '@testing-library/react';

import Table from '.';

describe('Table', () => {
  test('renders correctly with default props', () => {
    const testCaption = 'test caption';
    render(
      <Table caption={testCaption}>
        <thead></thead>
      </Table>
    );

    const tableContainer = screen.getByTestId('tableContainer');
    const table = screen.getByRole('table');
    const tableChildren = screen.getByRole('rowgroup');

    expect(tableContainer).toBeVisible();
    expect(tableContainer).toHaveStyle({ width: '100%' });

    expect(table).toBeVisible();
    expect(table).toHaveAttribute('aria-label', testCaption);
    expect(table).toHaveClass('table');

    expect(tableChildren).toBeVisible();
  });

  test('renders correctly when provided width prop', () => {
    render(
      <Table caption='fake caption' width={50}>
        <thead></thead>
      </Table>
    );

    const table = screen.getByTestId('tableContainer');
    expect(table).toHaveStyle({ width: '50px' });
  });
});
