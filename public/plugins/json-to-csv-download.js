function json_to_csv_download(data, fileName) {
  const replacer = (key, value) => (value === null ? "" : value);
  /* specify how you want to handle null values */
  const header = Object.keys(data[0]);
  let csv = data.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );
  csv.unshift(header.join(","));
  csv = csv.join("\r\n");

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = fileName + ".csv";
  hiddenElement.click();
}
