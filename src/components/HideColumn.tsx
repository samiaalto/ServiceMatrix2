const hideColumn = (addon, currentRow, rowData, setColumnData) => {
  let emptyCount = 1;
  for (const [i, row] of rowData.entries()) {
    if (i !== currentRow) {
      for (const [key, value] of Object.entries(row)) {
        if (key === addon && value !== true && value !== false) {
          emptyCount++;
        }
      }
    }
  }
  if (emptyCount === rowData.length) {
    //hide column
    setColumnData((prevState) =>
      prevState.map((item, index) =>
        item.accessor === addon ? { ...item, show: !item.show } : item
      )
    );
  } else {
    //show hidden column
    setColumnData((prevState) =>
      prevState.map((item, index) =>
        item.accessor === addon && !item.show ? { ...item, show: !item.show } : item
      )
    );
  }
};

export default hideColumn;
