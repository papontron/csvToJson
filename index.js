const express = require("express");
const bodyParser = require("body-parser");
const csvtojson = require("csv-file-to-json");
const jsonDoc = require("./primaria2024.json");

//console.log(jsonDoc);
const update = jsonDoc.map((row) => {
  //update codigoEstudiante
  if (row.codigoEstudiante === row.dni) {
    row.codigoEstudiante = "000000" + row.codigoEstudiante;
  }
  row.fechaMatricula = "2024-03-04T00:00:00.000Z";
  return row;
});
const jsonData = csvtojson({
  filePath: "./perezcuellarinicial.csv",
  separator: ",",
  hasHeader: true,
});
// console.log(jsonData);
const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send(jsonData);
});
const updatedJsonData = jsonData.map((row) => {
  //update codigoEstudiante
  if (row.codigoEstudiante === row.dni) {
    row.codigoEstudiante = "000000" + row.codigoEstudiante;
  }
  row.fechaMatricula = "2024-03-04T00:00:00.000Z";
  return row;
});
app.get("/jsonUpdated", (req, res) => {
  res.send(updatedJsonData);
});
app.listen(5000, () => {
  console.log("server running in port 5000");
});
