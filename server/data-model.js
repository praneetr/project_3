const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  dataset_code: String,
  database_code: String,
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const DataModel = mongoose.model("dataModel", dataSchema);

module.exports = DataModel;
