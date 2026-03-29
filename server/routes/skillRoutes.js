const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");

// GET all skills
router.get("/", async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
});

// ADD skill
router.post("/", async (req, res) => {
  const skill = await Skill.create(req.body);
  res.json(skill);
});

// DELETE skill
router.delete("/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill deleted" });
});

module.exports = router;