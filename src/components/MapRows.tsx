import Button from './Button';

const MapRows = (services, additionalServices, t, handleServiceSelection, setRowData) => {
  let rows = [];
  let serviceGroups = [];
  let allAddons = {
    serviceName: t('Service'),
    serviceButton: ' ',
    serviceCode: t('Code'),
    serviceGroup: [],
    departureCountries: ' ',
    destinationCountries: ' ',
  };

  for (let record of services.records) {
    let service = {};

    if (!serviceGroups.includes(record.ServiceGroup)) {
      serviceGroups.push(record.ServiceGroup);
    }

    service['serviceName'] = record.ServiceCode;
    //service['serviceButton'] = (
    //  <Button
    //    title=""
    //    type="select"
    //    onClick={(e) => {
    //      serviceSelection(record.ServiceCode);
    //    }}
    //  />
    //);
    service['serviceCode'] = record.ServiceCode;
    service['serviceGroup'] = [record.ServiceGroup];

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
  allAddons['serviceGroup'] = serviceGroups;
  //let out = (...allAddons ...rows)
  rows = [allAddons, ...rows];
  //console.log(rows);
  return setRowData(rows);
};

export default MapRows;
