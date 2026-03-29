const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    github: String,
    live: String,
    image: String,

    // 🔥 ADD THIS
    type: {
      type: String,
      enum: ["development", "design"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);