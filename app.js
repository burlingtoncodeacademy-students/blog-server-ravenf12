// Import stuff
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 5001;
const fs = require("fs");
// Mongoose
const mongoose = require("mongoose");
mongoose.set(`strictQuery`, false);
const MONGO = process.env.MONGODB;
mongoose.connect(`${MONGO}`);

// Controller variable 
const routes = require("./Controllers/routes.js");

// App.use
app.use(express.json());
app.use("/routes", routes);
// http://localhost:5001/routes

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });


  // Note to self, don't add extra into "app.js", it will throw off nodemon. 