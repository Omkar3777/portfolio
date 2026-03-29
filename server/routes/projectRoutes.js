const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const multer = require("multer");
const path = require("path");

/* ============================= */
/* 🔥 MULTER CONFIGURATION */
/* ============================= */

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ============================= */
/* 🔥 GET ALL PROJECTS (PUBLIC) */
/* ============================= */

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================= */
/* 🔥 CREATE PROJECT (WITH IMAGE + TYPE) */
/* ============================= */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      github: req.body.github,
      live: req.body.live,
      image: req.file ? req.file.filename : "",
      type: req.body.type?.toLowerCase().trim(),  // 🔥 IMPORTANT
    });

    const saved = await newProject.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================= */
/* 🔥 DELETE PROJECT */
/* ============================= */

router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================= */
/* 🔥 UPDATE PROJECT (WITH IMAGE + TYPE) */
/* ============================= */

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      github: req.body.github,
      live: req.body.live,
      type: req.body.type, // ✅ IMPORTANT
    };

    // If new image uploaded
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;