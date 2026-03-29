const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET
router.get("/", async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
});

// CREATE
router.post("/", upload.single("logo"), async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    description: req.body.description,
    logo: req.file?.filename,
  });

  const saved = await brand.save();
  res.json(saved);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;