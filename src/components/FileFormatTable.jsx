import {
  useTable,
  //  useBlockLayout,
  // useAsyncDebounce,
  useGlobalFilter,
  useFilters,
} from 'react-table';
import { useEffect } from 'react';
//import { useSticky } from 'react-table-sticky';
import './styles/FFTable_styles.css';

function FFTable({
  columns,
  data,
  skipPageReset,
  onClick,
  glblFilter,
  populateDropdown,
  selectedFormat,
  t,
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
      selectedFormat,
      t,
      autoResetPage: !skipPageReset,
    },
    useGlobalFilter,
    useFilters
  );

  //const { globalFilter } = state;

  useEffect(() => {
    setFilter('format', selectedFormat || undefined);
  }, [selectedFormat]);

  useEffect(() => {
    setGlobalFilter(glblFilter || undefined);
  }, [glblFilter]);

  // Render the UI for your table
  return (
    <>
      <table className="ff-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                return (
                  <th className={column.id + '_title'} {...column.getHeaderProps()}>
                    <div> {t(column.render('Header'))} </div>
                    {headerGroup.headers[index].tipText && (
                      <span>{headerGroup.headers[index].tipText}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            if (row.values.type === 'Array' || row.values.type === 'Object') {
              return (
                <tr className="ff-boldRow" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    if (cell.column.id === 'attribute') {
                      return (
                        <td className="attributeName_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else if (cell.column.id === 'moc') {
                      return (
                        <td className="moc_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else if (cell.column.id === 'repeat') {
                      return (
                        <td className="repeat_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else if (cell.column.id === 'type') {
                      return (
                        <td className="type_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else {
                      return (
                        <td className="description_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            } else {
              return (
                <tr className="ff-row" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    if (cell.column.id === 'attribute') {
                      return (
                        <td className="attributeName_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else if (cell.column.id === 'moc') {
                      return (
                        <td className="moc_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else if (cell.column.id === 'repeat') {
                      return (
                        <td className="repeat_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else if (cell.column.id === 'type') {
                      return (
                        <td className="type_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else {
                      return (
                        <td className="description_col" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}

//const data = React.useMemo(() => makeData(20), []);
//  return <TableUI columns={columns} data={data} isChecked={isChecked} />;
//}
export default FFTable;
