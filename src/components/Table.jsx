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
import Button from './Button';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
  t,
  openModal,
  serviceSelection,
}) {
  // function TableUI({ columns, data, isChecked }) {
  const initialState = {
    hiddenColumns: columns.map((column) => {
      if (column.show === false) return column.accessor || column.id;
    }),
    //hiddenColumns: columns.filter((x) => x.show !== false),
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
      t,
      openModal,
      serviceSelection,
      autoResetPage: !skipPageReset,
      autoResetGlobalFilter: false,
      autoResetFilters: false,
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
      <table className="serviceMatrix-table" {...getTableProps()}>
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
                    <th className="headerTitle" {...column.getHeaderProps()}>
                      <div> {column.render('Header')} </div>
                    </th>
                  );
                } else {
                  return (
                    <OverlayTrigger
                      key={'tooltip_' + column.id}
                      placement="left"
                      overlay={
                        <Tooltip id={column.id}>
                          <b> {t(column.id)} </b> {' (' + column.id + ')'}
                          <br />
                          {t(column.id + '_tooltip')}
                        </Tooltip>
                      }>
                      <th
                        onClick={() => openModal(column.id)}
                        className="headerTitle"
                        {...column.getHeaderProps()}>
                        <div> {t(column.render('Header'))} </div>
                      </th>
                    </OverlayTrigger>
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
                  if (row.id === '0') {
                    if (cell.column.id === 'serviceName') {
                      return (
                        <td className="serviceHeader" {...cell.getCellProps()}>
                          {t(cell.value)}
                        </td>
                      );
                    } else if (
                      cell.column.id === 'serviceCode' ||
                      cell.column.id === 'serviceButton'
                    ) {
                      return (
                        <td className="code" {...cell.getCellProps()}>
                          {t(cell.value)}
                        </td>
                      );
                    } else {
                      return (
                        <td className="addonCode" {...cell.getCellProps()}>
                          {cell.value}
                        </td>
                      );
                    }
                  } else {
                    if (cell.column.id === 'serviceName') {
                      return (
                        <OverlayTrigger
                          key={'tooltip_' + cell.id}
                          placement="right"
                          overlay={
                            <Tooltip id={cell.id}>
                              <b> {t(cell.value)} </b> {' (' + cell.value + ')'}
                              <br />
                              {t(cell.value + '_tooltip')}
                            </Tooltip>
                          }>
                          <td
                            onClick={() => openModal(cell.value)}
                            className="service"
                            {...cell.getCellProps()}>
                            {t(cell.value)}
                          </td>
                        </OverlayTrigger>
                      );
                    } else if (cell.column.id === 'serviceButton') {
                      return (
                        <td className="serviceButton" {...cell.getCellProps()}>
                          <Button
                            title=""
                            type="select"
                            onClick={(e) => {
                              serviceSelection(cell.row.values.serviceCode);
                            }}
                          />
                        </td>
                      );
                    } else if (cell.column.id === 'serviceCode') {
                      return (
                        <td className="serviceCode" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    } else if (cell.value === undefined || cell.value === 'Y') {
                      return (
                        <OverlayTrigger
                          key={'tooltip_' + cell.row.values.serviceCode + '_' + cell.column.id}
                          placement="top"
                          overlay={
                            <Tooltip id={cell.row.values.serviceCode + '_' + cell.column.id}>
                              <b> {t(cell.column.id)} </b> {' (' + cell.column.id + ')'}
                              <br /> {t("'is not available for'")}
                              <br />
                              <b>{t(cell.row.values.serviceCode)}</b>
                              {' (' + cell.row.values.serviceCode + ')'}
                            </Tooltip>
                          }>
                          <td {...cell.getCellProps()}></td>
                        </OverlayTrigger>
                      );
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
