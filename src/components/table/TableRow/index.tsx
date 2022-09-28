import './styles.css';

interface Props {
  children: JSX.Element | JSX.Element[];
  tabIndex?: number;
}

const TableRow = ({ children }: Props) => {
  return <tr className='bodyRow'>{children}</tr>;
};

export default TableRow;
