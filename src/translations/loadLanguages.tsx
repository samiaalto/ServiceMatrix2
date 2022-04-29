import additionalServices from '../additionalServices.json';
import services from '../services.json';

let en = {
  "'Select Departure Country'": 'Select Departure Country',
  "'Select Destination Country'": 'Select Destination Country',
  "'Select Language'": 'Select Language',
  "'Select Service Group'": 'Select Service Group',
  "'Parcel Services'": 'Parcel Services',
  "'Transport Unit Services'": 'Transport Unit Services',
  "'Domestic shipments under 35 kg'": 'Domestic shipments under 35 kg',
  "'Domestic shipments above 35 kg'": 'Domestic shipments above 35 kg',
  Reset: 'Reset',
  English: 'English',
  Finnish: 'Finnish',
};

let fi = {
  "'Select Departure Country'": 'Valitse lähtömaa',
  "'Select Destination Country'": 'Valitse kohdemaa',
  "'Select Language'": 'Valitse kieli',
  "'Select Service Group'": 'Valitse tuoteryhmä',
  "'Parcel Services'": 'Pakettipalvelut',
  "'Transport Unit Services'": 'Kuljetusyksikköpalvelut',
  "'Domestic shipments under 35 kg'": 'Kotimaan lähetykset alle 35 kg',
  "'Domestic shipments above 35 kg'": 'Kotimaan lähetykset yli 35 kg',
  Reset: 'Resetoi',
  English: 'Englanti',
  Finnish: 'Suomi',
};

function loadLanguages(language) {
  let result = {};

  if (language === 'EN') {
    result = en;
  } else {
    result = Object.assign(result, fi);
  }

  for (let record of services.records) {
    if (language === 'EN') {
      result[record.ServiceCode] = record.DisplayNameEN;
    } else {
      result[record.ServiceCode] = record.DisplayNameFI;
    }
  }
  for (let record of additionalServices.records) {
    if (language === 'EN') {
      result[record.ServiceCode] = record.DisplayNameEN;
      result[record.ServiceCode + '_tooltip'] =
        record.DisplayNameEN + ' (' + record.ServiceCode + ') ' + record.DescriptionEN;
    } else {
      result[record.ServiceCode] = record.DisplayNameFI;
      result[record.ServiceCode + '_tooltip'] =
        record.DisplayNameFI + ' (' + record.ServiceCode + ') ' + record.DescriptionFI;
    }
  }
  console.log(result);
  return result;
}

export default loadLanguages;
