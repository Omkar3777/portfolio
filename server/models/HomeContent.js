const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  hero: {
    name: String,
    identity: String,
    tagline: String,
    description: String,
  },

  stats: [
    {
      title: String,
    }
  ],

  whatIDo: [
    {
      title: String,
      description: String,
    }
  ],

  brands: [
    {
      name: String,
      description: String,
      logo: String,
    }
  ],

  tools: [String],

  currentlyBuilding: [String],

  cta: {
    heading: String,
    description: String,
  }

}, { timestamps: true });

module.exports = mongoose.model("HomeContent", homeSchema);