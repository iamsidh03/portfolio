const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { getLeetCodeProfile } = require("./leetcode.service");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

/**
 * GET /api/user/:username
 */
app.get("/api/user/:username", async (req, res) => {
  try {
    const data = await getLeetCodeProfile(req.params.username);
    res.json(data);
  } catch (err) {
    console.error("API error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`LeetCode backend running on http://localhost:${PORT}`);
});