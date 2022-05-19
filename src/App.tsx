import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useState, useEffect } from 'react';
import Dropdown from './components/Dropdown';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Table from './components/Table';
import FFTable from './components/FileFormatTable';
import Filter from './components/Filter';
import Modal from './components/Modal';
import OffCanvas from './components/OffCanvas';
import hideColumn from './components/HideColumn';
//import customFilterFunction from './components/customFilter';
import additionalServices from './additionalServices.json';
import services from './services.json';
import fileFormats from './fileFormats.json';
import { useTranslation } from 'react-i18next';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useSearchParams, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import MessageGenerator from './components/MessageGenerator';

export default function App() {
  const { t, i18n } = useTranslation();

  const depCountryFilter = (rows, id, filterValue) =>
    rows.filter((row) => row.original.departureCountries.some((e) => e === filterValue));

  const destCountryFilter = (rows, id, filterValue) =>
    rows.filter((row) => row.original.destinationCountries.some((e) => e === filterValue));

  const [params, setParams] = useSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [columnData, setColumnData] = useState([
    { Header: ' ', accessor: 'serviceName', tipText: '', show: true },
    { Header: ' ', accessor: 'serviceButton', tipText: '', show: true },
    { Header: ' ', accessor: 'serviceCode', tipText: '', show: true },
    {
      Header: 'Departure Countries',
      accessor: 'departureCountries',
      tipText: '',
      show: true,
    },
    {
      Header: 'Destination Countries',
      accessor: 'destinationCountries',
      tipText: '',
      show: true,
    },
    {
      Header: 'Service Group',
      accessor: 'serviceGroup',
      tipText: '',
      show: false,
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
    format: '',
    formatFilter: '',
    modalOpen: false,
    modalData: {},
    offCanvasOpen: false,
    offCanvasData: {},
  });

  const [formats, setFormats] = useState([]);
  const [ffRowData, setFfRowData] = useState([]);
  const [ffColumnData, setFfColumnData] = useState([
    {
      Header: 'Format',
      accessor: 'format',
      show: false,
    },
    {
      Header: "'Attribute Name'",
      accessor: 'attribute',
      show: true,
    },
    {
      Header: "'M/O/C'",
      accessor: 'moc',
      show: true,
    },
    {
      Header: 'Repeat',
      accessor: 'repeat',
      show: true,
    },
    {
      Header: 'Type',
      accessor: 'type',
      show: true,
    },
    {
      Header: 'Description',
      accessor: 'description',
      show: true,
    },
  ]);

  const items = [
    { id: 0, value: t("'Parcel Services'"), additionalInfo: t("'Domestic shipments under 35 kg'") },
    {
      id: 1,
      value: t("'Transport Unit Services'"),
      additionalInfo: t("'Domestic shipments above 35 kg'"),
    },
  ];

  const mapColumns = (additionalServices) => {
    let columns = [
      { Header: ' ', accessor: 'serviceName', tipText: '', show: true },
      { Header: ' ', accessor: 'serviceButton', tipText: '', show: true },
      { Header: ' ', accessor: 'serviceCode', tipText: '', show: true },
      {
        Header: 'Departure Countries',
        accessor: 'departureCountries',
        tipText: '',
        show: false,
        filter: depCountryFilter,
      },
      {
        Header: 'Destination Countries',
        accessor: 'destinationCountries',
        tipText: '',
        show: false,
        filter: destCountryFilter,
      },
      {
        Header: 'Service Group',
        accessor: 'serviceGroup',
        tipText: '',
        show: false,
      },
    ];
    additionalServices.records.map((record) =>
      columns.push({
        Header: record.ServiceCode,
        accessor: record.ServiceCode,
        Cell: Checkbox,
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

  const populateDropdown = (filteredRows) => {
    let out = [];
    let formats = [];
    for (let row of filteredRows) {
      if (!formats || !formats.includes(row.format)) {
        formats.push(row.format);
      }
    }

    let index = 0;
    for (let format of formats) {
      out.push({ id: index, value: format, additionalInfo: format });
      index++;
    }
    setFormats(out);
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

  const updateRowData = (rowIndex, key, value) => {
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
  };

  const disableExcluded = (rowIndex, addon, isChecked) => {
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
        updateRowData(rowIndex, key, value);
        hideColumn(key, rowIndex, rowData, setColumnData);
      }
    }
  };

  const handleReset = () => {
    for (let [i, row] of rowData.entries()) {
      for (const [key, value] of Object.entries(row)) {
        if (value === true || value === 'Y') {
          updateRowData(i, key, false);
          disableExcluded(i, key, false);
        }
      }
    }
    updateSearchParams('addons', '');
    updateSearchParams('service', '');
  };

  const handleServiceSelection = (service) => {
    //console.log(rowData);
    for (let [i, row] of rowData.entries()) {
      if (row.serviceCode !== service) {
        for (const [key, value] of Object.entries(row)) {
          if (value === true || value === false) {
            updateRowData(i, key, 'Y');
            hideColumn(key, i, rowData, setColumnData);
          }
        }
      }
    }

    updateSearchParams('service', service);
  };

  const onClick = (e) => {
    //console.log(e);
    let service = '';
    let addons = '';
    let offCanvasData = {};
    if (e.isChecked) {
      service = rowData[e.row].serviceCode;

      if (selected.service) {
        for (const service of services.records) {
          if (service.ServiceCode === selected.service)
            offCanvasData['serviceName'] = service.LabelName;
        }
      }

      setSelected((prevState) => ({
        ...prevState,
        service: service,
        addons: [...prevState.addons, e.column],
        offCanvasData: offCanvasData,
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
        offCanvasData: offCanvasData,
      }));
    }

    updateRowData(e.row, e.column, e.isChecked);
    disableExcluded(e.row, e.column, e.isChecked);

    MessageGenerator(service, services, fileFormats, addons, additionalServices);
  };

  const mapRows = (services, additionalServices) => {
    let rows = [];
    let allAddons = {
      serviceName: 'Service',
      serviceButton: ' ',
      serviceCode: 'Code',
      serviceGroup: ' ',
      departureCountries: ' ',
      destinationCountries: ' ',
    };

    for (let record of services.records) {
      let service = {};
      service['serviceName'] = record.ServiceCode;
      service['serviceButton'] = (
        <Button
          title=""
          type="select"
          onClick={(e) => {
            handleServiceSelection(record.ServiceCode);
          }}
        />
      );
      service['serviceCode'] = record.ServiceCode;
      service['serviceGroup'] = record.ServiceGroup;

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
        allAddons[addon.ServiceCode] = addon.ServiceCode;
        if (record.AdditionalServices.some((e) => e.Addon === addon.ServiceCode)) {
          // checks[addon.ServiceCode] = false;
          service[addon.ServiceCode] = false;
        } else {
          service[addon.ServiceCode] = undefined;
        }
      }
      rows.push(service);
    }
    //let out = (...allAddons ...rows)
    rows = [allAddons, ...rows];
    //console.log(rows);
    return setRowData(rows);
  };

  const mapFfRows = (fileFormats) => {
    let rows = [];
    for (let record of fileFormats.records) {
      for (let attribute of record.Records) {
        let length = '';
        let type = '';
        let moc = 'O';
        let repeat;
        let name;

        if (attribute.ExtractionPath) {
          name = attribute.Name + ' (' + attribute.ExtractionPath + ')';
        } else {
          name = attribute.Name;
        }

        if (!attribute.Length && attribute.Validations) {
          for (let validation of attribute.Validations) {
            if (validation.Type === 'Size') {
              length = validation.MaxValue;
            }
          }
        } else {
          length = attribute.Length;
        }

        if (!length) {
          type = attribute.Type;
        } else {
          type = attribute.Type + ' (' + length + ')';
        }

        if (attribute.RepeatMin > 0 || attribute.RepeatMax === attribute.RepeatMin) {
          moc = 'M';
        }

        if (attribute.RepeatMin === attribute.RepeatMax) {
          repeat = attribute.RepeatMax;
        } else {
          repeat = attribute.RepeatMin + '-' + attribute.RepeatMax;
        }

        rows.push({
          format: record.Name,
          attribute: name,
          moc: moc,
          repeat: repeat,
          type: type,
          description: attribute.Description,
        });
      }
    }
    return setFfRowData(rows);
  };

  //const columns = mapColumns(additionalServices);
  //const data = mapRows(services);
  //const columns = mapColumns(additionalServices);

  useEffect(() => {
    mapColumns(additionalServices);
    mapRows(services, additionalServices);
    mapFfRows(fileFormats);
  }, []);

  useEffect(() => {
    setSkipPageReset(false);
    populateCountries('departureCountries', rowData, '');
    populateCountries('destinationCountries', rowData, '');
    populateDropdown(rowData);
  }, [rowData]);

  useEffect(() => {
    populateDropdown(ffRowData);
  }, [ffRowData]);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  }, [destinationCountries]);

  useEffect(() => {
    if (rowData) {
      const searchParams = new URLSearchParams(params.toString());
      const serviceGroup = searchParams.get('serviceGroup');
      const service = searchParams.get('service');
      const addons = searchParams.get('addons');
      const departure = searchParams.get('departure');
      const destination = searchParams.get('destination');
      const lang = searchParams.get('lang');
      const filter = searchParams.get('filter');
      const format = searchParams.get('format');
      const formatFilter = searchParams.get('formatFilter');
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
          updateRowData(serviceIndex, addon, true);
          disableExcluded(serviceIndex, addon, true);
        }
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
        format: format,
        formatFilter: formatFilter,
        lang: lang,
      }));
    }
  }, [loaded]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const langChange = (e) => {
    let value = e;
    updateSearchParams('lang', value);
    setSelected((prevState) => ({
      ...prevState,
      lang: value,
    }));
    i18n.changeLanguage(value);
  };

  const callModal = (e) => {
    let value = e;
    let data = {};
    if (value.substring(0, 1) === '2') {
      for (const record of services.records) {
        if (record.ServiceCode === value) {
          let dimensions = [];
          let routes = [];
          data['title'] = record.ServiceCode;
          data['description'] = record.ServiceCode + '_tooltip';
          for (const dimension of record.Dimensions) {
            dimensions.push(dimension);
          }
          for (const route of record.Routes) {
            routes.push(route);
          }
          data['routes'] = routes;
          data['dimensions'] = dimensions;
        }
      }
    } else {
      for (const record of additionalServices.records) {
        if (record.ServiceCode === value) {
          let excluded = [];
          data['title'] = record.ServiceCode;
          data['description'] = record.ServiceCode + '_tooltip';
          for (const addon of record.ExcludedAdditionalServices) {
            excluded.push(addon.Addon);
          }
          data['excluded'] = excluded;
        }
      }
    }
    setSelected((prevState) => ({
      ...prevState,
      modalOpen: true,
      modalData: data,
    }));
  };

  const closeModal = () => {
    setSelected((prevState) => ({
      ...prevState,
      modalOpen: false,
    }));
  };

  const closeOffCanvas = () => {
    setSelected((prevState) => ({
      ...prevState,
      offCanvasOpen: false,
    }));
  };

  const openOffCanvas = () => {
    setSelected((prevState) => ({
      ...prevState,
      offCanvasOpen: true,
    }));
  };

  //const data = useMemo(() => mapRows(services), []);

  return (
    <div className="App">
      <Modal
        t={t}
        data={selected.modalData}
        openModal={selected.modalOpen}
        closeModal={closeModal}
      />
      <NavBar
        selectedLang={langChange}
        navDropTitle={t('Language')}
        navMatrix={t("'Service Matrix'")}
        navFormat={t("'File Formats'")}
        navDropEn={t('English')}
        navDropFi={t('Finnish')}
        value={selected.lang}
      />
      <Grid fluid>
        <Routes>
          <Route
            path="/ServiceMatrix"
            element={
              <>
                <OffCanvas
                  t={t}
                  data={selected.offCanvasData}
                  openCanvas={selected.offCanvasOpen}
                  closeCanvas={closeOffCanvas}
                />
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
                        placeHolder={t("'Filter data'")}
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
                    <Col xs={2} sm={2} md={1}>
                      <Button title={t('Reset')} type="reset" onClick={openOffCanvas} />
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
                      <Button title={t('Reset')} type="reset" onClick={handleReset} />
                    </Col>
                  </Row>
                </div>
                <div className="content">
                  <Table
                    t={t}
                    columns={columnData}
                    data={rowData}
                    onClick={onClick}
                    openModal={callModal}
                    depCountry={selected.departure}
                    destCountry={selected.destination}
                    glblFilter={selected.filter}
                    serviceGroup={selected.serviceGroup}
                    updateDropdowns={updateDropdowns}
                    skipPageReset={skipPageReset}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/FileFormats"
            element={
              <div className="appcontainer">
                <div className="controls">
                  <Row>
                    <Col xs={6} sm={4} md={4}>
                      <Dropdown
                        title={t("'Select File Format'")}
                        items={formats}
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
                  <FFTable
                    t={t}
                    columns={ffColumnData}
                    data={selected.format ? ffRowData : []}
                    onClick={onClick}
                    populateDropdown={populateDropdown}
                    selectedFormat={selected.format}
                    glblFilter={selected.formatFilter}
                    skipPageReset={skipPageReset}
                  />
                </div>
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/ServiceMatrix" replace />} />
        </Routes>
      </Grid>
    </div>
  );
}
