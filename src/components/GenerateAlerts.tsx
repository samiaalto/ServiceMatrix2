const GenerateAlerts = (alerts, setSelected) => {
  let output = [];
  let delay = Number(alerts.length + 2 + '000');
  let itemId = 0;
  for (let item of alerts) {
    if (item.reason === 'unsupported') {
      output.push({
        id: itemId,
        title: "'Unable to set filters'",
        text: "'Unsupported value'",
        param: item.param,
        value: item.value,
        show: true,
        delay: delay,
        datestamp: item.datestamp,
      });
      delay = delay - 1400;
      itemId++;
    }
  }
  setSelected((prevState) => ({
    ...prevState,
    alertData: output,
  }));
};

export default GenerateAlerts;
