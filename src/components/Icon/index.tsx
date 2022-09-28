import { memo } from 'react';

import { ReactComponent as ArrowDown } from '../../assets/ArrowDown.svg';
import { ReactComponent as ArrowUp } from '../../assets/ArrowUp.svg';
import { ReactComponent as CaretDown } from '../../assets/CaretDown.svg';
import { ReactComponent as CaretUp } from '../../assets/CaretUp.svg';
import { ReactComponent as ChevronLeft } from '../../assets/ChevronLeft.svg';
import { ReactComponent as ChevronRight } from '../../assets/ChevronRight.svg';
import { ReactComponent as FirstPage } from '../../assets/FirstPage.svg';
import { ReactComponent as LastPage } from '../../assets/LastPage.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';
import { ReactComponent as Sort } from '../../assets/Sort.svg';

type IconName =
  | 'arrowDown'
  | 'arrowUp'
  | 'caretDown'
  | 'caretUp'
  | 'chevronLeft'
  | 'chevronRight'
  | 'firstPage'
  | 'lastPage'
  | 'search'
  | 'sort';

interface Props {
  ariaDescribedBy?: string;
  ariaHidden?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  fill?: string;
  name: IconName;
  size?: number;
  title?: string;
}

interface IconSVGProps {
  ariaDescribedBy?: string;
  ariaHidden?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  fill: string;
  height: number;
  name: IconName;
  title?: string;
  width: number;
}

const Icon = ({
  ariaDescribedBy,
  ariaHidden,
  ariaLabel,
  ariaLabelledBy,
  fill = '#1c1c1c',
  name,
  size = 16,
  ...props
}: Props) => (
  <span role='img' style={{ height: size, width: size }} {...props}>
    <IconSVG
      {...{
        ariaDescribedBy,
        ariaHidden,
        ariaLabel,
        ariaLabelledBy,
        fill,
        name,
      }}
      height={size}
      width={size}
    />
  </span>
);

const IconSVG = memo(
  ({
    ariaDescribedBy,
    ariaHidden,
    ariaLabel,
    ariaLabelledBy,
    fill,
    height,
    name,
    width,
  }: IconSVGProps) => {
    const props = {
      'aria-describedby': ariaDescribedBy,
      'aria-hidden': ariaHidden,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      fill,
      height,
      name,
      width,
    };
    switch (props.name) {
      case 'arrowDown':
        return <ArrowDown {...props} />;
      case 'arrowUp':
        return <ArrowUp {...props} />;
      case 'caretDown':
        return <CaretDown {...props} />;
      case 'caretUp':
        return <CaretUp {...props} />;
      case 'chevronLeft':
        return <ChevronLeft {...props} />;
      case 'chevronRight':
        return <ChevronRight {...props} />;
      case 'firstPage':
        return <FirstPage {...props} />;
      case 'lastPage':
        return <LastPage {...props} />;
      case 'search':
        return <Search {...props} />;
      case 'sort':
        return <Sort {...props} />;
      default:
        return null;
    }
  }
);

export type { IconName };
export default memo(Icon);
