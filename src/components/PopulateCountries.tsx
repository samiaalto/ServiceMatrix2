const PopulateCountries = (
  route,
  rowdata,
  filteredRows,
  setDepartureCountries,
  setDestinationCountries
) => {
  let out = [];
  let countries = [];
  if (filteredRows) {
    for (let row of filteredRows) {
      if (row.index !== 0) {
        for (let country of row.original[route]) {
          if (!countries || !countries.includes(country)) {
            countries.push(country);
          }
        }
      }
    }
  } else if (rowdata) {
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

export default PopulateCountries;
