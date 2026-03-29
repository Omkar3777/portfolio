const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  platform: String,
  link: String,
}, { timestamps: true });

module.exports = mongoose.model("Social", socialSchema);