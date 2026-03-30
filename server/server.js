require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =====================================================
   🔹 CORS (ALLOW ALL FOR NOW)
===================================================== */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://portfolio-alpha-two-7g5kjc98sx.vercel.app"
  ],
  credentials: true,
}));

/* =====================================================
   🔹 MIDDLEWARE
===================================================== */
app.use(express.json());

/* =====================================================
   🔹 DATABASE CONNECTION
===================================================== */
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.error("MongoDB Error ❌:", err));

/* =====================================================
   🔹 ROUTES
===================================================== */
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));
app.use("/api/social", require("./routes/socialRoutes"));
app.use("/api/tools", require("./routes/toolRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api/home", require("./routes/homeRoutes"));

/* =====================================================
   🔹 TEST ROUTE
===================================================== */
app.get("/", (req, res) => {
  res.send("Portfolio SaaS API Running 🚀");
});

/* =====================================================
   🔹 SERVER START
===================================================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});