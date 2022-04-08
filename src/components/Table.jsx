import { useTable } from 'react-table';
import './styles/Table_styles.css';
import Button from './Button';

function Table({ columns, data }) {
  function TableUI({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    });
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th className="headerTitle tooltip" {...column.getHeaderProps()}>
                  <div> {column.render('Header')} </div>
                  {headerGroup.headers[index].tipText && (
                    <span>{headerGroup.headers[index].tipText}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.log(cell);
                  if (cell.value !== 'X' && cell.value !== undefined) {
                    return (
                      <td className="service" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                        <Button title="test" type="select" />
                      </td>
                    );
                  } else {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  //const data = React.useMemo(() => makeData(20), []);
  return <TableUI columns={columns} data={data} />;
}
export default Table;
