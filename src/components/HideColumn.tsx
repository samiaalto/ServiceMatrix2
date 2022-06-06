const hideColumn = (addon, currentRow, rowData, setColumnData, filteredData) => {
  let emptyCount = 1;

  for (const [i, row] of rowData.entries()) {
    if (i !== currentRow && filteredData.some((current) => current.index === i)) {
      for (const [key, value] of Object.entries(row)) {
        if (key === addon && value !== true && value !== false) {
          emptyCount++;
        }
      }
    }
  }

  //console.log(addon + ' ' + emptyCount + ' ' + filteredData.length);
  if (emptyCount === filteredData.length) {
    //hide column
    setColumnData((prevState) =>
      prevState.map((item, index) => (item.accessor === addon ? { ...item, show: false } : item))
    );
  } else {
    //show hidden column
    setColumnData((prevState) =>
      prevState.map((item, index) =>
        item.accessor === addon && !item.show ? { ...item, show: true } : item
      )
    );
  }
};

export default hideColumn;
