const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

// ============================
// Mail Transporter
// ============================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ============================
// POST - Save + Send Email
// ============================

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    // Send Email to YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "omkarjadhav3777@gmail.com",
      subject: "New Contact Form Submission 🚀",
      html: `
        <h3>New Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    // Auto Reply to USER
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting Omkar 👋",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for reaching out. I have received your message and will get back to you shortly.</p>
        <br/>
        <p>Best Regards,<br/>Omkar Jadhav</p>
      `,
    });

    res.json({ message: "Saved & Emails Sent ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong ❌" });
  }
});

// ============================
// GET - All Contacts (Admin)
// ============================

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// ============================
// PUT - Mark as Read
// ============================

router.put("/:id", async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: "read" },
    { new: true }
  );
  res.json(updated);
});

// ============================
// DELETE Contact
// ============================

router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});

module.exports = router;