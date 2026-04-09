import express from "express";

import profile from "../data/profile.js";
import { getGitHubData } from "../services/github.js";
import { getLeetCodeData } from "../services/leetcode.js";
import { buildSmartTimeline } from "../services/timeline.js";

import { buildPrompt } from "../utils/promptBuilder.js";
import { generateAIResponse } from "../services/aiService.js";

const router = express.Router();


router.post("/", async (req, res) => {
  console.log("🔥 API HIT:", req.body);
  try {
    const { message } = req.body;

    //  validation
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    //  safe parallel fetch
    const [githubRes, leetcodeRes] = await Promise.allSettled([
      getGitHubData(),
      getLeetCodeData(),
    ]);

    const github = githubRes.status === "fulfilled" ? githubRes.value : {};

    const leetcode =
      leetcodeRes.status === "fulfilled" ? leetcodeRes.value : {};

    const timeline = buildSmartTimeline(github, leetcode);

    const prompt = buildPrompt({
      message,
      profile,
      github,
      leetcode,
      timeline,
    });
    console.log("========== FINAL PROMPT ==========");
    console.log(prompt);
    console.log("==================================");
    const reply = await generateAIResponse(prompt);

    res.json({ reply });
  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
