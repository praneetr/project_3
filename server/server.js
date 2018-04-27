var express = require("express");
const path = require("path");
const moment = require("moment");
moment().format();
const mongodb = require("mongodb");
const dbUrl = "mongodb://localhost:27017/stockdata";
const QuandlApi = require("./QuandlApi");
var app = express();
const port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
var db;

// var cors = require('cors');
// const corsOptions = {
//   origin: "*",
// };
// app.use(cors(corsOptions));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app
  .use(express.static(path.join(__dirname, "../build")))

  .get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });

//getting the data from the client and using it in the template
mongodb.MongoClient.connect(dbUrl, (err, client) => {
  const lastSearchData = {};

  app.post("/api/get-ticker-data", (req, res, next) => {
    req.body.formData.userInputs.endDate = moment(
      req.body.formData.userInputs.date
    ).format("YYYY/MM/DD");
    req.body.formData.userInputs.startDate = moment(
      req.body.formData.userInputs.date
    )
      .subtract(1, "month")
      .format("YYYY/MM/DD");
    QuandlApi.getRows(req.body.formData, (errorMessage, response) => {
      lastSearchData.data = response;
      lastSearchData.data.entered_date = moment(
        req.body.formData.userInputs.date
      ).format("YYYY/MM/DD");
      res.json({ data: response });
    });
  });

  app.post("/api/save-ticker-data", (req, res, next) => {
    // saveDataToDb(lastSearchData);
    db = client.db("savedSearchesDb");
    if (err) throw err;
    db
      .listCollections({ name: "savedSearchesDb" })
      .next(function (err, collinfo) {
        if (collinfo) {
          console.log("Info", collinfo);
        } else {
          db.createCollection("stockDataDb");
        }
      });
    var collection = db.collection("stockDataDb");
    collection.insert(lastSearchData.data, function (err, data) {
      collection.find({}).toArray(function (err, data) {
        if (err) throw err;
        res.json(data);
      });
    });
  });
  // delete data from DB (lastSearchData);
  app.delete(`/api/delete-ticker-data/:id`, (req, res, next) => {
    console.log("req.params.id", req.params.id);
    db = client.db("savedSearchesDb");
    var collection = db.collection("stockDataDb");
    var obj_id = new require("mongodb").ObjectID(req.params.id);
    collection.remove({ _id: obj_id }, { justOne: true }, () => {
      collection.find({}).toArray(function (err, data) {
        if (err) throw err;
        res.json(data);
      });
    });
  });


  app.post("/api/get-history-data", (req, res, next) => {
    db = client.db("savedSearchesDb");
    var collection = db.collection("stockDataDb");

    const sort = { _id: -1 };

    collection
      .find({})
      .sort(sort)
      .toArray(function (err, data) {
        if (err) throw err;
        res.json(data);
      });
  });

  app.post("/api/get-searched-item-data", (req, res, next) => {
    db = client.db("savedSearchesDb");
    var collection = db.collection("stockDataDb");
    var obj_id = new require("mongodb").ObjectID(req.body.id);

    collection
      .find({
        _id: obj_id
      })
      .toArray(function (err, data) {
        if (err) throw err;
        res.json(data);
      });
  });
});

app.listen(port);
console.log("listening on " + port);
