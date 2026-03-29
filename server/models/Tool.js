const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: String,
  icon: String,
});

module.exports = mongoose.model("Tool", toolSchema);