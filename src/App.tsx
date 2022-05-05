import './styles.css';
import { useState, useEffect } from 'react';
import Dropdown from './components/Dropdown';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Table from './components/Table';
import Filter from './components/Filter';
//import customFilterFunction from './components/customFilter';
import additionalServices from './additionalServices.json';
import services from './services.json';
import { useTranslation } from 'react-i18next';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const depCountryFilter = (rows, id, filterValue) =>
    rows.filter((row) => row.original.departureCountries.some((e) => e === filterValue));

  const destCountryFilter = (rows, id, filterValue) =>
    rows.filter((row) => row.original.destinationCountries.some((e) => e === filterValue));

  const [params, setParams] = useSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [columnData, setColumnData] = useState([
    { Header: ' ', accessor: 'serviceName', tipText: '', show: true, sticky: 'left' },
    { Header: ' ', accessor: 'serviceButton', tipText: '', show: true, sticky: 'left' },
    { Header: ' ', accessor: 'serviceCode', tipText: '', show: true, sticky: 'left' },
    {
      Header: 'Departure Countries',
      accessor: 'departureCountries',
      tipText: '',
      show: true,
      sticky: 'left',
    },
    {
      Header: 'Destination Countries',
      accessor: 'destinationCountries',
      tipText: '',
      show: true,
      sticky: 'left',
    },
    {
      Header: 'Service Group',
      accessor: 'serviceGroup',
      tipText: '',
      show: false,
      sticky: 'left',
    },
  ]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [departureCountries, setDepartureCountries] = useState([]);
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [selected, setSelected] = useState({
    serviceGroup: '',
    service: '',
    addons: [],
    departure: '',
    destination: '',
    filter: '',
    lang: '',
  });

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
      { Header: ' ', accessor: 'serviceName', tipText: '', show: true, sticky: 'left' },
      { Header: ' ', accessor: 'serviceButton', tipText: '', show: true, sticky: 'left' },
      { Header: ' ', accessor: 'serviceCode', tipText: '', show: true, sticky: 'left' },
      {
        Header: 'Departure Countries',
        accessor: 'departureCountries',
        tipText: '',
        show: false,
        sticky: 'left',
        filter: depCountryFilter,
      },
      {
        Header: 'Destination Countries',
        accessor: 'destinationCountries',
        tipText: '',
        show: false,
        sticky: 'left',
        filter: destCountryFilter,
      },
      {
        Header: 'Service Group',
        accessor: 'serviceGroup',
        tipText: '',
        show: false,
        sticky: 'left',
      },
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

  const populateCountries = (route, rowdata, filteredRows) => {
    let out = [];
    let countries = [];
    if (filteredRows) {
      for (let row of filteredRows) {
        for (let country of row.original[route]) {
          if (!countries || !countries.includes(country)) {
            countries.push(country);
          }
        }
      }
    } else {
      for (let row of rowdata) {
        for (let country of row[route]) {
          if (!countries || !countries.includes(country)) {
            countries.push(country);
          }
        }
      }
    }
    let index = 0;
    for (let country of countries) {
      out.push({ id: index, value: country, additionalInfo: country });
      index++;
    }
    if (route === 'departureCountries') {
      setDepartureCountries(out);
    } else {
      setDestinationCountries(out);
    }
  };

  const updateDropdowns = (filteredRows) => {
    if (selected.departure && !selected.destination) {
      populateCountries('destinationCountries', '', filteredRows);
    } else if (!selected.departure && selected.destination) {
      populateCountries('departureCountries', '', filteredRows);
    } else {
      populateCountries('departureCountries', '', filteredRows);
      populateCountries('destinationCountries', '', filteredRows);
    }
  };

  const updateSearchParams = (param, value) => {
    //console.log(param + ' ' + value);
    let updatedSearchParams = new URLSearchParams(params.toString());
    //console.log(updatedSearchParams.toString());
    if (value === '') {
      updatedSearchParams.delete(param);
    } else {
      updatedSearchParams.set(param, value);
    }
    setParams(updatedSearchParams.toString());
  };

  const filterCountries = (e, route) => {
    let value = '';
    if (e[0]) {
      value = e[0].value;
    }

    if (route === 'departureCountries') {
      setSelected((prevState) => ({
        ...prevState,
        departure: value,
      }));
      updateSearchParams('departure', value);
    } else {
      setSelected((prevState) => ({
        ...prevState,
        destination: value,
      }));
      updateSearchParams('destination', value);
    }
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

  const disableExcluded = (addon, rowIndex, isChecked) => {
    let excluded = [];
    for (let record of additionalServices.records) {
      if (record.ServiceCode === addon) {
        for (let excludedAddon of record.ExcludedAdditionalServices) {
          excluded.push(excludedAddon.Addon);
        }
      }
    }

    for (const [key, value] of Object.entries(rowData[rowIndex])) {
      if (
        (excluded.includes(key) && value === 'Y') ||
        (excluded.includes(key) && value === false)
      ) {
        let value = 'Y';

        if (!isChecked) {
          value = false;
        }

        setSkipPageReset(true);
        hideColumn(key, rowIndex, '');
        setRowData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [key]: value,
              };
            }
            return row;
          })
        );
      }
    }
  };

  const onClick = (e) => {
    console.log(e);
    let service = '';
    let addons = '';
    if (e.isChecked) {
      service = rowData[e.row].serviceCode;
      setSelected((prevState) => ({
        ...prevState,
        service: service,
        addons: [...prevState.addons, e.column],
      }));

      if (selected.addons.length > 0) {
        addons = selected.addons.join(' ') + ' ' + e.column;
      } else {
        addons = e.column;
      }
      updateSearchParams('service', service);
      updateSearchParams('addons', addons);
    } else {
      if (selected.addons.length === 1) {
        updateSearchParams('service', service);
        updateSearchParams('addons', addons);
      } else {
        addons = selected.addons.filter((x) => x !== e.column).join(' ');
        updateSearchParams('addons', addons);
      }

      setSelected((prevState) => ({
        ...prevState,
        service: service,
        addons: prevState.addons.filter((x) => x !== e.column),
      }));
    }

    disableExcluded(e.column, e.row, e.isChecked);
  };

  const mapRows = (services, additionalServices) => {
    let rows = [];
    for (let record of services.records) {
      let service = {};
      service['serviceName'] = t(record.ServiceCode);
      service['serviceButton'] = (
        <Button
          title=""
          type="select"
          onClick={(e) => {
            handleButtonClick(e);
          }}
        />
      );
      service['serviceCode'] = record.ServiceCode;
      service['serviceGroup'] = t(record.ServiceGroup);

      let depCountries = [];
      let destCountries = [];

      for (let route of record.Routes) {
        depCountries.push(route.DepartureCountry);
        for (let destination of route.DestinationCountries) {
          destCountries.push(destination.Country);
        }
      }
      service['departureCountries'] = depCountries;
      service['destinationCountries'] = destCountries;

      for (let addon of additionalServices.records) {
        if (record.AdditionalServices.some((e) => e.Addon === addon.ServiceCode)) {
          // checks[addon.ServiceCode] = false;
          service[addon.ServiceCode] = false;
        } else {
          service[addon.ServiceCode] = undefined;
        }
      }
      rows.push(service);
    }

    return setRowData(rows);
  };

  //const columns = mapColumns(additionalServices);
  //const data = mapRows(services);
  //const columns = mapColumns(additionalServices);

  useEffect(() => {
    mapColumns(additionalServices);
    mapRows(services, additionalServices);
  }, []);

  useEffect(() => {
    setSkipPageReset(false);
    populateCountries('departureCountries', rowData, '');
    populateCountries('destinationCountries', rowData, '');
    if (!loaded) {
      setLoaded(true);
    }
  }, [rowData]);

  useEffect(() => {
    const searchParams = new URLSearchParams(params.toString());
    const serviceGroup = searchParams.get('serviceGroup');
    const service = searchParams.get('service');
    const addons = searchParams.get('addons');
    const departure = searchParams.get('departure');
    const destination = searchParams.get('destination');
    const lang = searchParams.get('lang');
    const filter = searchParams.get('filter');
    let addonArray = [];
    let serviceIndex;

    if (addons) {
      addonArray = addons.split(' ');
    }

    for (let [i, row] of rowData.entries()) {
      if (row.serviceCode === service) {
        serviceIndex = i;
      }
    }
    if (serviceIndex) {
      for (let addon of addonArray) {
        setRowData((old) =>
          old.map((row, index) => {
            if (index === serviceIndex) {
              return {
                ...old[serviceIndex],
                [addon]: true,
              };
            }
            return row;
          })
        );
        disableExcluded(addon, serviceIndex, true);
      }
      //setSelectedDepartureCountry(departure);
      //setSelectedDestinationCountry(destination);

      setSelected((prevState) => ({
        ...prevState,
        serviceGroup: serviceGroup,
        service: service,
        addons: addonArray,
        departure: departure,
        destination: destination,
        filter: filter,
        lang: lang,
      }));
    }
  }, [loaded]);

  //const data = useMemo(() => mapRows(services), []);

  return (
    <div className="App">
      <Grid fluid>
        <div className="controls">
          <Row>
            <Col xs={6} sm={4} md={4}>
              <Dropdown
                title={t("'Select Service Group'")}
                items={items}
                multiSelect={false}
                value={selected.serviceGroup}
                onChange={(e) => {
                  let value = e[0].value;
                  updateSearchParams('serviceGroup', value);
                  setSelected((prevState) => ({
                    ...prevState,
                    serviceGroup: value,
                  }));
                }}
              />
            </Col>
            <Col xs={6} sm={4} md={4}>
              <Filter
                placeHolder="Filter data"
                value={selected.filter ? selected.filter : ''}
                onChange={(e) => {
                  let value = e.target.value;
                  updateSearchParams('filter', value);
                  setSelected((prevState) => ({
                    ...prevState,
                    filter: value,
                  }));
                }}
              />
            </Col>
            <Col xs={6} sm={4} mdOffset={2} md={2}>
              <Dropdown
                title={t("'Select Language'")}
                items={langs}
                value={selected.lang}
                multiSelect={false}
                onChange={(e) => {
                  let value = e[0].additionalInfo;
                  updateSearchParams('lang', value);
                  setSelected((prevState) => ({
                    ...prevState,
                    lang: value,
                  }));
                  i18n.changeLanguage(value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={4}>
              <Dropdown
                title={t("'Select Departure Country'")}
                items={departureCountries}
                multiSelect={false}
                value={selected.departure}
                onChange={(e) => {
                  filterCountries(e, 'departureCountries');
                }}
              />
            </Col>
            <Col xs={6} sm={4}>
              <Dropdown
                title={t("'Select Destination Country'")}
                items={destinationCountries}
                value={selected.destination}
                multiSelect={false}
                onChange={(e) => {
                  filterCountries(e, 'destinationCountries');
                }}
              />
            </Col>
            <Col xs={6} sm={4}></Col>
          </Row>
          <Row>
            <Col xs={6} sm={2}>
              <Button
                title={t('Reset')}
                type="reset"
                onClick={(e) => {
                  handleButtonClick(e);
                }}
              />
            </Col>
          </Row>
        </div>
        <div className="content">
          <Table
            columns={columnData}
            data={rowData}
            onClick={onClick}
            depCountry={selected.departure}
            destCountry={selected.destination}
            glblFilter={selected.filter}
            serviceGroup={selected.serviceGroup}
            updateDropdowns={updateDropdowns}
          />
        </div>
      </Grid>
    </div>
  );
}
