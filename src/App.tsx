import './styles.css';
import { useState, useEffect, useMemo } from 'react';
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

  function handleButtonClick(e) {
    console.log(e);
  }

  function mapColumns(additionalServices) {
    let columns = [
      { Header: ' ', accessor: 'service', tipText: '' },
      { Header: 'Service Group', accessor: 'serviceGroup', tipText: '' },
    ];
    additionalServices.records.map((record) =>
      columns.push({
        Header: t(record.ServiceCode),
        accessor: record.ServiceCode,
        tipText: t(record.ServiceCode + '_tooltip'),
      })
    );
    return columns;
  }

  function mapRows(services) {
    let rows = [];
    for (let record of services.records) {
      let service = {};
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
      service['serviceGroup'] = t(record.ServiceGroup);
      for (let addon of record.AdditionalServices) {
        service[addon.Addon] = (
          <Checkbox
            title={'X'}
            onClick={(e) => {
              handleButtonClick(e);
            }}
          />
        );
      }
      rows.push(service);
    }
    return rows;
  }

  const columns = mapColumns(additionalServices);
  const data = mapRows(services);
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
          <Table columns={columns} data={data.filter(filterCriteria)} />
        </div>
      </Grid>
    </div>
  );
}
