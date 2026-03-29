const mongoose = require("mongoose");

const homeSettingsSchema = new mongoose.Schema({
  resume: String,
});

module.exports = mongoose.model("HomeSettings", homeSettingsSchema);