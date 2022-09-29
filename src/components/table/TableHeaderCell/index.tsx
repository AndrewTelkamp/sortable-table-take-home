import { memo, useState } from 'react';

import Icon from '../../Icon';

import './styles.css';

enum IconColor {
  SORTED = '#6c6c72',
  PREVIEW = '#919197',
}

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

interface SortIconProps {
  isPreviewVisible?: boolean;
  direction?: 'ascending' | 'descending';
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
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      onBlur={() => setIsFocused(false)}
      onClick={handleClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onKeyPress={handleKeyPress}
      role={'columnheader'}
      rowSpan={rowSpan}
      scope={'col'}
      tabIndex={tabIndex}
    >
      <div className='content'>
        {title}

        <span aria-hidden className='sortIcon' data-testid='sortIcon'>
          <SortIcon
            direction={sortDirection}
            isPreviewVisible={isFocused || isHovered}
          />
        </span>
      </div>
    </th>
  );
};

const SortIcon = ({
  direction,
  isPreviewVisible = false,
}: SortIconProps): JSX.Element | null => {
  if (direction === 'ascending') {
    return <Icon fill={IconColor.SORTED} name='arrowUp' />;
  }

  if (direction === 'descending') {
    return <Icon fill={IconColor.SORTED} name='arrowDown' />;
  }

  if (isPreviewVisible) {
    return <Icon fill={IconColor.PREVIEW} name='sort' />;
  }

  return null;
};

export type { SortArgs, SortDirection };
export { IconColor, SortIcon };
export default memo(TableHeaderCell);
