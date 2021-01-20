const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const app = express();
const dbCon = require("./config");
const path = require("path");

const connection = require("./sqlCon");

setConfigurations();

function setConfigurations() {
  //configureMongoDb();
  setBodyParserAndHeaders();
  setRoutes();
  handleErrors();
  error404Handler();
}

// function configureMongoDb() {
//   mongoose
//     .connect(dbCon.ConfigSetting.db_Path, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log(
//         "Connected to MongoDB database " + dbCon.ConfigSetting.db_Name
//       );
//     })
//     .catch((e) => {
//       console.log("Connection failed!" + e.stack);
//     });
// }

function setBodyParserAndHeaders() {
  app.use("/images", express.static(path.join("/images")));
  app.use(
    bodyParser.json({
      limit: "50mb",
    })
  );
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
    })
  );

  app.set("trust proxy", true);
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
}

function setRoutes() {
  const prodRoutes = require("./routes/products.route");
  const annRoutes = require("./routes/sectors.route");

  app.use("/api/products", prodRoutes);
  app.use("/api/ananya", annRoutes);
}

function handleErrors() {
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    const errStatus = req.errorStatus || 500;
    res.status(errStatus).json({
      message: err.message || "Something went wrong.Please try again.",
      error_code: errStatus,
    });
  });
}

function error404Handler() {
  app.use((req, res) => {
    res.status(404).json({
      message: "Not Found",
      error_code: 404,
      server_status: "server is running smoothly",
    });
  });
}

module.exports = app;
