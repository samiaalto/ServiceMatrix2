import additionalServices from '../additionalServices.json';
import services from '../services.json';

let en = {
  "'Select Departure Country'": 'Select Departure Country',
  "'Select Destination Country'": 'Select Destination Country',
  "'Select Language'": 'Select Language',
  "'Select Service Group'": 'Select Service Group',
  PARCEL: 'Parcel Services',
  TRANSPORT_UNIT: 'Transport Unit Services',
  "'Domestic shipments under 35 kg'": 'Domestic shipments under 35 kg',
  "'Domestic shipments above 35 kg'": 'Domestic shipments above 35 kg',
  INTERNATIONAL: 'International Services',
  FREIGHT: 'Freight Services',
  LETTER: 'Letter Services',
  "'Select File Format'": 'Select File Format',
  "'Filter data'": 'Filter Data',
  "'Service Matrix'": 'Service Matrix',
  "'File Formats'": 'File Formats',
  "'Attribute Name'": 'Attribute Name',
  "'M/O/C'": 'M/O/C',
  "'is not available for'": 'is not available for',
  "'Excluded Additional Services'": 'Excluded Additional Services',
  "'Show sample values'": 'Show sample values',
  "'Show optional fields'": 'Show optional fields',
  "'Technical Instructions'": 'Technical Instructions',
  "'Mandatory Information'": 'Mandatory Information',
  "'Additional Information'": 'Additional Information',
  Label: 'Label',
  Type: 'Type',
  Repeat: 'Repeat',
  Description: 'Description',
  Language: 'Language',
  Reset: 'Reset',
  English: 'English',
  Finnish: 'Finnish',
  Code: 'Code',
  Service: 'Service',
  specs: 'Message Specifications',
  version: 'Version History',
  BOTH:
    'Additional service is available when sending shipments to pickup point chosen by the recipient and to recipient home address.',
  HOME: 'Additional service is only available when sending shipments to recipient home address.',
  PUDO:
    'Additional service is only available when sending shipments to pickup point chosen by the recipient.',
  "'in parameter'": 'in parameter',
  "'Unsupported value'": 'Unsupported value',
  "'Unable to set filters'": 'Unable to set filters',
};

let fi = {
  "'Select Departure Country'": 'Valitse lähtömaa',
  "'Select Destination Country'": 'Valitse kohdemaa',
  "'Select Language'": 'Valitse kieli',
  "'Select Service Group'": 'Valitse tuoteryhmä',
  PARCEL: 'Pakettipalvelut',
  TRANSPORT_UNIT: 'Kuljetusyksikköpalvelut',
  "'Domestic shipments under 35 kg'": 'Kotimaan lähetykset alle 35 kg',
  "'Domestic shipments above 35 kg'": 'Kotimaan lähetykset yli 35 kg',
  INTERNATIONAL: 'Kansainväliset palvelut',
  FREIGHT: 'Rahtipalvelut',
  LETTER: 'Kirjepalvelut',
  "'Select File Format'": 'Valitse tietuemuoto',
  "'Filter data'": 'Suodata',
  "'Service Matrix'": 'Palvelumatriisi',
  "'File Formats'": 'Tietuemuodot',
  "'Attribute Name'": 'Attribuutin nimi',
  "'M/O/C'": 'M/O/C',
  "'is not available for'": 'ei ole saatavilla',
  "'Excluded Additional Services'": 'Poissuljetut lisäpalvelut',
  "'Show sample values'": 'Näytä esimerkkiarvot',
  "'Show optional fields'": 'Näytä vapaaehtoiset kentät',
  "'Technical Instructions'": 'Tekniset ohjeet',
  "'Mandatory Information'": 'Pakolliset tiedot',
  "'Additional Information'": 'Lisätiedot',
  Label: 'Osoitekortti',
  Type: 'Tyyppi',
  Repeat: 'Toisto',
  Description: 'Kuvaus',
  Language: 'Kielivalinta',
  Reset: 'Resetoi',
  English: 'Englanti',
  Finnish: 'Suomi',
  Code: 'Koodi',
  Service: 'Palvelu',
  specs: 'Sanomakuvaus',
  version: 'Versiohistoria',
  TRUE: 'KYLLÄ',
  FALSE: 'EI',
  Attribute: 'Atribuutti',
  Mandatory: 'Pakollinen',
  Example: 'Esimerkki',
  Availability: 'Saatavuus',
  BOTH:
    'Lisäpalvelu on saatavilla asiakkaan valitsemaan noutopisteeseen sekä asiakkaan osoitteeseen lähetettäessä.',
  HOME: 'Lisäpalvelu on saatavilla ainoastaan asiakkaan osoitteeseen lähetettäessä.',
  PUDO: 'Lisäpalvelu on saatavilla ainoastaan asiakkaan valitsemaan noutopisteeseen',
  Error: 'Virhe',
  ago: 'sitten',
  "'Unsupported value'": 'Ei tuettu arvo',
  "'in parameter'": 'parametrissa',
  "'Unable to set filters'": 'Filtteriä ei voi asettaa',
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
      result[record.ServiceCode + '_tooltip'] = record.DescriptionEN;
    } else {
      result[record.ServiceCode] = record.DisplayNameFI;
      result[record.ServiceCode + '_tooltip'] = record.DescriptionFI;
    }
  }
  for (let record of additionalServices.records) {
    if (language === 'EN') {
      result[record.ServiceCode] = record.DisplayNameEN;
      result[record.ServiceCode + '_tooltip'] = record.DescriptionEN;
    } else {
      result[record.ServiceCode] = record.DisplayNameFI;
      result[record.ServiceCode + '_tooltip'] = record.DescriptionFI;
    }
  }
  //console.log(result);
  return result;
}

export default loadLanguages;
