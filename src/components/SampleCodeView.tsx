import './styles/SampleCodeView_styles.css';

const SampleCodeView = ({ data }) => {
  //let highlighted = [];

  // for (const rowData of data) {
  //   let row = 1;
  //   let rows = [row, '\n'];
  //   let string = [];
  //   var dataRow = rowData.split(/(?=[ "?=></])|(?<=[ "?=></])/g);

  //   for (let i = 0; i < dataRow.length; i++) {
  //     if (dataRow[i] === '<' || dataRow[i] === '>' || dataRow[i] === '/' || dataRow[i] === '?') {
  //       string.push(
  //         <span key={dataRow[i]} className="bracket">
  //           {dataRow[i]}
  //         </span>
  //       );
  //     } else if (dataRow[i - 1] === '?') {
  //       string.push(
  //         <span key={dataRow[i]} className="bracket">
  //           {dataRow[i]}
  //         </span>
  //       );
  //     } else if (dataRow[i + 1] === '=') {
  //       string.push(
  //         <span key={dataRow[i]} className="string">
  //           {dataRow[i]}
  //         </span>
  //       );
  //     } else if (dataRow[i] === '=') {
  //       string.push(
  //         <span key={dataRow[i]} className="string">
  //           {dataRow[i]}
  //         </span>
  //       );
  //     } else if (dataRow[i - 1] === '<' || dataRow[i - 1] === '/') {
  //       string.push(
  //         <span key={dataRow[i]} className="key">
  //           {dataRow[i]}
  //         </span>
  //       );
  //     } else {
  //       string.push(<span key={dataRow[i]}>{dataRow[i]}</span>);
  //     }
  //   }

  //   //console.log(string);

  //   highlighted.push(<span key={row}>{string}</span>);
  //   highlighted.push('\n');

  //   rows.push(row);
  //   rows.push('\n');
  //   row++;
  // }

  return (
    <>
      <div className="codePreview">
        <pre className="code">{data}</pre>
      </div>
    </>
  );
};

export default SampleCodeView;
