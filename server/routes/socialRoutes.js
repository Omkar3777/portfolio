const express = require("express");
const router = express.Router();
const Social = require("../models/Social");

router.get("/", async (req, res) => {
  const data = await Social.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const item = new Social(req.body);
  await item.save();
  res.json(item);
});

router.put("/:id", async (req, res) => {
  const updated = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Social.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;