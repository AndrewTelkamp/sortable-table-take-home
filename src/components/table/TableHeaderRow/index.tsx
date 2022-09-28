import './styles.css';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TableHeaderRow = ({ children }: Props) => {
  return <tr className='headerRow'>{children}</tr>;
};

export default TableHeaderRow;
