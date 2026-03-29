require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// IMPORTANT: Only JSON parser here
app.use(express.json());

// Serve Uploaded Files (ONLY ONCE)
app.use("/uploads", express.static("uploads"));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.error("MongoDB Error ❌:", err));

// Routes
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));
app.use("/api/social", require("./routes/socialRoutes"));
app.use("/api/tools", require("./routes/toolRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api/home", require("./routes/homeRoutes"));

// Test
app.get("/", (req, res) => {
  res.send("Portfolio SaaS API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});