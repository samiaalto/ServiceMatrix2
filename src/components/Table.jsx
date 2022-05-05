import {
  useTable,
  //  useBlockLayout,
  // useAsyncDebounce,
  useGlobalFilter,
  useFilters,
} from 'react-table';
import { useEffect } from 'react';
//import { useSticky } from 'react-table-sticky';
import './styles/Table_styles.css';

function Table({
  columns,
  data,
  skipPageReset,
  onClick,
  updateDropdowns,
  depCountry,
  destCountry,
  glblFilter,
  serviceGroup,
}) {
  // function TableUI({ columns, data, isChecked }) {
  const initialState = {
    hiddenColumns: columns.map((column) => {
      if (column.show === false) return column.accessor || column.id;
    }),
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    //state,
    setGlobalFilter,
    setFilter,
    filteredRows,
  } = useTable(
    {
      columns,
      data,
      initialState,
      onClick,
      updateDropdowns,
      autoResetPage: !skipPageReset,
    },
    useGlobalFilter,
    useFilters
  );

  //const { globalFilter } = state;

  useEffect(() => {
    updateDropdowns(filteredRows);
  }, [filteredRows]);

  useEffect(() => {
    setFilter('departureCountries', depCountry || undefined);
  }, [depCountry]);

  useEffect(() => {
    setFilter('destinationCountries', destCountry || undefined);
  }, [destCountry]);

  useEffect(() => {
    setFilter('serviceGroup', serviceGroup || undefined);
  }, [serviceGroup]);

  useEffect(() => {
    setGlobalFilter(glblFilter || undefined);
  }, [glblFilter]);

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                if (
                  column.id === 'serviceName' ||
                  column.id === 'serviceButton' ||
                  column.id === 'serviceCode'
                ) {
                  return (
                    <th className="headerTitle tooltip left fixColumn" {...column.getHeaderProps()}>
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
                  if (cell.column.id === 'serviceName') {
                    return (
                      <td className="service" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  } else if (cell.column.id === 'serviceButton') {
                    return (
                      <td className="serviceButton" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  } else if (cell.column.id === 'serviceCode') {
                    return (
                      <td className="serviceCode" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  } else if (cell.value === undefined || cell.value === 'Y') {
                    return <td {...cell.getCellProps()}></td>;
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
    </>
  );
}

//const data = React.useMemo(() => makeData(20), []);
//  return <TableUI columns={columns} data={data} isChecked={isChecked} />;
//}
export default Table;
