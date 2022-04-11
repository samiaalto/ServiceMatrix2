import { useTable, initialState } from 'react-table';
import './styles/Table_styles.css';
import Button from './Button';
import { Grid, Row, Col } from 'react-flexbox-grid';

function Table({ columns, data }) {
  function TableUI({ columns, data }) {
    const initialState = { hiddenColumns: ['serviceGroup'] };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
      initialState,
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
                  if (cell.column.id === 'service') {
                    return (
                      <td className="service" {...cell.getCellProps()}>
                        <Grid fluid className="serviceContainer">
                          <Row>
                            <Col xs={10} className="serviceNameDiv">
                              <span className="serviceName">{cell.render('Cell')}</span>
                            </Col>
                            <Col xs={2}>
                              <Button title="" type="select" />
                            </Col>
                          </Row>
                        </Grid>
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
