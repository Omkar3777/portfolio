const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achievement");

router.get("/", async (req, res) => {
  const data = await Achievement.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const item = new Achievement(req.body);
  await item.save();
  res.json(item);
});

router.put("/:id", async (req, res) => {
  const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Achievement.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;