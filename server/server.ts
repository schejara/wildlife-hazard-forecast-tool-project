require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

const bodyParser = require("body-parser"); 

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });