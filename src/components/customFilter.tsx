const customFilterFunction = (
  rows,
  id,
  filterValue //console.log(filterValue);
) => {
  //console.log(filterValue);
  rows.filter((row) => row.original.age >= filterValue);
};

export default customFilterFunction;
