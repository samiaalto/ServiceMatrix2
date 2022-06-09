const MessageGenerator = (selected, services, fileFormats, additionalServices) => {
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

  const beautify = (xmlData) => {
    let highlighted = [];
    let row = 1;
    let rows = [];
    let xmlRows = xmlData.split('\n');
    for (let j = 0; j < xmlRows.length; j++) {
      var string = [];
      var items = xmlRows[j].split(/(?=[ "?=></])|(?<=[ "?=></])/g);

      for (var i = 0; i < items.length; i++) {
        if (items[i] === '<' || items[i] === '>' || items[i] === '/' || items[i] === '?') {
          string.push(<span className="bracket">{items[i]}</span>);
        } else if (items[i - 1] === '?') {
          string.push(<span className="bracket">{items[i]}</span>);
        } else if (items[i + 1] === '=') {
          string.push(<span className="string">{items[i]}</span>);
        } else if (items[i] === '=') {
          string.push(<span className="string">{items[i]}</span>);
        } else if (items[i - 1] === '<' || items[i - 1] === '/') {
          string.push(<span className="key">{items[i]}</span>);
        } else {
          string.push(<span>{items[i]}</span>);
        }
      }

      //console.log(string);

      highlighted.push(<span key={row}>{string}</span>);
      highlighted.push('\n');

      rows.push(row);
      rows.push('\n');
      row++;
    }
    return highlighted;
  };

  const beautifyJSON = (jsonData) => {
    let highlighted = [];
    let row = 1;
    let rows = [row, '\n'];
    //console.log(jsonData);
    let jsonRows = jsonData.split('\n');
    //let jsonRows = jsonData;
    for (let j = 0; j < jsonRows.length; j++) {
      var testiii = jsonRows[j].split(/(?=[}{":,\[\]])|(?<=[}{":,\[\]])/g);
      var string = [];
      for (var i = 0; i < testiii.length; i++) {
        if (testiii[i - 1] === '"' && testiii[i + 1] === '"') {
          string.push(<span className="string">{testiii[i]}</span>);
        } else if (testiii[i - 1] === ':') {
          if (/true|null|false/.test(testiii[i])) {
            string.push(<span className="boolean">{testiii[i]}</span>);
          } else {
            string.push(<span className="number">{testiii[i]}</span>);
          }
        } else {
          string.push(<span>{testiii[i]}</span>);
        }
      }
    }

    highlighted.push(<span key={row}>{string}</span>);
    highlighted.push('\n');

    row++;
    rows.push(row);
    rows.push('\n');
    //console.log(highlighted);
    return highlighted;
  };

  const serviceProps = [];
  let addonArr = [];
  let labelData = {};
  let labelAddons = [];

  addonArr = selected.addons;

  for (const record of services.records) {
    if (record.ServiceCode === selected.service) {
      labelData['serviceName'] = record.LabelName;
      labelData['processNumber'] = record.ProcessNumber;
      for (const field of record.Fields) {
        serviceProps.push({
          format: field.MessageFormat,
          property: field.PropertyName,
          value: field.PropertyValue,
          position: field.MessagePosition,
        });
      }
    }
  }
  if (addonArr) {
    for (const record of additionalServices.records) {
      if (addonArr.includes(record.ServiceCode)) {
        labelAddons.push({ labelName: record.DisplayNameFI, labelMarking: record.LabelMarking });
        for (const field of record.Fields) {
          serviceProps.push({
            format: field.MessageFormat,
            property: field.PropertyName,
            value: field.PropertyValue,
            position: field.MessagePosition,
          });
        }
      }
    }
  }

  let d = new Date();
  labelData['dateTime'] = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
  labelData['addons'] = labelAddons;

  let outXML = {};
  let outJSON = {};
  let indexes = {};
  let sampleValues = selected.showSamples;
  let mandatoryOnly = selected.showOptional;

  //console.log(serviceProps);

  for (const record of fileFormats.records) {
    if (serviceProps.some((e) => e.format === record.Name)) {
      for (let i = 0; i < record.Records.length; i++) {
        if (record.Format === 'XML') {
          // Determine new path for the element

          let obj = record.Records[i];
          let parentIndex = record.Records.findIndex((o) => o.Name === obj.Parent);
          let objParent = record.Records[parentIndex];
          let newPath = obj.Path;
          if (parentIndex > -1) {
            if (objParent.Type === 'Array') {
              if (!indexes.hasOwnProperty(objParent.Name)) {
                indexes[objParent.Name] = 0;
                indexes[obj.Name] = 0;
              } else if (indexes.hasOwnProperty(obj.Name)) {
                indexes[obj.Name] = indexes[obj.Name] + 1;
              }

              let path = obj.Path.split('.');

              for (const index of Object.keys(indexes)) {
                let elIndex = path.findIndex((o) => o === index);
                if (elIndex > -1) {
                  path[elIndex + 1] = indexes[index];
                }
              }
              newPath = path.join('.');
            } else {
              let path = obj.Path.split('.');

              for (const index of Object.keys(indexes)) {
                let elIndex = path.findIndex((o) => o === index);
                if (elIndex > -1) {
                  path[elIndex + 1] = indexes[index];
                }
              }
              newPath = path.join('.');
            }
          }

          // Set the attributes

          let next = i + 1;
          let value = {};
          let val = '';

          if (sampleValues) {
            if (obj.ExampleValue === 'dateTime') {
              value = Object.assign(value, {
                '#text': new Date().toISOString().split('.')[0] + '+03:00',
              });
            } else {
              value = Object.assign(value, { '#text': obj.ExampleValue });
            }
          }

          for (const prop of serviceProps) {
            if (prop.property === record.Records[i].Name) {
              val = prop.value;
            }
          }

          if (val !== '') {
            value = Object.assign(value, { '#text': val });
          }

          if (i !== record.Records.length - 1 && record.Records[next].Type === 'Attribute') {
            value = {
              ['@' + record.Records[next].Name]:
                sampleValues || val !== '' ? record.Records[next].ExampleValue : '',
              '#text': val !== '' ? val : sampleValues ? obj.ExampleValue : '',
            };

            if (i > 2 && record.Records[i - 2].Type === 'Object') {
              let value2 = {
                ['@' + record.Records[i - 1].Name]: sampleValues
                  ? record.Records[i - 1].ExampleValue
                  : '',
                '#text': sampleValues ? record.Records[i - 2].ExampleValue : '',
              };

              let path = record.Records[i - 2].Path.split('.');

              for (const index of Object.keys(indexes)) {
                let elIndex = path.findIndex((o) => o === index);
                if (elIndex > -1) {
                  path[elIndex + 1] = indexes[index];
                }
              }
              let newPath2 = path.join('.');

              set(outXML, newPath2, value2);
            }

            if (
              next + 1 < record.Records.length - 1 &&
              record.Records[next + 1].Type === 'Attribute'
            ) {
              value = Object.assign(value, {
                ['@' + record.Records[next + 1].Name]: sampleValues
                  ? record.Records[next + 1].ExampleValue
                  : '',
                '#text': sampleValues ? record.Records[next + 1].ExampleValue : '',
              });
            }
          }

          // Set the element in to the tree

          if (obj.Type !== 'Object' && obj.Type !== 'Array' && obj.Type !== 'Attribute') {
            if (!mandatoryOnly) {
              if (obj.Mandatory) {
                set(outXML, newPath, value);
              }
            } else {
              set(outXML, newPath, value);
            }
          }
        } else if (record.Format === 'JSON') {
          // Determine new path for the element

          let obj = record.Records[i];
          let parentIndex = record.Records.findIndex((o) => o.Name === obj.Parent);
          let objParent = record.Records[parentIndex];
          let newPath = obj.Path;
          if (parentIndex > -1) {
            if (objParent.Type === 'Array') {
              if (!indexes.hasOwnProperty(objParent.Name)) {
                indexes[objParent.Name] = 0;
                indexes[obj.Name] = 0;
              } else if (indexes.hasOwnProperty(obj.Name)) {
                indexes[obj.Name] = indexes[obj.Name] + 1;
              }

              let path = obj.Path.split('.');

              for (const index of Object.keys(indexes)) {
                let elIndex = path.findIndex((o) => o === index);
                if (elIndex > -1) {
                  //path[elIndex + 1] = indexes[index];
                }
              }
              newPath = path.join('.');
            } else {
              let path = obj.Path.split('.');

              for (const index of Object.keys(indexes)) {
                let elIndex = path.findIndex((o) => o === index);
                if (elIndex > -1) {
                  //path[elIndex + 1] = indexes[index];
                }
              }
              newPath = path.join('.');
            }
          }

          // Set the attributes

          let value = '';
          let val = '';

          if (sampleValues) {
            if (obj.ExampleValue === 'dateTime') {
              value = new Date().toISOString().split('.')[0];
            } else {
              value = obj.ExampleValue;
            }
          }

          for (const prop of serviceProps) {
            if (
              prop.property === record.Records[i].Name &&
              prop.position === record.Records[i].Parent
            ) {
              val = prop.value;
            }
          }

          if (val !== '') {
            value = val;
          }

          // Set the element in to the tree

          if (obj.Type !== 'Object' && obj.Type !== 'Array' && obj.Type !== 'Attribute') {
            if (!mandatoryOnly) {
              if (obj.Mandatory) {
                set(outJSON, newPath, value);
              }
            } else {
              set(outJSON, newPath, value);
            }
          }
        }
      }
    }
  }

  function syntaxHighlight(json) {
    let highlighted = [];
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = 'number';
        var output = '';
        let string = [];
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        if (cls === 'key') {
          match = match.substring(1, match.length - 2);
          //output = '"<span class="' + cls + '">' + match + '</span>":';
          string.push(<span className="key">{match}</span>);
        } else if (cls === 'string') {
          match = match.substring(1, match.length - 1);
          //output = '"<span class="' + cls + '">' + match + '</span>"';
          string.push(<span className="string">{match}</span>);
        } else {
          output = '<span class="' + cls + '">' + match + '</span>';
          string.push(<span className={cls}>{match}</span>);
        }

        return string;
        //return output;
      }
    );
  }

  //console.log(indexes);
  //console.log(JSON.stringify(outJSON));
  //console.log(outJSON);
  const json = [JSON.stringify(outJSON, null, 2)];
  const beautifiedJSON = beautifyJSON(JSON.stringify(outJSON, null, 2));
  const doc = create({ version: '1.0', encoding: 'UTF-8' }, outXML);
  const xml = doc.end({ prettyPrint: true });
  const beautifiedXML = beautify(xml);
  return { POSTRA: beautifiedXML, SMARTSHIP: beautifiedJSON, labelData: labelData };
  //console.log(xml);
};

export default MessageGenerator;
