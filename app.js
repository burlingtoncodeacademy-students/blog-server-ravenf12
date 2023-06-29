// Import stuff
require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");

// Controller variable 
const routes = require("./Controllers/routes.js");

// App.use
app.use(express.json());
app.use("/routes", routes);
// http://localhost:5001/routes

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });


  // Note to self, don't add extra into "app.js", it will throw off nodemon. 