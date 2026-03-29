const express = require("express");
const router = express.Router();
const HomeSettings = require("../models/HomeSettings");
const HomeContent = require("../models/HomeContent");
const multer = require("multer");
const path = require("path");

/* =====================================================
   🔹 MULTER CONFIG
===================================================== */

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* =====================================================
   🔹 RESUME SECTION
===================================================== */

// GET Resume
router.get("/resume", async (req, res) => {
  try {
    const settings = await HomeSettings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload / Update Resume
router.post("/resume", upload.single("resume"), async (req, res) => {
  try {
    let settings = await HomeSettings.findOne();

    if (!settings) {
      settings = new HomeSettings();
    }

    if (req.file) {
      settings.resume = req.file.filename;
    }

    await settings.save();
    res.json(settings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =====================================================
   🔹 HOME CONTENT CMS
===================================================== */

// GET Full Home Content
router.get("/content", async (req, res) => {
  try {
    const data = await HomeContent.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Full Home Content
router.put("/content", upload.single("logo"), async (req, res) => {
  try {
    const existing = await HomeContent.findOne();
    const data = JSON.parse(req.body.data);

    // Attach logo if uploaded
    if (req.file && data.brands && data.brands.length > 0) {
      data.brands[data.brands.length - 1].logo = req.file.filename;
    }

    if (existing) {
      const updated = await HomeContent.findByIdAndUpdate(
        existing._id,
        data,
        { new: true }
      );
      res.json(updated);
    } else {
      const created = await HomeContent.create(data);
      res.json(created);
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;