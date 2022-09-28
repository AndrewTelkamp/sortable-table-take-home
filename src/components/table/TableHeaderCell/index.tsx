import Icon from '../../Icon';

import './styles.css';

type SortDirection = 'ascending' | 'descending' | undefined;

type SortArgs = {
  dataKey?: string;
  direction?: SortDirection;
  title?: string;
};

interface Props {
  colSpan?: number;
  dataKey: string;
  onClick: (args: SortArgs) => any;
  rowSpan?: number;
  sortDirection?: SortDirection;
  tabIndex?: number;
  title: string;
}

const TableHeaderCell = ({
  colSpan = 1,
  dataKey,
  onClick,
  rowSpan = 1,
  sortDirection,
  tabIndex = 0,
  title,
}: Props) => {
  const handleClick = () => {
    onClick({
      dataKey,
      direction: sortDirection,
      title,
    });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <th
      aria-sort={sortDirection}
      className='headerCell'
      colSpan={colSpan}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role={'columnheader'}
      rowSpan={rowSpan}
      scope={'col'}
      tabIndex={tabIndex}
    >
      <div className='content'>
        {title}

        {sortDirection && (
          <span aria-hidden className='sortIcon' data-testid='sortIcon'>
            <Icon
              fill='#919197'
              name={sortDirection === 'ascending' ? 'arrowUp' : 'arrowDown'}
            />
          </span>
        )}
      </div>
    </th>
  );
};

export type { SortArgs, SortDirection };
export { TableHeaderCell as default };
