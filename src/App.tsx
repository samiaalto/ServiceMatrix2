import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import Dropdown from './components/Dropdown';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import MatrixTable from './components/Table';
import FileFormats from './components/FileFormats';
import Filter from './components/Filter';
import Modal from './components/Modal';
import OffCanvas from './components/OffCanvas';
import Alert from './components/Alert';
import GenerateAlert from './components/GenerateAlerts';
import hideColumn from './components/HideColumn';
import populateCountries from './components/PopulateCountries';
import mapRows from './components/MapRows';
import mapFfRows from './components/MapFFRows';
import additionalServices from './additionalServices.json';
import services from './services.json';
import fileFormats from './fileFormats.json';
import MessageGenerator from './components/MessageGenerator';
import NavBar from './components/NavBar';

export default function App() {
  const { t, i18n } = useTranslation();

  const depCountryFilter = (rows, id, filterValue) =>
    rows.filter((row) => row.original.departureCountries.some((e) => e === filterValue));

  const destCountryFilter = (rows, id, filterValue) =>
    rows.filter((row) => row.original.destinationCountries.some((e) => e === filterValue));

  const serviceGroupFilter = (rows, id, filterValue) =>
    rows.filter((row) => row.original.serviceGroup.some((e) => e === filterValue));

  const [params, setParams] = useSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);
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
    ffTab: '',
    modalOpen: false,
    modalData: {},
    showAlert: false,
    alertData: [],
    offCanvasOpen: false,
    offCanvasTab: 'label',
    showSamples: true,
    showOptional: false,
    labelData: {},
    POSTRA: {},
    SMARTSHIP: {},
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
      Header: 'Position',
      accessor: 'position',
      show: false,
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
    {
      id: 0,
      value: 'PARCEL',
      additionalInfo: t("'Domestic shipments under 35 kg'"),
    },
    {
      id: 1,
      value: 'TRANSPORT_UNIT',
      additionalInfo: t("'Domestic shipments above 35 kg'"),
    },
    {
      id: 2,
      value: 'INTERNATIONAL',
      additionalInfo: t("'International Shipments'"),
    },
    {
      id: 3,
      value: 'FREIGHT',
      additionalInfo: t("'Freight Shipments'"),
    },
    {
      id: 4,
      value: 'LETTER',
      additionalInfo: t("'Letter Shipments'"),
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
        filter: serviceGroupFilter,
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
        //hideColumn(key, rowIndex, rowData, setColumnData, filteredRowData);
      }
    }
  };

  const handleReset = () => {
    let updatedSearchParams = new URLSearchParams(params.toString());
    for (let [i, row] of rowData.entries()) {
      for (const [key, value] of Object.entries(row)) {
        if (value === true || value === 'Y') {
          updateRowData(i, key, false);
          disableExcluded(i, key, false);
        }
      }
    }
    updatedSearchParams.delete('service');
    updatedSearchParams.delete('addons');
    setParams(updatedSearchParams.toString());

    setSelected((prevState) => ({
      ...prevState,
      service: '',
      addons: [],
    }));
  };

  const handleServiceSelection = (service) => {
    for (let [i, row] of rowData.entries()) {
      if (row.serviceCode !== service && filteredRowData.some((current) => current.index === i)) {
        for (const [key, value] of Object.entries(row)) {
          if (value === true || value === false) {
            updateRowData(i, key, 'Y');
          }
        }
      }
    }

    updateSearchParams('service', service);
  };

  const callHideColumn = () => {
    if (rowData.length > 0 && filteredRowData.length > 0) {
      for (const [key] of Object.entries(rowData[0])) {
        if (key.substring(0, 1) === '3' || key.substring(0, 1) === '5') {
          hideColumn(key, filteredRowData[0].index, rowData, setColumnData, filteredRowData);
        }
      }
    }
  };

  const onClick = (e) => {
    console.log(e);
    let updatedSearchParams = new URLSearchParams(params.toString());
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

      updatedSearchParams.set('service', service);
      updatedSearchParams.set('addons', addons);
    } else {
      if (selected.addons.length === 1) {
        updatedSearchParams.delete('service');
        updatedSearchParams.delete('addons');
      } else {
        addons = selected.addons.filter((x) => x !== e.column).join(' ');
        updatedSearchParams.set('addons', addons);
      }

      setSelected((prevState) => ({
        ...prevState,
        service: service,
        addons: prevState.addons.filter((x) => x !== e.column),
      }));
    }

    updateRowData(e.row, e.column, e.isChecked);
    disableExcluded(e.row, e.column, e.isChecked);
    setParams(updatedSearchParams.toString());
  };

  const fetchData = async () => {
    try {
      let data = await axios({
        method: 'get',
        url: '/api',
        //timeout: 1000 * 5, // Wait for 5 seconds
      }).then(({ data }) => data);
      console.log('TÄÄL');
      console.log(data);
      // setResponseData(data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    mapColumns(additionalServices);
    mapRows(services, additionalServices, t, handleServiceSelection, setRowData);
    mapFfRows(fileFormats, setFfRowData);
    fetchData();
  }, []);

  useEffect(() => {
    setSkipPageReset(false);
    //populateCountries('departureCountries', rowData, '');
    //populateCountries('destinationCountries', rowData, '');
    //populateDropdown(rowData);
    callHideColumn();
  }, [rowData]);

  useEffect(() => {
    populateDropdown(ffRowData);
  }, [ffRowData]);

  useEffect(() => {
    let messages = MessageGenerator(selected, services, fileFormats, additionalServices);

    setSelected((prevState) => ({
      ...prevState,
      labelData: messages['labelData'],
      POSTRA: messages['POSTRA'],
      SMARTSHIP: messages['SMARTSHIP'],
    }));
  }, [selected.service, selected.addons, selected.showSamples, selected.showOptional]);

  useEffect(() => {
    const getBool = (val) => {
      if (val !== undefined) {
        return !!JSON.parse(String(val).toLowerCase());
      }
    };

    if (rowData) {
      const URLparams = Object.fromEntries([...params]);
      let alertArray = [];
      let addonArray = [];
      let serviceIndex;
      let lang = 'en';
      let languages = ['en', 'fi'];

      if (URLparams.lang && !languages.includes(URLparams.lang.toLowerCase())) {
        //updateSearchParams('lang', lang);
        alertArray.push({
          reason: 'unsupported',
          param: 'lang',
          value: URLparams.lang,
          datestamp: Date.now(),
        });
      } else if (URLparams.lang) {
        lang = URLparams.lang.toLowerCase();
        updateSearchParams('lang', lang);
      }

      if (URLparams.service && !services.records.some((e) => e.ServiceCode === URLparams.service)) {
        alertArray.push({
          reason: 'unsupported',
          param: 'service',
          value: URLparams.service,
          datestamp: Date.now(),
        });
      }

      if (URLparams.addons) {
        addonArray = URLparams.addons.split(' ');
      }

      if (addonArray) {
        for (let addon of addonArray) {
          if (!additionalServices.records.some((e) => e.ServiceCode === addon)) {
            alertArray.push({
              reason: 'unsupported',
              param: 'addons',
              value: addon,
              datestamp: Date.now(),
            });
          }
        }
      }

      for (let [i, row] of rowData.entries()) {
        if (row.serviceCode === URLparams.service) {
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
        serviceGroup: URLparams.serviceGroup,
        service: URLparams.service,
        addons: addonArray,
        departure: URLparams.departure,
        destination: URLparams.destination,
        filter: URLparams.filter,
        format: URLparams.format,
        formatFilter: URLparams.formatFilter,
        lang: lang,
        offCanvasOpen: getBool(URLparams.offCanvasOpen),
        offCanvasTab: URLparams.offCanvasTab,
        showSamples: getBool(URLparams.showSamples),
        showOptional: getBool(URLparams.showOptional),
      }));
      if (alertArray.length > 0) {
        GenerateAlert(alertArray, setSelected);
      }
    }
  }, [loaded]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
    console.log(filteredRowData);

    if (selected.departure && !selected.destination) {
      populateCountries(
        'destinationCountries',
        '',
        filteredRowData,
        setDepartureCountries,
        setDestinationCountries
      );
    } else if (!selected.departure && selected.destination) {
      populateCountries(
        'departureCountries',
        '',
        filteredRowData,
        setDepartureCountries,
        setDestinationCountries
      );
    } else {
      populateCountries(
        'departureCountries',
        '',
        filteredRowData,
        setDepartureCountries,
        setDestinationCountries
      );
      populateCountries(
        'destinationCountries',
        '',
        filteredRowData,
        setDepartureCountries,
        setDestinationCountries
      );
    }
  }, [filteredRowData]);

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
    data['fields'] = {};
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
          for (const field of record.Fields) {
            if (!data['fields'][field.MessageFormat]) {
              data['fields'][field.MessageFormat] = [];
            }

            data['fields'][field.MessageFormat].push(field);
          }
          data['routes'] = routes;
          data['dimensions'] = dimensions;
        }
      }
    } else {
      for (const record of additionalServices.records) {
        if (record.ServiceCode === value) {
          let excluded = [];
          let mandatory = '';
          data['fields'] = {};
          data['availability'] = { pudo: record.Pudo, home: record.Home };
          data['title'] = record.ServiceCode;
          data['description'] = record.ServiceCode + '_tooltip';
          for (const addon of record.ExcludedAdditionalServices) {
            excluded.push(addon.Addon);
          }
          for (const field of record.Fields) {
            if (!data['fields'][field.MessageFormat]) {
              data['fields'][field.MessageFormat] = [];
            }
            if (
              field.MessageFormat === 'POSTRA' &&
              field.PropertyName !== 'Service' &&
              field.Mandatory
            ) {
              mandatory = mandatory + field.PropertyName + ', ';
              data['fields'][field.MessageFormat].push(field);
            } else {
              data['fields'][field.MessageFormat].push(field);
            }
          }
          data['excluded'] = excluded;
          data['mandatory'] = mandatory.substring(0, mandatory.length - 2);
        }
      }
    }

    setSelected((prevState) => ({
      ...prevState,
      modalOpen: true,
      modalData: data,
    }));
    updateSearchParams('modalOpen', true);
  };

  const closeModal = () => {
    setSelected((prevState) => ({
      ...prevState,
      modalOpen: false,
    }));
    updateSearchParams('modalOpen', false);
  };

  const closeOffCanvas = () => {
    setSelected((prevState) => ({
      ...prevState,
      offCanvasOpen: false,
    }));
    updateSearchParams('offCanvasOpen', false);
  };

  const openOffCanvas = () => {
    setSelected((prevState) => ({
      ...prevState,
      offCanvasOpen: true,
    }));
    updateSearchParams('offCanvasOpen', true);
  };

  const showOptional = () => {
    setSelected((prevState) => ({
      ...prevState,
      showOptional: !prevState.showOptional,
    }));
    updateSearchParams('showOptional', !selected.showOptional);
  };

  const showSamples = () => {
    setSelected((prevState) => ({
      ...prevState,
      showSamples: !prevState.showSamples,
    }));
    updateSearchParams('showSamples', !selected.showSamples);
  };

  //const data = useMemo(() => mapRows(services), []);

  return (
    <div className="App">
      <Alert t={t} data={selected.alertData} />
      <Modal
        t={t}
        data={selected.modalData}
        openModal={selected.modalOpen}
        closeModal={closeModal}
        selected={selected}
        setSelected={setSelected}
        updateSearchParams={updateSearchParams}
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
      <Container fluid>
        <Routes>
          <Route
            path="/ServiceMatrix"
            element={
              <>
                <OffCanvas
                  t={t}
                  data={selected}
                  openCanvas={selected.offCanvasOpen}
                  closeCanvas={closeOffCanvas}
                  showOptional={showOptional}
                  showSamples={showSamples}
                  setKey={(e) => {
                    updateSearchParams('offCanvasTab', e);
                    setSelected((prevState) => ({
                      ...prevState,
                      offCanvasTab: e,
                    }));
                  }}
                />
                <div className="controls">
                  <Row>
                    <Col xs={6} sm={4} md={4}>
                      <Dropdown
                        title={t("'Select Service Group'")}
                        items={items}
                        multiSelect={false}
                        t={t}
                        value={selected.serviceGroup}
                        onChange={(e) => {
                          let value = '';
                          if (e[0]) {
                            value = e[0].value;
                          }
                          updateSearchParams('serviceGroup', value);
                          setSelected((prevState) => ({
                            ...prevState,
                            serviceGroup: value,
                          }));
                        }}
                      />
                    </Col>
                    <Col xs={4} sm={4} md={4}>
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
                    <Col xs={2} sm={{ span: 2, offset: 2 }} md={{ span: 1, offset: 3 }}>
                      <Button title={''} type="samples" onClick={openOffCanvas} />
                    </Col>
                  </Row>
                  {selected.serviceGroup === 'INTERNATIONAL' && (
                    <Row>
                      <Col xs={6} sm={4}>
                        <Dropdown
                          title={t("'Select Departure Country'")}
                          items={departureCountries}
                          multiSelect={false}
                          t={t}
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
                          t={t}
                          value={selected.destination}
                          multiSelect={false}
                          onChange={(e) => {
                            filterCountries(e, 'destinationCountries');
                          }}
                        />
                      </Col>
                      <Col xs={6} sm={4}></Col>
                    </Row>
                  )}
                  <Row>
                    <Col xs={4} sm={3} md={2} lg={1}>
                      <Button title={t('Reset')} type="reset" onClick={handleReset} />
                    </Col>
                  </Row>
                </div>
                <div className="content">
                  <MatrixTable
                    t={t}
                    columns={columnData}
                    data={rowData}
                    onClick={onClick}
                    openModal={callModal}
                    depCountry={selected.departure}
                    destCountry={selected.destination}
                    glblFilter={selected.filter}
                    serviceGroup={selected.serviceGroup}
                    updateDropdowns={setFilteredRowData}
                    skipPageReset={skipPageReset}
                    serviceSelection={handleServiceSelection}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/FileFormats"
            element={
              <FileFormats
                t={t}
                selected={selected}
                setSelected={setSelected}
                formats={formats}
                ffColumnData={ffColumnData}
                setFfColumnData={setFfColumnData}
                ffRowData={ffRowData}
                updateSearchParams={updateSearchParams}
                fileFormats={fileFormats}
              />
            }
          />
          <Route path="*" element={<Navigate to="/ServiceMatrix" replace />} />
        </Routes>
      </Container>
    </div>
  );
}
