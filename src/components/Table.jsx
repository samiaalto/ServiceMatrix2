import { useTable } from 'react-table';

import './styles/Table_styles.css';

function Table({ columns, data, updateMyData, skipPageReset, onClick, checked }) {
  // function TableUI({ columns, data, isChecked }) {
  const initialState = { hiddenColumns: ['serviceGroup'] };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = useTable({
    columns,
    data,
    initialState,
    updateMyData,
    onClick,
    checked,
    autoResetPage: !skipPageReset,
  });
  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => {
              if (column.id === 'service') {
                return (
                  <th className="headerTitle tooltip left" {...column.getHeaderProps()}>
                    <div> {column.render('Header')} </div>
                    {headerGroup.headers[index].tipText && (
                      <span>{headerGroup.headers[index].tipText}</span>
                    )}
                  </th>
                );
              } else {
                return (
                  <th className="headerTitle tooltip" {...column.getHeaderProps()}>
                    <div> {column.render('Header')} </div>
                    {headerGroup.headers[index].tipText && (
                      <span>{headerGroup.headers[index].tipText}</span>
                    )}
                  </th>
                );
              }
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (cell.column.id === 'service') {
                  return (
                    <td className="service" pinleft="true" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                } else if (cell.value === undefined || cell.value === 'Y') {
                  return <td></td>;
                } else {
                  return (
                    <td
                      className={cell.column.id + '_' + cell.row.values.serviceCode}
                      //onClick={() => console.log(row)}
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
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
//  return <TableUI columns={columns} data={data} isChecked={isChecked} />;
//}
export default Table;
