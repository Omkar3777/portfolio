const express = require("express");
const router = express.Router();
const Tool = require("../models/Tool");
const multer = require("multer");
const path = require("path");

// Multer Setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET
router.get("/", async (req, res) => {
  const tools = await Tool.find();
  res.json(tools);
});

// POST (IMPORTANT 🔥)
router.post("/", upload.single("icon"), async (req, res) => {
  try {
    const newTool = new Tool({
      name: req.body.name,
      icon: req.file ? req.file.filename : null,
    });

    const saved = await newTool.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Tool.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;