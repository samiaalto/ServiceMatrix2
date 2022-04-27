import './styles.css';
import { useState, useEffect, useMemo, createRef } from 'react';
import Dropdown from './components/Dropdown';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Table from './components/Table';
import additionalServices from './additionalServices.json';
import services from './services.json';
import { useTranslation } from 'react-i18next';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default function App() {
  const [selectedItem, setSelectedItem] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  const { t, i18n } = useTranslation();

  const items = [
    { id: 0, value: t("'Parcel Services'"), additionalInfo: t("'Domestic shipments under 35 kg'") },
    {
      id: 1,
      value: t("'Transport Unit Services'"),
      additionalInfo: t("'Domestic shipments above 35 kg'"),
    },
  ];

  const langs = [
    { id: 0, value: t('English'), additionalInfo: 'en' },
    { id: 1, value: t('Finnish'), additionalInfo: 'fi' },
  ];

  const handleButtonClick = (e) => {
    console.log(e);
  };

  const mapColumns = (additionalServices) => {
    let columns = [
      { Header: ' ', accessor: 'service', tipText: '', show: true },
      { Header: ' ', accessor: 'serviceCode', tipText: '', show: true },
      { Header: 'Service Group', accessor: 'serviceGroup', tipText: '', show: false },
    ];
    additionalServices.records.map((record) =>
      columns.push({
        Header: t(record.ServiceCode),
        accessor: record.ServiceCode,
        Cell: Checkbox,
        tipText: t(record.ServiceCode + '_tooltip'),
        show: true,
      })
    );

    return setColumnData(columns);
  };

  const hideColumn = (addon, currentRow, visibleRows) => {
    let emptyCount = 1;
    for (const [i, row] of rowData.entries()) {
      if (i !== currentRow) {
        for (const [key, value] of Object.entries(row)) {
          if (key === addon && value !== 'X') {
            emptyCount++;
          }
        }
      }
    }
    if (emptyCount === rowData.length) {
      //hide column
      console.log('Hide column ' + addon);

      setColumnData((prevState) =>
        prevState.map((item, index) =>
          item.accessor === addon ? { ...item, show: !item.show } : item
        )
      );
    } else {
      //show hidden column
      setColumnData((prevState) =>
        prevState.map((item, index) =>
          item.accessor === addon && !item.show ? { ...item, show: !item.show } : item
        )
      );
    }
  };

  const onClick = (e) => {
    console.log(e);

    setCheckedState((prevState) => ({
      ...prevState,
      [e.row]: { ...prevState[e.row], [e.column]: e.isChecked },
    }));

    let excluded = [];
    for (let record of additionalServices.records) {
      if (record.ServiceCode === e.column) {
        for (let excludedAddon of record.ExcludedAdditionalServices) {
          excluded.push(excludedAddon.Addon);
        }
      }
    }

    for (const [key, value] of Object.entries(rowData[e.row])) {
      if ((excluded.includes(key) && value === 'Y') || (excluded.includes(key) && value === 'X')) {
        let value = 'Y';

        if (!e.isChecked) {
          value = 'X';
        }

        hideColumn(key, e.row, '');

        //setSkipPageReset(true);
        setRowData((old) =>
          old.map((row, index) => {
            if (index === e.row) {
              return {
                ...old[e.row],
                [key]: value,
              };
            }
            return row;
          })
        );
      }
    }
  };

  const mapRows = (services, additionalServices) => {
    setCheckedState([]);
    let rows = [];
    let checksRows = [];
    for (let record of services.records) {
      let service = {};
      let checks = {};
      service['service'] = (
        //<Grid fluid className="serviceContainer">
        <Row>
          <Col xs={10} className="serviceNameDiv">
            <span className="serviceName">{t(record.ServiceCode)}</span>
          </Col>
          <Col xs={2} className="serviceButton">
            <Button
              title=""
              type="select"
              onClick={(e) => {
                handleButtonClick(e);
              }}
            />
          </Col>
        </Row>
        //</Grid>
      );
      service['serviceCode'] = record.ServiceCode;
      service['serviceGroup'] = t(record.ServiceGroup);
      for (let addon of additionalServices.records) {
        if (record.AdditionalServices.some((e) => e.Addon === addon.ServiceCode)) {
          checks[addon.ServiceCode] = false;
          service[addon.ServiceCode] = 'X';
        } else {
          service[addon.ServiceCode] = undefined;
        }
      }
      checksRows.push(checks);
      rows.push(service);
    }
    setCheckedState(checksRows);
    return setRowData(rows);
  };

  //const columns = mapColumns(additionalServices);
  //const data = mapRows(services);

  useEffect(() => {
    mapColumns(additionalServices);
    mapRows(services, additionalServices);
  }, []);

  useEffect(() => {
    console.log(columnData);
  }, [columnData]);

  //const data = useMemo(() => mapRows(services), []);

  const filterCriteria = (obj) => {
    if (selectedItem[0]) {
      return obj.serviceGroup.includes(selectedItem[0].value);
    } else {
      return obj.serviceGroup.includes('');
    }
    //&& obj.lastName.includes(lastName)
    //&& obj.city.includes(city);
  };

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    //setSkipPageReset(true);
    setRowData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    if (selectedItem[0]) {
    }
  }, [selectedItem]);

  return (
    <div className="App">
      <Grid fluid>
        <Row>
          <Col xs={6} sm={5} md={4}>
            <Dropdown
              title={t("'Select Service Group'")}
              items={items}
              multiSelect={false}
              onChange={(e) => {
                setSelectedItem(e);
              }}
            />
          </Col>
          <Col xs={6} sm={4} smOffset={3} md={3} mdOffset={5}>
            <Dropdown
              title={t("'Select Language'")}
              items={langs}
              multiSelect={false}
              onChange={(e) => {
                i18n.changeLanguage(e[0].additionalInfo);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={5}>
            <Button
              title={t('Reset')}
              type="reset"
              onClick={(e) => {
                handleButtonClick(e);
              }}
            />
          </Col>
        </Row>
        <div className="content">
          <Table
            columns={columnData}
            data={rowData}
            onClick={onClick}
            updateMyData={updateMyData}
          />
        </div>
      </Grid>
    </div>
  );
}
