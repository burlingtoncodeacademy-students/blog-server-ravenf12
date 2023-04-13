const express = require("express");
require("dotenv").config();

const app = express();

const PORT = 5001;

const fs = require("fs");

const routes = require("./Controllers/routes.js");

app.use(express.json());

app.use("/routes", routes);
// http://localhost:5000/blog

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
