import { memo } from 'react';

import './styles.css';

interface Props {
  colSpan?: number;
  fontWeight?: '500' | '700';
  rowSpan?: number;
  value?: string;
}

const TableCell = ({
  colSpan = 1,
  fontWeight = '500',
  rowSpan = 1,
  value,
}: Props) => {
  return (
    <td
      className='tableCell'
      colSpan={colSpan}
      role='cell'
      rowSpan={rowSpan}
      style={{ fontWeight }}
    >
      {value}
    </td>
  );
};

export default memo(TableCell);
