const express = require("express");
const router = express.Router();
const HomeSettings = require("../models/HomeSettings");
const HomeContent = require("../models/HomeContent");

/* =====================================================
   🔹 RESUME SECTION (URL BASED - FIXED)
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

// POST / UPDATE Resume (NOW USING URL)
router.post("/resume", async (req, res) => {
  try {
    let settings = await HomeSettings.findOne();

    if (!settings) {
      settings = new HomeSettings();
    }

    // ✅ Save resume URL instead of file
    settings.resume = req.body.resume;

    await settings.save();

    res.json({
      message: "Resume updated successfully ✅",
      data: settings,
    });

  } catch (err) {
    console.error(err);
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

// UPDATE Full Home Content (SAFE JSON PARSE)
router.put("/content", async (req, res) => {
  try {
    let data;

    // ✅ Safe JSON parsing
    try {
      data = typeof req.body.data === "string"
        ? JSON.parse(req.body.data)
        : req.body.data;
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON format ❌" });
    }

    const existing = await HomeContent.findOne();

    if (existing) {
      const updated = await HomeContent.findByIdAndUpdate(
        existing._id,
        data,
        { new: true }
      );
      return res.json({
        message: "Home content updated ✅",
        data: updated,
      });
    }

    const created = await HomeContent.create(data);

    res.json({
      message: "Home content created ✅",
      data: created,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;