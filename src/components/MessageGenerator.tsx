import e from 'express';

const MessageGenerator = (service, services, fileFormats, addons, additionalServices) => {
  const { create } = require('xmlbuilder2');

  //console.log(addons);

  function set(obj, path, value) {
    // protect against being something unexpected
    obj = typeof obj === 'object' ? obj : {};
    // split the path into and array if its not one already
    var keys = Array.isArray(path) ? path : path.split('.');
    // keep up with our current place in the object
    // starting at the root object and drilling down
    var curStep = obj;
    // loop over the path parts one at a time
    // but, dont iterate the last part,
    for (var i = 0; i < keys.length - 1; i++) {
      // get the current path part
      var key = keys[i];

      // if nothing exists for this key, make it an empty object or array
      if (!curStep[key] && !Object.prototype.hasOwnProperty.call(curStep, key)) {
        // get the next key in the path, if its numeric, make this property an empty array
        // otherwise, make it an empty object
        var nextKey = keys[i + 1];
        var useArray = /^\+?(0|[1-9]\d*)$/.test(nextKey);
        curStep[key] = useArray ? [] : {};
      }
      // update curStep to point to the new level
      curStep = curStep[key];
    }
    // set the final key to our value
    var finalStep = keys[keys.length - 1];
    //if (value) {
    curStep[finalStep] = value;
    //} else {
    //  curStep = curStep[finalStep];
    //}
  }

  const serviceProps = [];
  let addonArr = addons.split(' ');

  for (const record of services.records) {
    if (record.ServiceCode === service) {
      for (const field of record.Fields) {
        serviceProps.push({
          format: field.MessageFormat,
          property: field.PropertyName,
          value: field.PropertyValue,
        });
      }
    }
  }
  if (addonArr) {
    for (const record of additionalServices.records) {
      if (addonArr.includes(record.ServiceCode)) {
        for (const field of record.Fields) {
          serviceProps.push({
            format: field.MessageFormat,
            property: field.PropertyName,
            value: field.PropertyValue,
          });
        }
      }
    }
  }

  //console.log(serviceProps);

  const getIndexes = (arr, field, val) => {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i][field] === val) indexes.push(i);
    return indexes;
  };

  let outXML = {};
  let temp = [];
  let index = {};
  for (const record of fileFormats.records) {
    if (serviceProps.some((e) => e.format === record.Name)) {
      for (let i = 0; i < record.Records.length; i++) {
        if (record.Format === 'XML') {
          if (
            record.Records[i].Type !== 'Object' &&
            record.Records[i].Type !== 'Array' &&
            record.Records[i].Type !== 'Attribute'
          ) {
            let value = '';

            if (record.Records[i].ExampleValue) {
              if (record.Records[i].ExampleValue === 'dateNow') {
                value = new Date().toISOString().slice(0, 19) + '+03:00';
              } else {
                value = record.Records[i].ExampleValue;
              }
            }

            for (const prop of serviceProps) {
              if (prop.property === record.Records[i].Name) {
                value = prop.value;
              }
            }
            let next = i + 1;

            if (i !== record.Records.length && record.Records[next].Type === 'Attribute') {
              let indexes = getIndexes(record.Records, 'Name', record.Records[i].Name);

              if (
                indexes.length > 1 &&
                !temp.includes(record.Records[i].Name) &&
                record.Records[i - 2].Type !== 'Object'
              ) {
                let elementArr = [];

                for (let k = 0; k < indexes.length; k++) {
                  if (!temp.includes(record.Records[indexes[k]].Name)) {
                    temp.push(record.Records[indexes[k]].Name);
                  }
                  elementArr.push({
                    ['@' + record.Records[indexes[k] + 1].Name]: record.Records[indexes[k] + 1]
                      .ExampleValue,
                    '#text': record.Records[indexes[k]].ExampleValue,
                  });
                }
                set(outXML, record.Records[i].Path, elementArr);
              } else if (temp.includes(record.Records[i].Name)) {
              } else if (record.Records[i - 2].Type === 'Object') {
                if (!index.hasOwnProperty(record.Records[i - 2].Name)) {
                  console.log('TÄÄLLÄ');
                  index[record.Records[i - 2].Name] = 0;
                  console.log(index);
                } else {
                  console.log('TÄÄLLÄ2');
                  index[record.Records[i - 2].Name] = index[record.Records[i - 2].Name] + 1;
                  console.log(index);
                }

                let value2 = {
                  ['@' + record.Records[i - 1].Name]: record.Records[i - 1].ExampleValue
                    ? record.Records[i - 1].ExampleValue
                    : 'TEST',
                };
                let path = record.Records[i - 2].Path.split('.');
                let elementIndex = path.findIndex((obj) => obj === record.Records[i - 2].Name);
                path[elementIndex + 1] = index[record.Records[i - 2].Name];
                let newPath = path.join('.');

                set(outXML, newPath, value2);

                path = record.Records[i].Path.split('.');
                path[elementIndex + 1] = index[record.Records[i - 2].Name];
                newPath = path.join('.');

                let value3 = {
                  ['@' + record.Records[next].Name]: record.Records[next].ExampleValue
                    ? record.Records[next].ExampleValue
                    : '',
                  '#text': value,
                };

                set(outXML, newPath, value3);
              } else {
                let value2 = {
                  ['@' + record.Records[next].Name]: record.Records[next].ExampleValue
                    ? record.Records[next].ExampleValue
                    : '',
                  '#text': value,
                };

                let indexes = getIndexes(record.Records, 'Parent', record.Records[i].Name);
                if (indexes.length > 1) {
                  for (let j = 0; j < indexes.length; j++) {
                    value2 = Object.assign(value2, {
                      ['@' + record.Records[indexes[j]].Name]: value,
                    });
                  }
                }
                set(outXML, record.Records[i].Path, value2);
              }
            } else {
              let occurences = serviceProps.filter((v) => v.property === record.Records[i].Name);
              if (record.Records[i - 1].Type === 'Array' && occurences.length > 1) {
                let occArr = [];
                for (const occurence of occurences) {
                  occArr.push(occurence.value);
                }
                set(outXML, record.Records[i].Path, occArr);
              } else {
                //console.log(record.Records[i].Name);
                if (index.hasOwnProperty(record.Records[i].Parent)) {
                  let path = record.Records[i].Path.split('.');
                  let elementIndex = path.findIndex((obj) => obj === record.Records[i].Parent);
                  path[elementIndex + 1] = index[record.Records[i].Parent];
                  let newPath = path.join('.');
                  set(outXML, newPath, value);
                } else {
                  set(outXML, record.Records[i].Path, value);
                }
              }
            }
          }
        } else {
        }
      }
    }
  }

  console.log(JSON.stringify(outXML));

  const doc = create({ version: '1.0', encoding: 'UTF-8' }, outXML);
  const xml = doc.end({ prettyPrint: true });
  console.log(xml);
};

export default MessageGenerator;
