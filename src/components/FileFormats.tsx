import FFTable from './FileFormatTable';
import Dropdown from './Dropdown';
import Filter from './Filter';
import { Table, Tabs, Tab, Row, Col } from 'react-bootstrap';

interface fileFormatsProps {
  openCanvas: boolean;
  closeCanvas: () => void;
  data: any;
  ffColumnData: any;
  selected: any;
  t: any;
  setSelected: (string) => void;
}

const FileFormats = ({
  t,
  formats,
  selected,
  setSelected,
  updateSearchParams,
  ffColumnData,
  ffRowData,
  fileFormats,
  populateDropdown,
  skipPageReset,
}) => {
  const history = [];
  if (selected.format) {
    for (const format of fileFormats.records) {
      if (format.Name === selected.format) {
        if (format.VersionHistory) {
          for (const row of format.VersionHistory) {
            history.push(row);
          }
        }
      }
    }
  }

  return (
    <>
      <div className="appcontainer">
        <div className="controls">
          <Row>
            <Col xs={6} sm={4} md={4}>
              <Dropdown
                title={t("'Select File Format'")}
                items={formats}
                t={t}
                multiSelect={false}
                value={selected.format}
                onChange={(e) => {
                  let value = '';
                  if (e[0]) {
                    value = e[0].value;
                  }
                  updateSearchParams('format', value);
                  setSelected((prevState) => ({
                    ...prevState,
                    format: value,
                  }));
                }}
              />
            </Col>
            <Col xs={6} sm={4} md={4}>
              <Filter
                placeHolder={t("'Filter data'")}
                value={selected.formatFilter ? selected.formatFilter : ''}
                onChange={(e) => {
                  let value = e.target.value;
                  updateSearchParams('formatFilter', value);
                  setSelected((prevState) => ({
                    ...prevState,
                    formatFilter: value,
                  }));
                }}
              />
            </Col>
          </Row>
        </div>
        <div className="content">
          <Tabs
            id="controlled-tab-example"
            activeKey={selected.ffTab ? selected.ffTab : 'specs'}
            onSelect={(k) => {
              updateSearchParams('fileFormatTab', k);
              setSelected((prevState) => ({
                ...prevState,
                ffTab: k,
              }));
            }}
            className="mb-3 ff-tabs">
            {history.length > 0 ? (
              <Tab eventKey="version" title={t('version')}>
                <Table className="ff-table">
                  <thead>
                    <tr>
                      <th className="version_title">Document Version</th>
                      <th className="version_title">Schema Version</th>
                      <th className="date_title">Date</th>
                      <th className="comment_title">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row, i) => (
                      <tr key={'row' + i}>
                        <td className="version_col">{row.DocumentVersion}</td>
                        <td className="version_col">{row.SchemaVersion}</td>
                        <td className="date_col">{row.Date}</td>
                        <td className="comment_col">{row.Comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
            ) : (
              ''
            )}
            <Tab eventKey="specs" title={t('specs')}>
              <FFTable
                t={t}
                columns={ffColumnData}
                data={selected.format ? ffRowData : []}
                populateDropdown={populateDropdown}
                selectedFormat={selected.format}
                glblFilter={selected.formatFilter}
                skipPageReset={skipPageReset}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default FileFormats;
