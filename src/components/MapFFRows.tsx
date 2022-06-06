const MapFFRows = (fileFormats, setFfRowData) => {
  let rows = [];
  for (let record of fileFormats.records) {
    for (let attribute of record.Records) {
      let length = '';
      let type = '';
      let moc = 'O';
      let repeat;
      let name;
      let position;

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

      if (attribute.Position) {
        position = attribute.Position + '-' + (attribute.Position + attribute.Length);
      }

      rows.push({
        format: record.Name,
        attribute: name,
        moc: moc,
        repeat: repeat,
        type: type,
        position: position,
        description: attribute.Description,
      });
    }
  }
  return setFfRowData(rows);
};

export default MapFFRows;
