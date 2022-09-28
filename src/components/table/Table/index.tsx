import './styles.css';

interface Props {
  caption: string;
  children: JSX.Element | JSX.Element[];
  width?: number | string;
}

const Table = ({ caption, children, width = '100%' }: Props) => (
  <div
    data-testid='tableContainer'
    className='tableContainer'
    style={{ width }}
  >
    <table aria-label={caption} className='table'>
      {children}
    </table>
  </div>
);

export default Table;
